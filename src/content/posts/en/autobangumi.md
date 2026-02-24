---
title: "Teach you how to build your own TV series library, and achieve automatic re-watching!"
description: "Using AutoBangumi to download dramas and then using The Skizer app for reviews, I’ve established a comprehensive viewing experience."
category: "Tutorial"
image: ../../assets/images/QmXYf2u6BZMseAzjPUhcHsdfdhQpc3XkdjuEi4VvE1BkTn.webp
lang: en
published: 2025-02-25
tags: [AutoBangumi]
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# 实现流程：

1. When new anime episodes are updated, AutoBangumi automatically pushes the seed download and renames it.
2. Here’s the translation:  “Scraping software, such as Plex and FlyNow Media Settings, automatically searches media libraries for content.”
3. Please select your desired fruit, and wait for the download and viewing to complete. It’s not quite as simple as that.

### Installation of BitTorrent (QBittorrent)

For downloading dramas.

Here’s the translation:  Different installation methods apply to each system. If you are installing the Nonox version, please ensure that WebUI is opened and configured to listen on 0.0.0.0:8080.

Windows: [SourceForge](https://sourceforge.net/projects/qbittorrent/files/qbittorrent-win32)

Linux: Install the qBittorrent-Nox package using yum.

Docker: [https://github.com/linuxserver/docker-qbittorrent]

Tracker Server Archive: [Comprehensive list of available BT Tracker servers in China, automatically updated every 24 hours – Xiaomi Editor Chen](https://www.yaozuopan.top/index.php/archives/1014/#:~:text=%E4%B8%AD%E5%9B%BD%E5%8F%AF%E7%94%A8%E7%9A%84%20BT%20T)

![8938ee430e5f74109c34c8c6d48e0e4f619cbeff.webp](../../assets/images/29e0e4c26c15463ff692aabcee747950e2d029d3.webp)

### Installation of [AutoBangumi](https://www.autobangumi.org/)

Here’s the translation:  “This feature allows you to obtain your subscription and automatically initiate download requests upon updates.”

1. Here’s the translation:  “Install Docker across various operating systems presents unique installation methods.”

2. Create a folder named “docker-compose.yaml” in your preferred location and populate it with the following content:

```yaml
version: "3.8"

services:
  AutoBangumi:
    image: ghcr.io/estrellaxd/auto_bangumi:latest
    container_name: AutoBangumi
    volumes:
      - ./config:/app/config
      - ./data:/app/data
    ports:
      - "7892:7892"
    network_mode: bridge
    restart: unless-stopped
    dns:
      - 223.5.5.5
    environment:
      - TZ=Asia/Shanghai
      - PGID=$(id -g)
      - PUID=$(id -u)
      - UMASK=022
```

3. To run Docker Compose, execute the following command:  ```bash docker compose up -d ```

4. Entering localhost at port 7892, the default account is admin, and the default password is adminadmin.

5. Click the icon for settings on the left side -> Download Settings, enter download information, and then click the green light at the bottom right of the application.

![QmbVcrgZ2C2FTt6QdfKsUkVQz9SCiQiyq1WCbphDiGW2mM.webp](../../assets/images/94f407121de7816ee2dff78f948dcc2ded27b28f.webp)

6. 前往蜜柑计划，注册账号，并订阅你想要的番剧（复制）
   ![QmXq7DcBkA4EecJikQE4snvPkNU2NQLy1EXUpAructteah.webp](../../assets/images/0e22eab8db6ed2441f3d3be0b10d51944867df0a.webp)

7. Returning to AutoBangumi, click the plus symbol in the upper right corner to add RSS (paste).

8. Waiting patiently, and without incident, AutoBangumi will automatically download your subscribed anime. If you don’t have access to the logs or want to try restarting the container, please check there.

### Download previous seasons or completed series.

Here are a few resources for ladders, including those you can set up yourself:  *   [https://www.amazon.com/Ladder-Set-Portable-Outdoor-Storage/dp/B07XJ9683Y](https://www.amazon.com/Ladder-Set-Portable-Outdoor-Storage/dp/B07XJ9683Y) *   [https://www.homedepot.com/c/Tools-Hardware/Ladders-and-Steps-412533](https://www.homedepot.com/c/Tools-Hardware/Ladders-and-Steps-412533) *   [https://www.walmart.com/ip/Portable-Outdoor-Ladder-Set-with-Storage-687908](https://www.walmart.com/ip/Portable-Outdoor-Ladder-Set-with-Storage-687908)

1. [ACG.RIP](https://acg.rip)
2. [Endless Anime Resources](https://share.acgnx.se)
3. The Mikanime project operates with direct, domestic connections:  1.  [https://mikanime.tv](https://mikanime.tv) 2.  [https://hadestian.cn](https://hadestian.cn) 3.  [https://mk.misakaae.com](https://mk.misakaae.com) 4.  [https://mikan.yujiangqaq.com](https://mikan.yujiangqaq.com) 5.  [https://mikanani.longc.top](https://mikanani.longc.top)
4. The Mikanani plan requires bypassing the firewall: https://mikanani.me
Please find the desired anime download.

#### Standardize naming conventions.

To ensure proper metadata and series scraping, we need to establish standardized naming conventions.

Please ensure the correct TV show title is provided. The sub-directory can automatically rename itself based on the script. If you are unsure of the TV show title, please search [The Movie Database (TMDB)](themoviedb.org) on TMDB.

Level 1 directory (download location specified in qb) – no renaming required.

Here’s the translation:  “The second-level directory (series title) is simply adorable.”

Level 3 Directory: Season 1

Fourth Season, Episode 1: [S01E01] MP4

1. Please visit Episode-ReName, the Cloning Repository.  (Note: This repository has been deleted and may be unavailable. You can try accessing it via Onani-AList: https://cloud.189.cn/web/share?code=iQVjUnzE7fQj (Access Code: i8sk)).

2. The path to the “Win Can Automatically Get Path Version.bat” file can be accessed via the right-click menu. Clicking on a directory level with the right-click option will automatically rename episodes based on their names in the current directory. If using a .py script, this functionality is limited to `python3 EpisodeReName.py "D:/qbdownloads/bangumi"`.

**小贴士：** 可以使用[RaiDrive](https://onani.cn/RaiDrive)或[SSHFS](/SSHFS)将远程的Linux文件映射到Windows上，管理番剧更方便
![QmY7KM2MjudNksqvSkkFmwFgjjdD7ZQKLDaVPXR3jnXoxw.webp](../../assets/images/5cf6dfe73164f6a869a59817df53f939e936ab00.webp)

### Here’s the translation:  “Install Plex or configure your Flybox NAS.”

For viewing television dramas.

1. Download Plex Media Server

2. Initiate. Default port 32400 (if entering gibberish, add /web suffix, e.g., 192.168.124.25:32400/).

3. Select your media library folder.

4. Set remote access via the upper right corner – Configure Remote Access.

Here’s the translation:  *mage of Fei Bowen Film*

![Qmf8Q1D9fUoFbu9MQsQHvaz13p3YV2XguR3RqUAse2KBEa.webp](../../assets/images/acbde8bfd7395a8b5c744b9f1c550f3caac6c342.webp)

Please enjoy this.