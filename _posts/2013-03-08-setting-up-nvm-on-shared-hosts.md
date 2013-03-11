---
layout: post
title: Setting up NVM on shared host
---

[NVM](https://github.com/creationix/nvm) by default will install itself in `~/.nvm` which is fine as long as that account is not shared with different machines/operating systems. When this happens NVM and the versions of node it installs may be incompatible with the other systems. Think of installing Node on Ubuntu and running it on CentOS. NVM however allows you to install it where ever you want so we simply choose to install it in directories with the hostname in it.

 * ~/.nvm
   * centos_server
   * ubuntu_server

The magic to do this is as simple as cloning the NVM github repository into the correct directory.

```sh
git clone git://github.com/creationix/nvm.git ~/.nvm/`hostname -s`/
```

Then all is your .bashrc file to point to the correct version of NVM for the system you are logged into.

```sh
nvm_sh_path="$HOME/.nvm/`hostname -s`/nvm.sh"
if [ -e $nvm_sh_path ] ; then
   . $nvm_sh_path
   # This will auto select the system default node, see `nvm ls` for details
fi
```
