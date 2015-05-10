#!/bin/bash
xterm -e "node --debug-brk ex.js" &

xterm -e "node-inspector --web-port=8090" &


#unused
