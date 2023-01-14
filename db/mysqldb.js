// mysqldb.js
// creates a connection to the mysql database

const mysql = require("mysql");
const config=require("../src/configuration/config.json");

const conn = mysql.createConnection({
    host:     config.host,
    user:     config.user,
    password: config.password,
    database: config.database
});

conn.connect(function(err) {
    if (err) {
        console.log("Error connecting to MySQL:", err);
    }
    else {
        console.log("Connection established");
    }
})
module.exports=conn; 