---
title: "What? 4 yuan monthly 200GB server? Or AliExpress? And is there a 9929 Silk Return from Union Telecom?"
description: "Here’s a professional translation of the text:  “Leveraging our rapid instance creation and offering a free CDT bandwidth package each month, you can significantly reduce your hardware costs.”"
published: 2026-01-16
image: ../../assets/images/aliyun-ecs-4rm.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Please provide the text you would like me to translate.
[!CAUTION]
Retaining instances during peak periods can lead to recovery, so avoid disrupting production operations.

Okay, I understand. Please provide the text.
The content is presented as a demonstration from Alibaba’s domestic version, and be aware that in the domestic version, billing is based on usage. For international versions, there are no limitations, but you may need to provide a KYC verification for overseas phone numbers and cards.
### Download Alpine Linux image.
Due to our primary cost being on the hard drive, we need a very small Linux image for maximum space compression in order to install it using a 1GB ESSD cloud storage account. If you are also a hardcore gamer, and only have 1GB disk space, you will undoubtedly use my below-provided Alpine image.
If you have a lot of money, don't care, or want to start with 10GB, and you’re using Debian or Ubuntu, then let’s begin with 10GB – no custom images are required.

Alpine 60M镜像链接
```bash
https://dl-cdn.alpinelinux.org/alpine/v3.23/releases/x86_64/alpine-virt-3.23.2-x86_64.iso
```

### Upload images to Alibaba OSS.
Due to the need for custom images, but which must be provided through OSS, we need to temporarily create an OSS bucket instance to upload our ISO images. Once the instance is successfully created, we can delete it to avoid unnecessary fees.

First, go to [OSS Management Control Panel], create a Bucket, and set the region to China Hong Kong, and upload ISO files, and then copy the URL as a backup.

![](../../assets/images/aliyun-ecs-4rm-1.webp)

