---
title: "Oracle (Oracle Cloud) Pitfall Records"
description: "With the help of, I also successfully obtained an Oracle account. After getting my hands on it and playing around, I found quite a few pitfalls, so I'm documenting them."
published: 2025-09-08
image: '../../assets/images/2025-09-08-00-02-59-image.webp'
tags: [Oracle]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
When registering, you must select a primary region (e.g., Japan East) that cannot be changed later; popular regions reduce chances of getting free ARM instances. To use Debian, upload custom images to your Oracle Object Storage (must be in your account’s bucket), then import them into Compute Images, ensuring architecture compatibility (x86 vs ARM). Create a VCN, attach an IPv6 prefix, and launch instances using your custom Debian image with appropriate configurations. Instances may be terminated after 7 days of low usage (CPU, memory, network under 20%). Firewall rules can be adjusted via VCN security lists, though SSH access is typically configured via ufw on the server.
:::

# Area Selection

When registering, you will be asked to select a main region for your account, and once selected **cannot be changed**. I chose **Japan East (Tokyo)**. Since Oracle's ARM free machines are limited and require (grabbing), the more popular the region you choose, the lower your chance of getting an ARM machine.

# Safety

> https://cloud.oracle.com/identity/domains/my-profile/security

It is recommended to enable **Two-Factor Authentication**. Download the Oracle app on your mobile device and scan the QR code (which is essentially a networked TOTP).

![](../../assets/images/2025-09-08-00-07-32-image.webp)

If you need to change your password, it is here [[X:content]]

![](../../assets/images/2025-09-08-00-08-48-image.webp)

# No Debian system?

If you go to https://cloud.oracle.com/compute/instances/create to try creating an instance, you will find that there is no **Debian** image. We can upload our own custom image via the **My Images** option at the bottom. See the detailed steps below.

![](../../assets/images/2025-09-08-00-12-08-image.webp)

Before you proceed, if you need to upload a custom image to Oracle, you must first upload the custom image to an Object Storage bucket under your **Oracle account's Object Storage**. Simply uploading to any Object Storage bucket will not work!!!

