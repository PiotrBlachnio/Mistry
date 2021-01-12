FROM node:12

WORKDIR /app

COPY package.json /app

RUN npm install -g typescript

RUN yarn install

COPY . /app

RUN yarn build

CMD ["yarn", "start:prod"]