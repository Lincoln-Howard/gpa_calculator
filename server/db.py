#!/usr/bin/python
# import things
import sqlite3 as lite
from types import NoneType
# this is the database connection object, call the connect 
conn = None
# create the connection
def connect (db):
  global conn
  if not isinstance (conn, NoneType):
    raise Exception ("already connected")
  conn = lite.connect (db)  
# close the connection
def close ():
  global conn
  if isinstance (conn, NoneType):
    raise Exception ("cannot close, not connected")
  conn.close ()
  conn = None
# get a cursor
def cursor ():
  global conn
  if isinstance (conn, NoneType):
    raise Exception ("cannot get cursor, not connected")
  return conn.cursor ()
# test if the connection is there
def isopen ():
  global conn
  return isinstance (conn, NoneType)
# commit changes
def commit ():
  global conn
  if not isinstance (conn, NoneType):
    raise Exception ("cannot commit, not connected")
  conn.commit ()
