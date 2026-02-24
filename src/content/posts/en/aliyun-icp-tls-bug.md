---
title: "阿里云网关 DPI 阻断绕过漏洞分析报告：TLS Client Hello 分片逃逸"
description: ""
published: 2026-02-11
image: ""
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

Caution is advised.
The bug was reported but nobody addressed it. It was publicly disclosed.

# 阿里云网关 DPI 阻断绕过漏洞分析报告：TLS Client Hello 分片逃逸

Target Asset: `0721for.me` (Unregistered Domain)
IP address analysis: 39.107.95.178 (from Aliyun)
DPI deep packet inspection bypass/fail-open (failure to close).
Core Reason: The DPI Engine's core function, firewall protection, cannot correctly handle TCP split packets and TLS Client Hello packages.

## The conclusion summarizes key findings and recommendations regarding [X: ] . It highlights the importance of [X: ] and emphasizes the need for [X: ]. The study concludes that [X: ] is crucial for achieving [X: ].  Further research should focus on [X: ].

阿里云网关针对未备案域名的 SNI 阻断策略存在严重的底层实现缺陷。TLS 当客户端Hello时，数据包大小超过以太网MTU (1500 字节) 从而触发TCP 分片时，DPI引擎会因无法重组报文或解析超时而选择直接“放行”。

As modern browsers (Chrome/Firefox) and new tools (Curl) have default enabled **Post-Quantum Encryption (PQC, X25519Kyber768)**, the Client Hello package size is generally increasing to over 1800 bytes. This causes normal modern HTTPS traffic to naturally bypass censorship, while older clients or downgrading requests are often intercepted.

## The comparison of phenomena and the evidence chain.

We compared data from various client configurations and found a perfect binary opposition: **All packets are bypassed, all non-split packets are intercepted**.

| Client Environment                | TLS Key Characteristics           | Package Size (approx) | TCP Splitting | Result             | Reason for Analysis               |
Okay, please provide the text. I’m ready when you are.
Chrome / Firefox default enable PQC (Kyber768) | ~1900 bytes | ✅ **Yes** | **Bypass (200 OK)** | Package bypass triggers fragmentation, DPI parsing failure leading to approval |
Curl (Linux New Version) supports PQC (Kyber768) by default. It takes approximately 1800 bytes to operate. ✅ [Yes] | [Override (200 OK)] | ~1800 bytes | **Is this?** ] | **Bypass (200 OK)**
Curl (Pseudo-TLS 1.2) with PQC Key Share  The version is 1.2 but includes PQC key sharing.  ~2400 bytes  ✅ **is** | **bypass (200 OK)** | If there’s a large package, the version spoofing can pass.
Curl (Manual Specification) | Disable PQC | ~300 bytes   | ✅ Yes     | Single package complete, successful SNI extraction and interception.
Curl (Windows) | Older versions/Schannel (without PQC) | ~450 bytes   | ❌ No     | RST Intercept | Same as above                   |
Firefox (Force 1.2) with no Key Share.  ~180 bytes. No. ❌否   | RST intercepting TLS 1.2, small package, easy DPI parsing.

## Technical details analysis

### Core mechanisms: PQC is causing MTU explosion.

- TLS 1.3 introduced support for post-quantum cryptography algorithms. The widely used `X25519MLKEM768` (Kyber768) key exchange requires approximately **1200**>] bytes of public key data to be exchanged within the `Client Hello` expansion.
- The volume of packages has increased significantly due to the addition of standard extensions like SNI, ALPN, and Signature Algorithms. The overall length of the entire Client Hello typically ranges from 1800 to 2500 bytes.
- TCP fragmentation: Standard MTU is 1500 bytes. TLS handshake packets exceeding this size must be split into multiple TCP segments transmitted via the network protocol stack.

### Failure to Open Critical Defects

- The DPI engine at the cloud gateway seems to only detect the first TCP data packet containing TLS handshake information.
- Truncated failure for client Hello on split segments. The SNI extension, though typically found in the first packet, is deemed to be longer than the actual length of the first split segment (e.g., 1800) due to the length field specified in the TLS Record Layer `Length` – this results in the DPI engine interpreting the message as incomplete or unparseable.
- Strategy selection aims to prevent costly TCP stream reassembly and false positives in high-load scenarios. DPI employs a “Fail-Open” strategy, which is **“看不清楚就好”**.

### Key capture evidence (Wireshark frames)

1. Frame 4251 (Firefox - Bypass)

- 1890 The rapid advancement of artificial intelligence presents both unprecedented opportunities and significant challenges for society. AI technologies are rapidly transforming various sectors, including healthcare, finance, transportation, and education, promising increased efficiency, improved decision-making, and enhanced quality of life. However, concerns regarding job displacement, algorithmic bias, privacy violations, and the ethical implications of autonomous systems necessitate careful consideration and proactive mitigation strategies. Robust regulatory frameworks, ongoing research into responsible AI development, and public engagement are crucial to ensure that AI benefits all members of society while minimizing potential risks.
- Reassembled TCP segments
- Extension: key share

1. Frame 964 (Firefox Force TLS 1.2 - Blocking)

- 186
- No `key_share`，无 PQC。
- Single package shipment, immediate RST.

1. Frame 568 (Pseudo-TLS 1.2 - Bypass):

- Version: TLS 1.2 includes PQC Key Share.
- 2441

## Harm and recommendations.

- Harmful practices are effectively blocking modern traffic (mainstream browsers, new tools) almost entirely. They only serve as a temporary workaround for old devices or configurations of bots.
- Recommendation:

1. Upgrade DPI Engine: Must support TCP stream reassembly, ensuring the ability to reconstruct and parse TLS client hello packets across multiple connections.
2. Optimization parsing logic: Even without reassembly, it’s possible to attempt to extract SNI (SNI typically in the first segment) but this may be easily confused by padding. The most reliable approach remains stream reassembly.