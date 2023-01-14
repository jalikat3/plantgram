// Defines the routes for the userApi.
// author: S. Sigman Created: 11/29/2021
// Modifier: J. Purcell Last Modified: 2/16/2022
// 
// api        verb     description           status codes
// /creatUser POST   Create a user account   201 - created
//                                           400 - db error
//                                           409 - duplicate user
//
// Modifications:
//
// instead of making a database specfic query, the route for createUser calls
// to a method in the database manager to authenticate the user
// testing
// 
const User = require("../db/models/user");
const router = require("express").Router();
//const DEBUG = true;
const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");

// secret is stored in a config file
const code=require("../src/configuration/config.json");
const secret=code.secret
const user = require("../db/models/user");
const dbManager=require("../db/dbman");
const { db } = require("../db/models/user");
const { Foundation } = require("@mui/icons-material");
const dbman=new dbManager();

// For encoding/decoding JWT
router.post('/', async (req,res)=>{
        console.log(dbman);
    /* if (DEBUG) {
        console.log(`Name: ${req.body.fname} ${req.body.lname}`);
        console.log(`email: ${req.body.email}`);
        console.log(`Profile Pict Name: ${req.body.profPict}`);
        console.log(`Profile: ${req.body.profile}`);
    } */

    // check to see if the user exists
    console.log(`email;: ${req.body.email}`);
    try{
        console.log("try entered");
        let result=await dbman.findByEmail(req.body.email);
        console.log(result);
        console.log("CreateUser"+result);
        if(result){
            res.status(409).json({msg:`User found`});
            console.log(user);
        }
        else{
            console.log("it worked!")
            //res.status(200).json({msg:`User not found, saving to db.`})
            const hash= bcrypt.hashSync(req.body.passWd, 10); 
            let newUser = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            //dateCreated: Date.now(),
            password: hash, 
            profilePict: req.body.profilePict,
            profile: req.body.profile,
        });
        console.log(newUser);
        try{
        let savedUser=await dbman.saveToDB(newUser);
       //console.log(savedUser);
        if(savedUser){
           res.status(201).json({"msg":"user saved"});
        }
    }
    catch(err){
        res.status(500).json("server error 2")
    }
       
    }
}
    catch(err){
            res.status(500).json({msg: 'server error'})
        }
   
   
         
});
        

module.exports = router;