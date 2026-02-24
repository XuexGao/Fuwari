import os
import re
import hashlib
import json
import requests
import concurrent.futures
import argparse
from pathlib import Path
from dotenv import load_dotenv
from threading import Lock

# 加载环境变量
load_dotenv()

# 配置
LOCAL_API_URL = "http://localhost:1234/v1/chat/completions"
MODEL_NAME = "google/gemma-3-1b"
SRC_POSTS_DIR = Path("src/content/posts")
TARGET_POSTS_DIR = Path("src/content/posts/en") 
SPEC_DIR = Path("src/content/spec")
CACHE_FILE = Path(".translation_cache.json")

# 并发控制
MAX_REQUEST_WORKERS = 100 
MAX_FILE_WORKERS = 100

# 全局锁和缓存
cache_lock = Lock()
cache = {}

# 准备请求池
request_pool = concurrent.futures.ThreadPoolExecutor(max_workers=MAX_REQUEST_WORKERS)

def get_content_hash(content):
    return hashlib.md5(content.encode('utf-8')).hexdigest()

def save_cache():
    with cache_lock:
        with open(CACHE_FILE, 'w', encoding='utf-8') as f:
            json.dump(cache, f, ensure_ascii=False, indent=2)

def translate_text(text, is_title=False, is_category=False):
    if not text.strip():
        return ""
    
    # 极简 Prompt，减少 AI 废话可能性
    if is_category:
        system_prompt = "Translate this category name to 1-2 English words. Output ONLY the words."
    elif is_title:
        system_prompt = "Translate this article title to English. Output ONLY the title."
    else:
        system_prompt = (
            "Translate the following text to professional English. "
            "Rules: 1. ONLY output the translation. 2. Keep [[X:content]] tags intact. 3. No chatter."
        )

    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": text}
        ],
        "temperature": 0.0
    }
    
    try:
        response = requests.post(LOCAL_API_URL, json=payload, timeout=120)
        response.raise_for_status()
        result = response.json()
        translated = result['choices'][0]['message']['content'].strip()
        
        # 强力剥离所有可能的 AI 废话前缀
        chatter_patterns = [
            r"^(here is|here's|the translation|translated|sure|okay|translation|the English translation).*?[:：]\s*",
            r"^.*?says?[:：]\s*",
            r"^I can translate that.*?[:：]\s*",
            r"^The text translates to.*?[:：]\s*",
        ]
        for pattern in chatter_patterns:
            translated = re.sub(pattern, "", translated, flags=re.IGNORECASE | re.DOTALL).strip()
        
        # 针对 gemma-3-1b 的特定废话进行拦截
        if "provide the text" in translated.lower() or "ready when you are" in translated.lower():
            # 如果 AI 返回的是索要文本的废话，说明翻译失败，尝试简单的备用翻译或保留原样
            return text

        # 如果 AI 返回了 Markdown 标题但我们只需要内容，剥离它
        translated = re.sub(r'^#+\s+', "", translated)
        
        # 移除包围的引号
        if (translated.startswith('"') and translated.endswith('"')) or \
           (translated.startswith("'") and translated.endswith("'")):
            if not (text.startswith('"') or text.startswith("'")):
                translated = translated[1:-1].strip()
            
        return translated.replace("\n", " ").strip()
    except Exception as e:
        print(f"Translation error: {e}")
        return text

def clean_yaml_value(value):
    # 移除 YAML 常见的 AI 废话
    bad_phrases = [
        "here is the translation",
        "the translation of the provided text is",
        "important: translate the content",
        "okay, please provide the text",
        "i'm ready when you are",
    ]
    for phrase in bad_phrases:
        if phrase.lower() in value.lower():
            # 如果包含这些废话，尝试只保留冒号后的内容，或者干脆清空
            if ":" in value:
                value = value.split(":", 1)[1].strip()
            else:
                value = "" # 宁愿为空也不要废话
    
    value = value.replace("\n", " ").strip()
    value = value.replace('"', '\\"')
    return value

def summarize_text(text, lang='zh'):
    if not text.strip(): return ""
    prompt = "你是一个专业的文章总结助手。请用中文为我提供这篇文章的简短总结（3句话以内）。直接输出总结内容。"
    if lang == 'en':
        prompt = "You are a professional article summarizer. Please provide a brief English summary (within 3 sentences) for this article. Output ONLY the summary content."
        
    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": prompt},
            {"role": "user", "content": text[:4000]}
        ],
        "temperature": 0.5
    }
    try:
        response = requests.post(LOCAL_API_URL, json=payload, timeout=120)
        response.raise_for_status()
        result = response.json()
        return result['choices'][0]['message']['content'].strip()
    except Exception as e:
        print(f"Summarization error: {e}")
        return ""

