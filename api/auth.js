// Defines the routes for the authentication api.
// author: S. Sigman Created:       1/16/2022
// modifications: J. Purcell    last modified: 2/16/2022
// 
// api          verb     description           status codes
// /api/signin  post     authenticates a user  200 (authenticated)
//                       using both user id &  401 (authentication failed)
//                       password.             500 (database error)
//                                             
//
// Modifications:
//
// checked the JWT token, decodes the token using bcrypt.js, and returns a 
// 401 error if the user is not found/ if the user has entered the wrong
// password. 
//
// will return information about the user, so the profile page can display it later
//
// instead of making a database specfic query, the route for signin calls
// to a method in the database manager to authenticate the user
// 

const router = require("express").Router();
//const DEBUG = true;
const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");

// secret is stored in a config file
const code=require("../src/configuration/config.json");
const secret=code.secret
//import dbManager from ("../db/dbman")
const dbManager=require("../db/dbman");
const { db } = require("../db/models/user");
const { Foundation } = require("@mui/icons-material");
const dbman=new dbManager();

router.post('/', async (req,res)=>{
    console.log(dbman);

// check to see if the user exists
console.log(`email;: ${req.body.email}`);
try{
    console.log("try entered")
    let result=await dbman.findByEmail(req.body.email);
    console.log("this is the result from sign in attempt"+result);
    if(result){
        console.log(result.email);
        if ( (bcrypt.compareSync(req.body.password, result.password)) ) {
                
            const token=jwt.encode({email: req.body.email}, secret);
            // user authenticated - return authentication msg
            // return information about the user in the status
            res.status(200).json({msg: "authenticated",
                                    fname: result.fname,
                                    token:token,
                                    email: result.email,
                                    lname: result.lname,
                                    profile:result.profile,
                                    profilePict: result.profilePict});

            }
            else{
                res.status(401).json({msg:"not valid"})
            }

    }
    else{
        res.status(401).json({msg:'no user found'})
    
   
    }
}
catch(err){
        res.status(500).json({msg: 'server error'})
        console.log(err);
    }

    
});
    
   
    
     

module.exports = router;