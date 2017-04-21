# Mock Web App
This is a barebones web app using Docker, Node, Express, Mongo, and Angular. The purpose of this application is to demonstrate how to wire up a frontend and backend with simple routing that controls a server-side resource.

## Server
The web server runs with Node and Express. Express provides a simple framework for routing requests to the correct controllers to modify resources. The backing store is Mongo, purely for its simple strategy of storing documents.

## Client
The frontend is built with HTML5 and Angular.js, with some jQuery sprinkled in for easy DOM manipulation.

### Build tools and running the project
This project is easiest to run with Docker. Once Docker is installed, you can run the app in 'production' mode by running:  
`make prod`

Prod will build the container for the web app, start the database, and start the application on `localhost:8080`.

### Development flow
To develop the project run, you can run:  
`make init db dev`

`init` will install all the project's dependencies on your file system using a Docker container. `db` brings up the database, and `dev` brings up the app with live reloading, so when server files are edited, they will be immediately be reflected.

`make unit-test` will run the unit tests in a Docker container, and will re-run whenever you change code. This enables TDD.
