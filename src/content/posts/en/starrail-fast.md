---
title: "Global Acceleration of Collapse Stars in Horizon Europe"
description: "Due to the sensitive nature of this topic, this content is intended for professional technical discussion only. I will not provide any pre-packaged solutions or tutorials; please refer to the instructions provided in the accompanying documentation for self-implementation."
category: "Tutorial"
draft: false
image: ../../assets/images/36f34153-b96f-43ec-911e-8c3d65bc8aa0.webp
lang: en
published: 2025-04-15
tags: [崩坏星穹铁道, DLL注入]
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article describes a method to bypass ACE anti-cheat in Honkai Star Rail using a DLL implementation and the CE tool. It involves cloning the source code from GitHub, extracting the `bin` and `lib` files, and placing them within the DLL's directory. The resulting DLL is then compiled and executed through Extreme Injector v3.exe, which enables the use of the injected DLL to bypass the anti-cheat system and increase game speed.
:::

# Here’s the translation:  **Analysis of Principles**

Injecting a DLL to bypass ACE anti-cheat and then utilizing CE’s Speed Editor to manipulate game behavior.

# Formal commencement.

Ensure you have installed the workload for your simulation in Virtual Studio 2022 using C++.

Clone DLL Source Repository: [GitHub - gmh5225/Honkai-StarRail-ACE-B: This repository offers code and instructions for circumventing the anti-cheat system in Honkai Star Rail, enabling players to access previously restricted features and enhance their gameplay. This is provided solely for informational purposes; use with caution.](https://github.com/gmh5225/Honkai-StarRail-ACE-B)

Please download the releases for [Releases · TsudaKageyu/minhook](https://github.com/TsudaKageyu/minhook/releases), specifically the binaries `bin` and `lib`. Once you have extracted these files, locate the DLL source code in the root directory of the MinHook repository.  Place the MinHook.x64.lib and MinHook.h files within this directory.

代码需要小改，这里省略

编译：

```shell
MSBuild star_rail.sln /p:Configuration=Release /p:Platform=x64 /property:GenerateFullPaths=true
```

产物在：

C:\x64\Release\star_rail.dll

Download and unpack the ExtremeInjector v3.exe from [Releases · master131/ExtremeInjector](https://github.com/master131/ExtremeInjector/releases).

Normally launch the game, run `Extreme Injector v3.exe`, select the game process and inject the newly compiled DLL.

Please download CE from [https://www.cheatengine.org/](https://www.cheatengine.org/). Once you’ve opened CE, if the game is not freezing or displaying anti-cheat windows, this indicates successful injection. Next, select the game process and enable "" (). You can achieve a 2-5x speed boost with this feature. Enjoy!