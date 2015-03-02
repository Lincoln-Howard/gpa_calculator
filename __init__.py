#!/usr/bin/python
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from server import router as ROUTER
from server import db
from server.forms import values as parseForm
import json
# connect to the db
db.connect ("classes.db")
# get the cursor
cur = db.cursor ()
# Serve on port 80
PORT_NUMBER = 80
# router object
router = ROUTER.Router ()
# get request for '/' return index.html
class Index (ROUTER.GET):
  # process
  def process (self, req):
    req.send_response (200)
    req.send_header ('Content-type','text/html')
    req.end_headers ()
    html = open ("ui/index.html", "r")
    req.wfile.write (html.read ())
    html.close ()
    return
# put index in router
router.route ("/", Index ("/"))
# get request for index.js
class IndexJS (ROUTER.GET):
  # process
  def process (self, req):
    req.send_response (200)
    req.send_header ('Content-type','application/javascript')
    req.end_headers ()
    js = open ("ui/index.js", "r")
    req.wfile.write (js.read ())
    js.close ()
    return
# add Index.js to router
router.route ("/index.js", IndexJS ("/index.js"))
class SnapJS (ROUTER.GET):
  # process
  def process (self, req):
    req.send_response (200)
    req.send_header ('Content-type','application/javascript')
    req.end_headers ()
    js = open ("ui/snap.js", "r")
    req.wfile.write (js.read ())
    js.close ()
    return
# add snap.js to router
router.route ("/snap.js", SnapJS ("/snap.js"))
# get request for index.js
class IndexCSS (ROUTER.GET):
  # process
  def process (self, req):
    req.send_response (200)
    req.end_headers ()
    css = open ("ui/index.css", "r")
    req.wfile.write (css.read ())
    css.close ()
    return
# add Index.css to router
router.route ("/index.css", IndexCSS ("/index.css"))
# get request for add_form
class ModifyJS (ROUTER.GET):
  # process
  def process (self, req):
    req.send_response (200)
    req.send_header ('Content-type','application/javascript')
    req.end_headers ()
    js = open ("ui/modify.js", "r")
    req.wfile.write (js.read ())
    js.close ()
    return
# add Index.css to router
router.route ("/modify.js", ModifyJS ("/modify.js"))
# get request for add_form
class ModifyHTML (ROUTER.GET):
  # process
  def process (self, req):
    req.send_response (200)
    req.send_header ('Content-type','text/html')
    req.end_headers ()
    html = open ("ui/modify.html", "r")
    req.wfile.write (html.read ())
    html.close ()
    return
# add Index.css to router
router.route ("/modify.html", ModifyHTML ("/modify.html"))
# get request for add_form
class AddForm (ROUTER.GET):
  # process
  def process (self, req):
    req.send_response (200)
    req.send_header ('Content-type','text/html')
    req.end_headers ()
    form = open ("ui/add_form.html", "r")
    req.wfile.write (form.read ())
    form.close ()
    return
# add Index.css to router
router.route ("/add_form", AddForm ("/add_form"))
# get request for all classes
class DbList (ROUTER.GET):
  # process
  def process (self, req):
    print "get db_list"
    ls = {}
    keys=["subject","number","campus","professor","credits","grade","semester"]
    ls ["keys"] = keys
    ls ["data"] = []
    # loop through all classes at nvcc
    for row in cur.execute ("SELECT * FROM nvcc;"):
      a = []
      for cell in row:
        a.append (str (cell))
      ls ["data"].append (a)
    req.send_response (200)
    req.end_headers ()
    print json.JSONEncoder ().encode (ls)
    req.wfile.write (json.JSONEncoder ().encode (ls))
    return
# put dblist in router
router.route ("/db_list", DbList ("/db_list"))
# get the gpa
class GPACalc (ROUTER.GET):
  # process the request
  def process (self, req):
    cur.execute ("SELECT * FROM nvcc;")
    ls = cur.fetchall ()
    combined = 0
    creds = 0
    for i in range (len (ls)):
      if ls [i][5] == "A":
        combined += ls [i][4] * 4
      elif ls [i][5] == "B":
        combined += ls [i][4] * 3.5
      elif ls [i][5] == "C":
        combined += ls [i][4] * 3
      elif ls [i][5] == "D":
        combined += ls [i][4] * 2.5
      creds += ls [i][4]
    req.send_response (200)
    req.end_headers ()
    gpa = 0
    if creds != 0:
      gpa = combined / creds
    req.wfile.write (str (gpa))
    return
# route the gpa calc
router.route ("/get_gpa", GPACalc ("/get_gpa"))
# post request for adding a class
class AddClass (ROUTER.POST):
  # process
  def process (self, req):
    data = req.rfile.read (int (req.headers.getheader ('content-length')))
    print data
    data = parseForm (data)
    print data
    cmd = ""
    test = "SELECT * FROM nvcc WHERE subject = ? AND number = ?;"
    cur.execute (test, (data [0], data [1]))
    print data [0]
    print data [1]
    if cur.fetchone () == None:
      cmd = ("INSERT INTO nvcc VALUES (?,?,?,?,?,?,?);")
      cur.execute (cmd, data)
      db.conn.commit ()
      req.send_response (200)
      req.end_headers ()
      html = open ("ui/index.html", "r")
      req.wfile.write (html.read ())
      html.close ()
      return
    else:
      req.send_response (200)
      req.end_headers ()
      html = open ("ui/fail.html")
      ret = html.read ()
      html.close ()
      req.wfile.write (ret)
    return
# put the /add_class post request in
router.route ("/add_class", AddClass ("/add_class"))
# post request for modifying a class
class ModifyPost (ROUTER.POST):
  # process
  def process (self, req):
    data = req.rfile.read (int (req.headers.getheader ('content-length')))
    data = json.JSONDecoder ().decode (data)
    sub = data ["subject"]
    num = data ["number"]
    test = "SELECT * FROM nvcc WHERE subject = ? AND number = ?;"
    cur.execute (test, (sub, num))
    row = cur.fetchone ()
    if row == None:
      req.send_response (200)
      req.end_headers ()
      html = open ("ui/fail.html")
      ret = html.read ()
      html.close ()
      req.wfile.write (ret)
    else:
      opts = ["campus","professor","credits","grade","semester"]
      delta = data ["delta"]
      value = data ["value"]
      try:
        loc = delta.find (delta) + 2
        cmd = "UPDATE nvcc SET "+delta+" = ? WHERE subject = ? AND number = ?;"
        cur.execute (cmd, (value, sub, num))
        db.commit ()
        html = open ("ui/index.html", "r")
        req.wfile.write (html.read ())
        html.close ()
        return
      except:
        req.send_response (200)
        req.end_headers ()
        html = open ("ui/fail.html")
        ret = html.read ()
        html.close ()
        req.wfile.write (ret)
# route the modify class post
router.route ("/modify", ModifyPost ("/modify"))
# This class will handles any incoming request from
# the browser
class myHandler(BaseHTTPRequestHandler):
  #Handler for the GET and POST requests
  def do_GET (self):
    router.process (self)
    return
  def do_POST (self):
    router.process (self)
    return
try:
  #Create a web server and define the handler to manage the
  #incoming request
  server = HTTPServer(('', PORT_NUMBER), myHandler)
  #Wait forever for incoming http requests
  server.serve_forever()
except KeyboardInterrupt:
  server.socket.close()
