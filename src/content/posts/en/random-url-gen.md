---
title: "Completely Free! A Hands-On Guide from Architecture, Development to Deployment for Best Practices in Creating Random URLs like One-Liner or Random Image"
description: "I built the first random graph website in 2024. In the past few weeks, I have deeply researched similar projects and found that there are many pitfalls as well as some mysterious shortcuts in this field, and certain architectures can even achieve \"immortality\"..."
published: 2025-12-29
image: ../../assets/images/random-url-gen.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article explores three architectural approaches to building a random image API: the traditional server-based method, leveraging Cloudflare Origin Rules for cost-free edge-side randomization, and client-side JavaScript solutions that eliminate backend dependencies entirely. Each approach addresses scalability, cost, and performance differently, with edge functions and rule-based routing offering high concurrency without server maintenance, while client-side JS reduces server load but requires frontend logic. The author concludes by highlighting these as “traditional,” “geeky,” and “eco-friendly” paradigms respectively.
:::

# Exploring Architecture
We won't discuss an abstract concept first; instead, let's start with a small project.

**A random image API that returns a different image with each request**

What would you do?

There are many solutions; let's take the simplest one. We can first get a server, put images into it, and then write a script to create a web server that receives client requests, pulling a random image from the image library for each request.

Can it be achieved?

Of course! Here is your flowchart!
![](../../assets/images/random-url-gen-5.webp)
But it also brings some issues, for example, if images are stored locally, when the client requests images, it uses your machine's bandwidth. In that case, you need a **high-bandwidth** server, which inevitably incurs a **high** cost.

That might lead you to a new approach: **frontend-backend separation** (separation of logic and assets), where only the logic for returning this image is stored on the server, while the image itself is stored elsewhere, such as object storage (Cloudflare R2), IPFS, etc.
![](../../assets/images/random-url-gen-6.webp)
Then the problem arises again: if too many people use your project, your server performance may be insufficient, and in the later stage, you will still need a **high** **maintenance cost**

So so so, it is now **2025** year, traditional architectures can no longer meet our needs, perhaps we can try **cloud functions**
It is still a front-end and back-end separation. Now we place the logic on a function, such as Cloudflare Worker, EdgeOne Function, Vercel Function, etc.
![](../../assets/images/random-url-gen-8.webp)
So are you invincible now?

Not necessarily; although the frontend uses **cloud functions**, which directly connects to CDN, high concurrency is no longer an issue. However, since assets are not directly hosted within **cloud functions**, **cloud functions** still need to establish a long connection to your backend, such as object storage, to fetch images. This additional overhead may mean your service isn't as fast as it could be.

Someone might say, since I’ve already lost my server now, with the frontend in the cloud and the backend also in the cloud, why not let the frontend’s cloud directly store the backend’s assets?

Of course! You are already very close to best practices!

Most **cloud functions** support hybrid static and dynamic capabilities, meaning you can store dynamic scripts in their cloud storage, and also **store static assets** alongside them.

Then, you’ve got a completely random image that doesn’t require you to buy server hosting or worry about storage overflow leading to exorbitant bills... right?

![](../../assets/images/random-url-gen-4.webp)
# Exploring the essence of random graphs (random URLs)
We were just abstractly discussing whether a certain architecture **seems** feasible, **seems** to have some issues, and then another new idea **seems** to solve this problem.

But the road we are about to take has just begun. Let us consider: what exactly does a server (if any) send to the client in projects like random graphs or random URLs, and what actions does the client perform on the responses sent back by the server?

You certainly know that if you want the client to receive different responses for each request to the same URL, the server must return different responses for each request. This can be internal, such as directly embedding an image in the response body, or it can also be **redirect**.

It's very simple to embed an image directly in the response body; it remains invisible to the client. When the client requests the API, the server sends the selected image directly as the response body. To the client, it appears as if they are requesting an image, but each refresh results in a different one.

But responding to **redirect** is even simpler; the server just needs to send a **temporary redirect** status code, such as **302**

Some people might ask, why is **temporary redirect** necessary?

Because you definitely want the client to return a different image every time it refreshes. Once you use **permanent redirect** such as **301**, the client will, at the moment it receives **301**, write a record in the browser: **next time you access this URL, directly redirect without requesting the server again**, which will cause your random image API to actually become just one image.

Then, which of these two methods is better?

Each has its pros and cons: **Returning the MIME type directly enables request reuse, allowing the image to be obtained with just one request. In contrast, returning a 302 redirect requires at least two client requests.**

This depends on your actual architecture. If you have a front-end and back-end separation, meaning logic and assets are not located in the same place, a 302 redirect is definitely better, because if you directly embed images in the response body, it's equivalent to your server acting as **proxy** for the client to access your assets, with all traffic passing through your server.

If your front-end and back-end are integrated, under normal circumstances, a single request reuse is definitely faster than two separate connections. However, for convenience in management and statistics, most of my APIs still use **302 redirect**.

::github{repo="afoim/EdgeOne_Function_PicAPI"}

Online API: https://eopfapi.acofork.com/pic?img=ua
# Trick 1: Use Cloudflare Origin Rules to achieve free, randomized URLs
> Video: https://www.bilibili.com/video/BV19ZBzB8EDQ/
It started on a day when a fan left a comment under my video.
![](../../assets/images/random-url-gen-9.webp)

The warehouse he mentioned is

::github{repo="Mabbs/cf-hitokoto"}

Generally, Cloudflare provides a method within rules to generate a UUID at the rule level, which is random each time; we can use this to generate random URLs at the rule level.

Theoretically feasible, practice has begun.

First, we need to understand that a UUID is a random number with hyphens, and each digit has 16 possible values. We can simply take the first four digits, which gives us 16^4, or 65,536 possible combinations. Each image can be assigned a unique UUID. Next, when the CF edge receives a request, it generates a UUID and directly appends it to the URL request for static assets, such as `/img/0000.webp`, and returns it to the client.

What if my diagram has more than this? Add one more, 16^5 = 1048576, should be enough, right?
What if my image count is less than this? We can let the images fill the space; for an extreme example, if you only have 2 images, you can create 32,768 copies of each, and so on.

![](../../assets/images/random-url-gen-10.webp)

::github{repo="afoim/cf-rule-random-url"}

Online API: https://img.072103.xyz/h | https://img.072103.xyz/v

# Trick #2: Throw away the backend, let frontend JS assemble URLs itself.
> Video: https://www.bilibili.com/video/BV1tNB4BEEaE/
> Video2: https://www.bilibili.com/video/BV1mMBKBREkB/

Open your mind—do we really need something that **requests an endpoint to return random content**?

If you just want to use a random image on our website, could client-side JavaScript handle that?

The basic principle is to write a client-side JS that generates a random number, then concatenates it into the URL to obtain the final random image, and then locate the img container or background image container that needs to be replaced with the random image, and replace its content.

![](../../assets/images/random-url-gen-11.webp)

::github{repo="afoim/Static_RandomPicAPI"}

Online API: https://pic1.acofork.com

# Summary
We jointly explored three schools of thought.

- Traditional School: Stick to the rules, search for images at the edge functions, extract images
- GeekPie: Through the rules of CF, implement image searching and retrieval at the edge without charging.
- Environmentalists: Implement image search, retrieval, and modification directly in the browser via client-side JavaScript.