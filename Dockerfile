FROM node:10

RUN mkdir -p /addressbook/node_modules && chown -R node:node /addressbook
WORKDIR /addressbook
COPY package*.json ./
COPY ./firebase-service-account.json ./
USER node
RUN npm install
COPY --chown=node:node ./src ./src
EXPOSE 3000

CMD [ "node", "src/app.js" ]