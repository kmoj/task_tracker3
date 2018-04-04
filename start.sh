#!/bin/bash

export PORT=5500

cd ~/www/task_tracker3
./bin/task_tracker3 stop || true
./bin/task_tracker3 start

