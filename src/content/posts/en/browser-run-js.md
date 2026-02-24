---
title: "Browser JS Running Principles"
description: "Here’s a professional translation of the text:  “This document provides a detailed analysis of the underlying principles and core operations governing the execution of JavaScript within web browsers, including the event loop.”"
category: "Record"
draft: false
image: ../../assets/images/4b040799-eec9-457e-a04e-edf8b7e35b94.webp
lang: en
published: 2025-04-25
tags:
- 浏览器
- JS
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article explains how web browsers prioritize and execute tasks, primarily focusing on the rendering process. It details that all browser operations are handled by the rendering thread, which schedules tasks based on a first-come, first-served approach, preventing multitasking interference.  Finally, it discusses video analysis using an iframe, showcasing how the browser dynamically loads and displays content from a linked platform.
:::

# ```javascript // This code will execute and print the following result: // 123 ```

```js
function a() {
    console.log("1");
    Promise.resolve().then(() => {
        console.log("2");
    });
}
setTimeout(function () {
    console.log("3");
    Promise.resolve().then(a);
}, 0);

Promise.resolve().then(function () {
    console.log("4");
});

console.log("5");
```

# How does a browser execute commands?

Browsers all operations are executed by **render_main_thread**, rendering main thread creates an infinite task execution of the existing tasks. When rendering main thread is idle, it will retrieve new tasks from **message_queue**. Browsers follow a first-come, first-served principle and do not allow simultaneous task execution.

Video Analysis

The iframe displays a video player on Player.bilibili.com.