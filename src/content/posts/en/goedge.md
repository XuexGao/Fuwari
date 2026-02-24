---
title: "GoEdge Self-built CDN System Pitfall Record"
description: "Holy crap, I accidentally got three free VPS instances, but if I don't use them, they might get reclaimed. What should I do? Hey, maybe I should make them all do some work!"
published: 2025-09-09
image: '../../assets/images/2025-09-09-06-29-44-image.webp'
tags: [CDN, GoEdge]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide outlines how to install, uninstall, and configure GoEdge CDN, including setting up API nodes, DNS providers, CDN domains, node additions, SSL certificate issuance, access restrictions, and website creation. Installation is quick via a script, and uninstallation requires locating the process PID and removing the installed files. Configuration steps emphasize port availability, public network accessibility, DNS setup, node SSH integration, SSL signing, and restricting access to domain-bound traffic only.
:::

# Install GoEdge

> [Quickly Install GoEdge Management System Using Script - Documentation - GoEdge CDN | Self-hosted CDN](https://goedge.cloud/docs/Admin/install-script.md)

One-line script installation

```bash
curl -s https://goedge.cloud/install.sh | bash
```

# Uninstall GoEdge

Check the PID of the program listening on port **7788**

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

Use PID to find program path

```bash
root@AcoFork-NAS:~/oci# readlink -f /proc/1733510/exe
/usr/local/goedge/edge-admin/bin/edge-admin
root@AcoFork-NAS:~/oci#
```

You have successfully located the **EdgeAdmin installation directory**: `/usr/local/goedge/edge-admin/`

Then go to [-  - GoEdge CDN | CDN](https://goedge.cloud/docs/Admin/Uninstall.md) and uninstall following the tutorial step by step

# Configuration of API Nodes

The installation phase will allow you to configure API nodes, configure ports, and set up public access.

You need to ensure the port is not in use; the default port **8001** (known to be occupied by FeinuOS). If it is occupied, choose another port.

You need to ensure that **public internet** can be actively accessed by any nodes you add afterward (my approach is to use IPv6 public network and ensure all subsequently added nodes have IPv6 addresses).

# Add DNS provider

First, go to

![](../../assets/images/2025-09-09-07-00-37-image.webp)

Add your DNS account. **hw** is used for autonomous resolution of CDN domain names, **cf** is used for subsequent SSL certificate issuance.

![](../../assets/images/2025-09-09-06-59-59-image.webp)

Click in to ensure you can obtain the domain name

![](../../assets/images/2025-09-09-06-44-54-image.webp)

# Set CDN domain name

Go to

![](../../assets/images/2025-09-09-06-45-52-image.webp)

Set up DNS subdomain

![](../../assets/images/2025-09-09-06-46-12-image.webp)

# Add node

Go to

![](../../assets/images/2025-09-09-06-47-14-image.webp)

![](../../assets/images/2025-09-09-06-47-30-image.webp)

Then fill in the node IP and SSH authentication method (password/key); afterward, goedge will proactively connect to the node via SSH to install the service.

# Configure the DNS IP for the node

Go to

![](../../assets/images/2025-09-09-06-49-35-image.webp)

You will be asked to fill in the DNS IP for each node; simply enter the **public IP** of the node.

# Issue SSL

Go to

![](../../assets/images/2025-09-09-06-50-43-image.webp)

![](../../assets/images/2025-09-09-06-50-50-image.webp)

![](../../assets/images/2025-09-09-06-50-57-image.webp)

![](../../assets/images/2025-09-09-06-51-10-image.webp)

Just write any email address.

![](../../assets/images/2025-09-09-06-51-23-image.webp)

Write domain name (supports wildcard domains)

![](../../assets/images/2025-09-09-06-51-52-image.webp)

Wait a moment, and it will be successfully issued.

![](../../assets/images/2025-09-09-06-52-20-image.webp)

# Prohibit access without bound domain / Prohibit direct IP access

Literal meaning, as shown in the figure setting

![](../../assets/images/2025-09-09-06-53-52-image.webp)

# Create a website

Go to

![](../../assets/images/2025-09-09-06-54-16-image.webp)

You can figure it out yourselves; I'm going to sleep now.