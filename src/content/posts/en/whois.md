---
title: "About Whois Queries"
description: "Have you ever considered deploying a third-party Whois lookup service yourself? I did, and it's full of pitfalls!"
category: "Record"
published: 2025-05-28
image: ../../assets/images/16ab7a68-892e-429e-a0bc-02d829eead82.webp
tags: [Whois]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article explains how to build a custom WHOIS lookup API that supports both traditional WHOIS (via TCP port 43) and RDAP (Registration Data Access Protocol, JSON-based REST API). It highlights the lack of standardization in traditional WHOIS responses and introduces RDAP as a more consistent alternative. The solution involves detecting domain extensions, using appropriate protocols (traditional WHOIS for unsupported domains, RDAP for supported ones), and handling edge cases like .im, which only supports traditional WHOIS.
:::

# Preface

### What is a WHOIS lookup?

If you know about domain names, you will understand that once a domain is registered, it will leave some relevant information on the Whois server (such as the registrar, registration location, registration date, etc.), which can be publicly queried.

### How to quickly query a domain's Whois?

Have you used certain Whois query websites? As shown in the image, the WHOIS query service of IP.SB allows you to quickly look up the Whois information of a domain via [WHOIS - IP.SB](https://ip.sb/whois).

![](../../assets/images/578a2c58-5ad4-452a-be8b-a186a64fa058.webp)

# The main feature

So, if we want to set up our own Whois query service for our bot or website, what should we do?

You may already know that there is a specific package called `whois` on Linux systems, which we can conveniently use to query Whois. Now we can try it out.

![](../../assets/images/d198a5cf-37e0-410e-9f9b-df736725eb7b.webp)

It can be seen that the Whois information for `baidu.com` has been successfully queried. However, in reality, the output of this command is this long

![](../../assets/images/3efb10bd-042a-4a22-82c9-e947d591e10d.webp)

But in reality, only the information within the red box is relevant to us; the rest are merely notices, warnings, or permits that are useless.

This is not difficult for modern humans who occasionally query and then manually filter out relevant information, but it is very difficult for modern computers.

Because in **traditional Whois queries**, the Whois server returns information with no standardization; it can give you whatever it wants, as shown in the figure below.

This is the Whois query result for my domain, and as you can see, there is absolutely no standard or regulation.
![](../../assets/images/981f3e74-4e18-47e9-8e05-05ffca461e3c.webp)

Even worse, not only does it change the format, but it also alters terminology, such as writing "Connect" for Status.

![](../../assets/images/29f6f17b-a885-406d-ad70-45e3aacc95d9.webp)

This makes it very difficult for us to specifically localize or filter when working with third-party APIs. If you want to achieve absolute standardization, you need to investigate each top-level domain's Whois server individually and configure filters accordingly, so that you can output a complete and standardized Whois query result.

In the previous text, I mentioned **traditional Whois queries**. Is there an API that can directly provide a standardized query result format, with each domain following this standard?

Yes, brother, yes. This is RDAP (Registration Data Access Protocol), the Registration Data Access Protocol. Domain queries using RDAP will return a standardized JSON-formatted output, and the queries are conducted via a standard REST API, i.e., the Web protocol, as shown in the figure below.

![](../../assets/images/7d92115f-f897-427a-b0a6-46d386019443.webp)

At first glance, there seems to be a lot of useless information, but don't rush. Since it returns JSON and all domains follow the same format, we can easily and quickly filter them.

![](../../assets/images/96760408-d94e-4ddb-854f-8e817a01fd8d.webp)

Just like this, you only need to write the filtering rule once, and afterward, all **top-level domains that support RDAP queries for Whois** can be quickly displayed with this rule!

However, to be fair, RDAP is still a relatively new protocol, and many top-level domains do not yet support it, such as `.im`

[.im Domain Delegation Data](https://www.iana.org/domains/root/db/im.html)

![](../../assets/images/efa46528-43b5-45fb-88e6-5401dfade480.webp)

It can be seen that `.im` only supports traditional Whois queries.

Then our tripartite API must support both traditional Whois and the newer RDAP.

# Officially begin building the third-party Whois query API

Since traditional Whois queries retrieve information via TCP requests to port 43, requiring dedicated clients to query, for **top-level domains that only support traditional Whois queries**, our server must first obtain the information and then return it to the user in plain text. As shown in the figure below

![](../../assets/images/16ab7a68-892e-429e-a0bc-02d829eead82.webp)

For **top-level domains already supporting RDAP queries**, directly return the Web URL so that users can view it themselves, as shown in the figure below.

![](../../assets/images/9b4916ef-d096-4954-a87c-abfc88c77d00.webp)

Additionally, for **top-level domains that only support RDAP queries**, we need to first query the RDAP server for that top-level domain via IANA (although traditional Whois is also required, the Whois package on Linux currently works fine with its hardcoded Whois server :)).

比如我要查询 `freebird.day` ，就需要先前往[.day Domain Delegation Data](https://www.iana.org/domains/root/db/day.html)查找![](../../assets/images/7c7cb4ed-6b1a-4541-b176-ecc5783a3853.webp)

接下来通过给定的RDAP服务器查询即可![](../../assets/images/3d8df636-39e5-48f7-a6c7-9490f373497e.webp)

Because the RDAP protocol is relatively new and more readable, prioritize RDAP queries for **top-level domains that support both traditional Whois and RDAP queries**.