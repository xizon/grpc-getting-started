#!/usr/bin/env node

# declare STRING variable
STRING="Starting node processes"
#print variable on a screen
echo $STRING

node .src/server/example.js&
node .src/server/post.js&


# wait until both background processes finish
wait





