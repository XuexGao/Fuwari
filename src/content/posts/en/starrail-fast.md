---
title: "Honkai: Star Rail Global Acceleration"
description: "Because this article involves sensitive areas, it is only for professional technical discussion, and I will not release any one-click packages. Please follow the tutorial and do it yourself."
category: "Tutorial"
draft: false
image: ../../assets/images/36f34153-b96f-43ec-911e-8c3d65bc8aa0.webp
lang: en
published: 2025-04-15
tags: [崩坏星穹铁道, DLL注入]
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide explains how to bypass Honkai Star Rail’s ACE anti-cheat by injecting a custom DLL using MinHook and Extreme Injector, then enabling speed hacks via Cheat Engine. It requires Visual Studio 2022, cloning a GitHub repo, compiling the DLL, and injecting it into the game process. Success is confirmed when the game runs without anti-cheat detection, allowing speed manipulation.
:::

# Principle Analysis

Inject a DLL to bypass ACE anti-cheat, then use CE's speed hack.

# Formally begin

Make sure you have installed the Workload: Desktop development with C++ in Visual Studio 2022

Clone DLL source code repository: [GitHub - gmh5225/Honkai-StarRail-ACE-B: This repository provides code and instructions for bypassing the anti-cheat system in the Honkai Star Rail game, allowing players to access previously restricted features and improve their gameplay experience. For informational purposes only. Use at your own risk.](https://github.com/gmh5225/Honkai-StarRail-ACE-B)

Go to [Releases · TsudaKageyu/minhook](https://github.com/TsudaKageyu/minhook/releases) and download `bin` and `lib`. After extracting them, locate the files `libMinHook.x64.lib` and `MinHook.h` and place them in the root directory of the DLL source code repository.

The code requires minor adjustments, which are omitted here.

Compilation:

```shell
MSBuild star_rail.sln /p:Configuration=Release /p:Platform=x64 /property:GenerateFullPaths=true
```

Products are at:

`\x64\Release\star_rail.dll`

Go to [Releases · master131/ExtremeInjector](https://github.com/master131/ExtremeInjector/releases) to download and extract, obtaining `Extreme Injector v3.exe`

Launch the game normally, run `Extreme Injector v3.exe`, select the game process, and inject the DLL that was just compiled.

Go to https://www.cheatengine.org/ to download CE, open CE, and if the game does not crash or pop up an anti-cheat window, it proves that injection was successful. Next, select the game process, enable the speed booster, set it to 2-5x speed. Enjoy it!