#!/usr/bin/python
# a module for parsing form strings into python dict objects
def parse (form):
  ind = form.split ("&")
  ret = {}
  for i in range (len (ind)):
    name = ind [i].split ("=") [0]
    value = ind [i].split ("=") [1]
    value = value.replace ("+", " ")
    ret [name] = value
  return ret
def values (form):
  ind = form.split ("&")
  ret = []
  for i in range (len (ind)):
    ret.append (ind [i].split ("=") [1].replace ("+", " "))
  return tuple (ret)
