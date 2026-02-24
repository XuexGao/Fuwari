---
title: "Complete Free! From architecture, development to deployment, a One-Dragon provides you with a comprehensive guide on how to do best practices for one-word/random URL."
description: "I recently launched my first random graph website in 2024, and I’ve been deepening my research into similar projects. I've observed that these projects often contain pitfalls but also reveal numerous hidden shortcuts, and some architectures can achieve a degree of “persistence.”"
published: 2025-12-29
image: ../../assets/images/random-url-gen.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Exploring architecture.
Let’s begin with a practical example.

Here’s the translation:  “A random image API returns different images each time a request is made.”

How will you proceed?

There are numerous solutions, and I’ll start with the simplest approach: establishing a server. We can then populate it with images, and finally, create a script to generate a web server that receives client requests. Each request will retrieve an image from a library of images and return it to the client.

Can it be achieved?

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

Here’s the translation:  “While frontend performance has improved due to direct CDN integration, high concurrency is no longer a concern. However, because assets are not directly hosted within the **Cloud Function**, the **Cloud Function** still requires a long-lived connection from your backend – such as retrieving images from object storage. This process can potentially introduce latency and impact service speed.”

Here’s a professional translation of the text:  “There have been discussions regarding this, and given that I've lost my server now, it would be more efficient to store the front-end assets directly within the back-end infrastructure. The cloud-based architecture allows for seamless data synchronization.”

Absolutely! You’re well on your way to best practices.

Most **Cloud Functions** support dynamic scripting, allowing you to provision and manage dynamic scripts within their cloud storage. This enables the deployment of static assets alongside these dynamic components.

Here’s the translation:  “So, you’re saying there’s a random image available – a completely unhosted graphic – that could cause a catastrophic price surge due to storage issues?”

![](../../assets/images/random-url-gen-4.webp)
# 探索随机图（随机URL）的本质
我们刚刚只是在抽象的说明某种架构 **好像** 可行，**好像** 又有什么问题，然后又有一种什么新思路 **好像** 可以解决这个问题

Here’s the translation:  “We are only at the beginning of our journey, and we should consider how to approach this. We could explore random URLs or images, or even random requests from the server – what data was transmitted to the client, and what action did the client initiate upon receiving the response from the server?”

You are undoubtedly aware that if you require a client to return different content for each request, it’s highly likely the server is returning distinct responses for each. This could be internal, such as embedding images directly within the response body, or it could be [[Redirect]].

The direct upload of images directly to the response body is straightforward. This functionality is client-side and invisible within the application itself. When a client initiates an API request, the server immediately transmits the selected image as the response body, seemingly as if it were a request for an image. However, the refresh behavior of the client varies each time.

Responding to a redirect is significantly simpler. The server simply needs to send an HTTP status code, such as 302, indicating the redirection.

There’s a recurring question about the necessity of re-routing or redirection.

Due to the fact that you are undoubtedly intending for the client to return different images every time, once you utilize **Permanent Redirect** such as **301**, the browser will record a message indicating that the client will be redirected to the same URL again upon receiving **301**. This will effectively transform your random image API into a static image.

Here’s the translation:  “So, which of these two methods is better?”

Here’s the translation:  “Each option has its advantages and disadvantages. A concise statement explains that direct return to MIME type yields seamless reuse, requiring only one request; conversely, redirecting with a 302 status code requires at least two client requests.”

Considering your specific architecture, if you're employing a three-tier separation – logic and assets residing separately – then 302 Redirect is the appropriate solution.  Directly sending image data to the response body (the server) effectively positions your server as a proxy, routing all traffic to your infrastructure.

If both the front-end and back-end are involved in a single request, a standard one-time reuse is typically faster than two separate requests. However, for management and tracking purposes, I utilize **302 Redirect**(https://example.com/redirects) for most of my APIs.

GitHub repository: afoim/EdgeOne_Function_PicAPI

上线的API： https://eopfapi.acofork.com/pic?img=ua
# 奇技淫巧1：利用Cloudflare Origin Rules实现无计费的随机URL
> Video: https://www.bilibili.com/video/BV19ZBzB8EDQ/
起因于有一天一位粉丝在我视频下留言
![](../../assets/images/random-url-gen-9.webp)

He mentioned a warehouse previously mentioned.

GitHub repository: Mabbs/cf-hitokoto

Here’s a professional translation:  “Cloudflare provides a method to generate a UUID (Universally Unique Identifier) at the rule level. Each generated UUID is random, allowing for deterministic URL generation within the rule framework.”

The theory is viable, and practical implementation begins.

First, we understand that UUIDs are strings of random numbers with leading separators, and each digit has 16 possible values. We can only extract the first four digits, which is 16<sup>4</sup>, equivalent to 65536 images. Each image can be assigned a unique UUID, and then the CF edge will generate the UUID upon receiving a request, followed by directly concatenating the URL request for static assets, such as `/img/0000.webp` , and returning it to the client.

If you’re asking if you need more of this, adding one will suffice. 16<sup>5</sup> equals 1048576, which is sufficient.
If we were to reduce the image count, we could utilize image interpolation techniques. For example, consider a scenario where you have only two images and each image can generate 32,768 copies. This progression continues indefinitely.

![](../../assets/images/random-url-gen-10.webp)

GitHub repository: afoim/cf-rule-random-url

The API is now live at: [https://img.072103.xyz/h](https://img.072103.xyz/h) and [https://img.072103.xyz/v](https://img.072103.xyz/v).

# Here’s the translation:  “Tech and artistry 2: Abandon backend, let frontend JS handle URL construction.”
Video: [https://www.bilibili.com/video/BV1tNB4BEEaE/](https://www.bilibili.com/video/BV1tNB4BEEaE/)
Video2: [https://www.bilibili.com/video/BV1mMBKBREKB](https://www.bilibili.com/video/BV1mMBKBREKB)

Let’s clarify our approach and determine if we require a solution that returns a random content endpoint.

If you’d like to utilize random images on our website, could it be that the client-side JavaScript would handle this functionality?

The core principle involves developing a client-side JavaScript application to generate a random number and then construct a URL to retrieve the final image. This image is then used to replace an existing image container or background image within the page, dynamically updating the content.

![](../../assets/images/random-url-gen-11.webp)

GitHub repository: afoim/Static_RandomPicAPI

The API is now live at: [https://pic1.acofork.com]

# Summarize.
We have explored three distinct schools of thought.

- Traditional approaches often prioritize established norms and guidelines, focusing on finding suitable patterns within the edge function. This involves selecting images that fit within defined parameters or constraints.
- Here’s the translation:  “Edge-finding algorithms, as defined by CF rules, are implemented to identify and extract data points from edge maps. However, fees are not applied.”
- Here’s the translation:  “Environmentalists are leveraging client-side JavaScript to enable direct image search, cropping, and editing within the browser.”