// Defines the database manager
// author: J.Purcell Created:       04/06/2022
// modifications: J. Purcell    last modified: 04/10/2022
// 
// The database manager houses all database specific methods/queries,
// so that they may be changed and still work when we change databases
//
// method: findByEmail
// used from: auth.js, tokens.js, and users.js
// finds the user by their email     
// returns user in a promise if resolved 

// method: saveToDB
// used from: users.js
// saves the new user to the database
// returns user in promise if resolved

// method: updateUser(insert updated here)
// used from: edit.js
// each method makes a seperate update
// for each field, so an undefined value
// isn't saved
// returns user in promise if resolved

//
//  Modifications:
// 
// changed mongodb specfic methods
// to queries, to access and edit the 
// user table in my mysql database
// 
// update post table for the user in
// get posts for the userxs

const code=require("../src/configuration/config.json");
const bcrypt = require("bcryptjs");
const conn= require("./mysqldb");
const User = require("../db/models/user");
var mongoose = require("./db");
const user = require("../db/models/user");
const { RowingSharp, Email } = require("@mui/icons-material");
const { useRoutes } = require("react-router-dom");

const secret=code.secret;

class dbManager{
    constructor(){
        this.mesg="DBManager reached"      
    }
   
    makeConnection(){
        if(conn){
        console.log("Connection made!")
        }
    }

    getPosts(email){
        console.log(email)
        let qry=`SELECT picture, caption FROM posts where user_email='${email}'`
        return new Promise((resolve,reject)=>{
        conn.query(qry, 
            [], function(err, rows) {
                
        if (err) {
            console.log("ERROR:", err);
            reject(err);
        }  
      else {
            let posts =[];
            rows.forEach(function(row){
                console.log(row.picture,row.caption);
                    let post={
                        picture: row.picture,
                        caption: row.caption,
                    }
                    
                    posts.push(post);
                    
                })
                
                console.log("no errors");
                console.log(posts);
                resolve(posts);
            }

                
                 
            })
    })
}

    
                   
      
     
    addNewPost(email,picture,caption){
        console.log(email+picture+caption);
        console.log("AddNewPost dbman reached" )
        let qry=`INSERT INTO posts (user_email, picture, caption) values ('${email}','${picture}','${caption}')`
        console.log(qry);
        console.log("inserting post into posts")
        return new Promise((resolve,reject)=>{
            conn.query(qry,[], (err,result)=>{

                console.log("Query entered");
                if (err) {
                    console.log(err);
                    if (err.errno === 1062) {
                       console.log("Cannot insert post " );
                    } 
                    else {
                       console.log("ERROR:", err);
                       reject(err);
                    }
                 }
                 else {
                    console.log("Inserted " + result.affectedRows + " row"); 
                    resolve(result);  // Success!
                 }  
                
            })
        })
    }


    findByEmail(userEmail){
        // select to find
        this.makeConnection();
        let qry = "select email, lname, fname, profile, profilePict, password from user where email=?";
        let userStatus=false;
        console.log("Searching for user")
        return new Promise((resolve, reject)=>{
            conn.query(qry, [userEmail], (err,rows)=>{
                console.log(rows);

                if (rows.length == 0) {
                    // no users found
                    console.log("no user found")
                    resolve(null);
                    
                  }
                  else {
                      // process the user records

                      // make the user on a new row
                      rows.forEach((row) =>{
                        let users =[];
                        if(row.email==userEmail){
                            let user={
                                email: row.email,
                                lname: row.lname,
                                fname: row.fname,
                                profile: row.profile,
                                profilePict: row.profilePict,
                                dateCreated: row.dateCreated,
                                password: row.password
                            }
                            users.push(user);
                            console.log(users);
                            
                        }
                        if(!err){
                            console.log("no errors");
                            console.log(users[0]);
                            resolve(users[0]);
                        }
                        else{
                            reject('error: db error');
                        }      

                    })
                       
                    }
                    
                     
            })
            

            })
    } 

    saveToDB(user){
        console.log("saveToDB");
        console.log(user);
        let qry=`INSERT INTO user (email, fname, lname, profile, profilePict, dateCreated, password) VALUES ('${user.email}', '${user.fname}','${user.lname}', '${user.profile}', '${user.profilePict}', current_date(), '${user.password}')`;
        console.log(qry);
        
        // insert into query to create
        return new Promise((resolve, reject)=>{
            console.log("promise entered");
            conn.query(qry,[] ,(err,result)=>{
                console.log("Query entered");
                if (err) {
                    if (err.errno === 1062) {
                       console.log("Cannot insert duplicate ID " + user.email);
                    } 
                    else {
                       console.log("ERROR:", err);
                       reject(err);
                    }
                 }
                 else {
                    console.log("Inserted " + result.affectedRows + " row"); 
                    resolve(result);  // Success!
                 }   
            })
        
        })
    }
              
    updateUserFname(email, update){
        // alter/update user
        let qry=`UPDATE user set fname='${update}' where email='${email}'`;

        console.log("updateUserFname entered")
        return new Promise((resolve, reject)=>{
            console.log("promise entered");
            conn.query(qry,[] ,(err,result)=>{
                console.log("Query entered");
                if (err) {
                    if (err.errno === 1099) {
                       console.log("Cannot update row where email: " + email);
                    } 
                    else {
                       console.log("ERROR:", err);
                       reject(err);
                    }
                 }
                 else {
                    console.log("Edited " + result.affectedRows + " row"); 
                    resolve(result) ; // Success!
                 }   
            })
        })
    }
    updateUserLname(email, update){
        // update to change
        let qry=`UPDATE user set lname='${update}' where email='${email}'`;

        console.log("updateUserLname entered")
        return new Promise((resolve, reject)=>{
            console.log("promise entered");
            conn.query(qry,[] ,(err,result)=>{
                console.log("Query entered");
                if (err) {
                    if (err.errno === 1099) {
                       console.log("Cannot update row with email: " + email);
                    } 
                    else {
                       console.log("ERROR:", err);
                       reject(err);
                    }
                 }
                 else {
                    console.log("Edited " + result.affectedRows + " row"); 
                    resolve(result) ; // Success!
                 }   
            })
        })
    }
    updateUserProfile(email, update){
        let qry=`UPDATE user set profile='${update}' where email='${email}'`;

        console.log("updateUserProfile entered")
        return new Promise((resolve, reject)=>{
            console.log("promise entered");
            conn.query(qry,[] ,(err,result)=>{
                console.log("Query entered");
                if (err) {
                    if (err.errno === 1099) {
                       console.log("Cannot update row with email: " + email);
                    } 
                    else {
                       console.log("ERROR:", err);
                       reject(err);
                    }
                 }
                 else {
                    console.log("Edited " + result.affectedRows + " row"); 
                    resolve(result) ; // Success!
                 }   
            })
        })
    }
    updateUserProfilePict(email, update){
        console.log("updateUserProfilePict entered")
        let qry=`UPDATE user set profilePict='${update}' where email='${email}'`;

        console.log("updateUserProfilePict entered")
        return new Promise((resolve, reject)=>{
            console.log("promise entered");
            conn.query(qry,[] ,(err,result)=>{
                console.log("Query entered");
                if (err) {
                    if (err.errno === 1099) {
                       console.log("Cannot update row with email: " + email);
                    } 
                    else {
                       console.log("ERROR:", err);
                       reject(err);
                    }
                 }
                 else {
                    console.log("Edited " + result.affectedRows + " row"); 
                    resolve(result) ; // Success!
                 }   
            })
        })
    }
    

}



module.exports=dbManager;
