---
title: "What's the best way to add backlinks to a website? Of course, automation!"
description: "Do you like waking up to find that Pr has dozens of entries, all of them adding friend links? And you even have to go through each one to correct their grammar? Damn it, I'm done!"
published: 2026-02-18
image: ../../assets/images/auto-pr-link-12.png
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
The article discusses automating the process of handling friend link PRs on GitHub to avoid manual intervention and ensure proper reciprocal linking. It proposes using GitHub Actions to validate and manage these PRs, including ownership verification and error handling, while using labels to track progress and debug issues. The author highlights common pitfalls, such as handling external repository PRs and token permissions, and shares a practical, albeit complex, solution involving PATs and structured tagging.
:::

# Cause

As des mentioned, anyone who has done websites knows that if you use PR to handle, especially those without automation, you are likely to get

![](../../assets/images/auto-pr-link-1.png)

More? Quantity is not the issue; the problem lies in

![](../../assets/images/auto-pr-link-2.png)

With one?

Yes, I haven't even created my own format. Many people can't even write a proper JSON link, as shown in the picture above where they forgot the quotation marks, and in the picture below, someone forgot the file extension (my dear, where is your `.json`?)

![](../../assets/images/auto-pr-link-3.png)

Ever since long ago until just now, I have been helping them make revisions, after all, I feel these are just minor issues.

But when a friend link pops up while you're gaming, or when it interrupts you while you're doing something important—should you handle it immediately, or wait and deal with it later? It’s merely the difference between dealing with it right now and gradually handling it over time.

So, is there any way to shift this mess?

# Formally begin

Can we automate this through GitHub Actions?

When users submit a friendship link, add a reciprocal link field, and let the GitHub Action actually test whether the reciprocal link exists. This not only ensures that the other party has added your friendship link but also conveniently verifies ownership.

![](../../assets/images/auto-pr-link-11.png)

# Formally begin (old)

We can think about it with our ultra-high-level brains.

What does GitHub Action do? This doesn't align with what we want to do, does it? Or perhaps we can even do some advanced things (like ownership verification) *God-like similarity to Bing Google website administrator adding domain*

So we had a sudden idea, and this outline emerged.

![](../../assets/images/auto-pr-link-4.png)

Next, hand it over to the AI to write.

![](../../assets/images/auto-pr-link-5.png)

In the end, you get

![](../../assets/images/auto-pr-link-6.png)

No worries, chaos is just temporary—what else do you expect when GitHub Actions can only be tested in production environments (laughs)

In the end, we will get...

![](../../assets/images/auto-pr-link-7.png)

Ha ha, isn't it extremely simple? No! It looks logically clear, but in reality, this "logical clarity" took me half an hour to think through and another half hour to revise and tweak until it became basically usable.

![](../../assets/images/auto-pr-link-8.png)

Then below are some things that are easy to fall into pitfalls.

# Fall into a pit

Firstly, although this entire architecture is logically clear, it is extremely complex. If it runs successfully on the first try, that would be a blessing. If it doesn't, you might not even know how to debug it.

So, after my super brain deeply contemplated the architecture diagram for 40 seconds and iterated three times, I decisively chose GitHub tags to track progress and anchor rules.

Every step clearly tags the PR with a specific label, like... this!

![](../../assets/images/auto-pr-link-9.png)

This not only makes it obvious from the outside which Pr is causing the issue, but also allows you to roughly identify where the problem lies without writing logs.

![](../../assets/images/auto-pr-link-10.png)

Next, we perform ownership verification, which actually requires error handling since it often cannot complete in one go. Thanks to GitHub tags, we can use specific tags to skip or not skip certain steps, avoiding the situation where verification files are repeatedly requested or randomly generated anew each time.

As long as the `Ownership verification in progress` action is added, it will look for the previously created file to verify ownership, rather than generating a new one.

Well, this seems like just basic stuff, but things are going to be different next!

I found that PRs pulled from external repositories cannot be merged by Actions using `GITHUB_TOKEN`. It's not a big deal; you can create your own personal access token (PAT) and bind it to the Action.

Now, go to sleep!