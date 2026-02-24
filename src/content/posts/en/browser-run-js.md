---
title: "Browser JS Running Principles"
description: "Here’s a professional translation of the text:  “This document provides a detailed analysis of the underlying principles and core operations governing the JavaScript execution within web browsers, including the event loop.”"
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
This article explains how web browsers manage execution of JavaScript code, emphasizing that rendering happens in the main thread and tasks are prioritized based on arrival. It also discusses video analysis using an iframe embedded within a webpage, demonstrating a complex process involving message queues and task scheduling.
:::

# Here’s the translation of the text:  “Please provide the results of the following JavaScript code.”

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

# How does a browser execute commands sequentially?

The browser’s operations are handled by **Render Thread**, which creates a persistent task execution loop. When Render Thread is idle, it retrieves new tasks from the **Message Queue** to execute. **All Tasks Follow First-Come, First-Served (FFC) principle, prohibiting simultaneous task execution**.

Video Analysis

*frame content*