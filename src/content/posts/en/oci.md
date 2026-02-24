---
title: "Oracle (Oracle's notes)"
description: "Using the assistance of financial capabilities, I successfully acquired a WeChat account through skillful exploitation, uncovering numerous pitfalls and difficulties in its use. Consequently, I have diligently documented these experiences."
published: 2025-09-08
image: '../../assets/images/2025-09-08-00-02-59-image.webp'
tags: [Oracle]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Region Selection

Upon registering, you will be prompted to select an account region. Once selected, the region is immutable, and I have chosen Japan East (Tokyo). Due to the limited availability of Arm machines, selecting a more popular region increases your chances of securing one.

# Safety

Here’s the translation of the provided text:  “My Profile Security” – a section within Oracle Identity Management that allows users to manage their security settings and access rights for their profiles. This includes options related to authentication, authorization, and data protection. It provides a centralized location for reviewing and adjusting these configurations.

Recommended to enable **Two-Step Verification**(https://www.microsoft.com/en-us/security/products/two-step-verification) using a mobile device and scan the QR code to establish a secure TOTP.

![](../../assets/images/2025-09-08-00-07-32-image.webp)

If you need to change your password, please provide the new password here.

![](../../assets/images/2025-09-08-00-08-48-image.webp)

# Is there no Debian system?

Please attempt to create an instance on the Cloud Oracle Compute service at https://cloud.oracle.com/compute/instances/create. You will find that no Debian image is available. We can upload our custom images via the following **my_images** section, detailed instructions are provided below.

![](../../assets/images/2025-09-08-00-12-08-image.webp)

Here’s the translation:  “Please upload your custom video to the designated storage location within your **** before uploading it to the ****.  Uploading to a standard object storage service is not permitted.”

First, download a Debian image optimized for cloud deployment, navigate to [Debian Downloads](https://www.debian.org/distrib), and locate **Using Debian Cloud Images**. Download separately.

- 64-bit AMD/Intel (QCOW2) and raw data.
- 64-bit ARM architecture (QCOW2) and raw data.

![](../../assets/images/2025-09-08-00-17-19-image.webp)

Will you receive?

![](../../assets/images/2025-09-08-00-17-50-image.webp)

Go to https://cloud.oracle.com/object-storage/buckets and create a new storage bucket. Click on the "Edit Visibility" option, and set it to **Public**.

![](../../assets/images/2025-09-08-00-18-34-image.webp)

![](../../assets/images/2025-09-08-00-19-23-image.webp)

Then upload the recently downloaded footage.

![](../../assets/images/2025-09-08-00-19-51-image.webp)

Please visit [https://cloud.oracle.com/compute/images](https://cloud.oracle.com/compute/images) and click on **Import Video**. Fill in as needed.

![](../../assets/images/2025-09-08-00-21-06-image.webp)

Video type and launch mode are illustrated in the table below (optimized for performance).

![](../../assets/images/2025-09-08-00-21-30-image.webp)

Upon successful verification, click the right-hand bottom button labeled **Import Footage**. This process typically takes approximately **20 minutes**, and will transition to a state of availability **Available**.

![](../../assets/images/2025-09-08-00-22-25-image.webp)

Please click on the video to access the details page. Specifically, we need to manually adjust the **arm video**.  Upon reaching the upper right corner, click on **Operation - Detailed Information**.

![](../../assets/images/2025-09-08-00-24-48-image.webp)

全部打勾，保存更改

It is crucial to pay close attention when creating instances, ensuring you are using an x86 instance instead of an ARM instance. An x86 instance cannot utilize ARM video streams; conversely, an ARM instance cannot utilize x86 video streams.

![](../../assets/images/2025-09-08-00-25-10-image.webp)

Click on the right-hand corner **Create Instance** to utilize custom instances.

![](../../assets/images/2025-09-08-00-23-21-image.webp)

# Create a Virtual Community Network (VCN).

Please visit [https://cloud.oracle.com/networking/vcns](https://cloud.oracle.com/networking/vcns). Click on **Create VCN** and proceed to the next step.

![](../../assets/images/2025-09-08-00-27-25-image.webp)

Successfully establishing a network diagram as depicted in the image.

![](../../assets/images/2025-09-08-00-27-42-image.webp)

# Adding a VCN IPv6 prefix to an existing network.

Please visit https://cloud.oracle.com/networking/vcns.

进入我们刚刚创建的VCN
![](../../assets/images/2025-09-09-06-18-57-image.webp)

Navigation menu options are displayed as **Subgrid**.  These subgrids represent public and private subnets.

![](../../assets/images/2025-09-09-06-19-57-image.webp)

Clicking on the navigation bar in the new page will take you to the IP Management section.

![](../../assets/images/2025-09-09-06-20-29-image.webp)

往下滚动，添加 **IPv6前缀**

![](../../assets/images/2025-09-09-06-20-50-image.webp)

# Create a sample.

Please go to [https://cloud.oracle.com/compute/instances](https://cloud.oracle.com/compute/instances). Click on **Create Instance**.

Here, you can modify the video to custom footage, which is a Debian image we recently uploaded.

![](../../assets/images/2025-09-08-00-28-44-image.webp)

Available now is a permanent free plan.

- VM.Standard.E2.1.Micro: **two** 1c1g x86 instance, **not compatible for merging into 2c2g configuration**.

- VM.Standard.A1.Flex: Supports a configuration of four ARM64 instances, allowing for flexible partitioning.

**Critical Matters**

**Reclamation of Idle Compute Instances**

The Oracle platform may reclaim idle “permanent free” compute instances. If both conditions – a seven-day cycle and the presence of these instances – are met simultaneously, the virtual machine and bare metal compute instances will be classified as idle.

- CPU utilization is currently below 20 percent.

- Network usage rates are below 20 percent.

- Memory usage below 20% is limited to the A1 specification.

![](../../assets/images/2025-09-08-00-31-25-image.webp)

Here, you can choose whether to include IPv4 and IPv6 addresses.  The IPv6 address’s functionality depends on whether it is already included in a VCN with an IPv6 prefix.

![](../../assets/images/2025-09-09-06-23-50-image.webp)

Here, you can modify the IO configuration directly without further steps.

![](../../assets/images/2025-09-08-03-28-29-image.webp)

Here’s the translation:  “In this section, you can modify SSH-related configuration settings.”

![](../../assets/images/2025-09-08-00-31-09-image.webp)

Following the successful verification, proceed to click **Create**.

# Firewall changes.

I directly opted for full configuration, and I prefer to implement a firewall using UFW on Linux servers.

Please access the following link: https://cloud.oracle.com/networking/vcns, navigate to your newly created VCN, and click on **Security**.

![](../../assets/images/2025-09-08-00-37-58-image.webp)

The navigation menu continues to lead me to **Safety Rules**. I’m proceeding directly without hesitation.

![](../../assets/images/2025-09-08-00-38-25-image.webp)

# Using SSH to connect to an instance.

Please visit [https://cloud.oracle.com/compute/instances](https://cloud.oracle.com/compute/instances) to view the public IP address of instances **PublicIP**. You can connect to the server using your **SSH private key** via port 22.

![](../../assets/images/2025-09-08-00-39-59-image.webp)

# Please log in as root.

If you use root directly to log in, you will receive a warning.

![](../../assets/images/2025-09-08-00-41-53-image.webp)

Please log in using the user named “debian” instead of the root user.

We will listen to him, and we intend to change the login name to **debian**.

Again, I successfully logged in.

![](../../assets/images/2025-09-08-00-43-13-image.webp)

First, grant authority to **root**.

```bash
sudo -i
```

Following the instructions of the root user, edit the SSH public key file to enable direct root login.

```bash
nano /root/.ssh/authorized_keys
```

**Ctrl+K** Delete the first line of warnings and re-write your SSH public key.

Save and exit, then restart **sshd**.

```bash
systemctl restart sshd
```

Re-login using **root** and successfully.

![](../../assets/images/2025-09-08-00-46-59-image.webp)

# Automated script hijacking of arm machines.

If you select arm during instance creation and are prompted to create a final instance, please consult the documentation for your specific platform or system.

**Availability Domain VM.Standard.A1.Flex configuration is insufficient for AD-1. Please create instances in other availability domains, or retry later. If a failover domain is specified, try to create an instance without specifying a failover domain. If this does not work, retry later.**

The text can be translated as follows:  “By utilizing an automated script, we can achieve infinite retries.”

Please visit https://cloud.oracle.com/identity/domains/my-profile/auth-tokens. Click on **Add API Key**, then click **Download Private Key (only for this instance)**, and after that, you will see a preview of your configuration. Copy this information and paste it into the following field.

![](../../assets/images/2025-09-08-01-00-00-image.webp)

Clone Repository [chacuavip10/oci_auto](https://github.com/chacuavip10/oci_auto)

Please clear the content within the `config` section and paste the contents of **configuration preview** into its place. Ensure the final action is preserved.

```bash
key_file=oci_private_key.pem
```

Please visit the following URL: [https://cloud.oracle.com/compute/instances/create](https://cloud.oracle.com/compute/instances/create) and repeat the process of creating an ARM instance, along with capturing F12 packets to examine the instance's details.

![](../../assets/images/2025-09-08-01-03-04-image.webp)

Please enter your ticket number in the `oci_auto.py` section.

![](../../assets/images/2025-09-08-01-08-08-image.webp)

Please install dependencies.

```bash
apt install python3
apt install pip
pip install oci requests
```

运行

```bash
python3 oci_auto.py
```

Here’s the translation:  “It is possible to automatically acquire machines, and your account may soon have multiple units installed (？).”

![](../../assets/images/2025-09-08-01-11-54-image.webp)