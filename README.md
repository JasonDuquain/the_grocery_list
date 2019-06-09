# Project Title

Grocery list app allowing users to create, edit, add, mark/unmark as purchased, and remove grocery items from a shopping list. Allows for simultaneous sessions. Built with ReactJS utilizing React Router, Express (allows API access), Mongoose for the database and SASS for styling.

https://jasonduquain-grocerylist.herokuapp.com/

## Getting Started

1. Clone repo

2. Put the ".env" file at root. This file has config variables for mLab connection string and express-session secret.

3. Install all node dependencies:

```npm intall```

4. Install React folders and files:

```cd client && npm install```

5. Start servers

```npm run dev``` (with concurrently)

or if any issues with concurrently:

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

All of the tests pass except two. I also do not feel I created as robust tests as I would have liked or as many as were needed if given more time. I at least tried to cover the basic ones from a CRUD standpoint. I did have many issues with failing tests due to async issues and problems with mongoose commands (findByIdAndUpdate not returning the updated document is one example that took a while to figure out). But in the end most are working.

## PROJECT DESCRIPTION

- Create a grocery list web-application that can be shared in real-time by multiple people.

- Imagine you have a 4-person family, and each of you has a smart-phone with the web application running. When you arrive at the grocery store, you split up to shop individually. This allows the groceries to be acquired in the fastest possible way.

## FUNCTIONAL REQUIREMENTS

1. Save, Update, and Delete items to/from a database of your choosing.
2. Authenticate users - allowing the same user to be signed in from multiple devices.
3. Allow add, edit, delete, “mark as purchased”, and “unmark as purchased” on each item.
4. Keep the list synced in real time from each device.
5. Accompany your code with a full test suite.
6. Deploy your site to a web host (e.g., on Amazon EC2, Heroku, Netlify, Google AppEngine, etc.).

## Built With

* [React](https://reactjs.org/) - The front-end library. (I have about 3 months experience with React.)
* [Node](https://nodejs.org/en/) - Javascript runtime for server-side management. (I have about 8 months experience with Node.)
* [Express](https://expressjs.com/) - Web framework for Node.js. (I have about 4 months experience with Express.) 
* [Mongoose](https://mongoosejs.com/) - ODM for mongoDB. (I have about 1 month experience with Mongoose/mongoDB.)
* [SASS](https://sass-lang.com/) - CSS preprocessor. (I have about 1.5 years experience with Express.)

## Reasoning behind my choices

* I wanted to use React insted of EJS because I wanted to start learning it again and also build a true MERN full stack application. I also wanted to utilize React Router as I really want to be able to use it comfortably in future projects.

* Node and Express were chosen due to my experience using them at Bloc and their prevelance for the chosen task

* Mongoose was chosen due to my desire to start learning how to use it. Based on the real-time update requirement I considered Firebase but struggled with picking it back up. Sequelize was also strongly considered as it was used extensively in my most recent projects. But in the end I went with someting I really want to start learning in depts.

* SASS was chosen as I am comfortable with it and enjoy the advantages it has over standard CSS such as class nesting, mixins, and various other qualities.

## What is missing

* Real-time updates.

I saved this for last and was hopeful I would have more time to make it happen. But I only had a few hours of my last day to try. I figured socket.io would be too difficult given the short time period. I also looked into mongo's 
change streams but after several problems getting it going I ran out of time. I will continue to research both options and work on implementing the chosen solution. 

* Complete test suite

Please see notes above in the "Running the tests" section. I plan on going back to get the remaining two tests working soon.

* Ability to create multiple lists

Each family/user can only create one list. I think I can add a re-usale List component in React and the necessary logic to get this done in a day and will do so in the near future.

* Smooth UI update on deletion of indiviudal items

I could not get the deleted items to disappear until the browser was manually refreshed. In researching this I tried to add logic to ```componentDidUpdate``` but ran into inifnite loop issues. I had run out of time when I went back to address this. So in the short term a ```window.location.reload()``` was added to the end of the delete function. So, while a bit jarring, it does allow the item to be removed without a manual refresh. I will also keep researching this as it is a common requirement that I will need to know for future projects. 

## Challenges

* The first one was getting the app to deploy to heroku. As it is fullstack I followed many of the online tutorials for MERN apps but kept running into issues. However after continuing to view the heroku logs and follow up online help pages related to them I was able to get it working.

* General React knowledge. As I had not used React in over 9 months and had not much experience with it overall (2 months before this project) this was an issue. However I kept reading on topics related to what I would need during non-coding times and was able to better my knowledge just enough to help.

* Getting items from the database that only belong to the user who created them ending up being a major issue. I tried to use the Mongoose population (association) feature but continued to be unable to get queried information linked between 2 tables. I researched it for a long time but could not make it work. I also tried to add the userSchema to the list table directly but had issues and was concerned it might not be possible. In the end I added the username to the items database by passing the state down as a prop. I then created an array filter when pulling items that would only pull items if req.user equaled the username that was added to the db. This was compounded by the fact it worked find but an elusive routing issue had to be resolved before it would work.

* The other challenges are listed in the "What is missing" section above. 

## If I had additional time

* Add the ability to add multiple lists for each user/family

* Cleaner solution to update the UI seamlessly on item deletion

* Add real-time updates

* Better overall SASS styling (saved styling for last and ran out of time). Also add mobile optimization as I do not have any since my time ran out.

* Fix the two tests that are failing and add more tests.



## Deployment

The app is deployed using Heroku. [Heroku](https://heroku.com/) 

[The Grocery List](https://jasonduquain-grocerylist.herokuapp.com/)


## Author

* **Jason Duquain**