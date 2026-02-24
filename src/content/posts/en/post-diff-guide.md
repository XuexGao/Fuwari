---
title: "Article Update Notification Feature User Guide - Super Awesome!"
description: "That super cool little bell in the bottom right corner—how exactly do I use it?"
category: "Announcement"
published: 2026-02-22
image: ../../assets/images/post-diff-guide.png
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
A small bell icon at the bottom-right of the blog now alerts users to article updates. It automatically detects changes in content, titles, or descriptions since the last visit and highlights modifications with color-coded diffs. Users can view updated articles, clear notifications, or ignore them without manual intervention.
:::

> Yes, that's the small bell in the bottom-right corner that you're currently seeing.

You may have noticed that a small bell icon has appeared in the bottom right corner of the blog recently. This is not a subscription notification (although it looks similar), but rather a **client-side article update detection system**.

# Why are we doing this?

Often, after we finish writing an article, we may discover misspellings, or certain viewpoints need to be supplemented, or even content needs to be deleted or revised for certain reasons.

For readers (that is, you), if you’ve seen this article before and come back again, it might be hard to tell exactly what has changed. Did you just tweak a punctuation mark? Or did you add a whole chunk of valuable content?

To solve this "spot the difference" puzzle, we've introduced this feature. It will record the version of the article from your last visit and, when you next visit, automatically compare it with the latest version on the server, telling you: **This article has changed—specifically, where it changed.**

---

# Method of consumption

It's actually very simple; the entire process is fully automated and requires no manual intervention from you.

## 1. Discover Updates

When you browse the blog, the system automatically retrieves the latest RSS feed in the background and compares it with your locally cached article records.

If an article is updated (whether in content, title, or description), a **red dot** will appear on the small bell icon in the bottom right corner, accompanied by an entrance animation to remind you that "there's something new."

## 2. View the list

Clicking the small bell will pop up a panel listing all articles that have been updated.

- **New Article**: Features a green `NEW` tag, indicating this article was published since your last visit.
- **Update**: Features a blue `UPDATE` tag, indicating that you may have seen this article before (or it exists in your cache), but it now has new changes.

## 3. View DIFF

This is the core feature. Clicking on the article title tagged with `UPDATE` will directly take you to that article and automatically scroll to **first change point**.

In the main body of the article, you will see a DIFF effect similar to that of a code editor:

- [[The strikethrough red text]]: indicates content that has been deleted or modified previously.
- [[Green underlined part]]: indicates newly added or modified content.

> [!TIP]
> If there are many changes, we will only display a few lines of text around the change points as context (Context), while the unchanged parts will remain unchanged and will not interfere with your normal reading.

## Common Questions

**Q: Why didn't I see the little bell?**
A: If no new articles or updates are detected, the little bell will default to hiding to avoid interrupting your reading.

**Q: Why is it sometimes indicated that an update has occurred, even though the article hasn't changed?**
A: The system not only detects the main text but also checks titles and descriptions. Sometimes, I might only adjust a punctuation mark or fix the formatting, and it will still trigger an update notification.

**Q: I don't want to see these red and green lines anymore. What should I do?**
A: In the top-right corner of the Little Bell panel, there is a **Clear** button (trash bin icon). Clicking it will mark all current articles as "Read/Newest" and clear the local comparison records. You will only be reminded again when there are new changes.