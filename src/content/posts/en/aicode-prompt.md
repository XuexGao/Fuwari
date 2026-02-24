---
title: "AI写不出优质的代码？其实是你引导错了！"
description: "Here’s the translation:  “Currently, large language models are proliferating, with prominent examples like OpenAI's ChatGPT series and Anthropic's code-focused Claude. However, even the most advanced models are rendered ineffective if utilized improperly by those who employ unsuitable methods.”"
category: "Tutorial"
published: 2025-06-17
image: ../../assets/images/65f8862e-2a66-4acc-8fef-c8b3dc7f5c29.webp
tags: [AI, Prompt]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

Video link: https://www.bilibili.com/video/BV1jw38z9EEn/
# Correct guidance methods

Okay, I understand. Please provide the text you would like me to translate.

Okay, I understand. Please provide the text.

比如： `编写一个Python脚本，在代码中硬编码S3_Endpoint、S3_Area、S3_key、S3_Secret、S3_Url（暂时全部留空）。运行后监听Ctrl+Alt+A，一旦被按下，立即检查剪贴板内是否有图片（支持文件格式和纯图格式），将其转换为Webp格式并上传到S3 API的S3_Url路径下，最后模拟键入![](图片链接)`

Okay, I understand. Please provide the text.

`编写一个Python脚本，在代码中硬编码S3_Endpoint、S3_Area、S3_key、S3_Secret、S3_Url（暂时全部留空）。运行后监听Ctrl+Alt+A，一旦被按下，立即检查剪贴板内是否有图片（支持文件格式和纯图格式），将其转换为Webp格式并上传到S3 API的S3_Url路径下，最后模拟键入![](图片链接)。你明白了吗，请告诉我你将要如何完成这个任务，在我批准前请不要编写代码`

Sometimes ambiguity can be beneficial.

Because you begin describing a variable and assigning it a value, such as "how many," you are not using AI to write code; rather, you are instructing the AI to translate your natural language code into programming language code. The quality of the generated code depends entirely on your technical knowledge and logical thinking skills.

So, when dealing with most requirements, we can initially describe a framework, confirm the AI's direction before proceeding to write the project.

The provided text is not available. I cannot fulfill this request. Please provide the text you would like me to translate.

The provided text is not available. I need the original text to translate it into English. Please provide the text you want me to translate.

However, with my half-year of experience using AI IDEs, if code exhibits bugs, don’t say things like “`this code doesn't run, let me see`” such as that. I still recommend you copy and paste the complete error message to the AI and ask it to analyze and resolve it, for example:

Error message: It reports an error, please analyze the cause of the issue based on the error message and provide a solution.

Sometimes, program errors may be simply a simple environment variable not configured, or you may not have utilized a mainstream solution. Simply asking the AI to self-reproach will only lead it to focus on its perceived error point.

Thinking from a different perspective, you have an甲方 who constantly tells you this plan isn’t working but never tells you where it's failing. However, AI is not human; it will only follow the path it deems correct, and luck plays a role in iterative bug fixes, and then you spend money on requests that are just wasted.

Please provide the text you would like me to translate.

# Please provide the text you would like me to translate.

[ChatGPT](https://chatgpt.com)：快速，不限额。适合解决你的疑问
![](../../assets/images/c2e37057-78c9-403f-b3af-e84bdad98f1e.webp)

Compared to GPT, Claude 3.5 Sonnet and above models are more powerful and excel at coding, particularly for front-end development. Most AI IDEs now support these models, making them ideal for writing modular, maintainable scripts.

![](../../assets/images/f9adcc5e-64bc-48f0-8845-893242abec33.webp)

VS Code (GitHub Copilot) is an AI development environment developed by Microsoft. It allows free users to utilize the Claude 3.5 Sonnet model, but with limited usage quotas. The Pro plan costs $10 USD per month and only supports PayPal and international card payments.

![](../../assets/images/70b6f916-ba70-45a6-b572-3b32214f0c1f.webp)

AI IDE developed by Anysphere, available to free users only through Auto models. Pro plan costs $10 USD per month, and supports PayPal and international payments.

![](../../assets/images/4287002f-eb0e-43b0-87b7-1fa43c37a497.webp)

AI IDE. Developed by ByteDance, requires a foreign IP address. New Pro plan offers a 3 USD/month activation for the first month, with support for Alipay and overseas cards. I am currently using.

![](../../assets/images/40b76f69-2c50-49d0-b861-05f8879accab.webp)

Do not use any web-based large language models for any project. Please use AI IDEs instead.