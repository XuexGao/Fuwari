---
title: "Record of how batch renaming plugins are written."
description: "Due to a system reinstall, some small plugins have been lost, necessitating a re-installation and the subsequent remediation of previous issues."
published: 2025-09-06
image: '../../assets/images/2025-09-06-02-01-14-image.webp'
tags: [Python]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article describes a Python script designed to batch rename files within a specified directory, but it encounters issues with duplicate filenames and file order. The script attempts to handle this by randomly renaming files and then renames them sequentially, resolving the conflict when a file already exists. A final solution involves generating random filenames and then re-ordering them to overcome the issue of duplicate filenames.
:::

# Formal commencement.

Here’s a professional translation of the text:  “I am initiating a bulk renaming plugin development.”

```bash
编写一个重命名的脚本（Python）
让我通过 python xxx.py (目录)
传入一个目录，然后将内部的所有文件按照 1 2 3 4 5这样重命名，保留原后缀
```

The AI generated a response, but there was an interaction.

```bash
是否要对 xxx 进行批量重命名（Y/N）：
```

I requested that he delete it.

```bash
不要交互，直接运行
```

Subsequently, a new issue arose, and if a file, such as `100.webp`, already exists in Python’s default sorting process, the file may not be the **100**th entry. Consequently, other files could be renamed to `100.webp`, and the code would directly skip processing this file, leading to incomplete renaming.

Therefore, I say.

```bash
不要跳过 强制重命名
```

A new issue has arisen: attempting to rename a file already designated as `100.webp` will result in an error.

```bash
重命名文件 '716.webp' 失败: [WinError 183] 当文件已存在时，无法创建该文件。: 'C:\\Users\\acofork\\Pictures\\r1\\ri\\h\\716.webp' -> 'C:\\Users\\acofork\\Pictures\\r1\\ri\\h\\744.webp'
```

Finally, I employed a remarkable approach.

1. Randomly name all files.

2. Re-order

3. Systematically rename.

Therefore, I continue to speak.

```bash
先全部命名为 随机数，然后再重新命名
```

Here’s the translation:  “That’s right.”

![](../../assets/images/2025-09-06-02-06-32-image.webp)