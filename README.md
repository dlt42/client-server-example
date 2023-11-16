# client-server-example
An app that allows you to submit and like messages.

## Todo
Show a count of the number of likes a message has received
Add server side zod validation of request payloads

## Dependencies
- `docker`
- `docker-compose`
- `node` (v20.9.0)
- `npm`

## Setup
Install dependencies and start the database in docker.
```
$ nvm install
$ npm
$ docker-compose up -d
```

## Tests
Run the database in Docker when running the tests.

```
$ npm test
```

## Run
In separate terminals:

```
$ cd server
$ npm start
```

```
$ cd web
$ npm start
```

This app will start with auto-refresh and will be available here:

`http://localhost:5001`