### 导入镜像
前往 [云服务器管理控制台](https://ecs.console.aliyun.com/image/region/cn-hongkong) ，选择右上角的 导入镜像
![](../../assets/images/aliyun-ecs-4rm-2.webp)

注意需要授权ECS访问OSS业务
![](../../assets/images/aliyun-ecs-4rm-3.webp)

Please provide the text you would like me to translate.

![](../../assets/images/aliyun-ecs-4rm-4.webp)

接下来勾选配置云盘属性，并且将 **云盘容量设置为1GB** ，确认无误，导入
![](../../assets/images/aliyun-ecs-4rm-5.webp)

### Creating ECS instances
Go to the Cloud Server Management Control Panel, create a China Hong Kong instance, and be mindful of the red-bordered areas.

另外，对于 **网络及可用区** ，香港一共有 **B、C、D** 三个区，D区比B、C区贵不少，可以都开开测个速，留下最好的
![](../../assets/images/ALIECSSNPSHOT.webp)

### 开通CDT
前往 [云数据传输](https://cdt.console.aliyun.com/overview) 将升级状态全部变为已升级即可
![](../../assets/images/aliyun-ecs-4rm-6.webp)

### Create and bind a flexible public IP address and attach to UTC.
Because the elastic public IP address can bind 200GB of free bandwidth to CDT, and after binding, the elastic public IP will no longer be charged. If you don’t release the elastic public IP when deleting subsequent streams, it will continue to be charged.

进入 [专有网络管理控制台](https://vpc.console.aliyun.com/eip/cn-hongkong/eips) 如图选择，然后购买即可（这里显示的费用是纯持有不绑定的费用，一旦绑定就不计费了）
![](../../assets/images/aliyun-ecs-4rm-7.webp)

接下来绑定弹性公网IP（因为我绑定过了，所以是解绑）
![](../../assets/images/aliyun-ecs-4rm-8.webp)

接下来在这里绑定CDT，带宽最高可以拉到 2000Mbps，但是不推荐，一般300M够用了
![](../../assets/images/aliyun-ecs-4rm-9.webp)

### Okay, here’s the translation of the provided text:  Configuration Alpine
If you have installed Alpine, it’s typically required to access a manual configuration via VNC. However, if you are using a public image, it is already functional, but remember to ensure the system remains clean.

Enter the Cloud Server Management Console. Select your newly purchased ECS, then click **Remote Connection**. Expand to select **Through VNC Remote Connection**.

Okay, I understand. Please provide the text.

- Start Alpine installation software.

```sql
localhost:~# setup-alpine
```

- Keyboard layout

```sql
Select keyboard layout: [none] us
Select variant: [us]
```

- Setting hostname

```sql
Enter system hostname (fully qualified form, e.g. 'foo.example.org') [localhost] alpine-vps
```

- Set network card

```sql
Available interfaces are: eth0 lo
Which one do you want to initialize? [eth0]
```

- Set your IP address acquisition method.

```sql
Ip address for eth0? (or 'dhcp', 'none', 'manual') [dhcp]
```

- Whether to perform manual network configuration.

```sql
Do you want to do any manual network configuration? [no]
```

- Set root password (input will not be displayed)

```sql
New password:
Retype password:
```

- Setting time zone or (PRC)

```sql
Which timezone are you in? ('?' for list) [UTC] Asia/Shanghai
```

- Please provide the text you would like me to translate.

```sql
HTTP/FTP proxy URL? [none]
```

- 选择软件仓库镜像。这个地方建议先输入 `s` 列出所有镜像，然后上下翻找找到阿里云镜像源，然后输入对应镜像源编号，否则选错了你后续通过apk安装软件的时候不会免流
 
```sql
Which mirror do you want to use? (or '?' or 'done') [44] 
```

- Okay, please provide the text you would like me to translate. I’m ready when you are.

```sql
Setup a user? (enter a username, or 'no') [no] no
```

- Choose SSH services.

```sql
Which SSH server? ('openssh', 'dropbear', or 'none') [openssh]
```

- Is it permitted for a root user to log in via SSH?

```sql
Allow root ssh login? ('?' for help) [prohibit-password] yes
```

- 没有找到磁盘，是否安装至 vda 云盘，是
```sql
No disk available, Try boot media /media/vda ? (y/n) [n] y
```

- The disk to be installed should be selected.

```sql
Which disk(s) would you like to use? (or '?' for help or 'none') [none] vda
```

- Disk usage options

```sql
How would you like to use it? ('sys', 'data', 'crypt', 'lvm') [sys]
```

- Confirm disk format.

```sql
WARNING: Erase the above disk(s) and continue? [y/N] y
```

- Install system

```sql
Installing system on /dev/sda:
  Installing alpine-base...
  Installing busybox...
  Installing openssh...
  Installing openrc...
```

- Okay, please provide the text you would like me to translate.

```sql
Installation is complete. Please reboot.
```

- Restart system

```sql
localhost:~# reboot
```

- Please provide the text you would like me to translate.

```sql
alpine-vps login: root
Password:
```

- Set up Cloudflare and Google DNS.

```sql
alpine-vps:~# setup-dns
DNS Domain name? (e.g. 'bar.com') nameserver
DNS nameserver(s)? [223.5.5.5] 1.1.1.1 8.8.8.8
```

Alpine的软件包管理器为 **APK** ，首先我们先更新软件源
```sql
apk update
```
接下来，安装一些基本的软件包
```sql
apk add curl unzip jq openssl tar iproute2 bash
```
### 设置保活&用量封顶策略
虽然我们将弹性公网IP连接了CDT，默认流量会从CDT的免费流量份额里面扣

However, exceeding this limit will result in a loss of our precious gold and silver.

So, we need a service for scheduled monitoring that detects when CDT traffic is nearing exhaustion and immediately shuts down.

Cloudflare Worker!

github repository: afoim/cf-worker-aliyun-cdt-tracker

In Cloudflare Worker’s dashboard configuration, you can set five secret environment variables.
Secrets: ``` API_KEY=your_api_key DATABASE_URL=your_database_url DEBUG=true ```

Okay, please provide the text. I’m ready when you are.
Okay, please provide the text. I’m ready when you are.
Access Key ID for your Alibaba account.
Access Key Secret from Alibaba Cloud account.
ECS instance location ID.
| i-xxxxxxxxxxxx             | Required ECS Instance ID. Obtain from control panel.
Traffic threshold (in GB), exceeding this value will stop instances.

You will receive an ACCESS_KEY_ID and ACCESS_KEY_SECRET when you create a RAM user on https://ram.console.aliyun.com/profile/access-keys. This allows you to assign full access: `AliyunECSFullAccess`.

部署成功后，Cloudflare Worker将在每分钟检查一次CDT，如果超出流量阈值，会将指定ID的ECS停止
![](../../assets/images/aliyun-ecs-4rm-10.webp)

# Here’s a breakdown of our payment process:  1.  **Payment Method Selection:** Choose your preferred method (e.g., credit card, debit card, online transfer). 2.  **Account Verification:** Verify your account details to ensure security. 3.  **Transaction Initiation:** Submit your payment request. 4.  **Confirmation & Receipt:** Receive a confirmation message and a receipt detailing the transaction.
Bandwidth charges are billed based on a fixed bandwidth peak and billing duration.

Monthly data charges based on actual usage of public networks.

The ECS instance incurs a fee of 0.005528 yuan per hour, totaling 31 days of monthly fees of 4.112832 yuan, and an additional 200G overseas data allowance free each month, without exceeding the allowance, and no traffic is recorded. The CDT offers free 200G international data flow per month, not exceeding the limit, and no traffic is recorded.

**最终每月成本：不到5元！**
![](../../assets/images/4411ab2fe9dfe7df65472e5b426af5671.webp)