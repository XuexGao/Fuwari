---
title: "About Whois queries"
description: "Here’s a professional translation of the text:  “Have you considered deploying a third-party Whois lookup service yourself? I recently did, and it was riddled with issues.”"
category: "Record"
published: 2025-05-28
image: ../../assets/images/16ab7a68-892e-429e-a0bc-02d829eead82.webp
tags: [Whois]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Here’s the translation:  “Introduction”

### Whois query is a process used to determine the owner and details of a domain name. It’s a tool that reveals information about the registrant of a website, including their contact information, DNS records, and other related data.

If you know a domain name, it will typically leave related information on the Whois server once registered, such as the registrant, registration location, and registration date.

### How to quickly query a domain’s Whois information?

Do you have experience using some Whois query websites like IP.SB’s WHOIS service, allowing for quick lookup of a domain's Whois information?

![](../../assets/images/578a2c58-5ad4-452a-be8b-a186a64fa058.webp)

# Please provide the text you would like me to translate.

To build a Whois query service for your bot or website, you’ll need to:  1.  **Obtain the Registrar's Information:** You’ll need the registrar’s information – including the registrar’s name, contact details, and the WHOIS server address. This is typically found on the registrar’s website. 2.  **Use a Whois Query Tool:** There are several online tools you can use to perform a WHOIS query. Popular options include:     *   Whois Lookup ([https://www.whois.com/](https://www.whois.com/))     *   ICANN Whois API ([https://www.icanw.org/](https://www.icanw.org/)) 3.  **Construct the Query:** You’ll need to construct a WHOIS query, specifying the registrar, domain name, and the date range you want to search. The tool will then return the results. 4.  **Process the Results:** Analyze the returned data – including the registrant information, contact details, and other relevant fields. This information can be used for various purposes, such as identifying the owner of a domain or tracking its history.

You can use the whois package to query information about domain owners on Linux systems. Let's try it out.

![](../../assets/images/d198a5cf-37e0-410e-9f9b-df736725eb7b.webp)

I can see that the Whois information frombaidu.com is quite long.

![](../../assets/images/3efb10bd-042a-4a22-82c9-e947d591e10d.webp)

However, only information within the red frames is effective, while other information consists of announcements, warnings, and permits.

This is easily accessible information for occasional inquiries and searches, but extremely challenging for modern humans.

Because of traditional Whois queries, the information returned by a Whois server is unpredictable and can provide anything the server wants. For example, as shown in the figure [[X:traditional Whois query]].

这是我的域名的Whois查询结果，可以看到，完全没有规范可言
![](../../assets/images/981f3e74-4e18-47e9-8e05-05ffca461e3c.webp)

The status is currently connected.

![](../../assets/images/29f6f17b-a885-406d-ad70-45e3aacc95d9.webp)

We face significant challenges when working with three-way API requests, as we need to provide targeted localization or filtering for each top domain. To achieve absolute compliance, we must conduct thorough investigations into the Whois servers for each domain and then configure specific filters to generate a complete, standardized WHOIS query result.

Traditional Whois queries have been discussed, and there’s an API that provides a standardized query result format with each domain adhering to this structure.

Registered Data Access Protocol (RDAP) is a protocol for accessing registered data. Using RDAP’s domain queries with Whois will return a standard JSON output, and the query is performed using the standard REST API, as shown in the figure.

![](../../assets/images/7d92115f-f897-427a-b0a6-46d386019443.webp)

Looking at a lot of useless information, but don’t panic, since it returns JSON and all domains are standardized, we can easily filter.

![](../../assets/images/96760408-d94e-4ddb-854f-8e817a01fd8d.webp)

Like this, all support RDAP querying for top-level domains can be quickly displayed through this rule.

RDAP is a new protocol, and many top-level domains still do not support it, such as `im`.

Im Domain Delegation Data

![](../../assets/images/efa46528-43b5-45fb-88e6-5401dfade480.webp)

Can only support traditional Whois queries.

Our three-way API supports both traditional Whois and new RDAP methods.

# Here’s the translation:  “Formalize the process of obtaining Whois information through an API.”

Due to the traditional Whois query process, which involves TCP requests on port 43, our server must first query information and then return the user's plain text. The figure illustrates this.

![](../../assets/images/16ab7a68-892e-429e-a0bc-02d829eead82.webp)

For RDAP query endpoints, directly return Web URLs, allowing users to browse them as shown in the figure.

![](../../assets/images/9b4916ef-d096-4954-a87c-abfc88c77d00.webp)

Please provide the text you would like me to translate.

比如我要查询 `freebird.day` ，就需要先前往[.day Domain Delegation Data](https://www.iana.org/domains/root/db/day.html)查找![](../../assets/images/7c7cb4ed-6b1a-4541-b176-ecc5783a3853.webp)

接下来通过给定的RDAP服务器查询即可![](../../assets/images/3d8df636-39e5-48f7-a6c7-9490f373497e.webp)

Because RDAP protocol is new and easy to read, it prioritizes RDAP queries over traditional Whois and Whois queries.