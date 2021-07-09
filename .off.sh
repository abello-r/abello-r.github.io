#!bin/bash

process=$(ps aux | grep 'node' | awk 'NR==1 { print $2 }')
kill -9 ${process}
echo Server off.
ps aux | grep 'node'
