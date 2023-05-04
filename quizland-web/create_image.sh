#!/bin/bash

VERSION="$1"

if [ -z "$VERSION" ]; then
	echo autokok
	VERSION='latest'
fi

docker build --tag quizland-www:"$VERSION" --network host .
