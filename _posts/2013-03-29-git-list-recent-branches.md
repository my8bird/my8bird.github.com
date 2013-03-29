---
layout: post
title: List recently used git branches
tags: ['git']
---

I find myself frequently jumping through a small set of branches, but forgetting
the extact name of each branch.  This means I use `get branch` a lot to find the
correct names checkout.  This results in a list like this.

```sh
  dev/thing1
  dev/thing2
  dev/other_thing_i_was_working_on
* master
  stable/current
  stable/another
  ...
```

In my normal flow this is much longer but you get the picture.  There is noise
in there.

Knowing that I am normally bouncing around in a small subset of these I write
this git script which takes shows the list of branches sorted by most recently
committed too.

```sh
#! /bin/sh

git for-each-ref --sort=-committerdate --format="%(refname)" refs/heads/ | cut -f3,4 -d"/"
```

To use this just save to a file called `git-recent` and run `git recent`.
