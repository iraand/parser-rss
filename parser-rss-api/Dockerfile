FROM node:16

WORKDIR /parser-rss-api
COPY package.json .
RUN npm install
COPY . .
CMD npm run dev