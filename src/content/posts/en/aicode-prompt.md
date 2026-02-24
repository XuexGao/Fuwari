---
title: "Can AI write high-quality code? It's probably because you're guiding it wrong!"
description: "Today, large language models abound, including OpenAI's ChatGPT series, the pioneering force, and Anthropic's code-focused Claude series. However, no matter how advanced or intelligent the model may be, if the user employs it inappropriately, even the best model will feel clumsy in use."
category: "Tutorial"
published: 2025-06-17
image: ../../assets/images/65f8862e-2a66-4acc-8fef-c8b3dc7f5c29.webp
tags: [AI, Prompt]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}

:::

> Video link: https://www.bilibili.com/video/BV1jw38z9EEn/
# The correct guiding method

First, clarify your specific requirements. For example, what programming language will the code be written in? What technology stack will be used? What specific functionalities need to be implemented? What is the application scenario? Is it frontend, backend, or full-stack, etc.?

State your needs clearly and concisely.

比如： `编写一个Python脚本，在代码中硬编码S3_Endpoint、S3_Area、S3_key、S3_Secret、S3_Url（暂时全部留空）。运行后监听Ctrl+Alt+A，一旦被按下，立即检查剪贴板内是否有图片（支持文件格式和纯图格式），将其转换为Webp格式并上传到S3 API的S3_Url路径下，最后模拟键入![](图片链接)`

If you're unsure whether the AI understands your requirements, you can call back to verify, avoiding situations where the AI pretends to understand your needs and then generates irrelevant content. For example, the above statement could be revised as:

`编写一个Python脚本，在代码中硬编码S3_Endpoint、S3_Area、S3_key、S3_Secret、S3_Url（暂时全部留空）。运行后监听Ctrl+Alt+A，一旦被按下，立即检查剪贴板内是否有图片（支持文件格式和纯图格式），将其转换为Webp格式并上传到S3 API的S3_Url路径下，最后模拟键入![](图片链接)。你明白了吗，请告诉我你将要如何完成这个任务，在我批准前请不要编写代码`

Sometimes, ambiguity in expression can actually be a good thing.

Once you start describing creating a variable with a certain name and assigning it a specific value, you are not actually using AI to write code—you are asking AI to translate your natural language code into programming language code. This is not a creative requirement but a translation-type requirement. The quality of the final code generation entirely depends on your technical knowledge and the strength of your logical thinking.

So, when facing most requirements, we can first roughly outline a framework, confirm the AI's direction is correct, and then gradually develop the project.

AI can also make mistakes and is extremely prone to guessing incorrectly. Do not fully trust the content provided by AI; when encountering knowledge you do not understand, you can verify it through authoritative knowledge websites such as [](https://wikipedia.org).

Don't let AI keep self-checking. In modern AI IDEs, most have already implemented the Agent mode, which is: `User proposes a requirement -> AI analyzes and implements the requirement -> AI automatically debugs -> Final delivery of the project to the user`.

However, in my half-year experience using an AI IDE, if your code has a bug, please do not say something like: `This code won't run, help me check it` — I still recommend that you copy and paste the complete error message to the AI and ask it to analyze and resolve the issue, for example:

`[Error message` It reported an error. Please conduct a deep analysis of the root cause of the problem based on the error message, and provide me with a solution]] instead of letting the AI debug itself.

Because sometimes a program's error may simply be due to an unconfigured environment variable, or because you haven't used a mainstream approach; merely asking AI to self-reflect will cause it to choose the part it believes is most likely to be at fault.

*Put yourself in their shoes—what if you have a client who keeps telling you that this plan won’t work but never tells you why? Would that drive you crazy? But AI isn’t human; it will only keep moving forward along the path it believes is correct. If you’re lucky, a few iterations will fix the bugs. If not, it might hit the iteration limit set in the IDE and generate a whole new mess of code, and then your paid request quota is wasted like that.*

Finally, please make good use of AI. You can also ask AI: `Your best way of being called`. ~~Of course, she might also deceive you~~.

# AI Recommendations

[ChatGPT](https://chatgpt.com)：Fast, no limit. Suitable for resolving your questions
![](../../assets/images/c2e37057-78c9-403f-b3af-e84bdad98f1e.webp)

[Claude](https://claude.ai): More powerful than GPT, better at writing code—especially front-end code. Currently, most AI IDEs have integrated Claude 3.5 Sonnet and higher models, making them very suitable for writing small, decomposable, and maintainable scripts.

![](../../assets/images/f9adcc5e-64bc-48f0-8845-893242abec33.webp)

[VS Code（Github Copilot）](https://code.visualstudio.com/)：AI IDE。Developed by Microsoft, free users can use the Claude 3.5 Sonnet model, but with limited quota. The Pro plan costs $10/month, supporting only PayPal and international cards.

![](../../assets/images/70b6f916-ba70-45a6-b572-3b32214f0c1f.webp)

[Cursor](https://www.cursor.com)：AI IDE。Developed by Anysphere, free users can only use the Auto model (typically not assigned the Claude model). Pro plan at $10/month, supports payment only via PayPal and international cards.

![](../../assets/images/4287002f-eb0e-43b0-87b7-1fa43c37a497.webp)

[Trae（International Version）](https://www.trae.ai): AI IDE. Developed by ByteDance, requires foreign IP. New users can activate the Pro plan for the first month at only $3/month (after that, $10/month), supporting Alipay and international card payments. I am currently using it.

![](../../assets/images/40b76f69-2c50-49d0-b861-05f8879accab.webp)

> It is strongly not recommended to use any large model on the web version for writing any project! Please use AI IDE!