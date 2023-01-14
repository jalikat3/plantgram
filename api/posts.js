// Jali Purcell April 2022
// 
// api        verb     description           status codes
// /addPosts     POST   Create a post         201 - created
//                                           400 - db error
//
// Modifications:
//
// 
const User = require("../db/models/user");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");
const code=require("../src/configuration/config.json");
const secret=code.secret
const user = require("../db/models/user");
const dbManager=require("../db/dbman");
const { db } = require("../db/models/user");
const { Foundation } = require("@mui/icons-material");
const dbman=new dbManager();

router.post('/', async (req,res)=>{
        console.log("Add New post Router")
        const data={
            email:req.body.email,
            picture: req.body.picture,
            caption: req.body.caption
        }
    
    console.log(`email: ${req.body.email}`);
    try{
        console.log("try entered with:"+data.email+data.picture+data.caption);

        // create a new post with email, capiton, and picture
        let result=await dbman.addNewPost(data.email,data.picture,data.caption);
        console.log(result);
        console.log("addNewPost"+result);
        if(result){

            // if posted, let picture be picture, and caption be caption
            res.status(201).json({"picture": data.picture,"caption": data.caption})
            console.log(res);
        }
        else{
            console.log("it did not work")
            res.status(400).json({msg: "could not save the post."})
        }
    }
    catch(err){
        res.status(500).json({msg: "Server error: something went wrong."})
    }

    });
        
        

module.exports = router;