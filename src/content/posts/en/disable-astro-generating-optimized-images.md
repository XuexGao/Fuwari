---
title: "Disable Astro and optimize weak-vision static image builds"
description: "After a considerable period of effort, the issue has been resolved. The Astro system’s insistence on self-optimizing static image creation has been addressed, significantly accelerating build times while simultaneously reducing unnecessary CPU resource consumption and promoting environmental sustainability."
published: 2025-09-10
image: '../../assets/images/2025-09-10-06-19-15-image.webp'
tags: [Astro]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

Video: [Restriction on disabling Astro's static image optimization for weak intelligence](https://www.bilibili.com/video/BV12VH2z1EDb)

# Why is image optimization being disabled?

The image presents a default Astro static build, representing the output of Astro’s optimization process. It is evident that the issue lies in…

The compression quality is extremely low, with significant reverse compression. Most images are compressed only to a few kilobytes, but this requires approximately **100-1000ms** processing time, and the first twelve lines show a compression rate of `before: 26kb, after: 28kb`.

Why is it necessary to spend so much time compressing images to a maximum of ±10KB?

![](../../assets/images/2025-09-10-06-21-20-26ca667ff5c7024c12d7a8254f483b27.webp)

# How can we ensure Astro doesn’t “optimize” images?

*mage | Documents*

Consulting the Astro documentation reveals…

Potential optimizations will be considered.

- The image is located in the C:/public/directory.

- Here’s a professional translation of the text:  “Using `Image`(image) Astro component sets.”

- Any Markdown-embedded images must be converted to HTML before they can be accessed within the Astro environment.

It appears we have identified a compromise solution: **Place images in the /public directory**.

# Please upload images to the /public directory (not perfect).

This is a classic question, as I’ve asked OpenAI ChatGPT directly.

Here’s a professional translation of the text:  “I encountered a dilemma where I was using Astro and my article resided in `/src/content/posts/xxx.md`. My images were initially optimized within the Astro system, but the process of building the article was proving to be too slow. Consequently, I moved the images to `/public/assets/images/xxx.webp`. However, a new issue has arisen – when I attempt to access the images within the MarkDown editor, `./src/content/posts/public/assets/images/xxx.webp` is not found. Are there any viable solutions to this?”

If you take the opposite approach, utilizing similar techniques can lead to components failing to retrieve genuine images, resulting in an immediate error within `astro build`, such as a direct exit with an error message related to the `image` field in the YAML metadata of each article.

Here’s the translation:  “This approach is not perfect. It would be more effective to proceed with a rapid-fire, immediate assessment rather than a protracted, detailed analysis. Furthermore, the project's success hinges on a robust and demonstrable outcome.”

# The Astro official configuration for image optimization failed.

Upon encountering issues on Astro, the initial step should be to consult official documentation for existing solutions. By reviewing the documentation, I discovered [Image | Docs](https://docs.astro.build/zh-cn/guides/images/#%E9%85%8D%E7%BD%AE-no-op-%E9%80%8F%E4%BC%A0%E6%9C%8D%E5%8A%A1) containing **No-op Transmission Service**. I attempted to configure this service, but it proved ineffective, regardless of whether local build or Cloudflare Worker cloud-based build is executed.

Here’s the translation:  “Please contact me if you would like to learn how to directly disable image optimization settings on Astro.”

![](../../assets/images/2025-09-10-06-27-46-image.webp)

# Successfully disabled image optimization in the Astro codebase.

After this research, it has been nearly a full day. I’ve ceased attempting to find ways to optimize Astro’s images; instead, I’ve opted for a direct approach – modifying the source code and utilizing **illegal operation** to achieve this.

Here’s the translation:  The process involves directly modifying the source code of Astro packages, followed by patching it with `pnpm patch`. A complete and usable patch is provided in `astro.patch`.  Global image optimization disabling is also included.

```diff
diff --git a/dist/assets/utils/transformToPath.js b/dist/assets/utils/transformToPath.js
index cca8548dec42090b0621d1f21c86f503d5bba1be..8b0a3cfcea73abc4d63592709bb9ba2b2f83989a 100644
--- a/dist/assets/utils/transformToPath.js
+++ b/dist/assets/utils/transformToPath.js
@@ -13,7 +13,9 @@ function propsToFilename(filePath, transform, hash) {
   }
   const prefixDirname = isESMImportedImage(transform.src) ? dirname(filePath) : "";
   let outputExt = transform.format ? `.${transform.format}` : ext;
-  return decodeURIComponent(`${prefixDirname}/${filename}_${hash}${outputExt}`);
+  
+  // Force disable image optimization - return original path without hash and format conversion
+  return decodeURIComponent(`${prefixDirname}/${filename}${ext}`);
 }
 function hashTransform(transform, imageService, propertiesToHash) {
   const hashFields = propertiesToHash.reduce(
diff --git a/dist/core/build/generate.js b/dist/core/build/generate.js
index 3144f4c058b161b9e6eb3c8d891b743b34783653..0ba275b320204e154307c6aff75452e9dcb2300d 100644
--- a/dist/core/build/generate.js
+++ b/dist/core/build/generate.js
@@ -91,7 +91,8 @@ ${bgGreen(black(` ${verb} static routes `))}`);
 `)
   );
   const staticImageList = getStaticImageList();
-  if (staticImageList.size) {
+  // Force disable image optimization - hardcoded
+  if (false) {
     logger.info("SKIP_FORMAT", `${bgGreen(black(` generating optimized images `))}`);
     const totalCount = Array.from(staticImageList.values()).map((x) => x.transforms.size).reduce((a, b) => a + b, 0);
     const cpuCount = os.cpus().length;
```

Here’s the translation of the text:  “The recent disabling of image optimization patches, specifically the `astro.patch` fix, addressed a critical issue related to image quality and rendering performance in OpenAI’s ChatGPT models. The patch implemented several key changes aimed at improving visual fidelity and reducing artifacts when processing images.”

### `dist/assets/utils/transformToPath.js`

```diff
-  return decodeURIComponent(`${prefixDirname}/${filename}_${hash}${outputExt}`);
+  
+  // Force disable image optimization - return original path without hash and format conversion
+  return decodeURIComponent(`${prefixDirname}/${filename}${ext}`);
```

#### 原逻辑

- 原本的返回路径是：
  
  ```bash
  {prefixDirname}/{filename}_{hash}.{format or ext}
  ```
  
  - `prefixDirname`：如果图片是通过 ESM import 进来的，会带上所在目录，否则为空。
  
  - `filename`：文件名。
  
  - `hash`：基于图片参数生成的 hash，用于区分不同尺寸/格式。
  
  - `outputExt`：可能是 `webp`、`avif` 等格式。

Here’s the translation:  Astro will generate image files with hash-based paths, potentially modifying file formats.

#### 修改后逻辑

- The return path has been modified to:

```bash
{prefixDirname}/{filename}{ext}
```

- Please provide the original text you would like me to translate. I need the text to perform the translation.

Here’s the translation:  “This feature completely disables image optimization filename rules, preserving the original file paths.”

---

### `dist/core/build/generate.js`

```diff
-  if (staticImageList.size) {
+  // Force disable image optimization - hardcoded
+  if (false) {
```

#### 原逻辑

- Here’s the translation:  “The Astro build repository stores all optimized static images required for refinement.”

- If images are available, Astro will initiate optimization logic.

Print log: generating optimized images

Iterate through the `staticImageList` list, and invoke the image service to generate images of varying sizes and formats.

#### 修改后逻辑

- The condition `if (staticImageList.size)` has been changed to `if (false)`.]

- The Astro project will not undergo optimization processes.

Here’s a professional translation of the text:  “This feature forces the bypass of all image optimization steps.”

---

### Summarize.

Your patch implemented two key changes.

1. **Bypass filename hashes and format conversions** → Ensure that the generated image path is identical to the original file path.

2. Astro builds will no longer generate derivative image formats or multi-size images during the build process.

Equivalent to **Completely disabling Astro's image optimization features**, resulting in the original image.

# Ultimately, the result is… [End of sentence]

Here’s the translation:  “Using `astro build` will bypass image optimization, and Cloudflare Worker build time has decreased from approximately 3 minutes to 2 minutes.”

![](../../assets/images/2025-09-10-06-46-49-image.webp)

![](../../assets/images/2025-09-10-06-47-01-image.webp)

The page now utilizes a local web server, bypassing the global WebP format and preserving the original filename and extension. However, it retains the path `/_astro` and continues to support relative paths for image pasting.

![](../../assets/images/d836b41fd85611972c2086a7064705bdb1b4ff7c.webp)

![](../../assets/images/ff1314b1ab7d60bd9a49d6499db22cde23fb9f60.webp)