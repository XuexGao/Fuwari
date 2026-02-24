---
title: "Sharing an IPFS image API"
description: "“I used xLog quite some time ago, and now it’s released its image library API, allowing for temporary storage of images.”"
category: "Record"
published: 2025-07-04
image: ../../assets/images/2a104c9e-195b-4f16-b080-ee76c763a80a.webp
tags: [IPFS]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article describes an API endpoint for accessing a graph database from the `xLog` service, specifically focusing on uploading images via the `from-data` parameter.  The API uses a C-URL command to upload files, with the `web2url` providing direct access to the image URL without CORS restrictions.  The response includes metadata about the uploaded file, such as its size and hash value.
:::

# Please provide the text you would like me to translate.

The xLog API is a graph-based API for the image search service.

Okay, I understand. Please provide the text.

The head has no authority.

The body uses `file`. The key is `file` and the value is a selected image file, which should not be too large and may result in an error.

Okay, please provide the text you would like me to translate. I’m ready when you are.

```bash
curl --location 'https://ipfs-relay.crossbell.io/upload' \
--form 'file=@"/C:/Users/AcoFork/Pictures/b_53bb4f7fa91d684e72b666504e3fcc1897.webp"'
```

Okay, please provide the text. I’m ready when you are.

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

Web2url is a direct URL that can be accessed without CORS restrictions.

![](https://eo-r2.2x.nz/myblog/img/Qmb7hj9NHf9XdSZQ2dsqcSUpdrTuhjbpKJsTqG84X7rFqw.webp)