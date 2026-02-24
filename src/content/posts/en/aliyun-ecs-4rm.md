---
title: "Wait, a 4 RMB/Month 200GB Server? From Alibaba? With China Unicom 9929 Premium Return Line??"
description: "By creating a Spot Instance and utilizing the monthly 200GB free CDT traffic, your monthly costs are almost entirely just the minimal storage fees!"
published: 2026-01-16
image: ../../assets/images/aliyun-ecs-4rm.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article provides a comprehensive guide to setting up a low-cost Alpine Linux server on Alibaba Cloud (China Region), specifically in the Hong Kong region. It details how to leverage Spot Instances and Cloud Data Transfer (CDT) to achieve a monthly cost of less than 5 RMB for 200GB of traffic. The guide covers downloading the Alpine image, uploading it to OSS, importing it as a custom image, configuring an ECS instance with a 1GB disk, and setting up an Elastic IP (EIP) bound to CDT. Additionally, it includes a step-by-step VNC configuration for Alpine Linux and a Cloudflare Worker script for monitoring traffic to prevent unexpected costs.
:::

# Let's Get Started
> [!CAUTION]
> Spot Instances may be reclaimed by Alibaba Cloud during peak demand. Do not use them for critical production workloads.

> [!NOTE]
> This guide uses the **Alibaba Cloud (China Region)** version. Note that for pay-as-you-go services in the China region, your account balance must be >= 100 CNY. The International version has fewer restrictions but requires an overseas phone number and credit card, and may require KYC verification.

### Download the Alpine Image
> Since our primary cost is storage, we need an extremely compact Linux image to fit onto a 1GB ESSD cloud disk. If you are a hardcore user aiming for that 1GB setup, you should use the Alpine image provided below.
>
> If you have a larger budget or need to run standard applications on Debian or Ubuntu, you'll need at least a 10GB disk, and won't need a custom image.

Alpine 60MB Mirror Link:
```bash
https://dl-cdn.alpinelinux.org/alpine/v3.23/releases/x86_64/alpine-virt-3.23.2-x86_64.iso
```

### Upload the Image to Alibaba Cloud OSS
> We need to use a custom image, which must be provided via OSS. Therefore, we'll create a temporary OSS Bucket to upload our ISO. You can delete the bucket after the process is complete to avoid ongoing storage fees.

