---
title: "Alibaba Cloud Gateway DPI Bypass Vulnerability: TLS Client Hello Fragmentation Escape"
description: "Analysis of DPI blocking bypass vulnerabilities via TLS Client Hello fragmentation escape."
published: 2026-02-11
image: ""
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

> [!caution]
Here’s the translation:  “The bug was reported, but no one addressed it. It was publicly disclosed, and a rollback was initiated.”

# Here’s the translation of the text:  “Analysis Report: DPI Blocking and Bypass Vulnerabilities in TLS Client Hello Fragmentation Escape”

**Target Assets**: `0721for.me` (Unregistered Domain)
**IP Analysis**: `39.107.95.178` (Alibaba)
**Vulnerability Type**: DPI Depth Packet Inspection Leak Detection / Fail-Open (Failure to Allow)
Here’s the translation:  **Core Issue:** The core issue is that the DPI Engine fails to correctly process TCP Split-Timed packets within TLS Client Hello packages.**

## Here’s the translation:  **Conclusion Summary**

Analysis of deep packet inspection reveals significant flaws in the underlying implementation of SNI blocking strategies for unregistered domain names. **TLS** `Client Hello` **Data Packet Size Exceeding MTU (1500 bytes) triggers TCP fragmentation, leading to DPI engine choosing direct "pass-through" when unable to reassemble the packet or timeout during parsing.**

With the widespread adoption of modern web browsers (Chrome/Firefox) and new tools (Curl), the Client Hello package size has significantly increased, reaching up to 1800+ bytes. This phenomenon allows for natural bypass of regulatory restrictions, while older clients or requests with manual downgrades are often intercepted.

## Here’s the translation:  “Comparative analysis and evidence chain comparison.”

We analyzed a range of client configurations and found that the resulting data captures a perfect binary opposition: **All split files were bypassed, all non-split files were intercepted**.

| Client environment                 | Key characteristics of TLS                   | Package size (approximate) | TCP Segmentation  | Result              | Analysis of causes                     |
| --------------------- | -------------------------- | ------------ | ------- | --------------- | ------------------------ |
| Chrome / Firefox  | Default enabled PQC (Kyber768)        | 1900 bytes  | ✅ Yes | bypass (200 OK) | Trigger split failed, DPI parsing failure resulted in release.     |
| Curl (Linux New Version)   | Default enabled PQC (Kyber768)        | 1800 bytes  | ✅ Yes | bypass (200 OK) | Same as before.                       |
| Curl (TLS 1.2) | Covering 1.2 with PQC Key Share    | 2400 bytes  | ✅ Yes | bypass (200 OK) | With PQC backing, the version number can be disguised.     |
| Manual Curl       | C: curves X25519 (Disable PQC) | 300 bytes   | ❌ No     | Blocking (RST)    | Complete package, successful extraction of SNI and interception.    |
| Curl (Windows)    | Old/Schannel (no PQC)        | 450 bytes   | ❌ No     | Blocking (RST)    | Same as before.                       |
| Firefox (Mandatory 1.2)  | Pure TLS 1.2 (no KeyShare)     | 180 bytes   | ❌ No     | Blocking (RST)    | Small TLS 1.2 package, easy DPI parsing interception. |

## Technical detail analysis.

### Here’s the translation of “Core Mechanism: PQC is causing a meltdown with MTU” into professional English:  “The PQC protocol is triggering a critical failure, resulting in a massive MTU (Maximum Transmission Unit) mismatch.”

- **PQC **：The TLS 1.3 protocol introduced support for post-quantum cryptography algorithms. The widely used `X25519MLKEM768` (Kyber768) key exchange relies on the `Client Hello` extension and requires approximately **1200**(bytes) of public key data to be carried within this context.
- **Significant increase in package sizes** : The addition of standard extensions such as SNI, ALPN, and signature algorithms typically results in a length of approximately 1800 to 2500 bytes for the entire `Client Hello`.
- **TCP Segmentation** : Standard Ethernet MTU (Maximum Transmission Unit Size) is set to 1500 bytes. Any TLS handshake packet exceeding this size must be split into multiple TCP segments and transmitted across the network protocol stack.

### DPI defect: Failure to Open

- Here’s the translation:  “Analysis of the DPI engine on the Alibaba Cloud gateway appears to be only monitoring the first TCP data packet containing a TLS handshake.”
- **Truncated Failure**：For Client Hello segments of a split, the SNI extension typically resides in the first packet. However, due to the length specified in the TLS Record Layer's `Length` field (such as 1800), this length exceeds the actual length received for the first split segment (e.g., 1400). DPI engines will interpret this as an incomplete or unparseable message.
- **Strategy Selection** is implemented to mitigate the cost of high-throughput TCP stream reassembly and false positive detections. DPI utilizes a “Fail-Open” strategy, defined as **“Don’t bother”**.

### Here’s the translation of “3.3 Key Capture Evidence” into professional English:  “Key capture evidence from Wireshark frames.”

1. **Frame 4251 (Firefox - Bypass)**:

- `Length: 1890` The provided text is a length measurement, indicating the total number of characters in the input. It’s a simple numerical value and doesn't require translation.
- `Reassembled TCP Segments`
- `Extension: key_share ... X25519MLKEM768`

1. **Frame 964 (Firefox  TLS 1.2 - )**: This refers to a security issue where Firefox is blocking TLS 1.2, which is a secure encryption protocol. It’s being implemented as a mandatory measure to protect against potential vulnerabilities and attacks.

- `Length: 186`
- No PQC is available.
- Immediate single-package delivery, please.

1. **Frame 568 (Pseudo-TLS 1.2 - Bypass)**:

- TLS 1.2 includes the PQC Key Share functionality.
- The process of segmentation is being circumvented.

## Harm and recommendations

- **Detrimental Effects**：Current regulatory countermeasures have rendered almost all modern traffic analysis and blocking strategies ineffective, primarily focusing on intercepting older devices or configurations designed for specific bots. This represents a largely illusory solution.
- **Recommendations**

1. **Upgrade DPI Engine** : It is essential that the engine supports TCP stream reassembly, enabling the reconstruction and parsing of TLS client hello packets across multiple connections.
2. **Refine Parsing Logic** : Even without re-segmentation, attempting to extract SNI (SNI typically appears at the front) may be susceptible to padding obfuscation. The most reliable approach remains stream reassembly.