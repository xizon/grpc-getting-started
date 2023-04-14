#!/usr/bin/env node

# declare STRING variable
STRING_START="--> Starting node processes"
STRING_RUN="--> All gRPC services are running"
STRING_END="--> All is ending"


#print variable on a screen
echo $STRING_START

node .src/server/example.js&
node .src/server/post.js&

echo $STRING_RUN

# wait until both background processes finish
wait
echo $STRING_END
