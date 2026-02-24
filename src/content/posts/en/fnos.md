---
title: "Flying Horse NAS Play Experience"
description: "The Fly-Cloud NAS system is a modern, open-source network attached storage (NAS) solution. In China, it’s considered a top-tier platform and recently, the demand for Docker software has become comprehensive and user-friendly, with the creator also utilizing it."
category: "Experience"
draft: false
image: ../../assets/images/QmUBuX9qmsNP1NHeEeUmuPNdS5ctvk4LchcSsFARDC4vZJ.webp
lang: en
published: 2024-10-14
tags:
- 飞牛NAS
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

### Please translate “” to professional English.

1. 影视刮削：飞快，薄纱Plex几条街。通过[AutoBangumi](/autobangumi)可以完美自动追番+刮削一条龙服务。偶尔会有不准，但可以手动匹配，数据源来自[TMDB](https://www.themoviedb.org/)和[IMDB](https://www.imdb.com/)
   ![QmbNXd4FJ8FM8mwkKxJNdBoNbvhawJ2HdSvW5tFUt3o4ub.webp](../../assets/images/f1bd7089efdf00097d5474ef967a62dcfca42e98.webp)

2. 相册：可以通过手机APP自动备份，支持仅备份图片，可以多用户使用，存储互不干扰，也可以设置要共享的图片
   ![QmeLJ7in4xcokPWUgkkSobDLUTrFrXep2o38qUXQ1njQR9.webp](../../assets/images/2f9981f8397cc1278807ed28f8a2e15954868fec.webp)

### 注意事项

1. 飞牛NAS在安装的时候会叫你选择安装盘，然后会将安装盘的一部分空间（默认为64GB）作为系统分区，其余空间可用于创建存储空间（但是系统盘不能和别的盘组存储池，只能单独建存储池） 
   ![QmNfRbvHu1fuYoincACcP2MG4yV4pgRni3rb4Y9J7uw4FW.webp](../../assets/images/6403ef19d941abdc93d8c7da01364a8983c98109.webp)

2. 应用商店安装的软件需要先授予目录访问权限应用才能读取目录（无论是原生还是Docker应用）
   ![QmP4unAVra1zy7gkjEzSCYEDAJMMe1BVWPKoVyjYv8b9Ho.webp](../../assets/images/79af3b25d8b677b2718c953c0d431ead2f137e1d.webp)

3. 发行版为Debian 12。根目录为系统分区的空间，/vol1 为存储空间1的空间 /vol2 为存储空间2的空间。推荐使用[RaiDrive](https://onani.cn/RaiDrive)或[SSHFS](/SSHFS)挂载Linux目录到Windows
   ![QmWMQHNpJUUPg9B1Hdw2zmwLx9q6bcS52nUFiB3P9iYvU9.webp](../../assets/images/d4ec6f87893f4af5d7eedb2e2a19a784fd6c6f92.webp)

4. SSH需要自己开，账密为NAS管理员账密，建议登上之后改为仅密钥登录，参见：[设置 SSH 通过密钥登录](https://www.runoob.com/w3cnote/set-ssh-login-key.html)
   ![QmTk3va2NCbYTcVewVjuqjGx6MwMwiUnManrNwxvEq4SBR.webp](../../assets/images/9f92130465ab62e912b7404266febc7212e2125b.webp)

5. Network card testing

   | Name                         | Type  | Brand          | Is it free of pest control?       |
   |:--------------------------:|:---:|:-----------:|:----------:|
   | Realtek GBE Family (r8168) | Cable  | Realtek | No, you need to install drivers yourself. |
   | Realtek 8852BE             | Wireless  | Realtek | No, you need to install drivers yourself. |
   | Intel AX3160               | Wireless  | Intel  | Yes.          |
   | USB wired network card                    | Cable  | Realtek | Yes.          |

6. Here’s the translation:  Different storage modes differ significantly.

   | Pattern     | Effect                                   | Can be enlarged? | Can be changed? | Redundancy  | Can be heated? | Can storage mode be modified? |
   |:------:|:------------------------------------:|:-----:|:-----:|:---:|:-----:|:---------:|
   | Basic  | A portion or all of the physical hard drive can be used as a storage pool, it cannot be expanded, and only a single disk configuration can be created with this mode. | No.     | No.     | No   | No.     | Yes, it can be RAID. |
   | Linear | A or more physical hard drive components or the entire unit as a storage pool        | Yes.     | No.     | No.   | No.     | No.         |
   | RAID class  | Use search engines                       | Untested   | Untested   | Untested | Untested   | Untested       |

7. Nas Thunder Internal Testing Code: ThunderBull Pass