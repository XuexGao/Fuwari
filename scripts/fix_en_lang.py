import os
from pathlib import Path
import re

EN_POSTS_DIR = Path("src/content/posts/en")

def fix_en_posts():
    files = list(EN_POSTS_DIR.glob("*.md"))
    fixed_count = 0
    
    for f_path in files:
        with open(f_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 匹配 Frontmatter
        fm_match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)', content, re.DOTALL)
        if not fm_match:
            continue
            
        frontmatter = fm_match.group(1)
        body = fm_match.group(2)
        
        # 检查是否包含 lang: en
        if not re.search(r'^lang:\s*en\s*$', frontmatter, re.MULTILINE):
            # 添加 lang: en
            new_frontmatter = frontmatter.strip() + "\nlang: en"
            new_content = f"---\n{new_frontmatter}\n---\n{body}"
            
            with open(f_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            fixed_count += 1
            print(f"Fixed: {f_path.name}")

    print(f"Total fixed: {fixed_count}")

if __name__ == "__main__":
    fix_en_posts()
