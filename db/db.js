// File db.js
// creates a connection to the database


var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/plantgram");
module.exports = mongoose;