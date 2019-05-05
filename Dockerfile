FROM node:10

RUN mkdir -p /adressbook/node_modules && chown -R node:node /adressbook
WORKDIR /adressbook
COPY package*.json ./
COPY ./firebase-service-account.json ./
USER node
RUN npm install
COPY --chown=node:node ./src ./src
EXPOSE 3000

CMD [ "node", "src/app.js" ]