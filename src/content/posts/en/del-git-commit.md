---
title: "How to make a file disappear forever in a Git commit? How to discard one commit while maintaining logical integrity?"
description: "Sometimes we might accidentally commit a file that should not have been committed. When you realize this, many new commits have already been stacked up afterward..."
published: 2026-01-24
image: ../../assets/images/del-git-commit-1.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article explains how to remove a mistakenly committed sensitive file from Git history without rewriting all commits manually. It uses the `git-filter-repo` tool to strip the file across all commits, then employs `git rebase --onto` to delete the corresponding commit entirely from history. Finally, it covers force-pushing the cleaned history to remote and submitting a GitHub support ticket to permanently remove the orphaned commit URL for full security.
:::

# Introduction
[[X:content]]

At this point, we actually need to erase the incorrectly submitted file from all Git commits and ensure logical consistency.

Of course, if you don't mind the trouble or if your repository has very few commits, you can manually rewrite your Git commit history commit by commit. Alternatively, you can merge your historical commits into a single commit and force-push.

However, these methods are either too tedious or not elegant.

Assuming this repository has over 1000 commits and you don't want to merge all the commit history?

# Formally begin

There is a PIP package that exactly meets our needs, **git-filter-repo**

```bash
pip install git-filter-repo
```

After installation, run it in your Git repository. Next, we only need to pass it a file path.

- **--path** is the input file path, which can be either a relative or absolute path. However, note that paths must be separated using **/**.
- **--force** makes it ignore safety conditions (such as requiring the repository to be freshly cloned)
- **--invert-paths** is invert paths, meaning **exclude** files specified by **--path**

After execution, it will search all commits in the repository where the file resides and remove only that file. If a commit contains changes to only this file, the entire commit will disappear (because there are no file changes in the commit); if a commit contains changes to this file along with other files, the commit will still exist, but the file change record for this file will no longer be present.

```bash
git-filter-repo --force --path src/secret.txt --invert-paths
```

For example, here we accidentally submitted a **WeChat password**

![](../../assets/images/del-git-commit-2.webp)

We can use this command to **remove** it

```bash
git-filter-repo --force --path 微信密码.txt --invert-paths
```

![](../../assets/images/del-git-commit-4.webp)

It can be seen that the effect is extremely impressive, **WeChat password.txt** has vanished without a trace.

![](../../assets/images/del-git-commit-3.webp)

But there is still another issue: our former **submitted text** revealed that **we had previously uploaded files related to WeChat passwords**, even though the files have since been removed.

Is there a way to delete this submission? Yes, bro, there is.

We can use the native **git rebase** to treat that commit as the **base** and attach subsequent commits onto it, thereby **replacing** that commit. Macroscopically, we are effectively deleting that commit from the middle of the Git repository.

First, we need to obtain the **hash** of this commit; here we assume it is **4e19d1fc6af5119cb33128a92d5d4e80fc42e6ef** (only the first 8 characters are needed).

Next, use the rebase command

```bash
git rebase --onto 4e19d1fc^ 4e19d1fc
```

Here, an error will be reported and the rebase process will be automatically interrupted. Git indicates that this commit has some files conflicting with the current commit and cannot be automatically resolved.

![](../../assets/images/del-git-commit-5.webp)

Since we want to use the current commit as the basis and only remove intermediate commits, we use this command **Use the current commit as the basis to resolve conflicts in all files**

```bash
git checkout --theirs .
```

The conflict will be marked as **resolved**
```bash
git add -A
```

![](../../assets/images/del-git-commit-6.webp)

Continue the rebase process

```bash
git rebase --continue
```

A vim editor will pop up to allow you to modify the Git commit; simply close it. **ESC** + **\:q**

![](../../assets/images/del-git-commit-7.webp)

If you need to stop midway and repeat the steps above, you may do so. In the end, check your local commits to confirm that the commit you wish to delete no longer exists. Additionally, ensure that no files in the current working directory have been modified—only the Git commit history has been altered.

![](../../assets/images/del-git-commit-9.webp)

Finally, we need to **overwrite** the local repository to the remote repository. Since the initial PIP package will delete the remote repository after the command execution, we need to re-add it at this point.

```bash
git remote add origin https://github.com/你的用户名/你的仓库名.git
```

Set up upstream and force-push to the remote

```bash
git push -u origin main -f
```

At this point, the task is complete. From this moment onward, all users will no longer be able to see the file and commit history you didn't want others to see, as if it never existed.

*Really?*

If some people still retain your complete **commit id** submitted to the repository, they can access that commit you wish to hide via that link, but GitHub will display a warning: **This commit does not belong to any branch on this repository, and may belong to a fork outside of the repository.（，。）**
```bash
https://github.com/{user}/{repo}/commit/{commit id}
```

If you want to completely remove it from GitHub, you need to submit a support ticket to GitHub: [GitHub Support](https://support.github.com/)

Click my ticket

![](../../assets/images/del-git-commit-10.webp)

New work order

![](../../assets/images/del-git-commit-11.webp)

Delete data from repositories I own or control

![](../../assets/images/del-git-commit-12.webp)

Delete other data

![](../../assets/images/del-git-commit-13.webp)

Next, fill out the ticket. You can refer to my subject and body (generated with OpenAI ChatGPT 5.2)

```bash
Title:Request to Remove an Orphaned Commit URL Containing Sensitive Information

Hello GitHub Support Team,

I am writing to request the removal of the following commit page from GitHub’s website:

https://github.com/{user}/{repo}/commit/{commit id}

This commit has already been removed from my local repository history and I have force-pushed the updated history to the GitHub remote repository. As a result, the commit is now orphaned and no longer reachable from any branch or tag.

However, the commit page itself is still accessible via its direct URL. Unfortunately, this commit contained sensitive information, and I would like to request that GitHub remove this URL from the website to prevent further access.

Please let me know if you need any additional information or verification from my side to proceed with this request.

Thank you very much for your time and assistance.

Best regards,  
{user}
```

![](../../assets/images/del-git-commit-14.webp)

Finally, click **Continue**. The new ticketing system will automatically use Copilot to generate some help information for you. Once it's done talking, we can continue creating the ticket.

Soon, you will receive an email from GitHub indicating that your support ticket has been received. Simply wait patiently for GitHub's next response.

![](../../assets/images/del-git-commit-15.webp)

Update...

GitHub supports deleting relevant content within 12 minutes, which is truly efficient.

![](../../assets/images/del-git-commit-16.webp)