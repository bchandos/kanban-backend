FROM node:22

WORKDIR /usr/src/app

RUN npm install

CMD ["node", "src/index.js"]