First, go to the [OSS Management Console](https://oss.console.aliyun.com/bucket) and create a Bucket. **The region MUST be China (Hong Kong)**. Upload your ISO file and copy its URL for later use.

![](../../assets/images/aliyun-ecs-4rm-1.webp)

### Import the Image
Go to the [ECS Management Console](https://ecs.console.aliyun.com/image/region/cn-hongkong) and select "Import Image" in the top right corner.

![](../../assets/images/aliyun-ecs-4rm-2.webp)

Note that you must authorize ECS to access your OSS resources.

![](../../assets/images/aliyun-ecs-4rm-3.webp)

Fill in the details as required, and **uncheck "Check image after import"**. Do not proceed to the next step yet.

![](../../assets/images/aliyun-ecs-4rm-4.webp)

Check the option to configure cloud disk attributes and **set the disk capacity to 1GB**. Confirm all details and click "Import".

![](../../assets/images/aliyun-ecs-4rm-5.webp)

### Create an ECS Spot Instance
Go to the [ECS Management Console](https://ecs.console.aliyun.com/server/) and create a **China (Hong Kong)** instance. Ensure the settings in the red-bordered areas match.

For the **Network and Availability Zone**, Hong Kong has three zones: **B, C, and D**. Zone D is significantly more expensive than B and C. You can test each to find the best speed for your needs.

![](../../assets/images/ALIECSSNPSHOT.webp)

### Enable CDT
Go to [Cloud Data Transfer (CDT)](https://cdt.console.aliyun.com/overview) and ensure all upgrade statuses are set to "Upgraded".

![](../../assets/images/aliyun-ecs-4rm-6.webp)

### Create & Bind an Elastic IP (EIP) with CDT
> EIPs can be bound to the monthly 200GB free CDT traffic. Once bound to an instance, the EIP itself does not incur a holding fee. However, don't forget to release the EIP after deleting the instance, or it will start accruing charges.

Go to the [VPC Management Console](https://vpc.console.aliyun.com/eip/cn-hongkong/eips) and purchase an EIP as shown (the displayed price is for an unbound EIP; once bound, it becomes free to hold).

![](../../assets/images/aliyun-ecs-4rm-7.webp)

Next, bind the Elastic IP (in the screenshot, I've already bound it, so it shows "Unbind").

![](../../assets/images/aliyun-ecs-4rm-8.webp)

Finally, bind it to CDT. You can set the bandwidth as high as 2000Mbps, but 300Mbps is usually sufficient for most needs.

![](../../assets/images/aliyun-ecs-4rm-9.webp)

### Configure Alpine Linux
> When installing Alpine, you typically need to use VNC for the initial system configuration. While public images are ready to use out of the box, manual setup ensures a cleaner system.

In the [ECS Management Console](https://ecs.console.aliyun.com/server/), select your newly purchased ECS. Click **Remote Connection**, expand the options, and choose **VNC Remote Connection**.

Now for the fun part! (Values in square brackets are defaults; you can type a new value and press Enter, or just press Enter to accept the default.)

- Start the Alpine Installer:
```sql
localhost:~# setup-alpine
```

- Select Keyboard Layout:
```sql
Select keyboard layout: [none] us
Select variant: [us]
```

- Set Hostname:
```sql
Enter system hostname (fully qualified form, e.g. 'foo.example.org') [localhost] alpine-vps
```

- Configure Network Interface:
```sql
Available interfaces are: eth0 lo
Which one do you want to initialize? [eth0]
```

- Set IP Acquisition Method:
```sql
Ip address for eth0? (or 'dhcp', 'none', 'manual') [dhcp]
```

- Manual Network Configuration:
```sql
Do you want to do any manual network configuration? [no]
```

- Set Root Password (input will not be visible):
```sql
New password:
Retype password:
```

- Set Timezone:
```sql
Which timezone are you in? ('?' for list) [UTC] Asia/Shanghai
```

- Set Proxy:
```sql
HTTP/FTP proxy URL? [none]
```

- Select Software Repository Mirror: It's recommended to type `s` to list all mirrors and find the Alibaba Cloud mirror. Enter its number to ensure that subsequent `apk` installations are zero-rated (no traffic charges).

```sql
Which mirror do you want to use? (or '?' or 'done') [44] 
```

- Skip Creating a Standard User:
```sql
Setup a user? (enter a username, or 'no') [no] no
```

- Select SSH Server:
```sql
Which SSH server? ('openssh', 'dropbear', or 'none') [openssh]
```

- Allow Root Login via SSH:
```sql
Allow root ssh login? ('?' for help) [prohibit-password] yes
```

- Disk Not Found? Install to `vda` Cloud Disk:
```sql
No disk available, Try boot media /media/vda ? (y/n) [n] y
```

- Select Installation Disk:
```sql
Which disk(s) would you like to use? (or '?' for help or 'none') [none] vda
```

- Select Disk Usage Mode:
```sql
How would you like to use it? ('sys', 'data', 'crypt', 'lvm') [sys]
```

- Confirm Disk Formatting:
```sql
WARNING: Erase the above disk(s) and continue? [y/N] y
```

- Installing the System:
```sql
Installing system on /dev/sda:
  Installing alpine-base...
  Installing busybox...
  Installing openssh...
  Installing openrc...
```

- Installation Complete:
```sql
Installation is complete. Please reboot.
```

- Reboot System:
```sql
localhost:~# reboot
```

- Log in After Reboot:
```sql
alpine-vps login: root
Password:
```

- Configure DNS (Cloudflare & Google DNS):
```sql
alpine-vps:~# setup-dns
DNS Domain name? (e.g. 'bar.com') nameserver
DNS nameserver(s)? [223.5.5.5] 1.1.1.1 8.8.8.8
```

Alpine uses **APK** as its package manager. First, update the repositories:
```sql
apk update
```
Then, install some essential packages:
```sql
apk add curl unzip jq openssl tar iproute2 bash
```

### Keep-Alive & Traffic Quota Strategy
Although we've linked the EIP to CDT, and traffic will be deducted from the free monthly allowance...

Exceeding that limit will result in real charges to your account.

To prevent this, we need a monitoring service that shuts down the instance if the CDT traffic quota is nearly exhausted.

Enter... **Cloudflare Worker**!

::github{repo="afoim/cf-worker-aliyun-cdt-tracker"}

Configure five secret environment variables in your Cloudflare Worker dashboard:

| Variable Name | Description | Example / Note |
| :--- | :--- | :--- |
| `ACCESS_KEY_ID` | Alibaba Cloud AccessKey ID | `LTAIxxxxxxxxxxxx` |
| `ACCESS_KEY_SECRET` | Alibaba Cloud AccessKey Secret | `xxxxxxxxxxxxxxxxxxxxxxxx` |
| `REGION_ID` | ECS Instance Region ID | `cn-hongkong` |
| `ECS_INSTANCE_ID` | The ID of the ECS instance to monitor | `i-xxxxxxxxxxxx` |
| `TRAFFIC_THRESHOLD_GB` | Traffic threshold in GB (Default: 180) | `180` |

You'll need to create a RAM user at https://ram.console.aliyun.com/profile/access-keys to get your `ACCESS_KEY_ID` and `ACCESS_KEY_SECRET`, and assign the `AliyunECSFullAccess` and `AliyunCDTFullAccess` permissions.

Once deployed, the Cloudflare Worker will check your CDT usage every minute and stop the specified ECS instance if the threshold is exceeded.

![](../../assets/images/aliyun-ecs-4rm-10.webp)

# Billing Flowchart
Bandwidth Fee (Fixed Bandwidth Billing): Paid based on your specified peak bandwidth and billing duration, regardless of actual usage.

Traffic Fee (Usage-Based Billing): Charged per hour based on actual public network traffic.

In conclusion, the Spot ECS instance costs approximately **0.005528 RMB per hour**. For a 31-day month, that totals **4.112832 RMB**. The EIP is free once bound, CDT provides 200GB of free international traffic monthly, OSS provides 5GB of free storage, and inbound traffic is free. We have no outbound OSS traffic, or you can simply delete the OSS bucket for extra safety.

**Final monthly cost: Less than 5 RMB!**

![](../../assets/images/4411ab2fe9dfe7df65472e5b426af5671.webp)
