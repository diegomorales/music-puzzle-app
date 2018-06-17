#!/usr/bin/env bash

IMG_NAME=music-puzzle-app

if [[ "$(docker images -q $IMG_NAME 2> /dev/null)" == "" ]]; then
  docker build -t $IMG_NAME .
fi

docker run -it -p 3000:3000 -p 3001:3001 -v $(pwd):/home/node/code $IMG_NAME bash
