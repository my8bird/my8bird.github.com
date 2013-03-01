---
layout: post
title: Blogging Like a Hacker
---

Riak Getting Started
====================
Node
----
[Riak JS](riakjs.com) 0.9.* Provides a good API (proto buffer support forth coming)


Enable Search
-------------
Riak does not come with search enabled.  In order to turn it on you must find find `app.config` and turn it on.

If installed via `apt-get` then the file is at `/etc/rial/app.config`

Search for `search` and turn the enabled flag to `true`.
