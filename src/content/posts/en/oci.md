---
title: "Oracle (Oracle's notes)"
description: "“Leveraging my financial capabilities, I successfully acquired a Kakao Account through diligent experimentation and discovery of numerous pitfalls. Consequently, I have diligently documented these experiences.”"
published: 2025-09-08
image: '../../assets/images/2025-09-08-00-02-59-image.webp'
tags: [Oracle]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Regional selection

During registration, you will be asked to select an account region. After selecting it, **不可更改** , I chose Japan East (Tokyo). Due to the free arm of the ancient oracle machine, the probability of getting one is lower if your chosen region is more popular.

# Safety measures are crucial for maintaining a secure environment. Robust protocols and continuous monitoring are essential for detecting and responding to potential threats effectively.  Effective risk assessment and mitigation strategies should be prioritized, alongside employee training and awareness programs.  Regular audits and security assessments help identify vulnerabilities and ensure compliance with relevant regulations.

https://cloud.oracle.com/identity/domains/my-profile/security

Recommended to enable two-step verification using a mobile device and scan a QR code to activate it.

![](../../assets/images/2025-09-08-00-07-32-image.webp)

If you need to change your password, please contact support.

![](../../assets/images/2025-09-08-00-08-48-image.webp)

# No Debian system?

You can try to create instances on the Cloud Oracle Compute Instances page: https://cloud.oracle.com/compute/instances/create. You will find no Debian image available. We can upload our custom images using the bottom **my_images** section, and detailed instructions are below.

![](../../assets/images/2025-09-08-00-12-08-image.webp)

Writing is required before uploading custom content to your **甲骨文账户下的对象存储**. Simply uploading a standard object storage is not sufficient.

