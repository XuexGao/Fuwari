---
title: "About Whois queries"
description: "Have you ever considered deploying a third-party Whois lookup service yourself? I’ve done so, and it’s been riddled with issues!"
category: "Record"
published: 2025-05-28
image: ../../assets/images/16ab7a68-892e-429e-a0bc-02d829eead82.webp
tags: [Whois]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article introduces the concept of a three-way API for querying Whois information, focusing on the difference between traditional and RDAP queries. It explains how to build such an API, emphasizing that traditional Whois queries rely on TCP connections and require dedicated clients.  The article then details how to handle different types of domains – those supporting RDAP and those relying solely on traditional methods – and provides examples like querying `freebird.day`.
:::

# Introduction

### What is a WHOIS lookup?

If you understand a domain name, you will immediately discover that information is available on the Whois server, including registration details such as the registrant, location, and registration date. This information can be publicly accessible.

### How to quickly retrieve a domain’s Whois information?

Do you utilize any Whois lookup services? For example, the IP.SB WHOIS service allows for rapid domain registration information retrieval via [WHOIS - IP.SB](https://ip.sb/whois).

![](../../assets/images/578a2c58-5ad4-452a-be8b-a186a64fa058.webp)

# The video is complete.

To implement a custom Whois query service for your bot or website, here’s a breakdown of the process:  1.  **Obtain a WHOIS Record:** You'll need to obtain a WHOIS record for the domain you want to monitor. This record contains information about the registrant of the domain. 2.  **Choose a WHOIS Provider:** Several providers offer WHOIS services, including:     *   ICANN (Internet Corporation for Assigned Names and Numbers): [https://www.icann.org/](https://www.icann.org/) – Generally reliable but may have limitations.     *   Whois.com: A popular option with a user-friendly interface.     *   Other providers: Many specialized WHOIS services exist. 3.  **Integrate the Service:** You’ll need to integrate your chosen provider into your bot or website. This typically involves using their API or SDK. 4.  **Query the Record:** Once integrated, you can query the WHOIS record for specific information (e.g., registrant name, contact details). 5.  **Handle Data and Display:** Process the retrieved data and display it to your users or bot accordingly.  Do you have a particular domain in mind that you’d like me to elaborate on?

You may already know that there is a dedicated package on Linux systems called `whois`. We can use it to query Whois information. Let’s try it now.

![](../../assets/images/d198a5cf-37e0-410e-9f9b-df736725eb7b.webp)

I was able to retrieve Whois information from `baidu.com`. However, the output of this command is quite lengthy.

![](../../assets/images/3efb10bd-042a-4a22-82c9-e947d591e10d.webp)

However, only information contained within the red frames is effective for us; the rest of the information consists of announcements, warnings, and permissions – essentially, useless data.

Here’s the translation:  “It is generally straightforward for individuals to quickly retrieve relevant information from occasional searches and then screen it with their own eyes, however, this presents a significant challenge for modern computers.”

Due to the traditional Whois query process, the information returned by the Whois server is unstructured and unpredictable; it offers whatever it deems appropriate for the request.  See Figure **Traditional Whois Query**.

这是我的域名的Whois查询结果，可以看到，完全没有规范可言
![](../../assets/images/981f3e74-4e18-47e9-8e05-05ffca461e3c.webp)

Furthermore, the formatting has been significantly altered, and terminology has also been revised, such as “Status” being changed to “Connect.”

![](../../assets/images/29f6f17b-a885-406d-ad70-45e3aacc95d9.webp)

Here’s the translation:  “This necessitates a highly targeted localization and filtering approach when implementing three-way APIs. Achieving absolute compliance requires thorough investigation of Whois servers for each top domain, followed by the implementation of bespoke filters to generate a complete and standardized WHOIS query result.”

Here’s a professional translation of the text:  “I previously mentioned **Traditional WHOIS Lookup** and was seeking an API that could provide a standardized, formatted query result for each domain, ensuring adherence to a defined structure.”

Here’s the translation:  “There are several protocols, including RDAP (Registration Data Access Protocol), which is a protocol for accessing registration data. Using RDAP, querying a domain name will return a standard JSON format output, and the query utilizes a standard REST API, represented as Web protocol, as illustrated in the figure.”

![](../../assets/images/7d92115f-f897-427a-b0a6-46d386019443.webp)

Seeing so much irrelevant information, but please don’t rush – since it returns JSON data and all domains are standardized, we can efficiently filter it.

![](../../assets/images/96760408-d94e-4ddb-854f-8e817a01fd8d.webp)

Here’s the translation:  “Just as this allows for quick display of information regarding top-level domains through a filtering rule, all **RDAP query Whois support** can be readily shown.”

However, it’s important to note that RDAP is a new protocol and many top-level domains still do not support it. For example, `.im`.

[im Domain Delegation Data](https://www.iana.org/domains/root/db/im.html)

![](../../assets/images/efa46528-43b5-45fb-88e6-5401dfade480.webp)

The system currently supports traditional Whois lookups.

Our three-way API now supports both traditional Whois records and modern RDAP (Resource Discovery and Access Protocol) data.

# Formalize the process of building a three-party Whois query API.

Due to the traditional Whois query process, which relies on TCP requests over port 43, we require dedicated clients to initiate the inquiry. Consequently, our server must first retrieve information and then return the user's plain text response as illustrated in the figure **Only supports traditional Whois queries**.

![](../../assets/images/16ab7a68-892e-429e-a0bc-02d829eead82.webp)

For top-level domains that already support RDAP queries, return the direct Web URL, allowing users to browse and view as illustrated.

![](../../assets/images/9b4916ef-d096-4954-a87c-abfc88c77d00.webp)

Regarding the requirement of querying RDAP servers for this top-level domain, we need to first obtain information about the RDAP server(s) associated with that top-level domain through an IANA query. While traditional Whois queries are sufficient for this purpose, Linux’s built-in Whois package currently provides the functionality.

比如我要查询 `freebird.day` ，就需要先前往[.day Domain Delegation Data](https://www.iana.org/domains/root/db/day.html)查找![](../../assets/images/7c7cb4ed-6b1a-4541-b176-ecc5783a3853.webp)

接下来通过给定的RDAP服务器查询即可![](../../assets/images/3d8df636-39e5-48f7-a6c7-9490f373497e.webp)

Due to the recent adoption of RDAP, its readability, and ease of understanding, we prioritize RDAP queries over traditional Whois and RDAP query results.