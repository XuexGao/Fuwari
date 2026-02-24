---
title: "Teach You to Build Your Own Anime Library and Achieve Automatic Anime Tracking!"
description: "Use AutoBangumi to download anime via qBittorrent, then use a scraper tool to scrape metadata; set it up once, and enjoy it for life."
category: "Tutorial"
image: ../../assets/images/QmXYf2u6BZMseAzjPUhcHsdfdhQpc3XkdjuEi4VvE1BkTn.webp
lang: en
published: 2025-02-25
tags: [AutoBangumi]
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide outlines how to automate anime downloading using AutoBangumi and qBittorrent, with optional Plex or FeiNiu for media management. It covers installing software, configuring RSS feeds, renaming files for metadata scraping, and accessing resources via sites like Mikanime. The process requires minimal user intervention after setup.
:::

# Implementation process:

1. Every time a new anime episode updates, AutoBangumi automatically pushes the torrent to qBittorrent for downloading and renames it.
2. Scraper software (such as Plex, FeiNiu Video setting up scheduled media library searches)
3. You just need to pick an anime, then wait for the download and watch it ~~in reality, it's not~~

### Install qBittorrent

> For downloading anime episodes

Each system has a different installation method. If you are installing a non-nox version, remember to enable the WebUI in settings and listen on 0.0.0.0:8080.

Windows: [SourceForge](https://sourceforge.net/projects/qbittorrent/files/qbittorrent-win32)

Linux: `apt/yum install qbittorrent-nox`

Docker: https://github.com/linuxserver/docker-qbittorrent

Tracker Server Directory: [List of BT Tracker servers available in China, automatically updated every 24 hours - Xiao Xiao Programming](https://www.yaozuopan.top/index.php/archives/1014/#:~:text=%E4%B8%AD%E5%9B%BD%E5%8F%AF%E7%94%A8%E7%9A%84%20BT%20T)

![8938ee430e5f74109c34c8c6d48e0e4f619cbeff.webp](../../assets/images/29e0e4c26c15463ff692aabcee747950e2d029d3.webp)

### Install [AutoBangumi](https://www.autobangumi.org/)

> Used to obtain the anime you subscribed to and automatically initiate download tasks when updates are available.

1. Install Docker; the installation methods vary across different operating systems.

2. Create a folder you like and write the following content into `docker-compose.yaml`:

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

3. Run the command: docker compose up -d

4. Enter localhost:7892. Default account: admin, default password: adminadmin

5. Click the settings icon on the left -> Download Settings, fill in the downloader information, then click the Apply button at the bottom right until the green light appears in the top right corner.

![QmbVcrgZ2C2FTt6QdfKsUkVQz9SCiQiyq1WCbphDiGW2mM.webp](../../assets/images/94f407121de7816ee2dff78f948dcc2ded27b28f.webp)

6. Go to the Citrus Plan, register an account, and subscribe to the anime you want (copy)
   ![QmXq7DcBkA4EecJikQE4snvPkNU2NQLy1EXUpAructteah.webp](../../assets/images/0e22eab8db6ed2441f3d3be0b10d51944867df0a.webp)

7. Back to AutoBangumi, click the + in the top right corner to add RSS (paste)

8. Wait quietly; AutoBangumi will automatically download the anime you've subscribed to (if not, check the AutoBangumi log or try restarting the container).

### Download old episodes or completed anime series

First, here are a few recommended resource websites (users must provide their own access tools):

1. [ACG.RIP](https://acg.rip)
2. [Apocalypse Anime Resource Network](https://share.acgnx.se)
3. Mikan Project Domestic Direct Access: 1. https://mikanime.tv 2. https://hadestian.cn 3. https://mk.misakaae.com 4. https://mikan.yujiangqaq.com 5. RSS Mirror Site: https://mikanani.longc.top
4. Mikan Plan requires a VPN: https://mikanani.me
Then find the anime you want to download

#### Standardized renaming

> In order for the software to correctly scrape metadata and episodes, we need to standardize the renaming.

Note! You only need to ensure the anime title is correct! Subdirectories can be automatically renamed by the script later! If you're unsure about the anime title, please search on TMDB: [The Movie Database (TMDB)](themoviedb.org)

> Top-level directory (QB-set download directory): No need to rename

> Secondary category (anime title, must be correct): In short, it's just very cute

> Third-level directory: (Which season of the anime): Season 1

> Fourth-level directory: (Which season and episode of the anime): S01E01.MP4

1. Go to Episode-ReName and clone the repository.   (Repository has been deleted; you may try [Episode-ReName.zip | Onani-AList](https://alist.onani.cn/Episode-ReName.zip).)   AList is dead, please try Tianyi Cloud Disk: https://cloud.189.cn/web/share?code=iQVjUnzE7fQj (Access code: i8sk)

2. Win can automatically obtain the path version .bat via the right-click menu, allowing automatic episode naming by selecting a top-level directory. If using a .py script, it can only be executed via `python3 EpisodeReName.py "D:/qbdownloads/bangumi"`

**Tip:** You can use [RaiDrive](https://onani.cn/RaiDrive) or [SSHFS](/SSHFS) to mount remote Linux files onto Windows, making it easier to manage anime series.
![QmY7KM2MjudNksqvSkkFmwFgjjdD7ZQKLDaVPXR3jnXoxw.webp](../../assets/images/5cf6dfe73164f6a869a59817df53f939e936ab00.webp)

### Install Plex (or install Feinu Cloud NAS)

> For watching anime series

1. Download Plex Media Server

2. Start. Default port 32400 (if you see garbled text upon entry, add the "/web" suffix. For example: 192.168.124.25:32400/web)

3. Choose your media library folder

4. Enable remote access, settings in the top right corner -> Remote Access

The image is from Feiniu Film & Television.

![Qmf8Q1D9fUoFbu9MQsQHvaz13p3YV2XguR3RqUAse2KBEa.webp](../../assets/images/acbde8bfd7395a8b5c744b9f1c550f3caac6c342.webp)

[[X:content]]