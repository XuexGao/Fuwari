---
title: "Cloudflare R2+Workers! Build your own cloud-based dashboard now!"
description: "Here’s a professional translation of the text:  “Utilizing R2 storage for images, leveraging Workers to facilitate retrieval and display, and embedding these assets via either an `<a>` or `<img>` tag on the web platform across the entire organization.”"
category: "Tutorial"
draft: false
image: ../../assets/images/QmVgqgoC7G8NLS21WvR8j9gf5amu33XvuV68ZrgM5B9iFf.webp
lang: en
published: 2025-03-05
tags:
- Cloudflare R2
- Cloudflare Workers
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

### Okay, here's the translation of the provided text:  **结果图**  The results shown are a visual representation of the performance metrics and trends during the period under review.  These figures illustrate key areas of success and potential areas for improvement.  Detailed analysis is available in the accompanying report.

![QmVgqgoC7G8NLS21WvR8j9gf5amu33XvuV68ZrgM5B9iFf.webp](../../assets/images/408795f3ec1a5a9baf91b6cd7564d6f1d7dbc5bd.webp)

### Here’s the translation:  The principle behind this technology is based on `neural networks`. It leverages deep learning techniques to learn complex patterns and relationships from data, enabling it to perform tasks such as **image recognition** and **natural language processing**.  *This approach allows for increased accuracy and efficiency compared to traditional methods.*

The source image is hosted by Cloudflare R2, connected to R2 through two workers to showcase random horizontal and vertical images. Static pages reference the workers' URLs to achieve this interface.

### Create a Cloudflare R2 Storage Bucket

R2 is a cloud storage service. Cloudflare offers 10GB of free storage and 10 million free access monthly.

