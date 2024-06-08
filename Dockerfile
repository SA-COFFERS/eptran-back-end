FROM node:alpine

WORKDIR /usr/app

RUN rm -rf ./node_modules
RUN rm -rf ./package-lock.json

COPY package.json ./
RUN npm install -g npm@latest
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm","run","dev"]
