---
title: "Let's explore how to bypass GFW."
description: "The GFW (China Network Firewall) is a comprehensive network security system that employs various techniques to block access to websites originating from outside of China. Specifically, it targets sites like Google and Discord. However, certain blocking methods can be circumvented through strategic approaches."
category: "Writing"
draft: true
image: ../../assets/images/Snipaste_2024-10-21_19-36-34.webp
lang: en
published: 2024-10-21
tags:
- GFW
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

### First, we need to understand how GFW (Firewall) is blocking our traffic.

1. Here’s the translation:  “Black holes remain a mystery, with current understanding offering no definitive solution. However, these phenomena are currently observed primarily in service black holes, including those associated with Google (Google, Twitter, YouTube), etc.”

2. Here’s the translation:  **DNS Pollution: Returning a fake IP address.**  Using hosts files to specify a domain name and force an IP address or employing encrypted DNS (e.g., DoH, DNS signatures) can resolve this issue.

3. Here’s the translation:  **HTTP Hijacking:** Due to the lack of encryption, a GFW (Generic Web Filter) acts as a natural intermediary, enabling direct modification of requests (e.g., redirecting to 404 pages, hijacking to fraud prevention pages). HTTPS connections can be utilized to mitigate this risk, however, you may encounter SNI blocking.**

4. Here’s the translation:  **Blocking Mechanism:** When a client initiates a secure connection with a server, it sends a “Client Hello” message. This message is plaintext and typically includes the server's name (e.g., `server_name`). GFW (Global Firewall) can identify the target website to which the client is attempting to access and will block domains not present in its whitelisting (such as `discord.com`). The presence of `server_name` is an extension and doesn’t necessitate sending it to bypass SNI blocking.

### Here’s a professional translation of the text:  “Let's analyze the GFW (Great Firewall) restrictions across various websites.”

We utilize WireShark for packet capture.

- 首先尝试访问 `www.baidu.com` 这是一个没有被GFW封锁的域名
  
  1. 我们先ping一下![](../../assets/images/2024-10-21-20-16-48-image.webp)
  
  2. 得到ip： `2408:873d:22:18ac:0:ff:b021:1393` 
  
  3. 通过Hosts强制绑定![](../../assets/images/2024-10-21-20-18-10-image.webp)
  
  4. 通过WireShark进行抓包，可以看到，客户端发送的 `Client Hello` 可以清晰地看到 `Server Name` 字段，并且也能正常收到 `Server Hello` 然后双方便开始通信![](../../assets/images/2024-10-21-20-24-03-image.webp)
  
  5. 查看浏览器，网站正常访问![](../../assets/images/2024-10-21-20-35-29-image.webp)

- 让我们试试访问 `discord.com`
  
  1. 我们先ping一下，可以发现，域名和解析到的IP均不通![](../../assets/images/2024-10-21-20-27-57-image.webp)
  
  2. 此时我们尝试使用 `itdog.cn` 进行v4 ping，并且依次对解析出的域名进行ping![](../../assets/images/2024-10-21-20-28-51-image.webp)
  
  3. 可见，第一个IP通![](../../assets/images/2024-10-21-20-29-40-image.webp)
  
  4. 强制绑定Hosts，尝试抓包![](../../assets/images/2024-10-21-20-35-58-image.webp)![](../../assets/images/2024-10-21-20-31-49-image.webp)
  
  5. 可见，在通过强制Hosts绑定后，在客户端发送 `Client Hello` 后被GFW检测到`Server Name` 字段，然后GFW向客户端发送一个 `RST` 报文，即要求重置客户端连接。在客户端侧，则会收到 `ERR_CONNECTION_RESET` 即：连接已重置。用户无法访问网页。![](../../assets/images/2024-10-21-20-33-23-image.webp)

### 继续，尝试发送空 `Server Name` 报文

![](../../assets/images/2024-10-21-20-41-37-image.webp)

![](../../assets/images/2024-10-21-20-41-54-image.webp)

Successfully connected. In WireShark, the “Server Name” field was not found.

Here’s a professional translation of the text:  “Are there any software solutions that can help us avoid sending the server name?”

