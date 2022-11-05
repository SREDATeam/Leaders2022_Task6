FROM node:16.17.0 as build

WORKDIR /frontend

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx

COPY --from=build /frontend/dist /usr/share/nginx/html

