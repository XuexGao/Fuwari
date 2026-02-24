---
title: "How to bypass Steam and launch games directly from Steam?"
description: "Frequent Steam single-player game buyers know that most games on Steam require Steam to run in the background when launched. So, what if I just want to play a single-player game and don’t want to launch Steam? This article will help you."
published: 2025-10-15
image: ../../assets/images/hook-steam-drm.webp
tags:
  - Steam
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
To launch a Steam game without Steam, locate the game’s `appmanifest_xxx.acf` file to extract its AppId and LastOwner. Download and configure the `steam_client_loader` tool by editing `ColdClientLoader.ini` with the AppId and setting `force_steamid.txt` and `DLC.txt` accordingly. Copy all loader files into the game folder and run `steamclient_loader.exe` to launch the game directly.
:::

# Formally begin

First, we need a complete Steam version game package.

Go to `Steam\steamapps` and you will find many `appmanifest_xxx.acf` files.

![](../../assets/images/hook-steam-drm-3.webp)

Use **Notepad** to open each one individually until you find the game you want to hook, and record the following information

![](../../assets/images/hook-steam-drm-4.webp)

Go to [Wu-Yijun/steam_client_loader](https://github.com/Wu-Yijun/steam_client_loader)

Download the latest file with the filename containing **Windows** from **Release**
![](../../assets/images/hook-steam-drm-1.webp)

Unpack and remove irrelevant files

![](../../assets/images/hook-steam-drm-2.webp)

Edit `ColdClientLoader.ini`

```
#My own modified version of ColdClientLoader originally by Rat431
[SteamClient]
Exe=manosaba.exe
ExeRunDir=.
ExeCommandLine=
#IMPORTANT:
AppId=3101040

SteamClientDll=steamclient.dll
SteamClient64Dll=steamclient64.dll
```

`Exe` Enter the name of the program to launch

`AppId` Fill in the AppId obtained in the previous step

Save

Enter `steam_settings`

Edit `force_steamid.txt` and fill in the value of the `LastOwner` field obtained in the previous step

Edit `DLC.txt` and fill in `AppId=Name`, such as

```
3101040=魔法少女ノ魔女裁判
```

Return to the root directory, copy all files into the game folder, as shown in the figure.

![](../../assets/images/hook-steam-drm-5.webp)

Then run, `steamclient_loader.exe` can directly launch the game without starting Steam.

![](../../assets/images/VMWSQyHhF5.gif)