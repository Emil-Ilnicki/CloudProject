#!bin/bash

docker build ../client -t emililnicki/gitfit:client
docker push emililnicki/gitfit:client

docker build ../server -t emililnicki/gitfit:server
docker push emililnicki/gitfit:server

docker build ../dbhelper -t emililnicki/gitfit:dbhelper
docker push emililnicki/gitfit:dbhelper

docker build ../authserver -t emililnicki/gitfit:authserver
docker push emililnicki/gitfit:authserver
