---
title: "Let's explore how to bypass the GFW"
description: "The GFW is commonly known as China's national network firewall. It uses various technologies to block access from within China to certain overseas websites, such as Google and Discord. However, for some blocking methods, we can bypass the GFW to access them through certain means."
category: "Reflections"
draft: true
image: ../../assets/images/Snipaste_2024-10-21_19-36-34.webp
lang: en
published: 2024-10-21
tags:
- GFW
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
The article explains how GFW blocks internet traffic through mechanisms like IP blackholing, DNS poisoning, HTTP interception, and SNI blocking. It demonstrates using Wireshark to show how SNI blocking prevents access to sites like discord.com by dropping connections upon detecting the server name. Solutions include enabling ECH (Encrypted Client Hello) for supported sites or using Accesser, a proxy tool that strips SNI to bypass blocks, though it requires local setup and may affect other traffic.
:::

### First, we need to understand how GFW blocks our traffic.

1. IP Black Hole: Currently unsolvable, but only affects certain services, such as Google-related ones (Google, Twitter, YouTube, etc.)

2. DNS poisoning: returns a false IP for a domain. This can be resolved by forcibly specifying the domain's corresponding IP via the hosts file, or by using encrypted DNS (DoH, DNSSEC, etc.).

3. HTTP Hijacking: Since the traffic is not encrypted, GFW, acting as a natural man-in-the-middle, can directly modify it (e.g., redirecting to a 404 page, hijacking to an anti-fraud page, etc.). You can avoid this by using HTTPS connections, but you may encounter SNI blocking.

4. SNI Blocking: Before establishing an encrypted connection with the server, the client sends a `Client Hello` message, which is in plaintext and typically includes `server_name`. GFW can determine which website you intend to visit and blocks domains not on the whitelist (e.g., discord.com). Since `server_name` is actually an extension and not mandatory, you can avoid SNI blocking by omitting it.

### Then, let's analyze how the GFW blocks different websites.

We use Wireshark for packet capturing.

- First, try accessing `www.baidu.com`, which is a domain not blocked by the GFW.

  1. 我们先ping一下![](../../assets/images/2024-10-21-20-16-48-image.webp)

2. Obtain IP: `2408:873d:22:18ac:0:ff:b021:1393`

  3. 通过Hosts强制绑定![](../../assets/images/2024-10-21-20-18-10-image.webp)

  4. 通过WireShark进行抓包，可以看到，客户端发送的 `Client Hello` 可以清晰地看到 `Server Name` 字段，并且也能正常收到 `Server Hello` 然后双方便开始通信![](../../assets/images/2024-10-21-20-24-03-image.webp)

  5. 查看浏览器，网站正常访问![](../../assets/images/2024-10-21-20-35-29-image.webp)

- Let's try accessing `discord.com`

  1. 我们先ping一下，可以发现，域名和解析到的IP均不通![](../../assets/images/2024-10-21-20-27-57-image.webp)

  2. 此时我们尝试使用 `itdog.cn` 进行v4 ping，并且依次对解析出的域名进行ping![](../../assets/images/2024-10-21-20-28-51-image.webp)

  3. 可见，第一个IP通![](../../assets/images/2024-10-21-20-29-40-image.webp)

  4. 强制绑定Hosts，尝试抓包![](../../assets/images/2024-10-21-20-35-58-image.webp)![](../../assets/images/2024-10-21-20-31-49-image.webp)

  5. 可见，在通过强制Hosts绑定后，在客户端发送 `Client Hello` 后被GFW检测到`Server Name` 字段，然后GFW向客户端发送一个 `RST` 报文，即要求重置客户端连接。在客户端侧，则会收到 `ERR_CONNECTION_RESET` 即：连接已重置。用户无法访问网页。![](../../assets/images/2024-10-21-20-33-23-image.webp)

### Continue, try sending an empty `Server Name` message

![](../../assets/images/2024-10-21-20-41-37-image.webp)

![](../../assets/images/2024-10-21-20-41-54-image.webp)

Successfully accessed. The `Server Name` field was not found in Wireshark

Then, is there any software that can help us avoid sending the Server Name? Yes, brother, there is.

