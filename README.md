# docker-repositories-component
A React component and accompanying nginx file and Dockerfile to act as a reverse proxy to bypass CORS error from https://hub.docker.com/

Run this command in the root folder: 
```
docker build -t nginx-reverse-proxy .

docker run -p 8080:8080 nginx-reverse-proxy
```
