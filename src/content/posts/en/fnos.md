---
title: "Flying Bull NAS Experience"
description: "The Feinu NAS system is a modern open-source NAS system. Movie scraping ranks among the top in China, and its Docker software, which is essential, is also feature-rich and easy to use. The blogger personally uses it."
category: "Experience"
draft: false
image: ../../assets/images/QmUBuX9qmsNP1NHeEeUmuPNdS5ctvk4LchcSsFARDC4vZJ.webp
lang: en
published: 2024-10-14
tags:
- 飞牛NAS
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
The article highlights key features of a FlyNas NAS, including fast media scraping via AutoBangumi using TMDB/IMDB, photo backup via mobile apps with multi-user support, and detailed setup notes. Important setup tips cover disk partitioning, app permissions, Debian 12 OS, SSH key login, and network card compatibility. Storage modes like Basic and Linear are explained with their pros and cons for expansion, redundancy, and flexibility.
:::

### The things that attract me

1. Media scraping: Fast, lightweight Plex, just a few blocks away. Through [AutoBangumi](/autobangumi), you can enjoy a one-stop automatic anime tracking and scraping service. Occasionally, it may be inaccurate, but manual matching is available. The data sources come from [TMDB](https://www.themoviedb.org/) and [IMDB](https://www.imdb.com/).
   ![QmbNXd4FJ8FM8mwkKxJNdBoNbvhawJ2HdSvW5tFUt3o4ub.webp](../../assets/images/f1bd7089efdf00097d5474ef967a62dcfca42e98.webp)

2. Album: Can be automatically backed up via the mobile app, supports backing up only images, allows multi-user usage with independent storage, and also allows setting which images to share.
   ![QmeLJ7in4xcokPWUgkkSobDLUTrFrXep2o38qUXQ1njQR9.webp](../../assets/images/2f9981f8397cc1278807ed28f8a2e15954868fec.webp)

### [[X:content]]

1. When installing Feinu NAS, you will be prompted to select an installation disk, and a portion of the installation disk's space (defaulting to 64GB) will be designated as the system partition, while the remaining space can be used to create storage space (however, the system disk cannot be combined with other disks to form a storage pool and must be used to create a storage pool independently).
   ![QmNfRbvHu1fuYoincACcP2MG4yV4pgRni3rb4Y9J7uw4FW.webp](../../assets/images/6403ef19d941abdc93d8c7da01364a8983c98109.webp)

2. Apps installed from the app store require directory access permissions before they can read directories (whether native or Docker apps).
   ![QmP4unAVra1zy7gkjEzSCYEDAJMMe1BVWPKoVyjYv8b9Ho.webp](../../assets/images/79af3b25d8b677b2718c953c0d431ead2f137e1d.webp)

3. The distribution is Debian 12. The root directory corresponds to the space of the system partition, /vol1 corresponds to the space of storage volume 1, and /vol2 corresponds to the space of storage volume 2. It is recommended to mount Linux directories to Windows using [RaiDrive](https://onani.cn/RaiDrive) or [SSHFS](/SSHFS).
   ![QmWMQHNpJUUPg9B1Hdw2zmwLx9q6bcS52nUFiB3P9iYvU9.webp](../../assets/images/d4ec6f87893f4af5d7eedb2e2a19a784fd6c6f92.webp)

4. SSH needs to be enabled manually, using the NAS administrator's credentials. It is recommended to switch to key-based login after logging in, see: [SSH](https://www.runoob.com/w3cnote/set-ssh-login-key.html)
   ![QmTk3va2NCbYTcVewVjuqjGx6MwMwiUnManrNwxvEq4SBR.webp](../../assets/images/9f92130465ab62e912b7404266febc7212e2125b.webp)

5. Each network card test

   | Name                         | Type  | Brand          | Plug and Play       |
   |:--------------------------:|:---:|:-----------:|:----------:|
   | Realtek GBE Family (r8168) | Cable  | Realtek (Ruiyu) | No, you need to install the driver yourself |
   | Realtek 8852BE             | Wireless  | Realtek (Ruiyu) | No, you need to install the driver yourself |
   | Intel AC3160               | Wireless  | Intel (Intel)  | Yes          |
   | USB Wired Network Card                    | Cable  | Realtek (Ruiyu) | Yes          |

6. Differences among various storage modes

   | Mode     | Function                                   | Can it be expanded? | Can the disk be replaced? | Disaster Recovery  | Can it be hot standby | Can the storage mode be modified? |
   |:------:|:------------------------------------:|:-----:|:-----:|:---:|:-----:|:---------:|
   | Basic  | Use a portion or the entire physical hard drive as a storage pool; not expandable, and can only be created with a single disk. | No     | No     | None   | No     | Yes, convertible to RAID |
   | Linear | Partition one or more physical hard drives into a storage pool that is scalable        | Yes     | No     | None   | No     | No         |
   | RAID type  | Search using your own search engine for more details                       | Not tested   | Not tested   | Not tested | Not tested   | Not tested       |

7. NAS Thunder Internal Test Code: Xunlei Niutong