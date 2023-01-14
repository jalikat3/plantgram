// Defines the routes for the editUserAPI. 
// author: J.Purcell Created: 2/21/2022
// Modifier: J. Purcell Last Modified: 3/22/2022
// 
// api        verb     description           status codes
// /editUser  PUT   Edit a user              200 - updated
//                                           401 - missing xauth headers
//                                           400 - user not updated
//
// Modifications:
//
// will not update a field if it is empty
// keep track of errors and return status if none have arrived 
// (since status can't be return once served to the user)

//// instead of making a database specfic query, the route for editUser calls
// to a method in the database manager to authenticate the user
// 
// 

const router = require("express").Router();
const jwt=require("jwt-simple")
const code=require("../src/configuration/config.json");
const dbManager=require("../db/dbman");

const dbman=new dbManager();


const secret=code.secret
// true turns display of debugging statements on
// /signin
router.put('/', async (req, res) => {
    console.log("edit user requested")
    let error=false;
    
    if (!req.headers["x-auth"]) {
        return res.status(401).json({error: "Missing X-Auth header"});
        error=true;
     }
     
     // X-Auth should contain the token 
     const token = req.headers["x-auth"];
     console.log(token);
     let decoded;
     try {
        decoded = jwt.decode(token, secret);
    }
    catch (ex) {
        res.status(401).json({ error: "Invalid JWT" });
        error=true;
    }
    
    let email=req.body.email;
    console.log(email);
    let ufname=req.body.fname;
    console.log(ufname);
    if (ufname){
        console.log("updated first name requested")
        try{
            let result= await dbman.updateUserFname(email,ufname);
            console.log("RESULT:"+result)
            console.log("try entered")
            if(result){
                console.log("user fname updated")
            }
            else{
                error=true;
                res.status(400).json({"msg":"user not updated"})
            }
    }
        catch(err){
            error=true;
            res.status(500).json({"msg":"database error"})
        }
    }
    let ulname=req.body.lname;
    console.log(ulname);
    if (ulname){
        console.log("updated last name requested")
        try{
        let result= await dbman.updateUserLname(email,ulname);
        console.log("try entered")
        // add to end
        if(result){
            console.log("user lname updated")
        }
        else{
            error=true;
            res.status(400).json({"msg":"user not updated"})
        }
    }
    catch(err){
        error=true;
        res.status(500).json({"msg":"database error"})
    }
}

    let uprofile=req.body.profile;
    console.log(uprofile);
    if (uprofile){
        console.log("updated first name requested")
        try{
        let result= await dbman.updateUserProfile(email,uprofile);
        console.log("try entered")
        // add to end
        if(result){
            console.log("user profile updated")
        }
        else{
            error=true;
            res.status(400).json({"msg":"user not updated"})
        }
    }
    catch(err){
        error=true;
        res.status(500).json({"msg":"database error"})
    }
}
let uprofilePict=req.body.profilePict;
    console.log(uprofilePict);
    if (uprofilePict){
        console.log("updated first name requested")
        try{
        let result= await dbman.updateUserProfilePict(email,uprofilePict);
        console.log("try entered")
        if(result){
            console.log("user profile updated")
        }
        else{
            error=true;
            res.status(400).json({"msg":"user not updated"})
        }
    }
    catch(err){
        error=true;
        res.status(500).json({"msg":"database error"})
    }
}
// makes sure all updates are good before sending back the response
if(error==false){
    res.status(200).json({"msg":"User profile updated"})
}
else{
    res.status(400).json({"msg":"user not updated :("})
}
 
});
module.exports = router;