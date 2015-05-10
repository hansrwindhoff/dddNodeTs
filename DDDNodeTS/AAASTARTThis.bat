start "" /D"." node .\ex.js
start "" /D"." python -m SimpleHTTPServer 8000
start chrome http://localhost:8000/test/testgettextcontentsroute.html
