---
title: "Principle of JavaScript Execution in Browser"
description: "This article deeply analyzes the JS runtime mechanism in browsers and the fundamental operations of browser internal event handling: the event loop."
category: "Record"
draft: false
image: ../../assets/images/4b040799-eec9-457e-a04e-edf8b7e35b94.webp
lang: en
published: 2025-04-25
tags:
- 浏览器
- JS
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
The code outputs "5" immediately, then "1", followed by "4" (from the Promise chain), then "2" (from the Promise inside `a`), and finally "3" (from `setTimeout`), due to the event loop's order of task execution. The `setTimeout` with 0ms is deferred to the next tick, and `Promise.resolve().then(...)` tasks are queued before `setTimeout` callbacks. The browser's main thread executes tasks in a strict FIFO order, ensuring no task can preempt another.
:::

# Introduction: What is the result of running the following JS code?

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

# How does a browser execute commands step by step?

All operations in the browser are executed by the **rendering main thread**. The rendering main thread creates an infinite loop to execute existing tasks; when there are no tasks, it retrieves new tasks from the **task queue** for execution. **All tasks follow a first-come, first-served order and do not allow interruption or insertion**

Video Analysis:

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=114398232385591&bvid=BV1VpLJzPEBp&cid=29606019473&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>