FROM node:7

ADD . /root/app/
WORKDIR /root/app/

RUN npm install

EXPOSE 8080
CMD ["node", "/root/app/app.js"]
