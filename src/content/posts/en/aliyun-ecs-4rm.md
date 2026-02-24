---
title: "What? A $4/month server with 200GB of bandwidth? From Alibaba? And China Unicom's 9929 premium backhaul??"
description: "By creating preemptible instances + monthly free CDT 200G traffic package, you will almost only need to pay a small amount for disk fees!"
published: 2026-01-16
image: ../../assets/images/aliyun-ecs-4rm.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide details how to deploy a lightweight Alpine Linux system on Alibaba Cloud's Hong Kong region using a 1GB ESSD disk, optimized for cost-efficiency. It covers uploading the ISO to OSS, importing it as a custom image, launching a preemptible ECS instance, binding a public IP with CDT for free bandwidth, and configuring Alpine via VNC with custom settings like SSH access, timezone, and DNS. Caution is advised as preemptible instances may be reclaimed during peak hours.
:::

# Formally begin
> [!CAUTION]
> Spot instances may be reclaimed during peak hours; do not run production workloads.

> [!NOTE]
> The following content is all demonstrated using **Alibaba Cloud Domestic Version**. Note that for pay-as-you-go services in the domestic version, the available balance in your account must be >=100 CNY. The international version has no such restriction, but requires an overseas phone number and overseas card, and may also require KYC.
### Download the Alpine image
>Since our main cost lies in the hard disk, in order to achieve extreme space compression, we need a very small Linux image so that we can install it on a 1G ESSD cloud disk. If you are also an extreme player who wants to install the system using only a 1G disk, then you absolutely need the Alpine image I provide below.
>If you have ample funds, don't care, or simply want to run normal business operations using Debian or Ubuntu, start with at least 10G and there's no need for custom images.

Alpine 60M image link
```bash
https://dl-cdn.alpinelinux.org/alpine/v3.23/releases/x86_64/alpine-virt-3.23.2-x86_64.iso
```

### Upload the image to Alibaba Cloud OSS
> Since we need a custom image but the image must be provided through OSS, we need to temporarily create an OSS Bucket instance to upload our ISO image. After the instance is successfully created, we can delete it to avoid unnecessary charges.

