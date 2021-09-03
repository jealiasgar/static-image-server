FROM node:lts-alpine
ARG PORT

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install

RUN npm install pm2 -g

EXPOSE 3000

CMD [ "pm2-runtime", "start", "app.js" ]
