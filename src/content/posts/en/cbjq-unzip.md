---
title: "Record of Package Dust White Ban Zone for Obtaining S-S-？CG"
description: "Loading image CG for the area of Dust White Ban District, recorded the process, to facilitate future review."
category: "Record"
published: 2025-08-24
image: '../../assets/images/2025-08-24-01-13-41-3824c5ece06cc56241688f4a4aacbcbd.webp'
tags: [尘白禁区, 解包]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article guides users through the process of downloading and installing "Dust White Forbidden Zone" (a mod for the game "Chronicle 4"), ensuring it’s fully functional from the start by directly downloading the game's executable files to their computer. It details specific steps for unpacking PAK files, extracting CG images, and utilizing a BMS tool for export and viewing. The process involves navigating to various folders within the game installation directory and using command-line tools like QuickBMS and UE Viewer.  The article provides instructions on how to export the resulting `.uasset` files to a general format for further analysis and viewing using Windows Resource Explorer.
:::

> The guide on how to unpack and export the game “Void Echo” and create mods.

# Download the White Forbidden Zone.

Go to https://www.cbjq.com/ download and install the Dust White Zone, ensuring that the launcher can start the game directly from within (meaning the complete game package is already downloaded to your computer).

![](../../assets/images/2025-08-24-01-16-37-image.webp)

# Confirmation of the Unreal Engine version.

Navigate to the directory within the EXE file that contains the main body of the Dust White Forbidden Zone game.

```bash
C:\SeasunCBJQos\Game\cbjq\game\Game\Binaries\Win64
```

Right-click `Game.exe` and select Properties, then navigate to the `Detailed Info` section. You can see it is `UE4 4.26`. Remember him; refer to the following sections for further details.

![](../../assets/images/2025-08-24-01-18-47-image.webp)

# `G:PAK file separation`

Go

```bash
C:\SeasunCBJQos\Game\cbjq\game\Game\Content\Paks
```

Here are all the PAK files, as we only need CG images, so we’ll also be unpacking similar `PAK_Game_UI_X-WindowsNoEditor.pak` files.

Folder

![](../../assets/images/2025-08-24-01-22-23-image.webp)

# **Solution:**  The solution is straightforward and involves a simple, efficient process. It’s a method that allows for rapid and reliable data transfer, minimizing latency and maximizing throughput. The core principle relies on a carefully orchestrated sequence of steps, optimized for speed and minimal disruption to existing systems. This approach effectively addresses the challenges associated with network congestion and ensures consistent performance under varying load conditions.

Download and unpack script: https://r2.072103.xyz/snowbreak.bms

Go to [Luigi Auriemma](https://aluigi.altervista.org/quickbms.htm) download `QuickBMS`.

![](../../assets/images/2025-08-24-01-22-37-image.webp)

Open

![](../../assets/images/2025-08-24-01-22-58-image.webp)

First step: Choose a package script.

![](../../assets/images/2025-08-24-01-25-15-image.webp)

Select the folder containing the original PAK files. Once selected, you can enter `*` in the filename field.

![](../../assets/images/2025-08-24-01-25-58-image.webp)

Third step: Select the index/directory.

![](../../assets/images/2025-08-24-01-26-32-image.webp)

Waiting for package delivery.

![](../../assets/images/2025-08-24-01-26-55-33683f308e84beb12f81c22c9702a4a4.webp)

Package delivered.

![](../../assets/images/2025-08-24-01-28-27-image.webp)

# View uncompressed files.

After unpacking, we received a general UE engine encapsulation `.uasset`.

We need to use another tool to export it as a general format file.

Go to [UE Viewer | Gildor's Homepage](https://www.gildor.org/en/projects/umodel#files). Click `Win32 Version` to download.

![](../../assets/images/2025-08-24-01-30-01-image.webp)

Opened `umodel_64.exe`. Filled through `QuickBMS` the output folder after unboxing, check `Override game detection`, and select UE4 4.26, which is the initial version we obtained from Unreal Engine.

![](../../assets/images/2025-08-24-01-32-43-image.webp)

So you can now view the UAsset file in the UE viewer, but it’s difficult to use with this file browser. I recommend exporting the file and then using Windows Explorer to view it.

Right-click the folder you want to export, such as `All Package` or `Game`. Click `Export folder content` . You can choose which folder to output. I’m defaulting here.

![](../../assets/images/2025-08-24-01-35-49-image.webp)

Next, you will find all general format resource files in the export folder you’ve set up, such as *mage*.

![](../../assets/images/2025-08-24-01-36-37-image.webp)

# Get CG images

Global search keywords can be used to explore.

Exported image CG files are converted to `.TGA` file format, which is a lossless image format. We can view them using [BandiView - 、](https://www.bandisoft.com/bandiview/).

![](../../assets/images/2025-08-24-01-37-40-3824c5ece06cc56241688f4a4aacbcbd.webp)