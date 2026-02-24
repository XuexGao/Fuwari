---
title: 上手米哈游AI，然后把它逆了！
published: 2025-12-02
description: AnuNeko是一只会哈气的橘猫...其实不是，AnuNeko是由米哈游创始人做的AI大模型，会哈气。于是便做个QQBot给群友玩
image: ../assets/images/anuneko.webp
tags:
  - AnuNeko
  - NoneBot2
  - AI
draft: false
lang: ""
---
:::ai-summary{model="google/gemma-3-1b"}
这篇文章主要介绍了橘猫聊天机器人（AnuNeko）的API接口，以及如何使用它来选择回复编号和切换橘猫会话模型。 核心内容包括：

1.  **如何发送请求选择回复编号:** 使用 `select-choice` API 来指定要选择的回复编号。
2.  **如何使用 `x-token` 身份验证:**  通过 `x-token` 参数进行身份验证，并使用 Cookie 进行自动拿取。
3.  **橘猫和黑猫切换模型:** 针对橘猫和黑猫两种用户，分别使用 `user/select_model` API 来切换一个会话的猫咪模型。
:::

# 这是What
这是橘猫，会哈气（见封面

你可以前往 [AnuNeko](https://anuneko.com/#/chat) 逗猫

# 逆！
okok，注意到登陆后的请求头中有 `x-token` 字段
![](../assets/images/anuneko-1.webp)

手搓个请求发发，`data` 携带内容 
```json
curl --location 'https://anuneko.com/api/v1/msg/会话id/stream' \
--header 'x-token: 账号Token' \
--header 'Content-Type: text/plain' \
--header 'Cookie: 自动拿取' \
--data '{"contents":["test"]}'
```

通了
![](../assets/images/anuneko-2.webp)

然后还有一种情况，在遇到Pick的时候，我们要发送要选择的回复编号
![](../assets/images/anuneko-3.webp)

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

随便写了个适用于NoneBot2的插件，玩吧
[AnuNeko_NoneBot2_Plugins/anuneko.py at main · afoim/AnuNeko_NoneBot2_Plugins](https://github.com/afoim/AnuNeko_NoneBot2_Plugins/blob/main/anuneko.py)