First, download the Debian image for cloud use, go to [Download Debian](https://www.debian.org/distrib), and find **Use Debian Cloud Images** to download separately

- 64-bit AMD/Intel ([qcow2](https://cloud.debian.org/images/cloud/trixie/latest/debian-13-generic-amd64.qcow2 "用于 64 位 AMD/Intel 的 OpenStack 镜像，qcow2"), [raw](https://cloud.debian.org/images/cloud/trixie/latest/debian-13-generic-amd64.raw "用于 64 位 AMD/Intel 的 OpenStack 镜像，raw"))
- 64-bit ARM ([qcow2](https://cloud.debian.org/images/cloud/trixie/latest/debian-13-generic-arm64.qcow2 "用于 64 位 ARM 的 OpenStack 镜像，qcow2"), [raw](https://cloud.debian.org/images/cloud/trixie/latest/debian-13-generic-arm64.raw "用于 64 位 ARM 的 OpenStack 镜像，raw"))

![](../../assets/images/2025-09-08-00-17-19-image.webp)

You will receive

![](../../assets/images/2025-09-08-00-17-50-image.webp)

Go to https://cloud.oracle.com/object-storage/buckets to create a new bucket, click Edit Visibility, and change it to **Public**

![](../../assets/images/2025-09-08-00-18-34-image.webp)

![](../../assets/images/2025-09-08-00-19-23-image.webp)

Then upload the image that was just downloaded.

![](../../assets/images/2025-09-08-00-19-51-image.webp)

Go to https://cloud.oracle.com/compute/images and click **Import Image** to fill in as needed

![](../../assets/images/2025-09-08-00-21-06-image.webp)

Image type and boot mode as shown in the figure (for maximum performance)

![](../../assets/images/2025-09-08-00-21-30-image.webp)

After verification confirms no issues, click the **Import Image** button at the bottom right. It will take approximately **20min**, and the status will change to **Available**

![](../../assets/images/2025-09-08-00-22-25-image.webp)

Click one of the images to enter the detail page. For **arm image**, we need to manually adjust **compatible configurations**. Click **Operation - Edit Details** in the top right corner.

![](../../assets/images/2025-09-08-00-24-48-image.webp)

Check all options, save changes

[[You should still pay attention when creating instances to ensure you select the correct type—x86 or ARM. x86 instances cannot use ARM images, and vice versa.]]

![](../../assets/images/2025-09-08-00-25-10-image.webp)

Then click the **Create Instance** in the top right corner to create an instance using the custom image.

![](../../assets/images/2025-09-08-00-23-21-image.webp)

# Create a VCN (network)

Go to https://cloud.oracle.com/networking/vcns, click **Create VCN**, change the name, and proceed step by step.

![](../../assets/images/2025-09-08-00-27-25-image.webp)

Successfully created a network as shown in the figure.

![](../../assets/images/2025-09-08-00-27-42-image.webp)

# Attach an IPv6 prefix to the VCN

Go to https://cloud.oracle.com/networking/vcns

Enter the VCN we just created
![](../../assets/images/2025-09-09-06-18-57-image.webp)

Select **Subnet** - **Public Subnet**

![](../../assets/images/2025-09-09-06-19-57-image.webp)

Click **IP Management** in the navigation bar of the new page.

![](../../assets/images/2025-09-09-06-20-29-image.webp)

Scroll down and add **IPv6 prefix**

![](../../assets/images/2025-09-09-06-20-50-image.webp)

# Create instance

Go to https://cloud.oracle.com/compute/instances and click **Create Instance**

Here, you can change the image to a custom image, which is the Debian image we just uploaded.

![](../../assets/images/2025-09-08-00-28-44-image.webp)

Here you can modify **Architecture and Configuration**. The permanent free plan is

- VM.Standard.E2.1.Micro: **two** 1c1g x86 instances, **cannot be combined for 2c2g usage**

- VM.Standard.A1.Flex: An ARM64 instance with 4c24g, **can be split arbitrarily**

**Important Matters**

**Recovery of Idle Compute Instances**

Oracle may reclaim idle "Always Free" compute instances. A virtual machine or bare metal compute instance will be considered idle if the following conditions are simultaneously met within **7-day period**:

- **CPU Utilization** (95th percentile) is below 20%

- **Internet usage rate** is below 20%

- **Memory Usage** below 20% (only applicable to A1 specification)

![](../../assets/images/2025-09-08-00-31-25-image.webp)

Here, you can choose whether to attach **IPv4** and **IPv6** addresses, where the attachment capability of **IPv6** addresses depends on whether an **IPv6 prefix** has been attached to the VCN.

![](../../assets/images/2025-09-09-06-23-50-image.webp)

Here, you can modify the IO configuration; simply set it to maximum.

![](../../assets/images/2025-09-08-03-28-29-image.webp)

Here you can modify SSH-related configurations.

![](../../assets/images/2025-09-08-00-31-09-image.webp)

Proceed to the next step; after verification and confirmation, click **Create**

# Change firewall

> I'll directly change it to allow all; I prefer configuring ufw on Linux servers to achieve firewall functionality.

Go to https://cloud.oracle.com/networking/vcns, enter the VCN you just created, click **Security** in the navigation bar to find this

![](../../assets/images/2025-09-08-00-37-58-image.webp)

The navigation bar continues to find **Safety Rules**; I will allow all of it directly.

![](../../assets/images/2025-09-08-00-38-25-image.webp)

# Connect to the instance using SSH

Go to https://cloud.oracle.com/compute/instances to view the **public IP**. Connect to the server using your **SSH private key** through the **22 port**.

![](../../assets/images/2025-09-08-00-39-59-image.webp)

# Change root login

If you log in directly as root, it will prompt

![](../../assets/images/2025-09-08-00-41-53-image.webp)

Means: **Please log in as the user named `debian** instead of [[C:root`

Then we'll follow his suggestion and change the login name to **debian**

Tried again, successfully logged in.

![](../../assets/images/2025-09-08-00-43-13-image.webp)

First escalate privileges to **root**

```bash
sudo -i
```

Then edit the SSH public key file for the root user to allow direct login as root

```bash
nano /root/.ssh/authorized_keys
```

**Ctrl+K** Delete the warning on the first line and rewrite your SSH public key

**Ctrl+X** Save and exit, then restart **sshd**

```bash
systemctl restart sshd
```

Logged in successfully using **root**

![](../../assets/images/2025-09-08-00-46-59-image.webp)

# Auto-script to snatch ARM machines

If you select ARM when creating an instance, and you are prompted at the end of the creation process

**Insufficient capacity for AD-1 in availability domain VM.Standard.A1.Flex. Please create instances in another availability domain or try again later. If a fault domain was specified, try creating the instance without specifying a fault domain. If this does not work, please try again later. [[L:Learn more about host capacity.**

Literally, we can rely on an automated script to retry indefinitely.

Go to https://cloud.oracle.com/identity/domains/my-profile/auth-tokens, click **Add API Key**, and **Download Private Key (only once)**, then a **Profile Preview** will pop up; copy it for later use.

![](../../assets/images/2025-09-08-01-00-00-image.webp)

Clone repository [chacuavip10/oci_auto](https://github.com/chacuavip10/oci_auto)

Edit the content within `config`, clear the content, and paste the content from the previous step's ****. However, ensure that the last line is

```bash
key_file=oci_private_key.pem
```

Go to https://cloud.oracle.com/compute/instances/create and try creating an ARM instance again, then use F12 to capture the packet and view its details.

![](../../assets/images/2025-09-08-01-03-04-image.webp)

Fill in the content within `oci_auto.py`

![](../../assets/images/2025-09-08-01-08-08-image.webp)

Install dependencies

```bash
apt install python3
apt install pip
pip install oci requests
```

Running

```bash
python3 oci_auto.py
```

You can automatically claim machines; perhaps months later, you'll have an additional ARM under your account (?).

![](../../assets/images/2025-09-08-01-11-54-image.webp)