First, download a Debian image suitable for cloud storage, enter [Download Debian](https://www.debian.org/distrib), and find **Using Debian Cloud Images** separately.

- 64-bit AMD/Intel QCOW2 raw data.
- 64-bit ARM architecture ``` QCOW2 raw and QCOW2 compressed data ```

![](../../assets/images/2025-09-08-00-17-19-image.webp)

Will you receive?

![](../../assets/images/2025-09-08-00-17-50-image.webp)

Go to https://cloud.oracle.com/object-storage/buckets to create a new storage bucket, click on the visibility settings and change it to **public**.

![](../../assets/images/2025-09-08-00-18-34-image.webp)

![](../../assets/images/2025-09-08-00-19-23-image.webp)

Then upload the video.

![](../../assets/images/2025-09-08-00-19-51-image.webp)

Go to https://cloud.oracle.com/compute/images and click **Import Video**. Fill as needed.

![](../../assets/images/2025-09-08-00-21-06-image.webp)

Video Type and Launch Mode (optimized for performance)

![](../../assets/images/2025-09-08-00-21-30-image.webp)

The content is ready for import. Please wait. It will take approximately 20 minutes to process. The status will change to available.

![](../../assets/images/2025-09-08-00-22-25-image.webp)

Click on the video to access the details page, specifically for **arm映像**. We need to manually adjust **compatible configuration**.  Tap the right-hand corner to access detailed information.

![](../../assets/images/2025-09-08-00-24-48-image.webp)

Okay, please provide the text you would like me to translate. I will only output the translated text and preserve all tags exactly as they are.

Still, it’s important to note that when creating instances, please pay close attention to whether you are using an x86 or ARM instance. An x86 instance cannot utilize ARM video, and vice versa.

![](../../assets/images/2025-09-08-00-25-10-image.webp)

Then click **Create Instance**, you can use custom instances to create an instance.

![](../../assets/images/2025-09-08-00-23-21-image.webp)

# Virtual Command Network (VCN)

Go to https://cloud.oracle.com/networking/vcns Click on "Create VCN" and follow the steps afterward.

![](../../assets/images/2025-09-08-00-27-25-image.webp)

Successfully created a network diagram as illustrated.

![](../../assets/images/2025-09-08-00-27-42-image.webp)

# The VCN has an IPv6 prefix.

https://cloud.oracle.com/networking/vcns

进入我们刚刚创建的VCN
![](../../assets/images/2025-09-09-06-18-57-image.webp)

Navigation menu options: **Submenu** - **Public Submenu**

![](../../assets/images/2025-09-09-06-19-57-image.webp)

Navigation menu click **IP Management**

![](../../assets/images/2025-09-09-06-20-29-image.webp)

Okay, please provide the text you would like me to translate. I’m ready when you are.

![](../../assets/images/2025-09-09-06-20-50-image.webp)

# Please provide the text you would like me to translate! I need the content to be translated.

Go to https://cloud.oracle.com/compute/instances and click **Create Instance**.

Here is the translation.

![](../../assets/images/2025-09-08-00-28-44-image.webp)

The permanent free architecture and configuration package is available.

- Two x86 instances, each with a 1c1g configuration, cannot be merged into a 2c2g configuration.

- VM.Standard.A1.Flex：Four ARM64 instances, **can be freely partitioned**.

Important matters

Recycling of idle computing instances

Oracle may reclaim idle “permanent free” compute instances. If the following conditions are met simultaneously within a 7-day cycle, the virtual machine and bare metal compute instance will be considered idle:

- CPU utilization rate below 20%.

- Network usage rates below 20%.

- Memory usage below 20% (only for A1 specifications).

![](../../assets/images/2025-09-08-00-31-25-image.webp)

The IPv4 and IPv6 addresses are available.

![](../../assets/images/2025-09-09-06-23-50-image.webp)

The system can be modified directly without limitations.

![](../../assets/images/2025-09-08-03-28-29-image.webp)

Here’s the SSH configuration.

![](../../assets/images/2025-09-08-00-31-09-image.webp)

Please proceed with verification after confirmation of successful completion. Click **Create**.

# Revised firewall.

I directly configured UFW on my Linux server to implement a firewall.

Go to https://cloud.oracle.com/networking/vcns, enter the VCN you just created, and navigate to the **Security** section to find this.

![](../../assets/images/2025-09-08-00-37-58-image.webp)

Navigation menu continues to find **safety rules**. I’m all clear.

![](../../assets/images/2025-09-08-00-38-25-image.webp)

# Using SSH connection

Go to https://cloud.oracle.com/compute/instances to view **Public IP**. You can connect to the server via **22 port**.

![](../../assets/images/2025-09-08-00-39-59-image.webp)

# Please log in.

If you use root directly login, you will receive an error message.

![](../../assets/images/2025-09-08-00-41-53-image.webp)

Please log in using the name “debian” instead of the root user.

We will listen to him, and we want to change the registration name to **debian**.

再次登录了

![](../../assets/images/2025-09-08-00-43-13-image.webp)

First, rank the root as **root**.

```bash
sudo -i
```

Followed the instructions.  The user can now directly log in as root using their SSH public key file.

```bash
nano /root/.ssh/authorized_keys
```

Delete the first line of warning and re-write your SSH key.

Save and exit, then restart sshd.

```bash
systemctl restart sshd
```

Re-login successfully.

![](../../assets/images/2025-09-08-00-46-59-image.webp)

# Automatic script arm machine

If you select arm during instance creation and then receive a prompt indicating that it has been created, this is a standard behavior within the framework.

The capacity of the VM is insufficient for AD-1 in Standard.A1.Flex configuration. Please create instances in other availability domains, or retry later. If you specify a fault domain, try to create an instance without specifying a fault domain. If that doesn't work, retry later.

The system can be relied upon through an automated script to run indefinitely.

Go to https://cloud.oracle.com/identity/domains/my-profile/auth-tokens. Click **Add API Key** and **Download Private Keys (only one time)**, then you will see a **Configuration Preview**. Copy it, and then use it.

![](../../assets/images/2025-09-08-01-00-00-image.webp)

Clone Repository [chacuavip10/oci_auto](https://github.com/chacuavip10/oci_auto)

Edit the content within the configuration section, delete it, and paste the contents of the previous **configuration preview** file. Ensure the final action is complete.

```bash
key_file=oci_private_key.pem
```

https://cloud.oracle.com/compute/instances/create 再次尝试创建一个ARM机子，并且F12抓包，查看该包的详情

![](../../assets/images/2025-09-08-01-03-04-image.webp)

Please fill in the content within the `oci_auto.py` section.

![](../../assets/images/2025-09-08-01-08-08-image.webp)

Install dependencies

```bash
apt install python3
apt install pip
pip install oci requests
```

Okay, please provide the text. I’m ready when you are.

```bash
python3 oci_auto.py
```

You are likely to be hacked, possibly multiple times within a few months. Your account will then be compromised.

![](../../assets/images/2025-09-08-01-11-54-image.webp)