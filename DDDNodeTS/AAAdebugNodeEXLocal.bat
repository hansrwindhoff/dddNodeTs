rem by starting the node process inside a cmd /k shell the shell will stay open
rem after the process finishes allowing to read any output


start cmd /k  "node --debug-brk app.js"

start "" /D"." node-inspector --web-port=8090
start chrome /new-window http://127.0.0.1:8090/debug?ws=127.0.0.1:8090&port=5858

start chrome /new-window http://127.0.0.1:3000
