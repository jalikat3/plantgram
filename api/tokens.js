// Defines the routes for the authentication api.
// author: J. Purcell Created:       2/11/2022
// modifications: J. Purcell    last modified: 
// 
// api              verb     description           status codes
// /api/authToken  get     authenticates the jwt token  200 (token is valid)
//                         which stores email           401 (token is not valid)
//                         to look up the user in db.   500 (database error)
//                                             
// Modifications:
//
// instead of making a database specfic query, the route for authToken calls
// to a method in the database manager to authenticate the user
// 
const User = require("../db/models/user");
const router = require("express").Router();
const DEBUG = true;
const jwt = require("jwt-simple");
const code=require("../src/configuration/config.json");
const secret=code.secret;
const dbman=require("../db/dbman");

// Gets the status of all users when given a valid token
router.get("/", function(req, res) {
   console.log("Validating the token");
   // See if the X-Auth header is set
   if (!req.headers["x-auth"]) {
      return res.status(401).json({error: "Missing X-Auth header"});
   }
   
   // X-Auth should contain the token 
   const token = req.headers["x-auth"];
   try {
      console.log("try block entered")
      const decoded = jwt.decode(token, secret);
      console.log("decoded email: "+decoded.email);
      console.log("request body email: "+req.body.email);
      if (decoded.email === req.body.email) {

          console.log("verify making database call")
          console.log("decoded username: "+decoded.email)
          var user=dbman.findByEmail(decoded.email);
          if (user!==null){
            console.log("found use "+ user.fname)
            console.log("user: "+user)
            console.log(user.fname);
            console.log(user.lname);
            console.log(user.profile);
            console.log(user.profilePict);
            res.status(200).json({msg: "authenticated",
                                    fname: user.fname,
                                    token:token,
                                    email: user.email,
                                    lname: user.lname,
                                    profilePict: user.profilePict,
                                    profile: user.profile});

          }}}
          catch (ex) {
            res.status(401).json({ error: "Invalid JWT" });
            }
        });
        
          
         

module.exports = router;

