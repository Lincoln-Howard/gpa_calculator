#!/usr/bin/python
# imports
from BaseHTTPServer import BaseHTTPRequestHandler
import os
import types
# simple router module for server
class Router:
  # constructor - create the dicts for get and post
  def __init__ (self, base=None):
    # dict of the get request handlers
    self.GET = {}
    # middleware for get requests
    self.GET_middleware = []
    # dict of the post request handlers
    self.POST = {}
    # middleware for post requests
    self.POST_middleware = []
    # if the base is not set, use the current working directory
    if isinstance (base, types.NoneType):
      self.base = os.getcwd ()
    else:
      # use the provided base
      self.base = base
  def route (self, path, obj):
    if isinstance (obj, GET):
      self.GET [path] = obj
    elif isinstance (obj, POST):
      self.POST [path] = obj
    else:
      return -1
    return 1
  # the default action for the handler
  def default (self, s):
    s.send_response (404)
    return
  # process the provided request
  def process (self, s):
    if s.command == "GET":
      if s.path in self.GET:
        self.GET [s.path].process (s)
      else:
        self.default (s)
    if s.command == "POST":
      if s.path in self.POST:
        self.POST [s.path].process (s)
      else:
        self.default (s)
# the get route class, everything extends this
class GET:
  # constructor - set request object
  def __init__ (self, route):
    self.route = route
  # do work - override this for the actual implementation
  def process (self, req):
    return
# the post route class, everything extends this
class POST:
  # constructor - set request object
  def __init__ (self, route):
    # 'self' from the request handler
    self.route = route
  # do work - override this for the actual implementation
  def process (self, req):
    return
