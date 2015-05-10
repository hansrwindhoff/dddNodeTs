#!/bin/bash
#xterm -e "node --debug-brk app.js" &
xterm -e "node RemoteDebug.js app.js" &

xterm -e "node-inspector --web-port=8090" &


#unused
