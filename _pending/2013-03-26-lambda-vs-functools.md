---
layout: post
title: "Lambda vs functools"
description: ""
category:
tags: ['python']
---
`Note this is in progress`

Python lambda's are not as powerful as some would like but can be used for many things.

Take this example function which has many options
```python
def func(arg1, arg2, kwd1 = None, kwd2):
   ...
```

If we want to create a new function that does not allow changing the keyword values then we can do either of these.
```python
fp(func, kwd1 = 'k1', kwd2 = 'k2')
# or
lambda arg1, arg2, kwd1 = 'k1', kwd2 = 'k2': func(arg1, arg2, kwd1 = kwd1, kwd2 = kwd2)
```

Note that in the lambda case I had to enumerate all of the arguments when I invoked func.

Also, note that in both cases the caller could still pass the kwd1 and kwd2 args in and override them (which is silly to me).
