# Project Title

Grocery list app allowing users to create, edit, add, mark/unmark as purchased, and remove grocery items from a shopping list. Allows for simultaneous sessions. Built with ReactJS utilizing React Router, Express (allows API access), Mongoose for the database and SASS for styling.

https://jasonduquain-grocerylist.herokuapp.com/

## Getting Started

1. Clone repo

2. Put the ".env" file at root. This file has config variables for mLab connection string and express-session secret.

3. Install all dependencies:

```npm intall```` 

4. Start servers

```npm run dev```` (if using concurrently)

or

1st terminal:

```node server.js```

2nd terminal:

```cd client && npm start```


### Prerequisites

To run, first make sure you have Node installed. You can type `node -v` to find your version:

```
$ node -v 
v8.11.2
```

If you do not have Node installed. You can download from their website: https://nodejs.org/en/download/


## Running the tests

Test-Driven Development(TDD) was used in building this app utilizing Jasmine (https://jasmine.github.io/). All the tests can be found in the `/spec/integration` folder. Integration tests were written for the different models with CRUD operations in mind.  From the command line you can use `npm test <path>` to test. 

Example:

```
$ npm test spec/integration/items_spec.js
```


## Deployment

The app is deployed using Heroku. [Heroku](https://heroku.com/) 
[The Grocery List](https://jasonduquain-grocerylist.herokuapp.com/)


## Built With

* [React](https://reactjs.org/) - The front-end library
* [Node](https://nodejs.org/en/) - Javascript runtime for server-side management
* [Express](https://expressjs.com/) - Web framework for Node.js.
* [Mongoose](https://mongoosejs.com/) - ODM for mongoDB.
* [SASS](https://sass-lang.com/) - CSS preprocessor.

## Author

* **Jason Duquain**