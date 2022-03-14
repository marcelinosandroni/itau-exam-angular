# LTS node Version
FROM node:16.14.0-alpine

WORKDIR /app

RUN npm i -g @angular/cli@13.2.5

COPY package.json .

COPY package-lock.json .

RUN npm i

COPY . .

CMD ng serve --host 0.0.0.0 --port 4200