# Method One: ECH
>Note: This method actually enables a technology that is not yet widely adopted: encrypted SNI. This method cannot restore normal access to all websites explicitly blocked by SNI. Even if the client (you) supports ECH, if the server does not support it, the server will treat it as an invalid request and reject it.
>In order for this method to work, you need to ensure:
>1. The website is hosted on Cloudflare or the hosting provider explicitly states support for ECH
>2. The website domain is blocked by SNI, and the client receives an RST packet.

First, I provide a website: https://www.cloudflare-cn.com/ssl/encrypted-sni/#results
This website allows you to check whether your browser is currently using ECH. Enter the website and click `Check My Browser`. After the check is complete, verify that the `Secure SNI` option is marked as `√`.
If you are `×`, don't be discouraged; now let's solve it
### Edge browser
Right-click the desktop shortcut, click Properties, and add `--enable-features=EncryptedClientHello` to the Target field.
Open Settings, search for DNS, and find `Use secure DNS to specify how to look up website addresses` (in the current version, I call this. Basically, it's where you configure DoH).
Select `Cloudflare (1.1.1.1)`
Test again
(Other browsers I haven't tested, but they should be similar; just search online for "enable ECH on XX browser")
Next, try accessing: https://iwara.tv. You should be able to connect directly.
# Method Two: Accesser
>This method employs a magical approach to bypass SNI blocking by using domain fronting. The principle is that the client first requests an SSL certificate from the website, then uses this generic certificate to construct a request for the desired website and sends it to the server. In this way, the GFW cannot see the specific website you intend to visit, thus preventing SNI blocking.
>Note: This method requires running a program locally and hijacking all HTTP traffic, which may cause issues that would not normally occur under normal internet access conditions. Use with caution.
>
[https://github.com/URenko/Accesser](https://github.com/URenko/Accesser)

Accesser is an HTTP proxy. It processes the terminal's HTTP outbound traffic by acting as a man-in-the-middle to bypass SNI blocking. When we normally access a website, the client sends a Client Hello message, which is in plaintext and typically carries the ServerName. At this point, GFW can block the connection by detecting the ServerName, instead of the website sending a RST packet to reset the connection, thereby achieving the effect of the website being "blocked."

Through the Accesser proxy, it will strip the ServerName and send a Client Hello. At this point, if the server supports domain fronting, it will return to the client a default SSL certificate (public key), and the client can then use this public key to send another encrypted Client Hello, this time carrying the ServerName, which will no longer be blocked by GFW. However, if the client refuses the initial Client Hello with an empty ServerName when we retrieve the public key, this method will fail. But most websites support this approach.

### Windows

- Go to the GitHub repository at the beginning

- Download the latest Release. Usually there is a `accesser.exe`

- 直接打开这个软件，看到这个画面即可![](../../assets/images/c2eed28c-6e5d-43a3-a016-8f1a38a53cbd.webp)

- 它的原理是自动设置系统代理，如果你使用了一些别的代理软件，会被覆盖![](../../assets/images/d0d8fac1-a2e5-4db2-8e25-ca5e04eb9951.webp)

### Linux (taking Debian 12 as an example)

- Install Python: `apt install python3`

- (Optional) Create a virtual environment: `python -m venv venv`

- (Optional) Enter the virtual environment: `source venv/bin/activate`

- Install Accesser: `python3 -m pip install -U accesser`

- Run: `accesser`

- It will prompt you to trust `root.crt`. Close Accesser

- My certificate file is located at `/root/Accesser/venv/lib/python3.11/site-packages/accesser/CERT/root.crt`

- Navigate to your certificate directory: `cd /root/Accesser/venv/lib/python3.11/site-packages/accesser/CERT`

- Trust certificate: `sudo cp root.crt /usr/local/share/ca-certificates/`

- Update certificate store: `sudo update-ca-certificates`

- Set global proxy: `sudo nano /etc/environment`

- ```
  http_proxy="http://127.0.0.1:7654"
  https_proxy="http://127.0.0.1:7654"
  no_proxy="localhost,127.0.0.1"
  ```

- Restarting will do.

- Testing connectivity: `curl -x https://discord.com`