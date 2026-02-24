---
title: "Disable Astro and the Ridiculous Static Image Optimization"
description: "Aftering all day, finally resolved this dumb Astro's self-important optimization for static builds, which not only improves build speed but also reduces unnecessary CPU resource consumption, making it more environmentally friendly and more aligned with Unix philosophy."
published: 2025-09-10
image: '../../assets/images/2025-09-10-06-19-15-image.webp'
tags: [Astro]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
The article explains why disabling Astro’s image optimization is beneficial—especially due to negligible compression gains and significant build time costs. While official solutions like placing images in `/public` or configuring `no-op` services fail to fully resolve the issue, the author successfully disables optimization by patching Astro’s source code to skip image processing entirely. This workaround, though “illegal,” effectively eliminates the performance penalty.
:::

> Video: [Disable Astro and Static Build Image Optimization That's as Stupid as a Fool - Bilibili](https://www.bilibili.com/video/BV12VH2z1EDb)

# Why disable image optimization?

The image below shows a default Astro static build, i.e., the output of `astro build`, which records how each image was "optimized" by Astro. We can easily identify the issue:

The compression effect is negligible, even resulting in reverse compression. Most images are only compressed by a few KB, but this requires **100-1000ms** varying time, and even on line 12, there is reverse compression such as `before: 26kb, after: 28kb`.

*Why waste so much time compressing images that are only around ±10KB in size?*

![](../../assets/images/2025-09-10-06-21-20-26ca667ff5c7024c12d7a8254f483b27.webp)

# How to prevent Astro from "optimizing" images?

> [Image | Docs](https://docs.astro.build/zh-cn/guides/images/)

Refer to the Astro documentation to know

Scenarios that will be optimized:

- Images not under the `/public` directory

- Use `<Image />` and other Astro image components

- Any images within Markdown, unless you do not go through Astro's internal Markdown -> HTML conversion

It is not difficult to discover that we seem to have found a compromise solution: **Place the image in the /public directory**

# Try placing the image in the /public directory (not perfect)

This will encounter a classic problem, which is exactly what I asked OpenAI's ChatGPT.

*encountered a dilemma. I use Astro, and my articles are located at ./src/content/posts/xxx.md. My images were previously in ./src/content/assets/images/xxx.webp. Since I don't want Astro's default image optimization (because the build is too slow), I moved the images to ./public/assets/images/xxx.webp. Then I changed the Markdown image references from ../../assets/images/xxx.webp to ./public/assets/images/xxx.webp. However, now a new problem has arisen: my MarkText (a Markdown editor) is looking for ./src/content/posts/public/assets/images/xxx.webp, causing me to see no images in the editor. Is there a good solution for this?*

If you go against this approach and use something like `../../../../assets/images/xxx.webp`, it may cause certain components to fail to load the actual image, leading `astro build` to crash and exit directly, for example, the `image` field in the YAML metadata at the beginning of each article

**Conclusion:** The solution is not perfect. Either it cannot be written and read immediately, or the build fails.

# Attempted to disable image optimization using the official Astro configuration (failed)

When encountering issues on Astro, you should first consult the official documentation to see if there is already a solution. Through the documentation, I found [| Docs](https://docs.astro.build/zh-cn/guides/images/#%E9%85%8D%E7%BD%AE-no-op-%E9%80%8F%E4%BC%A0%E6%9C%8D%E5%8A%A1) **no-op ** , tried configuring it, but it was ineffective—whether running locally or building on Cloudflare Worker, the **generating optimized images** step still triggers.

*If you know how to directly disable image optimization at the Astro configuration level, please contact me! I'd be happy to chat with you!*

![](../../assets/images/2025-09-10-06-27-46-image.webp)

# Attempted to directly modify the Astro source code to disable image optimization (successful)

By this point, half a day has already passed, and I no longer have the energy to research how to **legal** disable Astro's image optimization. Instead, let's go straight to the point and directly modify the source code using **illegal operation**.

General steps: directly modify the source code of the Astro package, then apply a patch to it using `pnpm patch`. Below is the complete and functional `astro.patch`. Globally disable image optimization

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

The following is what I asked OpenAI ChatGPT 5 to explain about the patch that disables image optimization (`astro.patch`).

### Change 1: `dist/assets/utils/transformToPath.js`

```diff
-  return decodeURIComponent(`${prefixDirname}/${filename}_${hash}${outputExt}`);
+  
+  // Force disable image optimization - return original path without hash and format conversion
+  return decodeURIComponent(`${prefixDirname}/${filename}${ext}`);
```

#### Original logic

- The original return route was:

  ```bash
  {prefixDirname}/{filename}_{hash}.{format or ext}
  ```

- `prefixDirname`: If the image is imported via ESM, it will include the directory it resides in; otherwise, it will be empty.

- `filename`: Filename.

- `hash`: A hash generated based on image parameters, used to distinguish between different sizes/formats.

- `outputExt`: May be formats such as `webp`, `avif`, etc.

👉 This way, Astro will generate hashed paths for image files and may also modify the format.

#### Modified logical structure

- The return path has been changed to:

```bash
{prefixDirname}/{filename}{ext}
```

- Use the original file extension without hash, and do not perform any format conversion.

✅ Purpose: Completely disable the filename optimization rules for images, preserving the original file path.

---

### Modification Point 2: `dist/core/build/generate.js`

```diff
-  if (staticImageList.size) {
+  // Force disable image optimization - hardcoded
+  if (false) {
```

#### Original logic

- `staticImageList` contains all static images that need to be optimized during the Astro build process.

- If there are images, Astro will trigger the optimization logic:

- Print log `"generating optimized images"`

- Iterate through `staticImageList` and call the image service to generate images in different sizes and formats.

#### Modified logic

- Changed `if (staticImageList.size)` to `if (false)`

- This means **Astro will never enter the optimized image process**.

✅ Purpose: Forcefully skip all image optimization steps.

---

### Summary

Your patch does two things:

1. **Bypass filename hash and format conversion** → Ensure the generated image path remains the original path.

2. **Disable image optimization at build time** → Astro will no longer generate any derivative formats or multiple-sized images during the build.

Equivalent to **Completely disable Astro's image optimization feature**, the built output will be your original image.

# Final effect

Using `astro build` in any case will skip image optimization, reducing the Cloudflare Worker build time from 3 minutes to 2 minutes

![](../../assets/images/2025-09-10-06-46-49-image.webp)

![](../../assets/images/2025-09-10-06-47-01-image.webp)

The built page no longer globally uses webp; it passes through the original filename and extension. However, it still retains the `/_astro` path and continues to support pasting images via relative paths.

![](../../assets/images/d836b41fd85611972c2086a7064705bdb1b4ff7c.webp)

![](../../assets/images/ff1314b1ab7d60bd9a49d6499db22cde23fb9f60.webp)