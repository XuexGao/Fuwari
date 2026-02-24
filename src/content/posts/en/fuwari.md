---
title: "Fuwari Static Blog Setup Tutorial"
description: "Fuwari is a static blog framework, and Cloudflare Pages provides a managed static website service that can be combined to deliver a rapid, secure, and efficient blogging solution without requiring hosting."
category: "Tutorial"
draft: false
image: ../../assets/images/f286ef4d-326c-4c7c-8a1e-ed150937a12b.webp
lang: en
published: 2025-09-17
tags:
  - Fuwari
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

### You need to prepare…

1. A brilliant mind, supporting parallel processing with at least two units of events. When encountering difficulties, first consider the problem and attempt to solve it; if unsuccessful, engage with AI for assistance; do not immediately ask questions.

2. [Git - Downloads (git-scm.com)](https://git-scm.com/downloads)：The most powerful version controller for GitHub, used for managing repositories and operations. It’s also a great option for using [GitHub Desktop | Simple collaboration from your desktop](https://github.com/apps/desktop) – though it can be more challenging to use when SSH cloning is disabled, it becomes significantly more useful in these situations.

3. [Node.js — Run JavaScript Everywhere (nodejs.org)](https://nodejs.org/en): Fuwari is a Node.js-based solution that allows you to run JavaScript code everywhere. It’s designed to facilitate the creation of blogs and other web applications.

4. Here’s the translation:  “A GitHub account is used to create a code repository inventory file.”

5. Here’s the translation:  “A Cloudflare account is used to create Pages and enable access via domain support.”

6.  [Obsidian](/posts/obsidian/) is a visual Markdown editor designed to efficiently handle the formatting of individual articles and pages within Fuwari. Because each article/page utilizes MarkDown, a robust editor is crucial for its usability.

7. You must use Markdown syntax to format your articles. For more information, refer to [Markdown Basic Syntax | Markdown Official Tutorial](https://markdown.com.cn/basic-syntax/).

### Process flow diagram.

Local deployment of Fuwari, write article -> Send changes to remote GitHub repository -> Cloudflare Pages detects website updates and automatically builds new static files -> Website successfully updated.

### Let’s get started!

#### First, we will deploy Fuwari locally.

1. Warehouse Fork:

[https://github.com/saicaca/fuwari](https://github.com/saicaca/fuwari)

2. Avoid having a “small waste” user disrupt the warehouse, as detailed in this image tutorial.

3. ![](../../assets/images/2024-10-14-12-15-44-image.webp)![](../../assets/images/2024-10-14-12-17-03-image.webp)

4. Here’s the translation:  “Clone the repository to your local machine: `git clone <your repository URL>`. (Using SSH is recommended, and you can avoid using magic to push changes.)”

5. First, globally install pnpm: `npm install -g pnpm`. (If npm is slow to pull locally, try cnpm: [npmmirror](https://npmmirror.com/).)

6. In the project root directory, install dependencies by running `pnpm install` and `pnpm add sharp`.

7. Here’s the translation:  “With this, you have successfully deployed Fuwari locally.”

[!TIP]
> 
You can create a new empty warehouse and manually upload files, and set the warehouse visibility to Private.

#### Revised basic information and cleanup of excess files.

Here’s the translation:  “The initial posts for Fuwari may contain examples of blog authors, ICON, URLs, introductions, and sample articles. To ensure users are aware this is your blog, we need to revise each one individually.”

1. 在根目录下的 `src` 文件夹中，你可以找到 `config.ts` 我们来开始改写
   
   - title：你的博客主标题
   
   - subtitle：你的博客副标题。可选，在首页会显示为“主标题 - 副标题”
   
   - lang：博客显示语言。注释已经列出了一些常用的值，如：en, zh_CN, zh_TW, ja, ko
   
   - themeColor：hue值则是你的博客主题色，可以在你的博客右上角的画板图标确定喜欢的颜色再填写![](../../assets/images/2024-10-15-09-16-30-image.webp)
   
   - banner：src：即banner图片，支持http/https URL
   
   - favicon：src：即网站图标，支持http/https URL
   
   - links：即友情链接，这些链接在导航栏上
   
   - avatar：即你的头像
   
   - name：即你的名字
   
   - bio：即个性签名，会显示在头像和名字下面
   
   - `NavBarConfig` 为导航栏设置的超链接。`ProfileConfig` 为你的用户的超链接，分别如图![](../../assets/images/2024-10-15-17-49-30-image.webp)
   
   - icon：你需要前往[icones.js](https://icones.js.org/)去搜索你想要的图标，比如QQ，则填写 `fa6-brands:qq` ，如图。Fuwari默认支持这几种类型：`fa6-brands`, `fa6-regular`, `fa6-solid`, `material-symbols`。可以在 `astro.config.mjs` 中搜索关键字进行配置
   
   - ![](../../assets/images/1ef05530-10fd-4301-af4e-21ddadf18605.webp)
   
   - ![](../../assets/images/da94494b-cc4b-4f07-ae95-8bf3b2f95d3c.webp)
   
   - 这里我附上我的 `config.ts` 
   
   - ```ts
     import type {
       LicenseConfig,
       NavBarConfig,
       ProfileConfig,
       SiteConfig,
     } from './types/config'
     import { LinkPreset } from './types/config'
     
     export const siteConfig: SiteConfig = {
       title: 'AcoFork Blog',
       subtitle: '爱你所爱！',
       lang: 'zh_CN',         // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko'
       themeColor: {
         hue: 355,         // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
         fixed: false,     // Hide the theme color picker for visitors
       },
       banner: {
         enable: true,
         src: 'https://eo-r2.2x.nz/myblog/img/222.webp',   // Relative to the /src directory. Relative to the /public directory if it starts with '/'
         position: 'center',      // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
         credit: {
           enable: false,         // Display the credit text of the banner image
           text: '',              // Credit text to be displayed
           url: ''                // (Optional) URL link to the original artwork or artist's page
         }
       },
       favicon: [    // Leave this array empty to use the default favicon
          {
            src: 'https://q2.qlogo.cn/headimg_dl?dst_uin=2973517380&spec=5',    // Path of the favicon, relative to the /public directory
            //theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
            sizes: '128x128',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
          }
       ]
     }
     
     export const navBarConfig: NavBarConfig = {
       links: [
         LinkPreset.Home,
         LinkPreset.Archive,
         LinkPreset.About,
         {
           name: '随机图',
           url: 'https://pic.onani.cn',     // Internal links should not include the base path, as it is automatically added
           external: true,                               // Show an external link icon and will open in a new tab
         },
         {
           name: 'GitHub',
           url: 'https://github.com/saicaca/fuwari',     // Internal links should not include the base path, as it is automatically added
           external: true,                               // Show an external link icon and will open in a new tab
         },
       ],
     }
     
     export const profileConfig: ProfileConfig = {
       avatar: 'https://eo-r2.2x.nz/myblog/img/111.webp',  // Relative to the /src directory. Relative to the /public directory if it starts with '/'
       name: '二叉树树',
       bio: 'Protect What You Love./爱你所爱！',
       links: [
         // {
           // name: 'Twitter',
           // icon: 'fa6-brands:twitter',       // Visit https://icones.js.org/ for icon codes
                                             // You will need to install the corresponding icon set if it's not already included
                                             // `pnpm add @iconify-json/<icon-set-name>`
           // url: 'https://twitter.com',
         // },
         // {
           // name: 'Steam',
           // icon: 'fa6-brands:steam',
           // url: 'https://store.steampowered.com',
         // },
         {
           name: 'GitHub',
           icon: 'fa6-brands:github',
           url: 'https://github.com/afoim',
         },
         {
           name: 'QQ',
           icon: 'fa6-brands:qq',
           url: 'https://qm.qq.com/q/Uy9kmDXHYO',
         },
         {
           name: 'Email',
           icon: 'fa6-solid:envelope',
           url: 'mailto:email@example.com',
         },
       ],
     }
     
     export const licenseConfig: LicenseConfig = {
       enable: true,
       name: 'CC BY-NC-SA 4.0',
       url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
     }
     ```

2. Clean up excess files in the root directory, specifically within the `src/content/posts` ] folder. This folder contains example articles introducing MarkDown syntax and techniques, which can accelerate your learning of Fuwari and fuwari, allowing you to save them elsewhere.

3. Here’s the translation:  “Therefore, you are now prepared to begin writing articles.”

#### Let’s begin writing!
Recommended use of [Obsidian](/posts/obsidian/)

1. First, execute the following command in the project root directory: `pnpm new-post <your article title here>`

2. Within the root directory, there will be a file named `src/content/posts`.

3. We utilize MarkText to open this file, allowing you to observe some key details. We will primarily focus on a few critical aspects.

4. ```markdown
   title: xxx
   published: 2024-10-14
   description: ''
   image: ''
   tags: []
   categories: ''
   draft: false 
   lang: ''
   ```
   
   - title：文章标题
   
   - published：文章创建时间
   
   - description：文章描述，正常会显示在文章标题下面
   
   - image：文章封面图（同目录需要写 `./` 如：`./https://eo-r2.2x.nz/myblog/img/2024-10-14-11-33-28-image.webp`）
   
   - tag：文章标签
   
   - categories：文章分类

5. We need to modify the root directory’s `astro.config.mjs` file. Specifically, change the `stie:` section to your site URL, such as `site: "https://onani.cn"`.

6. Hey, I’ve noticed a lot of people asking about image embedding. While Markdown is excellent, I need to figure out the best way to handle these images.

7. 这也很简单，多亏了MarkText这款软件，我们也可以像编辑Typecho一样直接使用Ctrl+CV来在MarkDown语法中置入图片，但是我们需要一些小设置：
   
   - 依次点击：MarkText软件的左上角的三条杠 -> File -> Perferences -> 左侧的Image分类 -> 如图设置 -> 注意更改第一个选项为Copy开头的选项，将Perfer开关打开，然后上下两个文本框一个填写绝对路径一个填写相对路径
   
   - ![](../../assets/images/2024-10-14-12-54-21-image.webp)
   
   - 这样，当置入图片时，会往 `https://eo-r2.2x.nz/myblog/img` 文件夹复制一份，然后通过`![1](https://eo-r2.2x.nz/myblog/img/1.webp)`写入MarkDown文件。这样网站就能成功读取到图片啦。而你只需要Ctrl+CV，其他操作MarkText都会自动处理

8. Here’s the translation:  “As you know, you are proficient in using MarkText’s Markdown syntax.”

#### Local preview, followed by publishing to GitHub.

1. 当你认为你的文章已经写得差不多时，想要看看效果？请到项目根目录执行：`pnpm dev`，稍等片刻，你就可以本地预览你的博客啦![](../../assets/images/2024-10-14-13-03-44-image.webp)

2. Let's proceed to use Git to publish our changes to GitHub.

First, you need to inform Git that you are the author of this repository: `git config --global user.name "Your GitHub Username"`. And `git config --global user.email "Your GitHub Email @example.com"`.

Then, change the remote repository to ssh://[username]@[github.com]:[repository_name]. If cloning via SSH, do not modify this setting.

Subsequently, we will submit all files: `git add .`

Following this, let’s submit a local commit: `git commit -m "Project Initialization"`

Finally, please submit local changes to the remote repository: `git push`.

3. 此时，你的Github仓库应该已经有了新的提交![](../../assets/images/2024-10-14-13-10-12-image.webp)

#### Here’s the translation:  “Connect Cloudflare to GitHub using Pages service to showcase your blog (FREE!)”

1. 前往Cloudflare的 Workers 和 Pages 页面，创建一个新Pages![](../../assets/images/2024-10-14-13-14-28-image.webp)

2. 然后选择连接Git存储库，连接你的Github，随后设置构建命令：`pnpm build`  ，然后设置构建输出目录：`dist` ，如图![](../../assets/images/2024-10-14-13-16-15-image.webp)

3. 绑定自定义域，访问自定义域即可访问你的博客！![](../../assets/images/2024-10-14-13-17-00-image.webp)

4. Following this, you will need to write the content locally and then [use Git to push changes to a remote repository](#本地预览然后发布到github). Cloudflare will automatically deploy your blog.