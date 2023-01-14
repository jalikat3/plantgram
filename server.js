// Web server for the PlantGram application.
// author: S. Sigman Created: 11/10/2021
// Modifier: J. Purcell Last modified: 2/16/2022
//
// Modifications:
// 1.) Example hello routes from class removed.  11/29/2021 S. Sigman
// 2.) Moved to App Dev II project that utilizes a React interface.
//     1/14,2022 S. Sigman
// 3.) PORT changed to 3001 for developement.  The React UI server
//     uses port 3000, so it is necessary to move the backend 
//     server to a different port. 1/14/2002 S. Sigman
//     Added router for authToken, signin, authtoken, addPosts
//     edituser, user-profile, and retrievePosts
//

const express = require("express");

// make an instance of the express object
const app = express();
const PORT = 3001;

// make an instance of the router
const router = express.Router();
let mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    dbConfig = require('./db/db');


// serve static web pages from the public directory
app.use(express.static('public'));

// configures the app to handle a POST data in json
router.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// add the api routes
router.use('/api/createUser', require('./api/users'));
router.use('/api/signin', require('./api/auth'));
router.use('/api/authToken', require('./api/tokens'));
router.use('/api/editUser', require('./api/edit'));
router.use('/api/addPosts', require('./api/posts'));
router.use('/api/user-profile', require('./api/user.routes'));
router.use('/api/retrievePosts', require('./api/pastposts'));

// app uses the router
app.use(router);

// Listen on PORT for http requests
app.listen(PORT, (err) => {
    if (err) 
      console.log("Server failed to start");
    else 
      console.log(`Server started on port ${PORT}.`)
})