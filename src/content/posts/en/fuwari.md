---
title: "Fuwari Static Blog Setup Tutorial"
description: "Here’s a professional English translation of the text:  “Fuwari is a static blog framework, and Cloudflare Pages provides a managed hosting service that enables the rapid creation of secure, high-performance blogs without requiring dedicated infrastructure.”"
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

### Okay, I understand. Please provide the text.

1. A brilliant mind, supporting parallel processing at least two units of events. When encountering problems, first think about them, try to solve them, and if you can’t find a solution, try asking AI to flirt with it. Don't start by asking questions.

2. Git - Downloads (git-scm.com) is the most powerful version controller, used for managing GitHub operations, of course, you can also try using [[GitHub Desktop | Simple collaboration from your desktop]] ~~but it’s much harder to use~~ In the current SSH cloning default, it becomes useful when SSH cloning is blocked, making it easier to use.

3. Node.js — Run JavaScript Everywhere (nodejs.org) is a tool that allows you to run JavaScript code on any machine.

4. A GitHub account for creating a code repository inventory file.

5. A Cloudflare account is used to create Pages and bind domains for access.

6.  Black Obsidian is a visual Markdown editor because every article/page in Fuwari uses Markdown, so a good one is needed.

7. Okay, please provide the text you would like me to translate. I will adhere strictly to your instructions and output only the translated text, preserving all tags as they are.

### Please provide the text! I need the text to be translated.

Local deployment of Fuwari, publish changes to a remote GitHub repository, Cloudflare Pages detects website updates and automatically builds new static files, and the website is successfully changed.

### Let’s go!

#### First, we will deploy Fuwari locally.

1. Fork Warehouse:

https://github.com/saicaca/fuwari

2. Avoid letting small waste fall into the warehouse; here’s a picture tutorial.

3. ![](../../assets/images/2024-10-14-12-15-44-image.webp)![](../../assets/images/2024-10-14-12-17-03-image.webp)

4. ``` `git clone https://github.com/your-username/your-repository.git` ```

5. First, install pnpm globally: `npm install -g pnpm` (if npm is slow to pull locally, try cnpm: [npmmirror](https://npmmirror.com/).)

6. Install dependencies using: `pnpm install` and `pnpm add sharp`

7. This system is now deployed locally.

!TIP
Please provide the text you would like me to translate.
You can create a new empty warehouse and manually upload files, and set its visibility to Private.

#### Basic information about the Fuwari system has been revised and redundant files have been removed.

Newly created Fuwari may include example usernames, ICONs, URLs, introductions, and sample articles to inform users that this is your blog.

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

2. Clean up the leftover files in the root directory’s `src/content/posts` ] folder. This folder contains example articles that introduce MarkDown syntax and techniques, which can help you quickly get started with Fuwari and fuwari, and we can save them elsewhere.

3. Please provide the text you would like me to translate.

#### Let’s begin writing!
Recommend using Obsidian.

1. First, execute in the project root directory: `pnpm new-post <your article title>`

2. The content is located in the src/content/posts folder.

3. We use MarkText to open this file, and you can see some basic information. We only need to focus on a few important things.

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

5. We need to change the root directory’s `astro.config.mjs` directory. In line 34, change `stie:` to your site URL, such as `site: "https://onani.cn",`.

6. “Is there anyone asking about how to handle inserting images into Markdown?”

7. 这也很简单，多亏了MarkText这款软件，我们也可以像编辑Typecho一样直接使用Ctrl+CV来在MarkDown语法中置入图片，但是我们需要一些小设置：
   
   - 依次点击：MarkText软件的左上角的三条杠 -> File -> Perferences -> 左侧的Image分类 -> 如图设置 -> 注意更改第一个选项为Copy开头的选项，将Perfer开关打开，然后上下两个文本框一个填写绝对路径一个填写相对路径
   
   - ![](../../assets/images/2024-10-14-12-54-21-image.webp)
   
   - 这样，当置入图片时，会往 `https://eo-r2.2x.nz/myblog/img` 文件夹复制一份，然后通过`![1](https://eo-r2.2x.nz/myblog/img/1.webp)`写入MarkDown文件。这样网站就能成功读取到图片啦。而你只需要Ctrl+CV，其他操作MarkText都会自动处理

8. Okay, I understand. Please provide the text.

#### Previewing locally and then publishing to GitHub.

1. 当你认为你的文章已经写得差不多时，想要看看效果？请到项目根目录执行：`pnpm dev`，稍等片刻，你就可以本地预览你的博客啦![](../../assets/images/2024-10-14-13-03-44-image.webp)

2. Okay, here’s the translation:  “We are using Git to publish our changes to GitHub.”

```text Please configure your Git username and email address as follows:  `git config --global user.name "Your GitHub Username"` `git config --global user.email "your_github_email@example.com"` ```

Then, change the remote repository to ssh\* (if cloned via SSH, do not modify). `git remote set-url origin git@github.com:xxx/xxx`

Please submit all files: `git add .`

``` commit -m "Project initialization" ```

- 最后，让我们将本地更改提交到远程仓库：`git push`

3. 此时，你的Github仓库应该已经有了新的提交![](../../assets/images/2024-10-14-13-10-12-image.webp)

#### Connect to Cloudflare using Pages and showcase your blog (FREE!)

1. 前往Cloudflare的 Workers 和 Pages 页面，创建一个新Pages![](../../assets/images/2024-10-14-13-14-28-image.webp)

2. 然后选择连接Git存储库，连接你的Github，随后设置构建命令：`pnpm build`  ，然后设置构建输出目录：`dist` ，如图![](../../assets/images/2024-10-14-13-16-15-image.webp)

3. 绑定自定义域，访问自定义域即可访问你的博客！![](../../assets/images/2024-10-14-13-17-00-image.webp)

4. The content is:  “Subsequently, we will utilize Git to synchronize changes and deploy your blog.”