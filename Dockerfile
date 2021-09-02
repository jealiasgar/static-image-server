FROM node:lts-alpine
ARG PORT

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install

RUN npm install

EXPOSE 3000

CMD node app.js --error /usr/src/logs/err.log --output /usr/src/logs/out.log -- run --color=always
