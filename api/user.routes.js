// Defines the routes for the user.routes api.
// author: J. Purcell Created:       
// modifications: J. Purcell    last modified: 4/11/2022
// 
// api              verb     description           status codes
// /api/user.routes  post    creates file           200- saved successfully
//                           format to 
//                            be saved to 
//                            public/images
//                         
//                         
//                                             
// Modifications:
//
// instead of making a database specfic query, the route for authToken calls
// to a method in the database manager to authenticate the user

let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    router = express.Router();
const { v4: uuidv4 } = require('uuid');
const DIR = './public/images/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
// User model
const User = require('../db/models/user');
console.log("user.routes reached")

router.post('/', upload.single('profilePict'), (req, res, next) => {
    console.log("post reached")
    const url = req.protocol + '://' + req.get('host')
    const profilePict= url +'/images/'+req.file.filename
    if(profilePict){
        res.status(200).json({
            message: "Picture saved successfully!",
            //profilePict: url+'/'+req.file.filename,
            profilePict: 'images/'+req.file.filename
        })
    }

    
})

module.exports = router;