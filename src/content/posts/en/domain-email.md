---
title: "Self-built postal service? Two free domain email solutions await you!"
description: "Looking for a domain email address? We offer two free options: NetEase Free Business Mail and Tencent Enterprise Email, each with its own strengths and weaknesses – choose the one that best suits your needs."
category: "Tutorial"
draft: false
image: ../../assets/images/2025-05-02-21-04-48-image.webp
lang: en
published: 2025-03-12
tags:
- 域名邮箱
- 网易免费企业邮
- 微信企业邮
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Introduction

I first became aware of domain names and email addresses through an accidental observation within a development group of a friend. Their Microsoft account was linked to an email address associated with the domain name ‘admin@hewebsite.com’.

At the time, I was very curious and asked him if his email address is self-hosted.

Due to my understanding that purchasing a VPS and integrating it with open email frameworks could be a viable solution for building an email service, I initially considered it. However, the associated costs of money and time were considerable, and I questioned its stability. Consequently, I have not yet attempted such a setup.

He explained that he was utilizing Cloudflare’s email forwarding service, but the cost of sending emails via this method is considerable due to the need for domain-based email addresses. This creates a significant barrier to using email for certain purposes.

Here’s the translation:  “Upon discovering NetEase Free Business Mail and Tencent Enterprise Email, you can freely bind your domain name as a domain email address, allowing for both receiving and sending.”

# Here’s the translation:  **Comparative Analysis**

| | NetEase Free Business Mail | WeChat Enterprise Email |
|---|---|---|
| Enable SMTP/IMAP | Troublesome, with pitfalls. | Simple and direct |
| Stability | Old-fashioned brand | Large back support |
| Recommendation rating | Not recommended. | Recommendation |

# Option one: Tencent Enterprise Email (Recommended)

## Formal commencement.

First, create a business account through Tencent Enterprise Email. This will allow you to link it to WeChat Business and follow the instructions carefully.

Next, you will need to bind a domain and add a few MX records.

## Here’s the translation:  Enable SMTP, IMAP, or POP3 protocols.

We need to access the Tencent enterprise email login entrance.

Please note, `Other Login Methods`

![](../../assets/images/2025-05-02-20-57-24-image.webp)

Please select your account and password to log in.

![](../../assets/images/2025-05-02-20-57-44-image.webp)

Following member login (if you directly entered, skip this step).

![](../../assets/images/2025-05-02-20-59-22-image.webp)

Click on the top left corner to configure.

![](../../assets/images/2025-05-02-21-00-08-image.webp)

Delivery settings

![](../../assets/images/2025-05-02-21-00-31-image.webp)

This allows you to view SMTP and IMAP addresses and ports (including TLS support, which is also supported).

![](../../assets/images/2025-05-02-21-01-07-image.webp)

## 生成客户端密码

Next, please link your email account.

![](../../assets/images/2025-05-02-21-01-36-image.webp)

Generating new passwords is a critical security practice. It’s essential to employ strong, unique passwords that are resistant to brute-force attacks and dictionary guessing. Consider using a combination of uppercase and lowercase letters, numbers, and symbols for maximum complexity. Avoid easily guessable information like birthdays or names.  It's also advisable to utilize a password manager to securely store and generate these credentials.

![](../../assets/images/2025-05-02-21-01-57-image.webp)

# Option Two: NetEase Free Enterprise Mail

Please note that NetEase Enterprise Mail has some limitations regarding SMTP, IMAP, and POP3. To enable these features, you will be prompted to log in with administrator privileges, resulting in a less-than-optimal experience. We recommend using Tencent Enterprise Email for a better experience.

## Create an account and configure administrator privileges.

First, create an account on [NetEase Free Business Email](https://ym.163.com/). Register directly using your mobile number.

Upon registration, your account name and login credentials will be sent to you via **SMS**. Please then proceed to https://mail.qiye.163.com/ for login.

If you prefer to bypass the system-generated passwords, please first click "Forgot Password." Then, after entering your account name and verifying your registered mobile number, you can reset your password.

Upon entering, it appeared as though…

![](../../assets/images/65e5b400-96d7-44c6-b16e-a7a409104c3c.webp)

If you do not wish to use your account name, such as my account is **erchashush** @acofork.freeqiye.com, this erchashush can be changed.

In organizational management, navigate to the Account Management section and select to create a new account.

![](../../assets/images/a20e7931-c460-4134-b1b0-0fee82f8a7fc.webp)

Here’s a professional translation of the text:  “Please provide a preferred nickname.  The system will require you to enter your phone number for registration, and if the information is incorrect, it will be automatically deleted.”

![](../../assets/images/b9ac287d-ff90-4f8c-88ba-0d7bb1588f1c.webp)

We need to request a premium account for this new account, if you wish to log in via superadmin from the backend.

![](../../assets/images/6f21feca-984d-444e-b80f-bf1a28e4cf79.webp)

Proceed to the upper right corner to log out and then use your new administrator account to log in.

## Please bind your domain.

Management and Organization – Domain Management – Add Domain

![](../../assets/images/2fa04b72-f0e7-43c0-9c2a-1daab62e67cb.webp)

Based on your domain registrar (e.g., Cloudflare), you can configure TXT records and MX records.

## Please log in to your email account.

Download the [NetEase Email Master - Efficient and Powerful All-Platform Email Client](https://dashi.163.com/) version.

Please log in using your email address and password. You may also be required to verify via SMS. A mobile version of NetEase Email Master is recommended for login on your phone; any other platform login will require mobile authentication, enhancing security.

## 效果展示

![](../../assets/images/614794bd-d84d-4b66-b816-1d6d6ce73727.webp)

Signature and sender profile pictures can be set through the NetEase email master on mobile phones.

![](../../assets/images/57f759bc-46fb-4f99-b6bb-751464661240.webp)