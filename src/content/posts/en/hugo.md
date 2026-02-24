---
title: "Hugo Blog Setup Tutorial and Configuration Optimization"
description: "Hugo is a static blog built with Golang. Compared to Hexo built with Node.js, its construction efficiency is improved by 600%, and it also supports low JavaScript features, offering better SEO and easier crawling for spiders."
category: "Tutorial"
draft: false
image: ../../assets/images/3d1b097d-7e31-4312-b3e5-d213e2903f4d.webp
lang: en
published: 2025-03-03
tags:
- Hugo
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
The author abandoned their Astro-based Fuwari blog due to maintenance difficulties and switched to Hugo, a static site generator using HTML/JS/CSS, for easier customization and faster builds. They detail a Windows setup using Scoop to install Hugo and PaperMod theme, configure site settings, and create content structure. The guide concludes with deploying the site via Git to platforms like Vercel or Cloudflare Pages.
:::

# Introduction

I once wrote an article called: [Fuwari static blog setup tutorial](/posts/fuwari/).

The [Fuwari](https://github.com/saicaca/fuwari) in the text is based on Astro and uses a hybrid rendering approach combining server and client-side rendering. Although the UI is indeed nice, because I am not proficient in writing Astro, maintenance will be particularly difficult in the future (for example, after manually adding Giscus comments, conflicts with the upstream branch will require manual resolution before merging upstream).

In the end, I gave up. Since I’m just a beginner, why not find a framework that natively uses HTML + JS + CSS?

So I asked the AI, and Claude recommended that I use Hugo.

Actually, I had long heard of Hugo's reputation, but I hadn't delved into it deeply. However, Claude told me that Hugo is compiled using Go language, which makes it fast, and if I want to modify it, I only need to tweak the HTML+JS+CSS that I'm most familiar with.

So I spent two hours deeply researching, deploying, and optimizing. I found Hugo to be truly powerful: easy to migrate, simple to customize, and fast to build.

# Formally begin

> Please operate throughout on Windows.

We first need to install Scoop, a package manager for Windows that I personally find very useful.

Scoop defaults to installing on the C drive; if you wish to change the drive, adjust accordingly.

```powershell
$env:SCOOP='D:\Scoop'
$env:SCOOP_GLOBAL='D:\ScoopApps'
[Environment]::SetEnvironmentVariable('SCOOP', $env:SCOOP, 'User')
[Environment]::SetEnvironmentVariable('SCOOP_GLOBAL', $env:SCOOP_GLOBAL, 'Machine')
```

Install Scoop:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

If installation fails when run as an administrator, switch to a regular user. If you wish to force installation as an administrator, use

[original post on GitHub](https://github.com/ScoopInstaller/Install#for-admin)

For security reasons, installation under the Administrator console is disabled by default. If you know what you're doing and wish to install Scoop as an administrator, download the installer and manually execute it in an elevated console using the `-RunAsAdmin` parameter. Here is an example:

```powershell
irm get.scoop.sh -outfile 'install.ps1'
.\install.ps1 -RunAsAdmin [-OtherParameters ...]
# 如果你想要一行解决：
iex "& {$(irm get.scoop.sh)} -RunAsAdmin"
```

Install the Hugo framework:

```powershell
scoop install hugo
```

Then choose a folder you like to create your site. `myblog` is your site folder name.

```shell
hugo new site myblog
cd myblog
```

Install the PaperMod theme:

```shell
git clone https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
```

The root directory of the site will have a `hugo.toml`. I recommend using YAML. Rename the file to `hugo.yaml`. Paste and modify the following content

```yaml
baseURL: "https://站点url"
title: "网站标题"
LanguageCode: "zh-CN"
theme: "PaperMod"

# 启用首页个人简介展示
params:
  # 是否启用评论。你需要自己配置，或者直接引入Giscus等评论系统
  comments: false
  # 是否显示代码复制按钮
  ShowCodeCopyButtons: true
  # 是否显示面包屑导航
  ShowBreadCrumbs: false
  # 是否显示阅读时间  
  ShowReadingTime: true
  # 是否显示分享按钮
  ShowShareButtons: true
  # 分享按钮配置
  # ShareButtons: ["linkedin", "twitter"]
  # 是否禁用主题切换按钮
  disableThemeToggle: false
  assets:
    favicon: "/你的/网站图标.webp" # 需要在static文件夹放置对应的图片
    iconHeight: 35
  # 首页信息配置
  homeInfoParams:
    Title: "首页展示的标题"
    Content: >
      首页展示的文本

  # 设置网站头像和首页头像
  profileMode:
    enabled: false # 设为 true 将完全替换 homeInfoParams

  # 网站头像设置 (显示在导航栏)
  label:
    text: "左上角显示的文本"
    icon: "/你的/左上角显示的图片.webp" # 这将显示在导航栏标题旁边。需要在static文件夹放置对应的图片
    iconHeight: 35

  # 社交图标 (显示在简介下方)
  socialIcons:
    - name: bilibili
      url: ""
    - name: github
      url: ""
    - name: telegram
      url: ""
    # 可以添加更多社交图标 https://github.com/adityatelange/hugo-PaperMod/wiki/Icons

# 顶部导航栏的快捷链接
menu:
  main:
    - identifier: categories
      name: 分类
      url: /categories/
      weight: 10
    - identifier: tags
      name: 标签
      url: /tags/
      weight: 20
    - identifier: archives
      name: 归档
      url: /archives/
      weight: 30
    - identifier: search
      name: 搜索
      url: /search/
      weight: 40
    # 可以添加更多导航链接。weight的值越高排序越靠后

# 如果要启用搜索功能，需要添加这个
outputs:
  home:
    - HTML
    - RSS
    - JSON # 必须，用于搜索功能
```

Then we need to configure the categories, tags, archives, and search pages separately.

Create `content\categories\_index.md` Write:

```markdown
---
title: 分类
layout: categories
---
```

Create `content\tags\_index.md` Write:

```markdown
---
title: 标签
layout: tags
---
```

Create `content\archives.md` Write:

```markdown
---
title: 归档
layout: archives
---
```

Create `content\search.md` Write:

```markdown
---
title: "搜索"
layout: "search"
---
```

Then we need to change the default article creation template.

Write into `archetypes\default.md`:

```markdown
---
title: {{ replace .File.ContentBaseName "-" " " | title }}
published: {{ .Date }}
summary: "文章简介"
cover:
  image: 文章封面图。也支持HTTPS
tags: [标签1, 标签2]
categories: '文章所处的分类'
draft: false 
lang: ''
---
```

Next, we can create articles using commands and begin writing. Note that the final built article URL is your article's filename. For example: `https://yourwebsite.com/posts/first`. Therefore, keep your article filenames as short as possible, as this will not affect your article's title.

```shell
hugo new posts/first.md
```

When we finish writing an article and want to preview the website, we can use

```powershell
hugo server
```

When we want to deploy our site to static site hosting platforms such as Vercel, Cloudflare Pages, we can submit our `myblog` as a Git repository to GitHub.

Root directory: `./`

Output directory: `public`

Build command: `hugo --gc`

Environment variable: Key: `HUGO_VERSION` Value: `0.145.0`

---

### Object storage middleware code for storing images:

```python
import keyboard
import pyperclip
from PIL import ImageGrab, Image
import io
import boto3
from botocore.config import Config
import time
import uuid
import pyautogui
import os
from io import BytesIO
# 示例配置
# # R2 配置
# R2_CONFIG = {
#     'account_id': '11111111111111111',
#     'access_key_id': '11111111111111111',
#     'secret_access_key': '11111111111111111',
#     'bucket_name': '11111111111111111'
# }

# # OSS 配置
# OSS_CONFIG = {
#     'url': 'sb-eo-r2.2x.nz',
#     'prefix': '/fuwari-blog/img'
# }
#########################################################
# R2 配置
R2_CONFIG = {
    'account_id': '',
    'access_key_id': '',
    'secret_access_key': '',
    'bucket_name': ''
}

# OSS 配置
OSS_CONFIG = {
    'url': '',
    'prefix': ''
}
#########################################################
def init_r2_client():
    """初始化 R2 客户端"""
    return boto3.client(
        's3',
        endpoint_url=f'https://{R2_CONFIG["account_id"]}.r2.cloudflarestorage.com',
        aws_access_key_id=R2_CONFIG['access_key_id'],
        aws_secret_access_key=R2_CONFIG['secret_access_key'],
        config=Config(signature_version='s3v4'),
        region_name='auto'
    )

def get_image_from_clipboard():
    """从剪贴板获取图片"""
    try:
        image = ImageGrab.grabclipboard()
        if image is None:
            return None

        # 如果是列表（多个文件），取第一个
        if isinstance(image, list):
            if len(image) > 0:
                # 如果是图片文件路径，打开它
                try:
                    return Image.open(image[0])
                except Exception as e:
                    print(f"打开图片文件失败: {e}")
                    return None
            return None

        # 如果直接是 Image 对象
        if isinstance(image, Image.Image):
            return image

        return None
    except Exception as e:
        print(f"获取剪贴板图片失败: {e}")
        return None

def convert_to_webp(image):
    """将图片转换为 webp 格式"""
    if not image:
        return None

    try:
        buffer = BytesIO()
        # 确保图片是 RGB 模式
        if image.mode in ('RGBA', 'LA'):
            background = Image.new('RGB', image.size, (255, 255, 255))
            background.paste(image, mask=image.split()[-1])
            image = background
        elif image.mode != 'RGB':
            image = image.convert('RGB')

        image.save(buffer, format="WEBP", quality=80)
        return buffer.getvalue()
    except Exception as e:
        print(f"转换图片失败: {e}")
        return None

def upload_to_r2(image_data):
    """上传图片到 R2"""
    if not image_data:
        return None

    client = init_r2_client()

    # 生成基础文件名
    base_filename = f"{uuid.uuid4()}.webp"
    filename = base_filename

    try:
        # 检查文件是否已存在
        attempt = 1
        while True:
            try:
                # 尝试获取文件信息，如果文件存在会返回数据，不存在会抛出异常
                client.head_object(
                    Bucket=R2_CONFIG['bucket_name'],
                    Key=f"{OSS_CONFIG['prefix'].strip('/')}/{filename}"
                )
                # 如果文件存在，修改文件名
                name_without_ext = base_filename.rsplit('.', 1)[0]
                filename = f"{name_without_ext}_{attempt}.webp"
                attempt += 1
                print(f"文件名已存在，尝试重命名为: {filename}")
            except client.exceptions.ClientError as e:
                # 如果是 404 错误，说明文件不存在，可以使用这个文件名
                if e.response['Error']['Code'] == '404':
                    break
                raise e  # 其他错误则抛出

        # 上传文件
        client.put_object(
            Bucket=R2_CONFIG['bucket_name'],
            Key=f"{OSS_CONFIG['prefix'].strip('/')}/{filename}",
            Body=image_data,
            ContentType='image/webp'
        )
        return filename
    except Exception as e:
        print(f"上传失败: {e}")
        return None

def generate_markdown_link(filename):
    """生成 Markdown 图片链接"""
    if not filename:
        return None

    url = f"https://{OSS_CONFIG['url']}{OSS_CONFIG['prefix']}/{filename}"
    return f"![]({url})"

def type_markdown_link(markdown_link):
    """模拟键盘输入 Markdown 链接"""
    if not markdown_link:
        return

    pyperclip.copy(markdown_link)
    pyautogui.hotkey('ctrl', 'v')

def handle_upload():
    """处理图片上传的主函数"""
    print(f"\n[{time.strftime('%Y-%m-%d %H:%M:%S')}] 收到粘贴请求")

    print("正在检查剪贴板...")
    # 获取剪贴板图片
    image = get_image_from_clipboard()
    if not image:
        print("❌ 剪贴板中没有图片")
        return
    print("✅ 获取到剪贴板图片")

    # 转换为 webp
    print("正在转换为 WebP 格式...")
    image_data = convert_to_webp(image)
    if not image_data:
        print("❌ 图片转换失败")
        return
    print(f"✅ 转换完成，大小: {len(image_data)/1024:.2f}KB")

    # 上传到 R2
    print("正在上传到 R2...")
    filename = upload_to_r2(image_data)
    if not filename:
        print("❌ 上传失败")
        return
    print(f"✅ 上传成功，文件名: {filename}")

    # 生成并输入 Markdown 链接
    markdown_link = generate_markdown_link(filename)
    if markdown_link:
        print(f"生成的 URL: https://{OSS_CONFIG['url']}{OSS_CONFIG['prefix']}/{filename}")
        print(f"模拟键入: {markdown_link}")
        type_markdown_link(markdown_link)
        print("✅ 操作完成")

def main():
    """主函数"""
    print("=" * 50)
    print("R2 图片上传插件已启动")
    print(f"当前配置:")
    print(f"- OSS 域名: {OSS_CONFIG['url']}")
    print(f"- 存储路径: {OSS_CONFIG['prefix']}")
    print(f"- R2 存储桶: {R2_CONFIG['bucket_name']}")
    print("使用 Ctrl+Alt+V 上传剪贴板中的图片")
    print("=" * 50)

    # 注册快捷键
    keyboard.add_hotkey('ctrl+alt+v', handle_upload)

    # 保持程序运行
    keyboard.wait()

if __name__ == "__main__":
    main() 
```