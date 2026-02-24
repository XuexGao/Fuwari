---
title: "Fuwari Static Blog Setup Tutorial"
description: "Fuwari is a static blog framework, and Cloudflare Pages is a service for hosting static websites; combining the two yields a fast, secure, host-free, and highly efficient blog."
category: "Tutorial"
draft: false
image: ../../assets/images/f286ef4d-326c-4c7c-8a1e-ed150937a12b.webp
lang: en
published: 2025-09-17
tags:
  - Fuwari
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
To set up Fuwari, you need a capable brain, Git, Node.js, a GitHub account, Cloudflare Pages, and a Markdown editor like Obsidian. The process involves forking the repo, cloning it locally, installing dependencies, customizing config files, and deploying via GitHub + Cloudflare. Once configured, changes are automatically built and published when pushed.
:::

### What you need to prepare

1. A brilliant mind supports parallel processing of at least two or more events simultaneously. When encountering a problem, think first; if you can't figure it out, search for answers; if that fails, go flirt with AI—don’t just ask questions blindly.

2. [Git - Downloads (git-scm.com)](https://git-scm.com/downloads): The most powerful version control system, used here to operate on GitHub. Of course, you can also try using [GitHub Desktop | Simple collaboration from your desktop](https://github.com/apps/desktop) ~~but for me, this thing is harder to use~~. With SSH cloning now being blocked by default, it has become more usable.

3. [Node.js — Run JavaScript Everywhere (nodejs.org)](https://nodejs.org/en): Fuwari is based on Node.js; you need to install this to set up your blog

4. A [Github](https://github.com) account: used to create a repository to store Fuwari files

5. A [Cloudflare](https://cloudflare.com) account: used to create a Pages site and bind a domain to enable access

6.  [Obsidian](/posts/obsidian/): This is a visual Markdown editor. Since every article/page on Fuwari is written in Markdown, a good editor is needed.

7. You need to know how to write articles using Markdown syntax; if you don't know, please refer to: [Markdown  | Markdown](https://markdown.com.cn/basic-syntax/)

### Flowchart

Deploying Fuwari locally, writing the article -> Pushing changes to the remote GitHub repository -> Cloudflare Pages detects the repository update and automatically builds new static website files -> Website successfully updated

### Let’s get started!

#### First, let's deploy Fuwari locally.

1. Fork repository:

[https://github.com/saicaca/fuwari](https://github.com/saicaca/fuwari)

2. Avoid having small waste that won't fork the repository; here is a picture tutorial.

3. ![](../../assets/images/2024-10-14-12-15-44-image.webp)![](../../assets/images/2024-10-14-12-17-03-image.webp)

4. Then clone the repository locally: `git clone <your repository URL>` (recommended to use SSH, so you don't need magic to push changes)

5. First, globally install pnpm: `npm install -g pnpm` (if npm is slow to pull from domestic sources, try cnpm: [npmmirror mirror site](https://npmmirror.com/))

6. Then install dependencies in the project root directory: `pnpm install` and `pnpm add sharp`

7. By now, you have successfully deployed Fuwari locally.

> [!TIP]
> 
> You can also create a new empty repository and manually upload files, and you can set the repository's visibility to: Private

#### Rewrite the basic information of Fuwari and clean up unnecessary files

> The newly created Fuwari may come with sample blogger names, icons, URLs, introductions, and sample articles to let users know this is your blog; we need to revise each of these one by one.

1. In the `src` folder at the root directory, you can find `config.ts`; let's start rewriting it.

- title: Your blog's main title

- subtitle: Your blog's subtitle. Optional; on the homepage, it will display as "Main Title - Subtitle"

- lang: Blog display language. Comments have listed some common values, such as: en, zh_CN, zh_TW, ja, ko

   - themeColor：hue值则是你的博客主题色，可以在你的博客右上角的画板图标确定喜欢的颜色再填写![](../../assets/images/2024-10-15-09-16-30-image.webp)

- banner: src: the banner image, supports HTTP/HTTPS URLs

- favicon: src: the website icon, supports http/https URLs

- links: These are friendship links, displayed in the navigation bar.

- avatar: That is your profile picture.

- name: That is your name

- bio: This is your personal signature, which will appear below your avatar and name.

   - `NavBarConfig` 为导航栏设置的超链接。`ProfileConfig` 为你的用户的超链接，分别如图![](../../assets/images/2024-10-15-17-49-30-image.webp)

- icon: You need to go to [icones.js](https://icones.js.org/) to search for the icon you want, such as QQ, then fill in `fa6-brands:qq`, as shown in the figure. Fuwari defaults to supporting these types: `fa6-brands`, `fa6-regular`, `fa6-solid`, `material-symbols`. You can search for keywords in `astro.config.mjs` to configure it.

   - ![](../../assets/images/1ef05530-10fd-4301-af4e-21ddadf18605.webp)

   - ![](../../assets/images/da94494b-cc4b-4f07-ae95-8bf3b2f95d3c.webp)

- Here, I attach my `config.ts`

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

2. Clean up unnecessary files. In the `src/content/posts` folder at the root directory, there are some sample articles that introduce some Markdown syntax and tips to help you get started faster with Fuwari and fuwari. We can move them elsewhere.

3. By now, you are ready to begin writing your article.

#### Let’s start writing!
>It is recommended to use [Obsidian](/posts/obsidian/)

1. First, execute the following in the project root directory: `pnpm new-post <fill in your article title here>`

2. Then, an additional `xxx.md` file will appear in the `src/content/posts` folder under the root directory.

3. We open this file with MarkText, and you can see some basic information. We only need to focus on a few key pieces of information.

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

- title: Article Title

- published: article creation time

- description: Article description, normally displayed below the article title

- image: Article cover image (if in the same directory, write `./` as in: `./https://eo-r2.2x.nz/myblog/img/2024-10-14-11-33-28-image.webp`)

- tag: article tags

- categories: article classification

5. We also need to modify the `astro.config.mjs` file in the root directory. On line 34, change `stie:` to your site's URL, for example: `site: "https://onani.cn",`

6. Hey? Some people might ask, Markdown is great, but how do I insert images?

7. This is also very simple, thanks to the MarkText software, we can also paste images directly into Markdown syntax using Ctrl+V, just like editing in Typecho. However, we need a few small settings:

- Click sequentially: the three horizontal lines in the top-left corner of MarkText -> File -> Preferences -> Image classification on the left side -> set as shown in the figure -> Note: change the first option to the one starting with "Copy", enable the "Perfer" switch, and fill one text box with an absolute path and the other with a relative path.

   - ![](../../assets/images/2024-10-14-12-54-21-image.webp)

   - 这样，当置入图片时，会往 `https://eo-r2.2x.nz/myblog/img` 文件夹复制一份，然后通过`![1](https://eo-r2.2x.nz/myblog/img/1.webp)`写入MarkDown文件。这样网站就能成功读取到图片啦。而你只需要Ctrl+CV，其他操作MarkText都会自动处理

8. By now, you have learned how to write blog posts using Markdown syntax in MarkText.

#### Local preview, then publish to GitHub

1. 当你认为你的文章已经写得差不多时，想要看看效果？请到项目根目录执行：`pnpm dev`，稍等片刻，你就可以本地预览你的博客啦![](../../assets/images/2024-10-14-13-03-44-image.webp)

2. Great! Next, we need to use Git to publish our changes to GitHub.

- First, you need to let Git know who you are: `git config --global user.name "your GitHub username"` and `git config --global user.email "your GitHub email@example.com"`

- Then, change the remote repository to SSH* (no need to change if cloned via SSH): `git remote set-url origin git@github.com:xxx/xxx`

- Then, let's commit all the files: `git add .`

Then, let's make a local commit: `git commit -m "project initialized"`

- Finally, let's push our local changes to the remote repository: `git push`

3. 此时，你的Github仓库应该已经有了新的提交![](../../assets/images/2024-10-14-13-10-12-image.webp)

#### Connect Cloudflare to GitHub and use the Pages service to showcase your blog (FREE!)

1. 前往Cloudflare的 Workers 和 Pages 页面，创建一个新Pages![](../../assets/images/2024-10-14-13-14-28-image.webp)

2. 然后选择连接Git存储库，连接你的Github，随后设置构建命令：`pnpm build`  ，然后设置构建输出目录：`dist` ，如图![](../../assets/images/2024-10-14-13-16-15-image.webp)

3. 绑定自定义域，访问自定义域即可访问你的博客！![](../../assets/images/2024-10-14-13-17-00-image.webp)

4. Then, you just need to write your article locally and [use Git to push changes to the remote repository](#本地预览然后发布到github), and Cloudflare will automatically deploy and update your blog!