---
layout: post
title: Collecting to much Garbage in Python
tags: ['python']
---

If you think you have leak due to noncollectble objects, ie. those with a `__del__` method, it is simple to verify by looking at the garbage collectors garbage list. This list contains all of objects which python could not automatically release.

```python
import gc

# Show all of the objects current known for this type
print 'MyOjbects', [obj for obj in gc.get_objects() if isinstance(obj, MyClass)]

# Show the objects which could not be automatically garbage collected
print 'Stuck objects', gc.garbage
```

How can this happen?

Take the following python classes:

```python
class WithDel(object):
   def __init__(self):
      self.cycle = None

   def __del__(self):
      pass

class B(object):
   def __init__(self):
      self.cycle = None
```

Now if we create instances of each without cycles everything will work correctly

```python
# Create Objects
with_del = WithDel()
b        = B()

# Release
with_del = None
b        = None

# Test GC
gc.collect(2)
print len(gc.garbage) # 0
```

However, if we introduce a cycle between the objects then the garbage collector will fail to free all of the objects.

```python
# Create Objects
with_del = WithDel()
b        = B()

# Add cycle
with_del.cycle = b
b.cycle        = with_del

# Release
with_del = None
b        = None

# Test GC
gc.collect(2)
print len(gc.garbage) # 1\
# This can be cleaned up by reviewing the gc.garbage list.  The code sample at
# the end shows how to do this.
```

Ok, so we understand the issue but what do can we do? Basically, just make sure and cleanup after yourself by releasing any cycles in the `__del__` method.

```python
class WithDelAndCleanUp(object):
   def __init__(self):
      self.cycle = None

   def __del__(self):
      self.cycle = None
```

Now when the object is freed the cycle is automatically broken and all is well in the world.

```python
# Create Objects
with_del = WithDelAndCleanUp() # See the usage of the new class
b        = B()

# Add cycle
with_del.cycle = b
b.cycle        = with_del

# Release
with_del = None
b        = None

# Test GC
gc.collect(2)
print len(gc.garbage) # 0
```

Full Source Code for these examples:

```python
import gc

class WithDel(object):
   def __init__(self):
      self.cycle = None

   def __del__(self):
      pass


class WithDelAndCleanUp(object):
   def __init__(self):
      self.cycle = None

   def __del__(self):
      self.cycle = None


class B(object):
   def __init__(self):
      self.cycle = None


print "\n--- Test without Cycle ---"
# Given both objects exist but do not create a cycle between them
with_del = WithDel()
b        = B()

# When the objects are released (no longer referenced)
with_del = None
b        = None

# Then the Garbage Collect is able to collect the memory
gc.collect(2)
print 'Uncollectable Objects:', len(gc.garbage)

print "\n--- Test with Cycle ---"
# Given both objects
b = B()
with_del = WithDel()

# And a cycle between them
b.cycle        = with_del
with_del.cycle = b

# When both objects are released (no longer referenced)
with_del = None
b        = None

# Then the collector does not release the memory
gc.collect(2)
print 'Uncollectable Objects:', len(gc.garbage)

# Manually clean up the garbage
# - Release the cycle
gc.garbage[0].cycle = 0
# - The list of garbage creates another reference so this list must be cleared
gc.garbage = []

# - Verify things were cleaned up
gc.collect(2)
assert 0 == len(gc.garbage)

print "\n--- Test cycle with proper cleanup ---"
# Given both objects
b = B()
with_del = WithDelAndCleanUp()

# And a cycle between them
b.cycle        = with_del
with_del.cycle = b

# When both objects are released (no longer referenced)
with_del = None
b        = None

# Then the collector does not release the memory
gc.collect(2)
print 'Uncollectable Objects:', len(gc.garbage)
```
