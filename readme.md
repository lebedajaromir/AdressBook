[firebase-url]: https://firebase.com
[rfc-http-url]: https://www.ietf.org/rfc/rfc2616.txt
[jwt-url]: http://jwt.io

# Backend Test Project - Addressbook

Your task is to implement a simple AddressBook backend API. Detailed specifications for the test project are provided below. We estimate that you will not need more than a single weekend at relaxed coding speed to implement it.

## Project description

The addressbook backend will be used by your users to perform the following tasks:

- Register new account
- Manage their contacts

## Technical details

Your backend should be able to serve all kinds of clients (which you do not have to implement 😀) - both mobile apps and websites using a RESTful API. The following technical requirements are placed on your implementation:

### Deployment

- Deploy the application to either Heroku or AWS ECS or EC2
- Set up continuous integration (Travis-CI, Heroku-CI, Jenkins etc.)

### API

- Use Node.js
- Use one of these two well-known framework Express or Koa
- HTTP responses should follow best practices in the industry (especially with regard to status code definitions and request/response headers' usage - you may consult [RFC 2616][rfc-http-url] for more information)
- API should communicate with their clients using JSON data structures
- Use stateless authentication - once your users successfully log in, your backend should not need to make queries to any kind of "session store" - nor database, nor in-memory for a pre-determined amount of time (ie. 1 hour). After that, the session should expire and clients should renew their session. You can use [JSON Web Tokens][jwt-url].

### User accounts

- All user account information should be stored in either a relational database (MySQL, PostgreSQL, etc.) or a NoSQL database (MongoDB, CouchDB, RethinkDB etc., but not Firebase)
- Registrations should be done with email+password
- You should implement the following functionality:
  - User registration
  - User login

### Contact data

- All your users' contacts should be stored in [Firebase][firebase-url]
- You should implement only the following functionality on backend:
  - Create a new contact

Assume that **clients will read the contacts directly from Firebase**. You do not need to implement *GET*, *UPDATE* or *DELETE* endpoints for contacts.
 
### Firebase & Heroku project naming convention
 
 - When creating the **Firebase project** related to the test, make sure to name it following this convention: `strv-addressbook-[last_name]-[first_name]`. Eg. `strv-addressbook-doe-john`. If you decide to use **Heroku** for the deployment, use this convention as well.
 
 This will help us to find your project easily!

## Review process

There are a few technical restrictions so we can see how you fare with the technologies and processes we use on a daily basis, but in general, the actual implementation is quite open-ended. The reason is we want to see how you think in terms of backend architecture, development processes and how you generally deal with the challenges you might face while implementing this API.

The following should help you determine where to put your focus, since these are the things we will be looking for while reviewing your project.

### 🔥 Code quality

Is your code well-structured? Do you keep your coding style consistent across your codebase?

### 🔥 Security

How do you store your customers' passwords? What about security of your customers' data?

### 🔥 Testability

Is your code tested? How do you write tests? Do you even write them? 😀

### API structure and usability

How do you structure API endpoints? Do you follow REST principles? Do you make use of proper response codes and HTTP headers where it makes sense?

### Development and deployment

How hard is it to run your project locally? And how hard is it to deploy it? Is it deployed correctly, with continuous integration being set up?

### New language features

We at STRV love ES 2015 and beyond! Do you use new language features, too?

### Documentation

Is your API documented? Is the documentation sufficient for at least basic needs in multi-platform development team?

> That's it. Good luck and we look forward to seeing your submission!


### My tests.
Create new user:
curl -v -d '{"email":"user@gmail.com", "password":"pwd"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/users
Login user:
curl -v -d '{"email":"user@gmail.com", "password":"pwd"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/session/user
Create contact:
curl -v -d '{"email":"usergmail.com", "fname":"jaromir","lname":"jagr", "phone": 123456789 }' -H "Content-Type: application/json"  -H "authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJwd2QiLCJpYXQiOjE1NTY5MTUzNjcsImV4cCI6MTU1NjkxODk2NywiaXNzIjoiY29tLmphbGUuYWRyZXNzLWJvb2subG9jYWwifQ.dHmHhhmiYHSoyD7yixA3iRoOjs-HtNYXP7SF4xVUnHc" -X POST http://localhost:3000/api/contacts

Run migrations: npx knex migrate:latest --cwd ./src/database --knexfile ./../config/knexfile.js
Run seed: npx knex seed:run --cwd ./src/database --knexfile ./../config/knexfile.js

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
