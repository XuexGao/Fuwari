---
title: "Unpacking Dust White Forbidden Zone to Obtain \"Sessess\" (??) CG"
description: "On behalf of others, I unpacked the loading screen CG of Dust White Restricted Zone, documenting the process for future reference."
category: "Record"
published: 2025-08-24
image: '../../assets/images/2025-08-24-01-13-41-3824c5ece06cc56241688f4a4aacbcbd.webp'
tags: [尘白禁区, 解包]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide explains how to extract and view CG images from the game "" (Snowbreak) using Unreal Engine 4.26 tools. It involves downloading the game, locating and extracting specific PAK files, using QuickBMS to unpack them, and then using UModel to convert .uasset files into viewable formats like .TGA. The final step is searching for "PlotCG" to locate and view the CG images with a compatible viewer.
:::

> Referenced [Unreal 4 Game Decompile, Export, and Modding Guide - Zhihu](https://zhuanlan.zhihu.com/p/7144045084)

# Download Dust White

Go to https://www.cbjq.com/ to download and install Dust White, ensuring that the launcher allows you to start the game directly (i.e., the complete game package has been downloaded to your computer).

![](../../assets/images/2025-08-24-01-16-37-image.webp)

# Confirm Unreal Engine version

Navigate to the directory containing the main EXE file for the game "Dust White Restricted Zone", such as

```bash
C:\SeasunCBJQos\Game\cbjq\game\Game\Binaries\Win64
```

Right-click `Game.exe`, click Properties, and go to the `Details` section. You can see it is `UE4 4.26`. Remember this, as it will be used later.

![](../../assets/images/2025-08-24-01-18-47-image.webp)

# Separate out the PAK files related to CG.

Go to

```bash
C:\SeasunCBJQos\Game\cbjq\game\Game\Content\Paks
```

PAK_Game_UI_X-WindowsNoEditor.pak]].

Separate it into a separate folder

![](../../assets/images/2025-08-24-01-22-23-image.webp)

# Unpack

Download the unpacking script https://r2.072103.xyz/snowbreak.bms

Go to [Luigi Auriemma](https://aluigi.altervista.org/quickbms.htm) to download `QuickBMS`

![](../../assets/images/2025-08-24-01-22-37-image.webp)

Open

![](../../assets/images/2025-08-24-01-22-58-image.webp)

Step 1: Select the unpacking script

![](../../assets/images/2025-08-24-01-25-15-image.webp)

Step 2: Select the folder containing the original PAK file. After selecting the folder, enter `*` in the filename field.

![](../../assets/images/2025-08-24-01-25-58-image.webp)

Step 3: Select the output directory after unpacking

![](../../assets/images/2025-08-24-01-26-32-image.webp)

Waiting for unpacking

![](../../assets/images/2025-08-24-01-26-55-33683f308e84beb12f81c22c9702a4a4.webp)

Unpacking completed

![](../../assets/images/2025-08-24-01-28-27-image.webp)

# View the unpacked files

After unpacking, we obtain the general `.uasset` file packaged by the UE engine.

We need to use another tool to export it as a general-format file.

Go to [UE Viewer | Gildor's Homepage](https://www.gildor.org/en/projects/umodel#files). Click `Win32 Version` to download

![](../../assets/images/2025-08-24-01-30-01-image.webp)

Open `umodel_64.exe`. `Path to game files:` Fill in the output folder obtained after unpacking with `QuickBMS`, check `Override game detection` and select UE4 4.26, which is the Unreal Engine version we initially obtained.

![](../../assets/images/2025-08-24-01-32-43-image.webp)

This allows you to view `.uasset` files within `UE Viewer`. However, the file browser is difficult to use; I recommend exporting and viewing them with Windows Explorer.

Right-click the folder you want to export, such as `All Package` or `Game`, and click `Export folder content`. You can choose the output folder; I am using the default.

![](../../assets/images/2025-08-24-01-35-49-image.webp)

You can now view all resource files in general format within the export folder you have set, such as

![](../../assets/images/2025-08-24-01-36-37-image.webp)

# Get CG image

A global search for the keyword `PlotCG` will suffice.

The exported image CG file is a `.TGA` file, an uncompressed image format, which can be viewed using [BandiView - Image Viewer, Fast and Powerful](https://www.bandisoft.com/bandiview/).

![](../../assets/images/2025-08-24-01-37-40-3824c5ece06cc56241688f4a4aacbcbd.webp)