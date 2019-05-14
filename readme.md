TODO
### AddressBook API project.

Simple AddressBook api project. Allows clients to register new users and logging in for existing users. Logged in users can create new contacts. Each user has his own set of contacts.

Users are stored in PostgreSQL database, contacts are stored in FireStore.

## Commands to test:

Create new user:

curl -v -d '{"email":"user@gmail.com", "password":"pwd"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/users

Login user:

curl -v -d '{"email":"user@gmail.com", "password":"pwd"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/session/user

Create contact:

curl -v -d '{"email":"email@email.cz", "fname":"FNAME","lname":"LNAME", "phone": 1 }' -H "Content-Type: application/json"  -H "authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1NzE2MzE2NiwiZXhwIjoxNTU3MTY2NzY2LCJpc3MiOiJjb20uamFsZS5hZHJlc3MtYm9vay5sb2NhbCJ9.SpJPXRTnK2SyOCj5WHdl3LL7L5yiHiUarUeQ1pyPI1A" -X POST http://localhost:3000/api/contacts

Run migrations: 

npx knex migrate:latest --cwd ./src/database --knexfile ./../config/knexfile.js

Run seed: 

npx knex seed:run --cwd ./src/database --knexfile ./../config/knexfile.js

RUN Docker db

docker-compose up -d
docker exec -it adressbook /bin/bash

test db: 

  docker exec -it adressbook-users-db /bin/bash
  psql -U postgres adressbook-users -c "select * from public.users;"

DOCKER

docker build -t adressbook:v1 .
docker  run -d -e DB_SERVER='192.168.142.6' -p 3000:3000  --name adressbook adressbook:v1

docker container ls -aq |xargs docker container stop
docker container ls -aq |xargs docker container rm






### firebase

Firebase
https://console.firebase.google.com/u/0/project/strv-addressbook-lebeda-jaro/database/firestore/data~2Fusers~2Falovelace

https://github.com/firebase/quickstart-nodejs/tree/master/database

setup

https://firebase.google.com/docs/admin/setup

security for users:

https://firebase.google.com/docs/admin/setup

Start in test mode
Get set up quickly by allowing all reads and writes to your database 

### firebase mock
https://github.com/soumak77/firebase-mock/blob/HEAD/tutorials/functions/firestore.md



### 
avoid pishing https://stackoverflow.com/questions/41287108/deploying-firebase-app-with-service-account-to-heroku-environment-variables-wit
https://stackoverflow.com/questions/42109813/node-js-environment-variables-and-heroku-deployment?rq=1
