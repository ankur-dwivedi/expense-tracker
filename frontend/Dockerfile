# Stage 1: Build React App
FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ARG REACT_APP_API_URL

ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx","-g","daemon off;" ]