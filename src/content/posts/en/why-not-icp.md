---
title: "Why This Site Does Not Conduct ICP Registration"
description: "Due to various reasons, this site has not undergone ICP registration. Here are some of the reasons recorded."
category: "Record"
published: 2025-07-29
image: '../../assets/images/d24c6c12-a8c9-4577-a4bc-0de768c23337.webp'
tags: [ICP]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
The site’s ICP attempt was rejected due to its domain (2x.nz) not being eligible for Chinese registration. While CDN speeds are good, using China-specific nodes wouldn’t significantly improve performance. The author may consider in the future for better accessibility but won’t make it the main site, potentially abandoning it if managing dual content branches becomes too complex.
:::

> [[X:content]]The article has been archived; it was kicked back to CF by a DDoS attack.
# Violation content

We previously published an article on this site [click here to view](/posts/bypass-gfw/)
This article does not comply with the filing regulations. Attempts to file it were rejected.

# Domain name does not support filing a record.

ICP filing is for domains, and the domain 2x.nz under my name is not within the supported domain extensions for ICP filing.

All domain suffixes that support registration can be viewed at https://domain.miit.gov.cn/

# China's node acceleration has yielded minimal results.

The CDN currently used by this site is Netlify CDN. Netlify utilizes AWS IPs, offering extremely fast speeds with high availability in mainland China. The latency is shown in the figure below.

![](../../assets/images/96375c6a-f807-42b7-b1f0-33c0c7231037.webp)

Since this is a static site, if you proceed with the filing, you can directly use the China Mainland nodes in EdgeOne Page, which will naturally result in lower latency; however, compared to the current speed, the improvement would be negligible.

# The filing process is cumbersome.

If you choose to register, you need to fill in the information of the actual operator and purchase a registration code (this is the least costly registration method).

# GFW has not blocked SNI for this site.

This site is currently not blocked by GFW. It can be accessed normally except in certain provinces and cities where non-registered domains are blocked by firewalls.

# Users in regions such as Quanzhou only support accessing registered domains?

Previously, this site had an IP-based site, which was temporarily disabled because upgrading the business server's 1Panel from V1 to V2 disrupted the original CI/CD workflow.

The issue will be fixed, and the IP site will be restored to operation.

Restored. See the [About](/about/) interface.

# Will there be subsequent filing?

Possible. However, it will not be used as the primary business; rather, it is more for improving accessibility. The main site remains an unregistered one.

And if, after filing, I need to manage two content branches (i.e., the non-violating content branch and the original branch), I might choose not to do so.