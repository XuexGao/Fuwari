---
title: "Master Rice AI, then reverse it!"
description: "AnuNeko is a cat known for its playful and affectionate “hairy” behavior. In reality, it’s an AI model created by MiHoYo, capable of simulating a “hairy” expression – essentially, it’s a QQ bot designed to entertain its online friends."
published: 2025-12-02
image: ../../assets/images/anuneko.webp
tags:
  - AnuNeko
  - NoneBot2
  - AI
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# This is what.
Here’s the translation:  This is a cat that emits a hiss (as depicted on the cover).

You can visit [AnuNeko](https://anuneko.com/#/chat) – the cat lady.

# 逆！
okok，注意到登陆后的请求头中有 `x-token` 字段
![](../../assets/images/anuneko-1.webp)

手搓个请求发发，`data` 携带内容 
```json
curl --location 'https://anuneko.com/api/v1/msg/会话id/stream' \
--header 'x-token: 账号Token' \
--header 'Content-Type: text/plain' \
--header 'Cookie: 自动拿取' \
--data '{"contents":["test"]}'
```

通了
![](../../assets/images/anuneko-2.webp)

然后还有一种情况，在遇到Pick的时候，我们要发送要选择的回复编号
![](../../assets/images/anuneko-3.webp)

发个如图请求帮橘猫选择
```
curl --location 'https://anuneko.com/api/v1/msg/select-choice' \
--header 'x-token: 你的Token' \
--header 'Content-Type: text/plain' \
--header 'Cookie: 自动拿取' \
--data '{"msg_id":"会话id","choice_idx":0或1}'
```

还有还有，这有个橘猫和黑猫，如何切换一个会话的猫？
```
curl --location 'https://anuneko.com/api/v1/user/select_model' \
--header 'x-token: 你的Token' \
--header 'Content-Type: text/plain' \
--header 'Cookie: 自动拿取' \
--data '{"chat_id":"会话id","model":"Exotic Shorthair或Orange Cat"}'
```

Here’s a professional translation of the text:  “I’ve created a plugin suitable for NoneBot2, feel free to explore it.”
[AnuNeko_NoneBot2_Plugins/anuneko.py](https://github.com/afoim/AnuNeko_NoneBot2_Plugins/blob/main/anuneko.py) at main · afoim/AnuNeko_NoneBot2_Plugins]]