First, go to the [OSS Management Console](https://oss.console.aliyun.com/bucket), create a Bucket, **Make sure the region is set to Hong Kong**, and upload the ISO. Finally, copy the URL for later use.

![](../../assets/images/aliyun-ecs-4rm-1.webp)

### Import image
Go to [Cloud Server Management Console](https://ecs.console.aliyun.com/image/region/cn-hongkong), and select "Import Image" in the top right corner.
![](../../assets/images/aliyun-ecs-4rm-2.webp)

Note that authorization is required for ECS to access OSS services.
![](../../assets/images/aliyun-ecs-4rm-3.webp)

Then proceed normally, **uncheck "Run Detection After Import"** , do not click Next yet

![](../../assets/images/aliyun-ecs-4rm-4.webp)

Next, select the configuration for cloud disk attributes, and set **Set cloud disk capacity to 1GB**. Confirm that everything is correct, then import.
![](../../assets/images/aliyun-ecs-4rm-5.webp)

### Create ECS preemptible instances
Go to [Cloud Server Management Console](https://ecs.console.aliyun.com/server/), create a **Hong Kong, China** instance, and ensure the areas marked in red remain consistent.

Additionally, regarding **Network and Availability Zones**, Hong Kong has three zones: **B, C, D**. Zone D is significantly more expensive than Zones B and C; you can launch instances in all of them to test speeds and keep the best one.
![](../../assets/images/ALIECSSNPSHOT.webp)

### Enable CDT
Go to [Cloud Data Transfer](https://cdt.console.aliyun.com/overview) and set all upgrade statuses to "Upgraded".
![](../../assets/images/aliyun-ecs-4rm-6.webp)

### Create and bind an elastic public IP and attach it to the CDT
> Because the elastic public IP can be bound to CDT's monthly 200G free traffic, and after binding to an instance, the elastic public IP will no longer incur charges. If you delete the instance later, do not forget to release the elastic public IP; otherwise, charges will continue to accrue.

Enter the [VPC Management Console](https://vpc.console.aliyun.com/eip/cn-hongkong/eips) as shown to select and purchase (the displayed fee is the pure holding cost without binding; once bound, no further charges will apply).
![](../../assets/images/aliyun-ecs-4rm-7.webp)

Next, bind the elastic public IP (since I have already bound it, I will unbind it).
![](../../assets/images/aliyun-ecs-4rm-8.webp)

Next, bind the CDT here, with bandwidth that can be set up to 2000Mbps, but it is not recommended; generally, 300M is sufficient.
![](../../assets/images/aliyun-ecs-4rm-9.webp)

### Configure Alpine
> If you install Alpine, VNC is required by default to manually configure the system. If it is a public image, it is already usable, but do not forget to ensure the system remains clean.

Enter the [Cloud Server Management Console](https://ecs.console.aliyun.com/server/), select the ECS you just purchased, then click **Remote Connection**, expand more options, and choose **Connect via VNC**.

Next comes the fun part—typing commands~ (Values in square brackets are defaults; you can enter new values and press Enter to override, or simply press Enter to apply the defaults)

- Launch the Alpine installer

```sql
localhost:~# setup-alpine
```

- Select keyboard layout

```sql
Select keyboard layout: [none] us
Select variant: [us]
```

- Set the hostname

```sql
Enter system hostname (fully qualified form, e.g. 'foo.example.org') [localhost] alpine-vps
```

- Configure network card

```sql
Available interfaces are: eth0 lo
Which one do you want to initialize? [eth0]
```

- Set IP Acquisition Method

```sql
Ip address for eth0? (or 'dhcp', 'none', 'manual') [dhcp]
```

- Whether to perform manual network configuration

```sql
Do you want to do any manual network configuration? [no]
```

- Set the root password (input will not be displayed)

```sql
New password:
Retype password:
```

- Set the time zone, or (PRC)

```sql
Which timezone are you in? ('?' for list) [UTC] Asia/Shanghai
```

- Set proxy

```sql
HTTP/FTP proxy URL? [none]
```

- Select the software repository mirror. It is recommended to first input `s` to list all mirrors, then scroll up and down to find the Alibaba Cloud mirror source, and then input the corresponding mirror source number; otherwise, if you choose incorrectly, your subsequent APK installations will not bypass data charges.

```sql
Which mirror do you want to use? (or '?' or 'done') [44] 
```

- Do not create a regular user

```sql
Setup a user? (enter a username, or 'no') [no] no
```

- Select SSH Service

```sql
Which SSH server? ('openssh', 'dropbear', or 'none') [openssh]
```

- Is root allowed to log in via SSH?

```sql
Allow root ssh login? ('?' for help) [prohibit-password] yes
```

- No disk found. Install to vda cloud disk? Yes
```sql
No disk available, Try boot media /media/vda ? (y/n) [n] y
```

- Select the disk to install on

```sql
Which disk(s) would you like to use? (or '?' for help or 'none') [none] vda
```

- Select disk usage mode

```sql
How would you like to use it? ('sys', 'data', 'crypt', 'lvm') [sys]
```

- Confirm formatting the disk

```sql
WARNING: Erase the above disk(s) and continue? [y/N] y
```

- Install the system

```sql
Installing system on /dev/sda:
  Installing alpine-base...
  Installing busybox...
  Installing openssh...
  Installing openrc...
```

- Installation completed prompt

```sql
Installation is complete. Please reboot.
```

- Restart the system

```sql
localhost:~# reboot
```

- Log in after restart

```sql
alpine-vps login: root
Password:
```

- Set DNS (Cloudflare & Google DNS)

```sql
alpine-vps:~# setup-dns
DNS Domain name? (e.g. 'bar.com') nameserver
DNS nameserver(s)? [223.5.5.5] 1.1.1.1 8.8.8.8
```

Alpine's package manager is **APK**; first, we update the software sources.
```sql
apk update
```
Next, install some basic software packages.
```sql
apk add curl unzip jq openssl tar iproute2 bash
```
### Set keep-alive and usage cap strategies
Although we have connected the elastic public IP to CDT, default traffic will be deducted from CDT's free traffic quota.

But once the limit is exceeded, we will actually lose real money.

Therefore, we need a service that monitors periodically and shuts down immediately when the CDT traffic is about to run out.

Then... let's bring out the Cloudflare Worker!

::github{repo="afoim/cf-worker-aliyun-cdt-tracker"}

Configure five secret environment variables in the Cloudflare Worker dashboard.
The following secret environment variables (Secrets) need to be configured:

| Variable name                    | Description                      | Example / Notes                    |
| :--------------------- | :---------------------- | :------------------------- |
| `ACCESS_KEY_ID`        | AccessKey ID of the Alibaba Cloud account     | `LTAIxxxxxxxxxxxx`         |
| `ACCESS_KEY_SECRET`    | AccessKey Secret of Alibaba Cloud account | `xxxxxxxxxxxxxxxxxxxxxxxx` |
| `REGION_ID`            | The region ID where the ECS instance is located.         | cn-hongkong                |
| `ECS_INSTANCE_ID`      | The ECS instance ID that needs to be controlled. Obtain it from the console.  | i-xxxxxxxxxxxx             |
| `TRAFFIC_THRESHOLD_GB` | Traffic threshold (unit: GB); instances will be stopped once this value is exceeded   | `180` (Default is 180)            |

We need to go to https://ram.console.aliyun.com/profile/access-keys to create a RAM user, and you will receive `ACCESS_KEY_ID` and `ACCESS_KEY_SECRET`, and assign the permissions: `AliyunECSFullAccess` `AliyunCDTFullAccess

After successful deployment, the Cloudflare Worker will check CDT every minute; if the traffic threshold is exceeded, it will shut down the specified ECS instance.
![](../../assets/images/aliyun-ecs-4rm-10.webp)

# Billing Flowchart
Bandwidth fee (charged based on fixed bandwidth): billed based on the specified bandwidth peak and billing duration, postpaid, regardless of actual traffic usage.

Traffic fee (charged based on usage): billed according to actual public network traffic per hour.

Finally, preemptive ECS instances are charged **0.005528 RMB per hour**, amounting to **4.112832 RMB per month** for a 31-day month. Once an elastic public IP is bound, no further charges apply. CDT offers 200GB of free overseas traffic per month, with no charges if usage does not exceed this limit. OSS provides 5GB of free storage, with no charge for incoming traffic; since we have no outgoing traffic, or for safety, you may also delete it.

**Final monthly cost: less than 5 yuan!**
![](../../assets/images/4411ab2fe9dfe7df65472e5b426af5671.webp)