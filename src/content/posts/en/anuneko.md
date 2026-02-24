---
title: "Get to Know MiHoYo's AI, Then Reverse It!"
description: "AnuNeko is an orange cat that lets out a \"huff\"... actually, AnuNeko is an AI large model created by the founder of miHoYo, which \"huffs.\" So, I made a QQBot for my group friends to play with."
published: 2025-12-02
image: ../../assets/images/anuneko.webp
tags:
  - AnuNeko
  - NoneBot2
  - AI
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article demonstrates how to interact with the AnuNeko chatbot API using cURL commands, including sending messages, handling choice selections, and switching between cat models (e.g., Orange Cat or Exotic Shorthair). It also provides a NoneBot2 plugin for easier integration into chatbot systems. The author encourages users to play with the API and plugin for automated interactions with the cat-themed bot.
:::

# This is What
This is an orange cat, and it will sneeze (see cover).

You can go to [AnuNeko](https://anuneko.com/#/chat) to play with cats.

# No!
OKOK, noticed that the request header after login contains `x-token` field
![](../../assets/images/anuneko-1.webp)

Manually craft a request and send it, `data` carrying the content
```json
curl --location 'https://anuneko.com/api/v1/msg/会话id/stream' \
--header 'x-token: 账号Token' \
--header 'Content-Type: text/plain' \
--header 'Cookie: 自动拿取' \
--data '{"contents":["test"]}'
```

Connected
![](../../assets/images/anuneko-2.webp)

Then there is another scenario: when encountering a Pick, we need to send the reply number of the selection we want to make.
![](../../assets/images/anuneko-3.webp)

Send a request like the picture to help choose for the orange cat.
```
curl --location 'https://anuneko.com/api/v1/msg/select-choice' \
--header 'x-token: 你的Token' \
--header 'Content-Type: text/plain' \
--header 'Cookie: 自动拿取' \
--data '{"msg_id":"会话id","choice_idx":0或1}'
```

Also, also, there's an orange cat and a black cat—how do you switch between cats in a session?
```
curl --location 'https://anuneko.com/api/v1/user/select_model' \
--header 'x-token: 你的Token' \
--header 'Content-Type: text/plain' \
--header 'Cookie: 自动拿取' \
--data '{"chat_id":"会话id","model":"Exotic Shorthair或Orange Cat"}'
```

Just wrote a plugin suitable for NoneBot2, have fun with it.
[AnuNeko_NoneBot2_Plugins/anuneko.py at main · afoim/AnuNeko_NoneBot2_Plugins](https://github.com/afoim/AnuNeko_NoneBot2_Plugins/blob/main/anuneko.py)