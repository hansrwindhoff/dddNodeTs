rem by starting the node process inside a cmd /k shell the shell will stay open
rem after the process finishes allowing to read any output
rem start cmd /k  "node --debug-brk ex.js"
rem start "" /D"." node-inspector --web-port=8090


start chrome /new-window http://192.128.28.102:8080/debug?ws=192.128.28.102:8080&port=5858
start chrome /new-window http://192.128.28.102:3000