1. 进入[Cloudflare 仪表盘](https://dash.cloudflare.com/)，进入 R2 页面，如图
   
   ![QmU7u2JHUcevyHnwsCdAZfs7X7Fcdh3KJhn6eoy24Q5dGC.webp](../../assets/images/0ffb86d36ab0f3fcc24ef7b3d64c4bc72b6b53e7.webp)

2. 选择创建存储桶![QmX3eCaCVEgE8AN29D9t2VpQ5t5SrZGKb8EcZv9oKpCqf2.webp](../../assets/images/26d3b3e26b9e2f641a2eea98c2ddb8891a0b7f6a.webp)

3. 为你的存储桶起一个名字，然后单击创建![QmVad5eoJCLpSNZ4HCvTPJfD8rpg4aePMzZ7j2DZATn1XD.webp](../../assets/images/7fa96a023d7969ab168d467ab6d05646e5241884.webp)

4. 进入如下页面就已经创建完毕了![QmSdzwBJpw2L4a8LJ3eM3VMJs3d5oV5iFCxCMtv69VZmYH.webp](../../assets/images/719f2dfe59c73fa820ffc6cc2d9749ca14b9bece.webp)

5. 返回 R2 首页。因为在下文我们需要使用 API 来进行文件传输，所以需要创建你的 R2 API 令牌，单击管理 R2 API 令牌![QmbS8zjJTESwsmycKBSC9kmabAA9dtSCUX8nbUDWg4BWRX.webp](../../assets/images/9b1a338acae642ce7ce71dd41454903b1cfeafd0.webp)

6. 单击创建 API 令牌，如图![QmPzJEHVAm4z3S1SHY4k99TugrPyTB9DXpyRR8Loj22bz3.webp](../../assets/images/9512f23e08a60948e721848118f5eb096449909b.webp)

7. 因为我们需要该 API 来管理单个 R2 存储桶，所以选择**对象读和写**，详细配置如图![QmNY9p8hksi18B9R8TVfdGgu336oQ3cPmghyfYXE9CDGD4.webp](../../assets/images/0361e2b00351559eaebb18f3e6bb15a94b8578e9.webp)

8. 创建 API 令牌后，新页面会展示令牌的详细信息，**仅会展示一次！！！** 保持这个页面，直到你将该页面的所有信息都已经妥善保存，不要关闭界面，否则，你需要轮转 API 令牌以禁用之前的旧密钥，如图![QmZTUwbycqbJhVP6PatD3psYy7ej9PDDoiXbmDWoakPhwx.webp](../../assets/images/f4214f6fdf67fa7bf694d0a1501ecc21aef45a90.webp)

9. Ensure you have properly saved your R2 API token and proceed accordingly.

### Add files to your storage bucket.

Due to slow web interfaces and limitations on file transfer sizes exceeding 300 MB, local deployment of AList is used for fast uploads to your R2 storage bucket.

1. 笔者使用 Windows。前往[AList - Github Release](https://github.com/alist-org/alist/releases)下载适用于 Windows 的最新可执行文件，如图![QmPDRDJGeGStreyZMXVYofbE9FCs1T1MyDek3KUbB3Kk5b.webp](../../assets/images/a2d1f289e464a9fb6367e2b7ff0b695916742698.webp)

2. Unpack the compressed archive and place the `alist.exe` file into an empty folder.

3. Click the search bar, type `cmd` and press Enter.

4. ![QmSt8aFtaeEprJHASEiNPB67UHcHoSxsbhhHUPxW6QkWSo.webp](../../assets/images/3abdda195c58812866d49879c683a044e8acf7f8.webp)
   
   ![QmNkMhDhpPLkYCpVhE1ov7Q6A34uWDvraCqNvuTqaCkujT.webp](../../assets/images/f90fccfe1db62aff7a0a722cd3c5c319da563ae2.webp)
   
   在 cmd 中输入`alist.exe server`并且不要关闭窗口，运行成功后如图![QmdzyY8xbic8jdnZEXegefoZPeizqHa4ZkdMnRKoguBMkf.webp](../../assets/images/2c0ec8fb4de7f2a9a1b8107e3506cb5a8d7d7eff.webp)

5. 打开浏览器，输入`localhost:5244`即可进入 AList 控制台，如图![QmUBFKu7mCiRneCrsTNPxTH6S4gxwtXf9cwLzf4dKW9LLR.webp](../../assets/images/867fe02a124c886777d4ba64f6d1e4498c686709.webp)

6. 用户名：`admin`密码：`在cmd窗口中，如图`。你可以使用鼠标左键在终端中框选内容然后单击鼠标右键进行复制操作![QmVH3qZYo3QE6anNHymwkikq5MSeJphrZNR7RCH5jpP3wn.webp](../../assets/images/8cedc3475cd8358507587de8a6b2a91980fe9af4.webp)

7. 注意，在 cmd 中，鼠标左键点击或拖动 cmd 的终端界面会导致进入选择状态，程序将会被系统阻塞，**需要在终端界面点按鼠标右键解除**。若进程被阻塞，cmd 的进程名会多一个**选择**，请注意。如图是程序被阻塞的例子，**在终端界面点按鼠标右键即可解除**
   ![QmapESiqSEvbYq3AJs15yYvhemRxSHrJaccjTFr99muX6Z.webp](../../assets/images/afb945ff610c0463ee0db97f52bc42a865b00603.webp)

8. 现在，你已经成功以管理员身份登入了 AList单击最下面的**管理**![QmfNE53GThdjVrh4q64MJcZqwcGPD7UtcYTNw9bVBaSEaF.webp](../../assets/images/eb0c3753205f42133445dfcee5f1291debd6c649.webp)

9. 你会进入到如图界面。尽管 AList 运行在本地，也建议更改你的用户名和密码![QmNdD8UU8fkVDBz5dXdJhCF2fZg8P1FwrcMaaTsG6a7ENy.webp](../../assets/images/3bde577194580e4d17aa457231360733175e2b0d.webp)

10. 更改账密，重新以新账密登录![Qmas7pMiPR2FNTXheBT1xGNUpzDiSzv7J7yd6oCuT17yad.webp](../../assets/images/a5ba3b6cc73002f3e96b6aab8c4e252f697802da.webp)

11. 进入控制台，然后单击存储，如图![QmS4gGyCM1j3RXgHEPuZ1zTbLAvGtVBEiPXJe9QMF3dD2D.webp](../../assets/images/bb8fc961e43dffa99994c0d0e703ba98fc01b85a.webp)

12. 选择添加，如图![QmRDVxt8WbrVkHavgFNXj3qC86ysw6sSZhPy3Uf2ixKp2E.webp](../../assets/images/2807d1dbc07fed008c8177cd3b2b89bfd03cc8be.webp)

13. 详细配置如图。挂载路径即 AList 展示路径，推荐使用`/R2/你的存储桶名字`，地区为`auto`![](../../assets/images/2024-10-16-11-37-53-image.webp)回到主页，如图![QmSnR9Ptrssx4nqk9qCvhFUNKQyQqJiN7GRscwoj4Dczgj.webp](../../assets/images/65265d29e91f146ecbe3d92218eb9af49eac1c8b.webp)

14. 尝试上传文件，如图![QmPqFsmZNNnh4jNyLS7X3h8Zr6ZCVqTqGVwTxmPDdbmrGW.webp](../../assets/images/061c995a66c34ebc341f692d4eb82d5657d791d6.webp)

15. 可以看到，速度非常快![QmXfGK6aZjz741GrY8RfFfKMkUzDMB3xhx93PGZ9S1QycT.webp](../../assets/images/51d0a617cbda108ce6c12fb25f71fb5223a0cddb.webp)

16. Create a directory structure to categorize horizontal and vertical images, so that Workers can be used to call them later. After this, I will use the R2 path `/ri/h` for the random horizontal image directory, and `/ri/v` for the random vertical image directory.

![QmNdD8UU8fkVDBz5dXdJhCF2fZg8P1FwrcMaaTsG6a7ENy.webp](../../assets/images/3bde577194580e4d17aa457231360733175e2b0d.webp)

### Create workers, connect to R2.

1. 进入[Cloudflare 仪表盘](https://dash.cloudflare.com/)，进入 Workers 和 Pages 页面，如图![QmW5UaUap8T2R37u5dzmKGLmUgk4qKnSMFwHBVHqvVbkVA.webp](../../assets/images/49ccd51771082fdc94eecb270caf987d257cd987.webp)

2. 单击创建，选择创建 Workers，名称自取，单击部署![QmVvLv5n41QQfDfYiVWYRpsfw7TVNGy1BYuv5e8vBRhKLA.webp](../../assets/images/95102dd09752a103d8022b1f281538e729b7a448.webp)

3. 选择编辑代码![QmTbRifzXQ593DGyjFQMbA9exyNp2iAeAg4zbVrfFimQc4.webp](../../assets/images/fa78af856b3ff3798c77a55be15b2644dec944c1.webp)

4. Paste code (create a random horizontal chart): ``` [X:  A dynamic, interactive dashboard visualizing key performance indicators (KPIs) across various business units. The charts are color-coded to highlight trends and areas of concern, enabling real-time monitoring and data-driven decision making.  The user interface is intuitive and responsive, allowing for easy navigation and exploration of the data.  Features include drill-down capabilities, custom report generation, and automated alerts based on predefined thresholds.] ```

Please provide the code you would like me to translate! I need the code to perform the translation.

```
export default {
  async fetch(request, env, ctx) {
    const bucket = env.MY_BUCKET;
    const url = new URL(request.url);
    const hostname = url.hostname;

    // 初始化prefix
    let prefix = '';
    
    // 根据域名判断prefix
    if (hostname === 'hpic.072103.xyz' || hostname === 'api-hpic.072103.xyz') {
      prefix = 'ri/h/';
    } else if (hostname === 'vpic.072103.xyz' || hostname === 'api-vpic.072103.xyz') {
      prefix = 'ri/v/';
    } else {
      return new Response('Invalid domain', { status: 400 });
    }

    try {
      // 如果是API域名，只返回数量
      if (hostname.startsWith('api-')) {
        const objects = await bucket.list({ prefix: prefix });
        const count = objects.objects.length;
        const headers = new Headers({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/plain'
        });
        return new Response(count.toString(), { headers });
      }

      // 原有的随机图片逻辑
      const objects = await bucket.list({ prefix: prefix });
      const items = objects.objects;
      
      if (items.length === 0) {
        return new Response('No images found', { status: 404 });
      }
      
      const randomItem = items[Math.floor(Math.random() * items.length)];
      const object = await bucket.get(randomItem.key);

      if (!object) {
        return new Response('Image not found', { status: 404 });
      }

      const headers = new Headers();
      headers.set('Content-Type', object.httpMetadata.contentType || 'image/jpeg');

      return new Response(object.body, { headers });
    } catch (error) {
      console.error('Error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};
```

Please provide the code you would like me to translate. I need the code to perform the translation.

```
export default {
  async fetch(request, env, ctx) {
    // R2 bucket 配置
    const bucket = env.MY_BUCKET;

    try {
      // 列出 /ri/h 目录下的所有对象
      const objects = await bucket.list({ prefix: 'ri/h/' });

      // 从列表中随机选择一个对象
      const items = objects.objects;
      if (items.length === 0) {
        return new Response('No images found', { status: 404 });
      }
      const randomItem = items[Math.floor(Math.random() * items.length)];

      // 获取选中对象
      const object = await bucket.get(randomItem.key);

      if (!object) {
        return new Response('Image not found', { status: 404 });
      }

      // 设置适当的 Content-Type
      const headers = new Headers();
      headers.set('Content-Type', object.httpMetadata.contentType || 'image/jpeg');

      // 返回图片内容
      return new Response(object.body, { headers });
    } catch (error) {
      console.error('Error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};
```

5. 点击左侧的文件图标![QmQGQTiTXSESU2TSJ6tc3KrzWU4KABKqn6QZ1GdWqKnWmc.webp](../../assets/images/b02f29fbafb44ad36a0fa770d013069a374394a8.webp)

6. Please provide the text you want me to translate.

```
[[r2_buckets]]
binding = "MY_BUCKET"
bucket_name = "114514"
```

7. 保存修改，点击右上角的部署![QmP7hXdtenrJrzJRRePHQATGtyAsZEr5MkMsboXvmNUxTx.webp](../../assets/images/6751c7b5122b938e01087d1bed629fcad1182a10.webp)

8. 在设置 - 变量找到 R2 存储桶绑定，添加你的存储桶，变量名即上文的`MY_BUCKET`![QmStitSyATnA8sY9tTgZaXXqmqkGPUtZmMxn9KjbFQzgTc.webp](../../assets/images/572f1c9946b5b6de5350c708e579d9887949b6e9.webp)

9. 在设置 - 触发器添加你的自定义域名以便访问![QmUMxtkCiKsgFw8afRUGREFztXE9D5W6FmCbAUB7DaVH5o.webp](../../assets/images/706b3acbb372307713e38c96fc867f4e96234fd7.webp)
   
   ![QmPF9iCoq6n8Jj2Z6kPkdJSCm45VJystZoYcir55yceCQo.webp](../../assets/images/1a6fa505881591a294f0b4ef4a1940e40fe57ab9.webp)

10. 访问效果，每次刷新都不一样![QmQgEdjXxF9oph2jYKzFMJToX9WfG11jUmPiNJnjhYVN4N.webp](../../assets/images/0ba1efee8174e0d3db761bbd613a7b94b9738cee.webp)

### Using HTML’s `<img>` tags to reference can achieve the beginning of the content.

Please provide the text you would like me to translate.
loading-ag-4760