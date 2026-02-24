---
title: "Hugo Blog Setup and Configuration Tuning"
description: "Hugo is a static blog platform built on Go, achieving a 600% increase in build efficiency compared to Hexo. It also supports low-JavaScript features and offers enhanced SEO optimization, making it easier for search engine crawlers to access content."
category: "Tutorial"
draft: false
image: ../../assets/images/3d1b097d-7e31-4312-b3e5-d213e2903f4d.webp
lang: en
published: 2025-03-03
tags:
- Hugo
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Introduction

Here’s the translation:  “I previously wrote an article titled [Fuwari Static Blog Setup Tutorial](/posts/fuwari/).”

The [Fuwari](https://github.com/saicaca/fuwari) rendering utilizes Astro and combines server-client architecture, despite the UI being visually appealing. However, due to my lack of experience with Astro development, maintaining it presents significant challenges in the long term – specifically, manually resolving conflicts when adding comments to the Giscus branch requires manual intervention.

Ultimately, I decided to relinquish my pursuit and recognize that my current skillset is not suitable for building a project using native HTML, JavaScript, and CSS frameworks.

Therefore, I inquired with AI, Claude, to recommend Hugo for me.

I had previously heard of Hugo’s name, but I didn't delve deeply into it. However, Claude informed me that Hugo utilizes Go language for compilation, offering fast performance and requiring only minor modifications to my existing HTML, CSS, and JavaScript knowledge.

Following this process, I dedicated two hours to in-depth research, deployment, and optimization of Hugo. I discovered that Hugo is remarkably powerful: the migration was straightforward, the modifications were simple, and the construction was rapid.

# Formal commencement.

Please operate entirely on Windows.

We must first install Scoop, a package manager for Windows that I find to be exceptionally useful.

Default installations are typically placed in the C drive. If you wish to change the installation location, please modify it as needed.

```powershell
$env:SCOOP='D:\Scoop'
$env:SCOOP_GLOBAL='D:\ScoopApps'
[Environment]::SetEnvironmentVariable('SCOOP', $env:SCOOP, 'User')
[Environment]::SetEnvironmentVariable('SCOOP_GLOBAL', $env:SCOOP_GLOBAL, 'Machine')
```

Installation of Scoop:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

If you encounter installation failures as an administrator, please switch to a standard user account. To install Scoop with administrative privileges, please use…

[github original post](https://github.com/ScoopInstaller/Install#for-admin)

To ensure security, default administrator control panel installation is disabled. If you know what you are doing and wish to install Scoop in a privileged administrative role, please download the installer and manually execute it from the enhanced console using `-RunAsAdmin`. An example is provided below:

```powershell
irm get.scoop.sh -outfile 'install.ps1'
.\install.ps1 -RunAsAdmin [-OtherParameters ...]
# 如果你想要一行解决：
iex "& {$(irm get.scoop.sh)} -RunAsAdmin"
```

Installation of the Hugo framework:

```powershell
scoop install hugo
```

Select a folder for your site and create it within the `myblog` directory.

```shell
hugo new site myblog
cd myblog
```

Install PaperMod Theme

```shell
git clone https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
```

The root directory will contain a `hugo.toml`. I recommend using YAML. Please rename the file to `hugo.yaml` and paste in the following content.

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

We need to configure classification, labels, archiving, and search pages separately.

Create `content\categories\_index.md`.

```markdown
---
title: 分类
layout: categories
---
```

Create a `content\tags\_index.md` file with the following tags:

```markdown
---
title: 标签
layout: tags
---
```

Create an archive file named “archives.md” and populate it with the following content:

```markdown
---
title: 归档
layout: archives
---
```

Create a search index in the `search.md` file.

```markdown
---
title: "搜索"
layout: "search"
---
```

We need to modify the default article creation template.

In `archetypes\default.md`, the following was written:

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

Following this, we can utilize commands to create articles and begin writing. Please note that the final URL for your article will be the name of the document itself – for example, `https://yourwebsite.com/posts/first`.  It’s recommended to keep the article filename concise as it won't affect your article title.

```shell
hugo new posts/first.md
```

When completing an article, you can preview the website using.

```powershell
hugo server
```

When we intend to publish our website to Vercel, Cloudflare Pages, or similar static website hosting platforms, we can utilize our `myblog` as a Git repository and push it to GitHub.

Root directory: `./`

Output directory: `public`

``` Build command: `ugo --gc` ```

Environment variables: Key: `HUGO_VERSION`, Value: `0.145.0`

---

### Object Storage Intermediate Code:

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