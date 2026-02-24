---
title: "GoEdge Self-Built CDN System Deployment Lessons Learned"
description: "I inadvertently acquired three free VPS instances. However, I’m concerned about their potential re-activation and recovery. Perhaps they could contribute to a shared workload?"
published: 2025-09-09
image: '../../assets/images/2025-09-09-06-29-44-image.webp'
tags: [CDN, GoEdge]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Install GoEdge

Using scripts quickly installs the GoEdge Management System – Documentation – GoEdge CDN | Self-Built CDN

Here’s a Python script to install:  ```python import subprocess import sys  def install_script():     try:         subprocess.run(['pip', 'install', 'your_script_name'])         print("Script installed successfully.")     except Exception as e:         print(f"Error installing script: {e}")  if __name__ == "__main__":     install_script() ```

```bash
curl -s https://goedge.cloud/install.sh | bash
```

# Uninstall GoEdge

``` Listen port PID is 7788 ```

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

Using PID to find program paths

```bash
root@AcoFork-NAS:~/oci# readlink -f /proc/1733510/exe
/usr/local/goedge/edge-admin/bin/edge-admin
root@AcoFork-NAS:~/oci#
```

C:/usr/local/goedge/edge-admin/

Uninstall the management platform using the documentation – GoEdge CDN | Self-Hosted CDN. Follow the instructions step by step to complete the process.

# API node configuration

Installation will require you to configure API nodes, and configure ports and public networks.

The port is not currently in use, defaulting to port 8001 (known to be reserved by Flyfish OS). If it is occupied, a different port will be used.

The system requires that the IPv6 address of the next node to be added can be accessed by the following node. This is achieved by using an IPv6 public network and ensuring that all subsequent nodes have IPv6 addresses.

# Add DNS service providers.

First go.

![](../../assets/images/2025-09-09-07-00-37-image.webp)

Add your DNS account. **hw** Used for CDN domain name autonomous resolution, **cf** Used for subsequent SSL certificate issuance.

![](../../assets/images/2025-09-09-06-59-59-image.webp)

Please enter the domain here.

![](../../assets/images/2025-09-09-06-44-54-image.webp)

# Setting up CDN (Content Delivery Network) domains requires careful planning and execution. It involves configuring your DNS records to point to the CDN provider’s servers, ensuring proper caching and routing of content globally.  This process typically includes updating your domain registrar's settings and verifying that the CDN is properly integrated with your website’s infrastructure.  Thorough testing is crucial after implementation to ensure optimal performance and user experience.

To travel.

![](../../assets/images/2025-09-09-06-45-52-image.webp)

Set up DNS secondary domains.

![](../../assets/images/2025-09-09-06-46-12-image.webp)

# Adding nodes.

To travel.

![](../../assets/images/2025-09-09-06-47-14-image.webp)

![](../../assets/images/2025-09-09-06-47-30-image.webp)

Node IP + SSH authentication method (password/key), and goedge will proactively connect via SSH to install services on the node.

# Configuration node DNS IP

To travel.

![](../../assets/images/2025-09-09-06-49-35-image.webp)

Please provide the DNS IP addresses for each node. You can specify the **公网IP** tag for each node.

# Please provide the text you would like me to translate.

To travel.

![](../../assets/images/2025-09-09-06-50-43-image.webp)

![](../../assets/images/2025-09-09-06-50-50-image.webp)

![](../../assets/images/2025-09-09-06-50-57-image.webp)

![](../../assets/images/2025-09-09-06-51-10-image.webp)

email@example.com

![](../../assets/images/2025-09-09-06-51-23-image.webp)

Domain Name (Supports Pan-domain)

![](../../assets/images/2025-09-09-06-51-52-image.webp)

Okay, please provide the text.

![](../../assets/images/2025-09-09-06-52-20-image.webp)

# Please provide the text you would like me to translate.

Please provide the text you would like me to translate. I need the text itself to fulfill your request.

![](../../assets/images/2025-09-09-06-53-52-image.webp)

# Creating a website involves several key steps and considerations. First, you need to define your website’s purpose and target audience. Next, choose a domain name that reflects your brand and is memorable. After that, select a web hosting provider and set up your website on their platform. You'll likely need to design the layout of your site – this includes choosing a theme or template, selecting colors and fonts, and arranging content in a user-friendly manner.  Finally, you’ll need to develop the website’s functionality, which may involve adding features like contact forms, e-commerce capabilities, or blog sections.  Content creation is crucial; you'll need to write engaging text, create high-quality images and videos, and optimize your site for search engines (SEO).  Ongoing maintenance and updates are essential to keep the website secure, functional, and relevant.

To travel.

![](../../assets/images/2025-09-09-06-54-16-image.webp)

Next week I’ll be taking a break.