---
title: "Recording My First Time Cracking Software! FKvocechat!"
description: "Those interested can first purchase a Pro version at voce.chat before reading this article~ This article is also a general cracking tutorial for software that communicates via REST API."
category: "Record"
published: 2025-07-23
image: '../../assets/images/caa0d269-fc78-4352-8d71-0bc33c122ddd.webp'
tags: [破解]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
VoceChat ，“”。 BurpSuite  `sign: true`， Base58 ，。、、，、。，。
:::

# Antecedents

You can directly view [record being scammed by voce.chat for 350 - ErDan Blog](https://info.php.afo.im/index.php/archives/12/)

# The principle of genuine activation?

Generally speaking, most authorization-based software will first encrypt your authorization file and then send it to the authorization server, waiting for the server to return a correct status before activating.

# How to fake this correct state?

Most software's authorization communication is handled through the backend (but vocechat is different, it's done in the frontend 🤣). We need to capture the authorization requests sent by the software to the authorization server, as well as the correct status responses returned by the authorization server.

If you send a valid license and receive the response `check: true`, while the software interface displays ``. Then send an invalid license and receive the response `check: false`, while the software interface displays ``. Then we can very easily bypass this by simply making the remote server always return `check: true` for any license sent by the software.

This involves modifying the response body and requires third-party software; we recommend `BurpSuite`

> The above scenario represents the simplest authorization activation scheme. In real-world situations, the authorization server may not return a clear value but instead return a ciphertext, which the software then decrypts to obtain authorization credibility information. If the software you are using is not open-source, the subsequent steps depend entirely on your own capabilities.

# Main content: How to crack VoceChat?

> You don't need to have a legitimate license, because I spent 350 on it 😭

After deploying VoceChat, enter the authorization interface and open the browser's DevTools, as shown in the figure.

![](../../assets/images/df39698c-7a0f-4eda-9b74-47cec05faaf2.webp)

Set your `BurpSuite` software to globally replace `"sign": false` with `"sign": true`

![](../../assets/images/5d34cbe2-08e9-40ea-95e4-64c976d5de9b.webp)

Click Manual Update and upload the following content: [[X:content]]

```bash
LkA5K1paaxyiNckLwYxdektr64uk6zFs322ZAXDp4aQWkTNcY9ztKKFBwpPbonS3TeFTnveHi6w5VR1MVLL4WyEw3QTfHuitLcVkQFjYZoiQumdQ4XPTN9Xo5hwdEZwCmb7rSus1Sg51b87HjRFZEGHSYYUoqRZPhte1sqBxXdRqwpvLubkhvH4kPB4PXddcdLj2bmXSF7Ww3UZ3Sp6LvueXGw3GggDkgKDP4C7466VVhX6gPBZnaQNovX2G5ugnuN9B6uUeeg63jDSVFnZRPF1bZUxPM5cqdA6U399x8uzEpamhMTMkT3ZiQmVerjszsr3vB8K5DvwKXYp6qKtuna5MgQMC4oFKMNKCSPg7F4Eox8s61i1yjtE33JgxXqrwqkJYqDfqQv1La5h3mYnu6PLDcmmgSEuUHaetzbcEfRJrzi4KwiZwmy4kX6RjEp12KjEvVdS7uwd8wEYjiohXFPG2WRhLe9Cz2oLpsy15ssa8Y34EUVbABryKiqv6xpdb8ujiiucyvybAtgsurnYv3D8eRGWZyttnBWfcqWnXWFZvFZx4ZtuW6ML7ZEcNpM3qcdW8mU8L7Jg2C1so1dFE2phwtLpFyCNwSK8QbPFwdg3Fr4BbMDE8Yq5UPwAQrMtEcAJ1nQyDTZSJa4n2CTC3Lo48jHdbVWZYTejfD2a4y4sJxwRTZQkgs4Jx3kAeepAM5weLfq9ogBY4VWRwjCuNJyt1GoVRmhRs7ZvqNTdBvhRx8LSo6cKFx6LZWPZP7q5Pefo3qmof9QdTYU6PGWQNXR5fp7vc
```

Then you will be able to get

![](../../assets/images/07686efa-5646-4116-bb96-c2d856b4811e.webp)

# Principle Analysis

VoceChat is frontend validation (couldn't hold it back). The content I just gave you is encoded in base58; after decoding, it becomes

```bash
*,999999,2025-07-16T12:00:03.675696030+00:00,2125-07-16T00:00:00+00:00,266c90ae11f5d0c2f7a42f29108cc4c6480d6c6d16c561adba7d6ff28aab54eaa7236e708efdfd9315a9a88d88709fae5c3029129494d16470121835aca6b9280c41d5c5f73a78d70c8231a8f66b9dbcd513629dd17456d771d2d0caa670208bdcacdf51fca89204b300b35a123fd99978754713e60ec50dcb7ddb5c64e129488250feca1dd52a258bcbf8d6dd8a93601e0f103c8cc457c4da16641777f9d0a440796af0ad32d3551e406b56e129bd40ac19e88423b645e732e991344781a235b7f83a40190c80dbab1ed56259cab296e5ec183228dfd49c0574d1b535b77954542636c0ae5c05e8f542007c608fe0634bcfd8dfabacdf152c006e14c3d30975
```

There are 4 fields in total.

`** is the authorized domain, here filling [[C:` ] means all domains. If you buy from the official source, you can only bind one domain 🤣. If you want to fake it more perfectly, change `*` to your current VoceChat domain.

`999999` Due to the user number limit, the frontend will display as `No Limit`

`2025-07-16T12:00:03.675696030+00:00` Authorization Start Date

`2125-07-16T00:00:00+00:00` Authorization expiration date

`266c***975` seems to be a verification code, similar to the last check digit on an ID card, but it appears to have no effect 😂

# Then who will reimburse me for the 350 I spent on the authorization? 🤣

![](../../assets/images/7fd942fe-da57-4496-8b85-e5db6057705b.webp)