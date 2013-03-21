---
layout: post
title: "Keep GIT branches up to date"
description: ""
category:
tags: []
---

This is a git custom script which adds the command `git update`.  When invoked the current branch will be rebased onto the most recent version of the base branch.  The current version below uses master as the base branch.

The script does not update the current branch since it assumes you that branch in the state you like already.

To use this script it must be in your path, windows or linux, with the name `git-update`.

```sh
#! /bin/sh

# Stores the branch to rebase onto
base_branch="master"

# Sets wiether we do rebases interactivly or not.
# - use "" or "-i" where "-i" enables reviewing the rebase
review_rebase="-i"

# Grab the branch the user is currently on
work_branch=`git rev-parse --abbrev-ref HEAD`

# -- Main
# Ensure the rebase branch is up to date
git checkout $base_branch
git pull --rebase

# Get back the work branch to be ready
git checkout $work_branch

# Find the most recent commit shared by both branches.
merge_point=`git merge-base $base_branch $work_branch`

# Update the users branch to sit on top of the base branch
# This command places all commits after merge point onto the HEAD of base
# branch.  The result keeps the name of the current branch.  In this case
# that is the work branch.
git rebase --onto $base_branch $review_rebase $merge_point
```
