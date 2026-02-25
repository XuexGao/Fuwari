import json
from pathlib import Path

CACHE_FILE = Path(".translation_cache.json")

def clean_cache():
    if not CACHE_FILE.exists():
        print("No cache file found.")
        return

    with open(CACHE_FILE, 'r', encoding='utf-8') as f:
        cache = json.load(f)

    unwanted_prefixes = [
        "Here is the translation:", 
        "Here's the translation:", 
        "Translation:", 
        "The translation is:",
        "Sure, here's the translation:",
        "Sure, here is the translation:"
    ]

    new_cache = {}
    cleaned_count = 0
    removed_count = 0

    for h, translated in cache.items():
        # 如果翻译包含多行且其中一行有前缀，或者本身就以前缀开始，则标记为损坏并移除
        is_bad = False
        lower_translated = translated.lower()
        
        # 如果翻译结果中包含 "---" 或者包含多行 AI 的对话式内容，则移除
        if "---" in translated or "\n\n" in translated[:100]:
            is_bad = True
            
        for prefix in unwanted_prefixes:
            if lower_translated.startswith(prefix.lower()):
                is_bad = True
                break
        
        if is_bad:
            removed_count += 1
            continue
        
        new_cache[h] = translated

    print(f"Removed {removed_count} bad entries from cache.")
    
    with open(CACHE_FILE, 'w', encoding='utf-8') as f:
        json.dump(new_cache, f, ensure_ascii=False, indent=2)
    
    print("Cache cleaning complete.")

if __name__ == "__main__":
    clean_cache()
