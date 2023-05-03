#!/bin/bash

docker stop quizland_www
docker rm quizland_www
docker create --name quizland_www -p 3000:3000 quizland-web:latest
docker network connect --ip 172.18.1.20 quizland quizland_www
docker start quizland_www
