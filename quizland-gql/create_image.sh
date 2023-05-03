#!/bin/bash

#yarn build
DOCKER_BUILDKIT=1 docker build . --tag quizland-api:0.1.3
