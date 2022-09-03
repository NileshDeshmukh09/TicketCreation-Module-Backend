/**
 * This file will have all the logic to manipulate the User resource 
*/

const User = require("../models/user.model");
const responseConvertor = require("../utils/responseConvertor")


/**
 * Fetch the User based on the UserID
 */
 async function findUserByID(req, res){
    const userIDRequest = req.params.userId; // Request Paramater Reads

    const user = await  User.findOne({ userId : userIDRequest });

    if( user ){
        return res.status(200).send({
            status : 200,
            message : "Successfully Fetched  user !",
            user : responseConvertor.userResponseByID( user )  
            
        });
    }else{
        return res.status(200).send({
            status : 200,
            message : "user  ID :  "+ userIDRequest + " - doesn't exist",
        })
    }

}

/** 
 * Update the User - Status , userType
 *   - only ADMIN shouldd be allowed to do this !
 * 
 * ADMIN  - name , userStatus , userType
 */
