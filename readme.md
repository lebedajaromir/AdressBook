### AddressBook NodeJS API project.

Simple AddressBook api project. Allows clients to register new users and logging in for existing users. Logged in users can create new contacts. Each user has his own set of contacts.

Users are stored in PostgreSQL database, contacts are stored in FireStore.

Project can be run locally, test db can be created with Dockerfile that is also included. Docker compose can be used to dockerize the whole solution. For demonstration purposes is project deployed to heroku too (using travis ci).

The url of project at heroku  https://strv-addressbook-lebeda-j.herokuapp.com/
ID of project in firebase is strv-addressbook-lebeda-j

#### Commands to test:

##### Create new user:
```
curl -v -d '{"email":"user@gmail.com", "password":"pwd"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/users
```
##### Login user:
```
curl -v -d '{"email":"user@gmail.com", "password":"pwd"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/session/user
```
##### Create contact:
```
curl -v -d '{"email":"email@email.cz", "fname":"FNAME","lname":"LNAME", "phone": 1 }' -H "Content-Type: application/json"  -H "authorization: <hashed data>" -X POST http://localhost:3000/api/contacts
```