# Method One: ECH
Please note: This method actually implements a yet-to-be-widely adopted technology: Encryption SNI. It does not guarantee that all websites explicitly blocked by SNI will regain normal access. While the client (you) supports ECH, if the server does not support it, it is considered an unauthorized request by the server, and will be rejected.
If you desire this method to work, ensure that:
The website is hosted on Cloudflare or with a provider that supports ECH.
Website domain registration was blocked by SNI, resulting in a client receiving an RST packet.

Here’s the translation:  “I am providing a website: https://www.cloudflare-cn.com/ssl/encrypted-sni/#results.”
This website allows you to check if your browser is utilizing ECH (Enhanced ECH). To initiate the process, navigate to the site and click on `Check My Browser`. Once the check is complete, verify whether either of the following options is set to “√” (Yes): `√`
If you’re feeling discouraged, let’s work through this together.
### Edge browser.
Right-click the desktop shortcut and select "Properties." In the target pane, add a `--enable-features=EncryptedClientHello`.
Open the settings, search for DNS, and locate `Specify secure DNS to determine website addresses`. This is the section where you configure DoH.
Choose `Cloudflare (1.1.1.1)`
Please retest.
Here’s the translation:  “Other browsers should function similarly; you can check this by opening [XX Browser] and enabling the ECH feature.”
Next, you should be able to access it directly via the website: [https://iwara.tv](https://iwara.tv)
# Method Two: Accesser
Here’s the translation:  “This method bypasses SNI blocking by employing a client-side approach. The technique involves instructing the client to first locate the SSL certificate required for the target website, then generate a generic certificate that is then sent to the server, effectively obscuring the intended destination from the GFW (Group Firewall).”
Please note that this method requires running a program locally and intercepting all HTTP traffic, which may result in issues with normal internet connections. Use it at your own risk.
>
[URenko/Accesser](https://github.com/URenko/Accesser)

Accesser is an HTTP proxy. It handles HTTP traffic from endpoints through intermediary entities, bypassing SNI blocking. When clients access websites normally, they send a Client Hello message; this message is plain text and typically includes the Server Name. GFW (Group Firewall) can then detect the Server Name and block the connection instead of forwarding the request to the client, effectively creating a "wall" effect around the website.

Through Accesser’s proxy, the system will clear ServerName and then send a Client Hello. At this point, if the server supports wildcard SSL certificates, it will return the client a default SSL certificate (public key) and the client can subsequently use this public key to re-establish an encrypted Client Hello. However, if the client refuses a Client Hello with an empty ServerName when initially obtaining the public key, this method becomes ineffective; however, most websites support this configuration.

### Windows

- Please visit the GitHub repository at the beginning of the project.

- Download the latest release. Typically, there is a `accesser.exe` available.

- 直接打开这个软件，看到这个画面即可![](../../assets/images/c2eed28c-6e5d-43a3-a016-8f1a38a53cbd.webp)

- 它的原理是自动设置系统代理，如果你使用了一些别的代理软件，会被覆盖![](../../assets/images/d0d8fac1-a2e5-4db2-8e25-ca5e04eb9951.webp)

### Linux (on Debian 12)

- Install Python: `apt install python3`

- Create a virtual environment: `python -m venv venv`

- Entering a virtual environment: `source venv/bin/activate`

- Install Accesser: `python3 -m pip install -U accesser`

- Running: `accesser`

- It will prompt you to trust the root certificate of Accesser. Please close it.

- My certificate file is located in the following directory: `/root/Accesser/venv/lib/python3.11/site-packages/accesser/CERT/root.crt`

- Navigate to your certificate directory using the command `cd /root/Accesser/venv/lib/python3.11/site-packages/accesser/CERT`.

- Trust Certificate: `sudo cp root.crt /usr/local/share/ca-certificates/`

- Update CA Certificates: `sudo update-ca-certificates`

- Set global proxy settings: `sudo nano /etc/environment`

- ```
  http_proxy="http://127.0.0.1:7654"
  https_proxy="http://127.0.0.1:7654"
  no_proxy="localhost,127.0.0.1"
  ```

- Restart now.

- Testing connectivity: `curl -x https://discord.com`