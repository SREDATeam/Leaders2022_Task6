FROM node:16.17.0

WORKDIR /frontend

COPY package.json .

RUN npm install pm2 -g
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 80

CMD ["pm2-runtime", "start", "./server.js"]
