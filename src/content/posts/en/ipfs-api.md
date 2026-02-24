---
title: "Sharing an IPFS image API"
description: "I used xLog quite a while ago, and now it’s released its image library API – which I can use to temporarily store images."
category: "Record"
published: 2025-07-04
image: ../../assets/images/2a104c9e-195b-4f16-b080-ee76c763a80a.webp
tags: [IPFS]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Formal commencement.

This API is the Graph API for the XLog visualization tool.

POST https://ipfs-relay.crossbell.io/upload

The absence of a judgment authority.

The system utilizes the specified file (`file`) to select a picture file, with a maximum size of `from-data` and is designed to avoid errors.

示例Curl

```bash
curl --location 'https://ipfs-relay.crossbell.io/upload' \
--form 'file=@"/C:/Users/AcoFork/Pictures/b_53bb4f7fa91d684e72b666504e3fcc1897.webp"'
```

Will return.

```json
{
    "status": "ok",
    "cid": "QmVHG3KdGs3M8otdqjZEei6AzWt1usWRP6UmfLMbEub5nc",
    "url": "ipfs://QmVHG3KdGs3M8otdqjZEei6AzWt1usWRP6UmfLMbEub5nc",
    "web2url": "https://ipfs.crossbell.io/ipfs/QmVHG3KdGs3M8otdqjZEei6AzWt1usWRP6UmfLMbEub5nc",
    "fileSize": "77199",
    "gnfd_id": null,
    "gnfd_txn": null
}
```

`web2url` refers to a URL that can be directly accessed without CORS restrictions.

![](https://eo-r2.2x.nz/myblog/img/Qmb7hj9NHf9XdSZQ2dsqcSUpdrTuhjbpKJsTqG84X7rFqw.webp)