// Defines the routes for the authentication api.
// author: J. Purcell Created:       2/11/2022
// modifications: J. Purcell    last modified: 
// 
// api              verb     description           status codes
// /api/retrievePosts post    gets post             
//                         for the user by email           
//                         from the post table.   
//                                             
// mods:
// gets all the posts instead of just one
//
// 
const User = require("../db/models/user");
const router = require("express").Router();
const DEBUG = true;
const jwt = require("jwt-simple");
const code=require("../src/configuration/config.json");
const secret=code.secret;
const dbManager=require("../db/dbman");
const dbman=new dbManager();
const conn= require("../db/mysqldb");
const { LocalHospitalTwoTone } = require("@mui/icons-material");


// Gets the status of all users when given a valid token
router.post("/", async(req, res) =>{
   console.log(dbman);
   
   const data={
      email: req.body.email
   }
   try {
      console.log("try entered")
      console.log("email:"+req.body.email);
      let result=await dbman.getPosts(data.email);
      let pictures=[]
      let captions=[]
      if(result){
         for(var i=0; i < result.length; i++){
            // return current picture and post
            console.log(result[i].picture,result[i].caption)
            pictures.push(result[i].picture)
            captions.push(result[i].caption)
         }
         // return the array of posts
         res.status(200).json({msg: "It worked!",
                                post_picture: result[0].picture,
                                 post_caption: result[0].caption,
                              pictures_array:pictures,
                           captions_array: captions})
     }
     else{
         console.log("it did not work")
         res.status(400).json({msg: "could not save the post."})
     }
   }
   catch(err){
      res.status(500).json({msg: "Server level error."})
   }
})

   
          
         

module.exports = router;

