---
title: "Recording how I wrote the batch renaming plugin"
description: "Because I reinstalled the system, some small plugins were lost and needed to be rewritten, and then I had to go through the same pitfalls again."
published: 2025-09-06
image: '../../assets/images/2025-09-06-02-01-14-image.webp'
tags: [Python]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
The user requested a Python script to batch rename files in a directory sequentially (1, 2, 3...) while preserving extensions, but encountered issues like skipped files due to sorting and overwrite conflicts. After multiple iterations, the solution was to first rename all files with random names, sort them, and then reassign sequential names to avoid collisions.
:::

# Formally begin

First, I asked the AI to write a batch renaming plugin.

```bash
编写一个重命名的脚本（Python）
让我通过 python xxx.py (目录)
传入一个目录，然后将内部的所有文件按照 1 2 3 4 5这样重命名，保留原后缀
```

Then the AI generated it, but there's an interaction.

```bash
是否要对 xxx 进行批量重命名（Y/N）：
```

I'll just let him delete it.

```bash
不要交互，直接运行
```

Then a new issue arises: if a file, such as `100.webp`, already exists, and under Python's default sorting, `100.webp` may not be the **100**th item, meaning other files will be renamed to `100.webp`, and the code will directly skip such files, leading to incomplete renaming.

Then I will say

```bash
不要跳过 强制重命名
```

Then a new issue arises: if there is already a file named `100.webp`, attempting to rename another file to `100.webp` will result in an error.

```bash
重命名文件 '716.webp' 失败: [WinError 183] 当文件已存在时，无法创建该文件。: 'C:\\Users\\acofork\\Pictures\\r1\\ri\\h\\716.webp' -> 'C:\\Users\\acofork\\Pictures\\r1\\ri\\h\\744.webp'
```

Then, finally, I came up with a brilliant idea.

1. Rename all files randomly [[X:content]]

2. Reorder

3. Rename sequentially

So I continued to say

```bash
先全部命名为 随机数，然后再重新命名
```

That's right now.

![](../../assets/images/2025-09-06-02-06-32-image.webp)