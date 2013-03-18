---
layout: post
title: "Clean up GIT branches"
description: ""
category: 
tags: []
---

```sh
# Make sure your local repository has a of the remote refs
git fetch

# List all branches which can be removed
git branch -a --merged

# This will spit out a list of all brances which have been merged into another branch.

# Remove your local pointers to the defunct branches
# - Using -d instead of -D is safer becuase it will first check that the branch is up to date with remote.  
# - In this case it does not matter since branches are only listed if they are up to date
git branch -d <space seperated list of branches>

# At this point it is probably a good idea to run the garbage collector since we just did a lot of work
git gc
# OR
git gc --aggressive
```
