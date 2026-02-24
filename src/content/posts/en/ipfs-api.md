---
title: "Share an IPFS Image API"
description: "I've used xLog since long ago; this time, I reverse-engineered its image hosting API, which can be used to temporarily store images!"
category: "Record"
published: 2025-07-04
image: ../../assets/images/2a104c9e-195b-4f16-b080-ee76c763a80a.webp
tags: [IPFS]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
The xLog image upload API allows posting images via POST to `https://ipfs-relay.crossbell.io/upload` without authentication, using form-data with the key `file`. It returns a CID, an IPFS URL, and a direct-access web2url (with no CORS restrictions). The returned web2url can be used to publicly access the uploaded image.
:::

# Formally begin

> This API is the image hosting API for [xLog](https://xlog.app).

POST https://ipfs-relay.crossbell.io/upload

No authentication header

body uses `from-data`, key is `file`, value select an image file, not too large, otherwise it will cause an error

Example Curl

```bash
curl --location 'https://ipfs-relay.crossbell.io/upload' \
--form 'file=@"/C:/Users/AcoFork/Pictures/b_53bb4f7fa91d684e72b666504e3fcc1897.webp"'
```

will return

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

Among them, `web2url` is a URL that can be accessed directly without CORS restrictions.

![](https://eo-r2.2x.nz/myblog/img/Qmb7hj9NHf9XdSZQ2dsqcSUpdrTuhjbpKJsTqG84X7rFqw.webp)