def smart_markdown_translate(text, is_title=False, is_category=False):
    if not text.strip(): return ""
    
    # 1. 提取特殊 Markdown 元素并替换为标签
    links = []
    def link_replacer(match):
        label, url = match.groups()
        links.append(url)
        return f"[[L:{label}]]"
    
    # 保护链接: [text](url) -> [[L:text]]
    processed_text = re.sub(r'\[(.*?)\]\((.*?)\)', link_replacer, text)
    # 保护加粗: **text** -> [[B:text]]
    processed_text = re.sub(r'\*\*(.*?)\*\*', r'[[B:\1]]', processed_text)
    # 保护斜体: *text* -> [[I:text]]
    processed_text = re.sub(r'\*(.*?)\*', r'[[I:\1]]', processed_text)
    # 保护行内代码: `text` -> [[C:text]]
    processed_text = re.sub(r'`(.*?)`', r'[[C:\1]]', processed_text)

    # 2. 调用 AI 翻译
    translated = translate_text(processed_text, is_title=is_title, is_category=is_category)

    # 3. 还原 Markdown 格式
    translated = re.sub(r'\[+B:?\s*(.*?)\]+', r'**\1**', translated)
    translated = re.sub(r'\[+I:?\s*(.*?)\]+', r'*\1*', translated)
    translated = re.sub(r'\[+C:?\s*(.*?)\]+', r'`\1`', translated)
    
    # 还原链接 (按顺序回填 URL)
    def link_restorer(match):
        label = match.group(1).strip()
        if links:
            url = links.pop(0)
            return f"[{label}]({url})"
        return f"[{label}]"
    
    translated = re.sub(r'\[+L:?\s*(.*?)\]+', link_restorer, translated)
    
    return translated

