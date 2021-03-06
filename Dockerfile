FROM ubuntu:16.04

USER root

RUN sed -i 's/http:\/\/archive\.ubuntu\.com\/ubuntu\//http:\/\/mirrors\.aliyun\.com\/ubuntu\//g' /etc/apt/sources.list

# COPY ./sources.list /etc/apt/sources.list
RUN apt-get update && apt-get install -yqq nginx && apt-get install -y curl wget

RUN wget -qO- https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update && apt-get install -y nodejs
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
# 复制项目代码
COPY . /src
WORKDIR /src

RUN cnpm i

RUN npm run build

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
