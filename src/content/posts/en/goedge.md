---
title: "GoEdge Self-Built CDN System Deployment Lessons Learned"
description: "I am incredibly sorry to inform you that I accidentally acquired three free VPS accounts. However, I’m concerned about their potential re-activation and how to address this situation effectively. Perhaps we could redirect them to a more stable environment or explore alternative solutions?"
published: 2025-09-09
image: '../../assets/images/2025-09-09-06-29-44-image.webp'
tags: [CDN, GoEdge]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Installation of GoEdge

Here’s the translation:  “Quickly install the GoEdge Management System using a script – GoEdge CDN: Self-Hosted CDN.”

A script installation is being performed.

```bash
curl -s https://goedge.cloud/install.sh | bash
```

# Deactivation of GoEdge device.

Check the process ID (PID) associated with port listening on channel **7788**.

```bash
root@AcoFork-NAS:~/oci# apt install lsof && lsof -i :7788
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
lsof is already the newest version (4.95.0-1).
0 upgraded, 0 newly installed, 0 to remove and 254 not upgraded.
COMMAND       PID USER   FD   TYPE  DEVICE SIZE/OFF NODE NAME
edge-admi 1733510 root    7u  IPv6 8663743      0t0  TCP *:7788 (LISTEN)
edge-admi 1733510 root    9u  IPv6 8746827      0t0  TCP 10.147.17.1:7788->10.147.17.147:39580 (ESTABLISHED)
edge-admi 1733510 root   10u  IPv6 8828980      0t0  TCP 10.147.17.1:7788->10.147.17.147:45730 (ESTABLISHED)
root@AcoFork-NAS:~/oci#
```

Using PID (Proportional-Integral-Derivative) control, determine the program path.

```bash
root@AcoFork-NAS:~/oci# readlink -f /proc/1733510/exe
/usr/local/goedge/edge-admin/bin/edge-admin
root@AcoFork-NAS:~/oci#
```

Here’s the translation:  “You have successfully located the Edge Admin installation directory: **EdgeAdmin_Installation_Directory**.”

Follow the instructions outlined in the documentation for the De-installation Management Platform – GoEdge CDN, and proceed with the process step-by-step.

# Here’s a professional translation of “API node configuration” into English:  “API node configuration refers to the process and settings required to properly configure and manage an Application Programming Interface (API) endpoint.”

The installation process will configure API nodes, and you’ll need to specify ports and public IP addresses.

Ensure that the port is not in use by another process, defaulting to port 8001 (as known to be reserved by Flyfish OS). If it is occupied, switch to a different port.

You must ensure that **Public Network** can be added to by subsequent nodes **Proactive Access**.  We utilize IPv6 public networks and guarantee that all nodes added after this will have IPv6 addresses.

# Adding a DNS service provider.

Please proceed to…

![](../../assets/images/2025-09-09-07-00-37-image.webp)

Add your DNS account. **hw** Used for CDN domain name autonomous resolution, **cf** Used for subsequent SSL certificate issuance.

![](../../assets/images/2025-09-09-06-59-59-image.webp)

Please enter your details to verify domain availability.

![](../../assets/images/2025-09-09-06-44-54-image.webp)

# Setting up a CDN (Content Delivery Network) domain is a crucial step in optimizing website performance and user experience. This involves configuring the DNS records to point your domain name to the CDN’s servers, ensuring that users are served content from geographically closer locations, resulting in faster loading times and reduced latency.  Proper CDN setup requires careful planning and execution to ensure optimal results.

Please proceed.

![](../../assets/images/2025-09-09-06-45-52-image.webp)

Configure DNS subdomain settings.

![](../../assets/images/2025-09-09-06-46-12-image.webp)

# Adding nodes.

Please proceed.

![](../../assets/images/2025-09-09-06-47-14-image.webp)

![](../../assets/images/2025-09-09-06-47-30-image.webp)

Then enter the node IP and SSH authentication method (password/key), and after goedge will proactively connect via SSH to install services on the node.

# Configuration node DNS IP address.

Please proceed.

![](../../assets/images/2025-09-09-06-49-35-image.webp)

This will require you to enter the DNS IP address for each node, and you can specify the **Public IP**.

# Signature: SSL

Please proceed.

![](../../assets/images/2025-09-09-06-50-43-image.webp)

![](../../assets/images/2025-09-09-06-50-50-image.webp)

![](../../assets/images/2025-09-09-06-50-57-image.webp)

![](../../assets/images/2025-09-09-06-51-10-image.webp)

随便写个邮箱

![](../../assets/images/2025-09-09-06-51-23-image.webp)

Write domain names (supporting both broad and narrow domains).

![](../../assets/images/2025-09-09-06-51-52-image.webp)

Please wait for confirmation of successful signing.

![](../../assets/images/2025-09-09-06-52-20-image.webp)

# Here’s the translation:  “Prohibit access to unregistered domains and prohibit direct IP addresses.”

字面意思，如图设置

![](../../assets/images/2025-09-09-06-53-52-image.webp)

# Create a website.

Please proceed.

![](../../assets/images/2025-09-09-06-54-16-image.webp)

Please conduct your own research. I’m going to sleep.