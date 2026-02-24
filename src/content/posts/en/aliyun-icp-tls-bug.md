---
title: "AliCloud Gateway DPI Bypass Vulnerability Analysis Report: TLS Client Hello Fragmentation Evasion"
description: ""
published: 2026-02-11
image: ""
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This report reveals a critical DPI bypass flaw in Alibaba Cloud gateways: when TLS Client Hello packets exceed MTU and are fragmented, the DPI engine fails to parse them and defaults to "fail-open," allowing traffic through. Modern browsers and tools using post-quantum crypto (like Kyber768) generate oversized Client Hellos that trigger fragmentation, thus evading SNI-based blocking. The vulnerability renders current regulatory blocking ineffective against modern HTTPS traffic, requiring DPI upgrades to support TCP stream reassembly.
:::

> [!caution]
> [[X:content]]I reported the bug, but nobody cares. I'm posting it publicly; delete this if it's inappropriate.

# Analysis Report on the DPI Bypass Vulnerability in Alibaba Cloud Gateway: TLS Client Hello Fragmentation Evasion

**Target Asset**: `0721for.me` (Unregistered domain)
**Parse IP**: `39.107.95.178` (Alibaba Cloud)
**Type of Vulnerability**: DPI Deep Packet Inspection Evasion / Fail-Open (Fail Open)
**Core Cause**: The firewall's DPI engine is unable to correctly process TCP fragmented TLS Client Hello packets

## 1. Conclusion Summary

After deep packet analysis, it was found that Alibaba Cloud Gateway's SNI blocking policy for unregistered domains has a serious underlying implementation flaw. **When TLS** `Client Hello` **packets exceed the Ethernet MTU (1500 bytes) and trigger TCP fragmentation, the DPI engine will choose to directly "allow" the traffic** due to its inability to reassemble packets or timeout during parsing.

With modern browsers (Chrome/Firefox) and new tools (Curl) defaulting to **Post-Quantum Cryptography (PQC, X25519Kyber768)**, the size of Client Hello packets has generally ballooned to over 1800 bytes. This causes normal modern HTTPS traffic to naturally bypass regulatory blocking, while older clients or manually downgraded requests are instead intercepted.

## 2. Phenomenon Comparison and Evidence Chain

We compared packet capture data under various client configurations, and the results exhibited a perfect binary opposition: **All fragmented packets are bypassed, and all non-fragmented packets are intercepted**.

| Client environment                 | TLS Key Features                   | Package size (approx) | TCP fragmentation  | Result              | Cause Analysis                     |
| --------------------- | -------------------------- | ------------ | ------- | --------------- | ------------------------ |
| **rowser: Chrome / Firefox**  | Default enable PQC (Kyber768)        | ~1900 bytes  | ✅ **Yes** | Bypass (200 OK) | Packet too large triggers fragmentation, DPI parsing failure leads to allow     |
| Curl (Linux New Version)   | Default enable PQC (Kyber768)        | ~1800 bytes  | ✅ **Yes** | Bypass (200 OK) | Same as above                       |
| Curl (TLS 1.2 spoofing) | Spoofing 1.2 but with PQC Key Share    | ~2400 bytes  | ✅ **Yes** | Bypass (200 OK) | As long as PQC supports large packages, even version number spoofing can get through     |
| `url (Manually Specified)`       | `--curves X25519` (Disable PQC) | ~300 bytes   | ❌ No     | Intercept (RST)    | Packet is complete, DPI successfully extracted SNI and intercepted    |
| Curl (Windows)    | Legacy/Schannel (without PQC)        | ~450 bytes   | ❌ No     | Intercept (RST)    | Same as above                       |
| Firefox (Required 1.2)  | Pure TLS 1.2 (without KeyShare)     | ~180 bytes   | ❌ No     | Intercept (RST)    | Pure TLS 1.2 packets are extremely small, easily parsed and intercepted by DPI |

## 3. Technical Details Analysis

### 3.1 Core Mechanism: PQC Overflows MTU

- **Introduction of PQC**: TLS 1.3 introduced support for post-quantum cryptographic algorithms. Mainstream `X25519MLKEM768` (Kyber768) key exchange requires carrying approximately **1200 bytes** of public key data in the `key_share` extension within the `Client Hello`.
- **Packet size explosion**: With other common extensions (SNI, ALPN, Signature Algorithms, etc.), the entire `Client Hello` typically ranges in length from **1800 - 2500 bytes**.
- **TCP fragmentation**: The standard Ethernet MTU is 1500 bytes. TLS handshake packets exceeding this size must be split into multiple TCP segments by the network protocol stack for transmission.

### 3.2 DPI Defect: Fail-Open

- **Analysis Logic**: The DPI engine of Alibaba Cloud Gateway appears to **only detect the first TCP packet of the TLS handshake**.
- **Truncation Failure**: For fragmented Client Hello messages, although the SNI extension is typically present in the first packet, because the TLS Record Layer's `Length` field indicates a length (e.g., 1800) much greater than the actual received first fragment length (e.g., 1400), the DPI engine will determine the message as incomplete or unparsable.
- **Strategy Selection**: To avoid expensive TCP stream reassembly under high concurrency, or to avoid false positives, DPI adopts the **Fail-Open** strategy, i.e., **"Don't care if you can't understand it"**.

### 3.3 Key Packet Capture Evidence (Wireshark Frames)

1. **Frame 4251 (Firefox - Bypass)**

- `Length: 1890`
- `[2 Reassembled TCP Segments`
- `Extension: key_share ... X25519MLKEM768`

1. **Frame 964 (Firefox Enforces TLS 1.2 - Intercept)**

- `Length: 186`
- No `key_share`, no PQC.
- Send single packet, immediate RST.

1. **Frame 568 (TLS 1.2 Spoofing - Bypass)**:

- `Version: TLS 1.2` but includes PQC Key Share.
- `Length: 2441`，chunking -> bypassed.

## 4. Hazards and Recommendations

- **Harm**: Current regulatory blocking strategies are almost entirely ineffective against modern traffic (mainstream browsers, new tools), capable of blocking only outdated devices or specific configurations of crawlers, rendering them virtually useless.
- **Recommendation**:

1. **Upgrade DPI Engine**: Must support TCP stream reassembly to ensure the ability to reconstruct and parse TLS Client Hello across packets.
2. **Optimize parsing logic**: Even without reassembly, one may attempt to extract SNI (SNI is typically early in the packet) within the first fragment, but this may be easily bypassed by padding confusion. The most reliable approach remains packet reassembly.