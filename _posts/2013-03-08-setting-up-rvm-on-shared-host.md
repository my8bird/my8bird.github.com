---
layout: post
title: Setting up RVM on shared host
---

RVM by default will install itself in `~/.rvm` which is fine as long as that account is not shared with different machines/operating systems. When this happens RVM and the versions of ruby it installs may be incompatible with the other systems. Think of installing ruby on Ubuntu and running it on CentOS. Never fear their is away to install RVM and have it select the correct ruby for each host.

First create a file at `~/.rvmrc` and add these lines.  This will tell RVM install itself at `~/.rvm/<servername>` and assuming each server has a unique name then all servers will get their own copy of RVM to play with.

```sh
export rvm_prefix="$HOME"
export rvm_path="$HOME/.rvm/`hostname -s`"
```

Now we can go ahead an install RVM.  Feel free to checkout https://rvm.io/ for other installation options.

```sh
curl -L https://get.rvm.io | bash -s stable --ruby
```

Now everything should be ready.

