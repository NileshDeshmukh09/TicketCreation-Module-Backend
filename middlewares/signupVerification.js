/**
 *  custom middleware for varifying the request body
 */

 const User = require("../models/user.model");
 const constant = require("../utils/constants");

 addMiddlewaresToSignupRequest = async (req,res, next) =>{
     //Validate if userName exists
     if(!req.body.name){
        console.log(res);
         return res.status(400).send(
             "Name is not provided"
         )
     }
 
     //Validate if the userId exists
     if(!req.body.userId){
         return res.status(400).send(
            "UserID is not provided"
         )
     }
 
    /**
    * Valiate if the userID is already not present
    */
     const user = await User.findOne({userId : req.body.userId});
     if(user != null){
         return res.status(400).send( "UserID already exists" )
     }

    /*
        validate the Email if it Exists
    */
     if( !req.body.email ){
        return res.status(400).send( "User Email is Not provided" )
    }

    /**
     * Valiate if the u is already not preset
     */
    const email = await User.findOne({email : req.body.email});
    // message : "Failed !  Email already exist"
    if( email!=null ){
        return res.status(400).send("Email Already Exists");
    }

 
     next(); // give the controll to the controller
 }
 
 module.exports = {
    addMiddlewaresToSignupRequest : addMiddlewaresToSignupRequest
 }