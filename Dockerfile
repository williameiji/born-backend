FROM node:16

WORKDIR /usr/src/

COPY . .

RUN npm i
RUN npm run build

EXPOSE 5001

CMD [ "npm", "start" ]