---
title: "Global Acceleration of Collapse Stars in Stellar Horizon 2"
description: "Due to the sensitive nature of this topic, this document is intended for professional technical discussion only. I will not provide any pre-packaged solutions or one-click downloads; please refer to the tutorial for self-implementation."
category: "Tutorial"
draft: false
image: ../../assets/images/36f34153-b96f-43ec-911e-8c3d65bc8aa0.webp
lang: en
published: 2025-04-15
tags: [崩坏星穹铁道, DLL注入]
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article details a method to bypass the ACE anti-cheat system in Honkai Star Rail using a DLL implementation and CE’s MinHook. It involves cloning the source code repository, extracting the `libMinHook.x64.lib` and `MinHook.h` files, and integrating them into the DLL. The process then utilizes Extreme Injector v3.exe to inject the compiled DLL, followed by utilizing CE's变速精灵 (speed boost) to further enhance gameplay.
:::

# Please provide the text you would like me to translate.

Injecting a DLL to bypass ACE anti-cheat and then using CE’s auto-tuning feature.

# Please provide the text you would like me to translate.

Ensure you have installed a workload in Virtual Studio 2022 using C++.

Clone the GitHub repository: [https://github.com/gmh5225/Honkai-StarRail-ACE-B](https://github.com/gmh5225/Honkai-StarRail-ACE-B)

Download the bin and lib files separately, then search for the files located in the MinHook directory within the DLL source code repository root directory.

Okay, please provide the text. I’m ready when you are.

Please provide the text you would like me to translate! I need the content to be translated.

```shell
MSBuild star_rail.sln /p:Configuration=Release /p:Platform=x64 /property:GenerateFullPaths=true
```

Product(s) are available at:

C:\x64\Release\star_rail.dll

Download and unpack Extreme Injector v3.exe from [https://github.com/master131/ExtremeInjector/master](https://github.com/master131/ExtremeInjector/master).

Normally open the game and run `Extreme Injector v3.exe`, select the game process, inject the newly compiled DLL.

Visit https://www.cheatengine.org/ to download CE, open CE, and if the game doesn’t glitch or pop up anti-cheat windows, that proves injection was successful. Next, select game process, enable "变速精灵" (变速精灵), and 2-5x speed will suffice. Enjoy!