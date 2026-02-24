import os
from pathlib import Path
import re

EN_POSTS_DIR = Path("src/content/posts/en")

def fix_summary_blocks():
    files = list(EN_POSTS_DIR.glob("*.md"))
    fixed_count = 0
    
    for f_path in files:
        with open(f_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 匹配 Frontmatter 和 Body
        fm_match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)', content, re.DOTALL)
        if not fm_match:
            continue
            
        frontmatter = fm_match.group(1)
        body = fm_match.group(2)
        
        # 检查是否存在 :::tip[AI Summary] 但没有闭合的情况
        # 逻辑：如果存在 :::tip[AI Summary]，但后面没有紧跟的 :::
        if ":::tip[AI Summary]" in body and ":::" not in body.split(":::tip[AI Summary]")[1]:
            # 这是一个简单的修复逻辑：尝试找到总结的结尾
            # 通常总结后面会有两个换行，或者 AI 会在翻译时把 ::: 弄丢
            # 我们直接在 AI Summary 后面寻找第一个段落结束，并尝试补全
            
            # 这里的策略是：如果 :::tip[AI Summary] 后面有内容但没有 :::，
            # 我们尝试在第一个段落结束处（\n\n）补上 :::
            
            parts = body.split(":::tip[AI Summary]\n", 1)
            header = parts[0]
            rest = parts[1]
            
            # 寻找第一个空行
            if "\n\n" in rest:
                summary_content, remaining = rest.split("\n\n", 1)
                # 检查 summary_content 是否已经包含 :::
                if ":::" not in summary_content:
                    new_body = f"{header}:::tip[AI Summary]\n{summary_content.strip()}\n:::\n\n{remaining}"
                    
                    new_content = f"---\n{frontmatter}\n---\n{new_body}"
                    with open(f_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    
                    fixed_count += 1
                    print(f"Fixed summary block in: {f_path.name}")
            else:
                # 如果没有空行，尝试在末尾补全（针对极短文章）
                if ":::" not in rest:
                    new_body = f"{header}:::tip[AI Summary]\n{rest.strip()}\n:::\n"
                    new_content = f"---\n{frontmatter}\n---\n{new_body}"
                    with open(f_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    fixed_count += 1
                    print(f"Fixed summary block (EOF) in: {f_path.name}")

    print(f"Total fixed: {fixed_count}")

if __name__ == "__main__":
    fix_summary_blocks()
