---
title: "Get the Free 3x-UI Panel"
description: "The 3x-ui panel is a very useful proxy panel, and many people are using it. If someone is using the default password..."
category: "Record"
published: 2025-05-01
image: ../../assets/images/8e3dd949-97f8-44b1-ab44-e29b64b6c1a8.webp
tags: [3x-ui]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
The article outlines a method to identify and exploit 3x-ui instances by using FOFA to locate Hong Kong-based sites, then simulating login requests via Postman with username/password credentials. It proposes automating this process with a crawler that tests weak credentials across a list of targets, logging successful logins into a separate file. The goal is to collect numerous accessible nodes for potential unauthorized use.
:::

# Formally begin

First, we need to find websites on the internet that have deployed 3x-ui, which can be done using [Network Space Mapping, Network Space Security Search Engine, Network Space Search Engine, Security Situation Awareness - FOFA Network Space Mapping System](https://fofa.info/)

![2025-05-01-22-14-32-image.webp](../../assets/images/2025-05-01-22-14-32-image.webp)

After entering, we search: `app="3x-ui" && region="HK"` which means looking for the 3x-ui website and targeting the region of Hong Kong, China.

接下来我们制作一个TXT文档，里面全部都是搭建了3x-ui的网站，如图![](../../assets/images/8b9390ec-61b0-4f78-8d76-aa2b7cb136e5.webp)

Then we need to find out the login principle of 3x-ui.

By normal login, it can be seen that he will request `/login` and send the request body in the format `application/x-www-form-urlencoded; charset=UTF-8`

![2025-05-01-22-10-39-image.webp](../../assets/images/2025-05-01-22-10-39-image.webp)

Let's now look at the request body, which is very simple! It only has a `username` and a `password`

![2025-05-01-22-12-14-image.webp](../../assets/images/2025-05-01-22-12-14-image.webp)

Then let's simulate the request in Postman... no problem at all!

![2025-05-01-22-12-46-f6cec50c16c94c50acc0e23150edde22.webp](../../assets/images/2025-05-01-22-12-46-f6cec50c16c94c50acc0e23150edde22.webp)

Now you can start writing the crawler!

Basic principle: Request each website listed in the TXT file sequentially, and simulate login. If a weak password successfully logs in and the website returns a login-success JSON response, record it in another TXT file. After the loop ends, you will have a very large number of free nodes!

![2025-05-01-22-16-13-image.webp](../../assets/images/2025-05-01-22-16-13-image.webp)