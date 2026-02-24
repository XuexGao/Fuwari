---
title: "Complete Free! From architecture, development to deployment, a Dragon provides a comprehensive guide on how to do best practices for one-word/random URL creation and more random URLs."
description: "I recently launched a first-of-its-kind random graph website in 2024. In the past few weeks, I’ve deepened my research into similar projects and have identified numerous pitfalls alongside many hidden shortcuts. Certain architectural approaches are also capable of achieving “persistence,” to a significant degree."
published: 2025-12-29
image: ../../assets/images/random-url-gen.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Exploring architecture
We will begin with a simple project.

A random image API that returns different images each time a request is made.

How can I help?

A large number of solutions exist, and the simplest way to describe it is to first create a server, then populate it with images, and finally write a script to create a web server that receives client requests, each request retrieving an image from a library.

Okay, I understand. Please provide the text.

当然可以！这是你的流程图！
![](../../assets/images/random-url-gen-5.webp)
但也会带来一些问题，比如，图片存在本地，给客户端响应图片的时候走的是你机子的流量，那么你就需要一个 **高带宽** 的服务器，这无疑是一个 **高昂** 的成本

那可能你会有新的方案： **前后端分离** （逻辑与资产分离），只将返回这个图片的逻辑存放在服务器上，而图片存到其他地方，如对象存储（Cloudflare R2）、IPFS等等
![](../../assets/images/random-url-gen-6.webp)
那么问题又来了，假如说你的项目太多人用了，那你的服务器性能可能不够，在后期，你仍然需要一个 **高昂** 的 **维护成本**

那么那么那么，现在是 **2025** 年，传统的架构已经无法满足我们了，我们不妨可以试试 **云函数** 
仍然是前后端分离，我们现在将逻辑放到一个函数上面，如Cloudflare Worker、EdgeOne Function、Vercel Function等等
![](../../assets/images/random-url-gen-8.webp)
那么现在是不是无敌了？

Due to the fact that high concurrency is no longer a concern due to the use of **cloud function**, asset management isn’t directly handled within **cloud function**. However, because the assets aren't directly hosted in **cloud function**, **cloud function** still requires creating a long connection from your backend, such as retrieving images from object storage. This can lead to slow service performance if not properly addressed.

Someone said, "Since now I've lost my server, and both the front-end and back-end are in the cloud, why don’t we just store the front-end’s cloud directly behind the back-end’s assets?"

Okay, please provide the text. I’m ready when you are.

Most cloud functions support dynamic scripting, allowing you to provision and manage dynamic resources within their cloud storage, and concurrently store static assets.

So, what’s going on?

![](../../assets/images/random-url-gen-4.webp)
# 探索随机图（随机URL）的本质
我们刚刚只是在抽象的说明某种架构 **好像** 可行，**好像** 又有什么问题，然后又有一种什么新思路 **好像** 可以解决这个问题

The path ahead is just beginning, let’s consider it carefully – random requests, or perhaps random URLs. What did the server send to the client, and what action did the client execute in response to the returned message?

You absolutely know that if you want to return different things to a client for every single request, it’s almost certainly because the server is returning different responses for each request. This could be internal, such as embedding images directly within the response body, or it could be **redirect**.

Directly uploading images is simple on the client-side, but not visible on the server. When a client requests an API, the server directly sends the selected image as the response body, and the client perceives it as requesting a picture, but the request is different each time you refresh.

“Thank you for your inquiry.”

Some people said, why must we **temporary redirection** ?

Because you are likely to return different images each time a client refreshes, and once you’ve used **301**, the client will record in the browser: **Next access to this URL will be redirected, no longer request a server**. This will cause your random image API to become an image itself.

The best method depends on the context and desired tone. However, generally speaking, **method 1 (direct translation)** is preferred for its clarity and precision. It prioritizes conveying the meaning accurately without unnecessary embellishment. Method 2 (adding explanation) can be useful in certain situations where a more detailed explanation of the reasoning behind the translation is needed but risks sacrificing readability.

Direct return to MIME type is a one-time request, requiring only one request.

“If your architecture separates front-end and back-end, it’s likely a 302 redirect. If you directly serve images within the response body, your server becomes a proxy for the client, and all traffic flows through your server.”

Using redirects is generally faster than repeated requests, but for management and tracking purposes, I use redirects for most API calls.

github repository: afoim/EdgeOne_Function_PicAPI

上线的API： https://eopfapi.acofork.com/pic?img=ua
# 奇技淫巧1：利用Cloudflare Origin Rules实现无计费的随机URL
> Video: https://www.bilibili.com/video/BV19ZBzB8EDQ/
起因于有一天一位粉丝在我视频下留言
![](../../assets/images/random-url-gen-9.webp)

He mentioned a warehouse.

github repository

Cloudflare provides a method where a UUID can be generated at the rule layer, and each UUID is randomly generated. This allows for random URLs to be generated within the rules.

The theory is viable, and practice begins.

A UUID is a random number consisting of characters with leading plus signs, and each digit has 16 possible values. We can only take the first 4 digits, which is 16^4 = 65536. This allows us to store 65536 images, where each image is assigned a unique UUID. After receiving a request, the CF edge will generate the UUID and then directly concatenate the URL to the static assets, such as `/img/0000.webp`, and return it to the client.

If you need more, add another one, and it will be enough. 16<sup>5</sup> = 1048576, which is sufficient.
If you say I want less of this, we could have the image fill in, providing an extreme example: if you only have two images, each creating 32,768 copies, and so on.

![](../../assets/images/random-url-gen-10.webp)

github repository

The API is: https://img.072103.xyz/h and https://img.072103.xyz/v

# Lost techniques and clever tricks: ditch the backend, let frontend JS handle URL construction.
Video: https://www.bilibili.com/video/BV1tNB4BEEaE/
Video2: https://www.bilibili.com/video/BV1mMBKBREkB/

Please provide a request for a endpoint, returning a random content.

Is it possible for the client JavaScript to handle this random image?

The client JavaScript code generates a random number, then concatenates the URL to obtain the final random image, and searches for an `<img>` container or background image container that needs to be replaced with the random image.

![](../../assets/images/random-url-gen-11.webp)

github repository

The API is: https://pic1.acofork.com

# Okay, please provide the text. I’m ready when you are.
We have explored three schools of thought.

- Traditional methods focus on finding edges and contours within the function, then extracting images from those edges.
- Extreme users utilize the CF rules for edge carving, extracting images and then calculating fees based on the extracted data.
- Environmentalists: By directly implementing search and retrieval functionality on a client-side JavaScript framework, enabling image lookup, cropping, and modification.