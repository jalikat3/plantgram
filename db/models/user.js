// user.js
// Author S. Sigman   Date: 11/29/2021
// Modifications: J. Purcell
// No modifications yet
//
// Defines a MongoDB-Mongoose model for 
// application users.

var db = require("../db");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({

//var User = db.model("User", {
    //_id: mongoose.Schema.Types.ObjectId,
    fname: String,
    lname: String,
    email: String,
    dateCreated: {type: Date},
    password: {type: String, default: null},
    profilePict: {type: String, default: null},
    profile: {type: String, default: 'My story ...'}
}, {collection:'users'})

//module.exports = User;
module.exports = mongoose.model('User', userSchema)