def process_markdown(file_path, target_file=None):
    print(f"\n>>> Starting {file_path.name}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if not target_file:
        target_file = TARGET_POSTS_DIR / file_path.name
    
    fm_match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)', content, re.DOTALL)
    if not fm_match: return

    frontmatter = fm_match.group(1)
    body = fm_match.group(2)

    # 1. AI 总结处理
    is_spec = "spec" in str(file_path)
    if not is_spec and ":::ai-summary" not in body:
        summary_future = request_pool.submit(summarize_text, body)
        summary = summary_future.result()
        if summary:
            summary_block = f":::ai-summary{{model=\"{MODEL_NAME}\"}}\n{summary}\n:::\n\n"
            body = summary_block + body
            new_source_content = f"---\n{frontmatter}\n---\n{body}"
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_source_content)
            print(f"Added summary to: {file_path.name}")
    
    # 2. 修正路径并预提取大块内容 (总结、代码块、图片)
    # 只有当目标文件比源文件更深一层时（如 posts -> posts/en），才需要修正路径
    if "posts" in str(file_path) and "en" in str(target_file):
        body = body.replace("../assets/", "../../assets/")

    summary_block_match = re.search(r':::ai-summary.*?\]?\{model=.*?\}(.*?)\n:::', body, re.DOTALL)
    summary_task = None
    if summary_block_match:
        full_block = summary_block_match.group(0)
        inner_content = summary_block_match.group(1).strip()
        body = body.replace(full_block, "__SUMMARY_BLOCK_PLACEHOLDER__")
        # 直接为英文文章生成英文总结，而不是翻译中文总结
        if "en" in str(target_file):
            summary_task = request_pool.submit(summarize_text, body.replace("__SUMMARY_BLOCK_PLACEHOLDER__", ""), lang='en')
        else:
            summary_task = request_pool.submit(smart_markdown_translate, inner_content)

    placeholders = []
    def replace_with_placeholder(match):
        placeholder = f"__PLACEHOLDER_{len(placeholders)}__"
        placeholders.append(match.group(0))
        return placeholder

    body = re.sub(r'```[\s\S]*?```', replace_with_placeholder, body)
    body = re.sub(r'!\[.*?\]\(.*?\)', replace_with_placeholder, body)

    # 3. 异步翻译 Frontmatter
    new_fm_lines = []
    fm_futures = []
    has_lang_line = False
    for line in frontmatter.split('\n'):
        if line.startswith('title:') or line.startswith('description:') or line.startswith('category:'):
            key, val = line.split(':', 1)
            val = val.strip().strip("'").strip('"')
            fm_futures.append((key, request_pool.submit(smart_markdown_translate, val, is_title=(key=='title'), is_category=(key=='category'))))
        elif line.startswith('tags:'):
            # 标签通常是列表格式，需要特殊处理
            new_fm_lines.append(line) # 暂时保持原样，后续可以改进
        elif line.startswith('lang:'):
            new_fm_lines.append("lang: en")
            has_lang_line = True
        elif line.startswith('image:'):
            if "posts" in str(file_path) and "en" in str(target_file):
                new_fm_lines.append(line.replace("../assets/", "../../assets/"))
            else:
                new_fm_lines.append(line)
        else:
            new_fm_lines.append(line)
    if not has_lang_line: new_fm_lines.append("lang: en")

    # 4. 翻译正文 (按段落切分，但对每一行进行前缀保护)
    paragraphs = body.split('\n\n')
    p_tasks = []
    
    for p in paragraphs:
        p_clean = p.strip()
        if not p_clean or "__PLACEHOLDER_" in p_clean or "__SUMMARY_BLOCK_PLACEHOLDER__" in p_clean:
            p_tasks.append(p_clean)
            continue
        
        # 将段落内部按行拆开处理，以保护列表和标题
        lines = p_clean.split('\n')
        line_tasks = []
        
        for line in lines:
            line_strip = line.strip()
            if not line_strip:
                line_tasks.append("")
                continue
                
            line_prefix = ""
            line_content = line
            
            # 1. 匹配标题 (H1-H6)
            h_match = re.match(r'^(#+)\s*(.*)', line)
            if h_match:
                line_prefix, line_content = h_match.group(1) + " ", h_match.group(2)
            else:
                # 2. 匹配列表 (无序 -, *, + 或 有序 1., 2.)
                l_match = re.match(r'^([\-\*\+]\s+|\d+\.\s+)(.*)', line)
                if l_match:
                    line_prefix, line_content = l_match.group(1), l_match.group(2)

            p_hash = get_content_hash(line)
            
            def translate_line(content, prefix, hash_val):
                with cache_lock:
                    if hash_val in cache:
                        cached_res = cache[hash_val]
                        # 强制检查前缀：如果应该有前缀但缓存里没有，或者前缀不匹配，则重新翻译
                        if not prefix.strip() or cached_res.startswith(prefix):
                            return cached_res
                
                res = smart_markdown_translate(content)
                final_res = prefix + res
                with cache_lock:
                    cache[hash_val] = final_res
                return final_res

            line_tasks.append(request_pool.submit(translate_line, line_content, line_prefix, p_hash))
            
        p_tasks.append(line_tasks)

    # 5. 等待并拼装
    final_fm_dict = {key: clean_yaml_value(f.result()) for key, f in fm_futures}
    final_fm_lines = []
    if 'title' in final_fm_dict: final_fm_lines.append(f"title: \"{final_fm_dict['title']}\"")
    if 'description' in final_fm_dict: final_fm_lines.append(f"description: \"{final_fm_dict['description']}\"")
    if 'category' in final_fm_dict: final_fm_lines.append(f"category: \"{final_fm_dict['category']}\"")
    for line in new_fm_lines:
        if not any(line.startswith(f"{k}:") for k in ['title', 'description', 'category']):
            final_fm_lines.append(line)
    
    final_p_list = []
    for item in p_tasks:
        if isinstance(item, list):
            # 这是一个段落，由多行翻译任务组成
            translated_lines = [f.result() if not isinstance(f, str) else f for f in item]
            final_p_list.append("\n".join(translated_lines))
        else:
            final_p_list.append(item)

    final_body = "\n\n".join([p for p in final_p_list if p])
    if summary_task:
        summary_res = summary_task.result()
        summary_block = f":::ai-summary[AI Summary]{{model=\"{MODEL_NAME}\"}}\n{summary_res}\n:::"
        final_body = final_body.replace("__SUMMARY_BLOCK_PLACEHOLDER__", summary_block)

    for i, original_block in enumerate(placeholders):
        final_body = final_body.replace(f"__PLACEHOLDER_{i}__", original_block)

    final_content = "---\n" + "\n".join(final_fm_lines) + "\n---\n" + final_body
    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    save_cache()
    print(f"Finished: {file_path.name}")

def main():
    global cache
    parser = argparse.ArgumentParser(description="AI Blog Translator")
    parser.add_argument("file", nargs="?", help="Specific file name")
    args = parser.parse_args()

    if CACHE_FILE.exists():
        with open(CACHE_FILE, 'r', encoding='utf-8') as f:
            cache = json.load(f)

    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_FILE_WORKERS) as file_executor:
        if args.file:
            if "announcement" in args.file:
                process_markdown(SPEC_DIR / "announcement-zh-cn.md", SPEC_DIR / "announcement-en.md")
            else:
                f_path = SRC_POSTS_DIR / args.file
                if f_path.exists(): process_markdown(f_path)
        else:
            files = [f for f in SRC_POSTS_DIR.glob("*.md") if f.is_file() and "en" not in f.parts]
            futures = [file_executor.submit(process_markdown, f) for f in files]
            if (SPEC_DIR / "announcement-zh-cn.md").exists():
                futures.append(file_executor.submit(process_markdown, SPEC_DIR / "announcement-zh-cn.md", SPEC_DIR / "announcement-en.md"))
            concurrent.futures.wait(futures)
    request_pool.shutdown()

if __name__ == "__main__":
    main()
