/**
 * This file will have all the logic to manipulate the User resource 
*/

const User = require("../models/user.model");
const responseConvertor = require("../utils/responseConvertor")

/**Get all the Users */
async function findAllUsers(req, res){

     /**
     * Read the data from the Query parameters
    */
   const nameReq = req.query.name;
   const userStatusReq = req.query.userStatus;
   const userTypeReq = req.query.userType;

   const filterObjQuery = {};

   if(nameReq && userStatusReq && userTypeReq){

       filterObjQuery.name = nameReq;
       filterObjQuery.userStatus = userStatusReq;
       filterObjQuery.userType = userTypeReq;

   }else if( userStatusReq && userTypeReq ){

       filterObjQuery.userStatus = userStatusReq;
       filterObjQuery.userType = userTypeReq;

   }else if( nameReq && userStatusReq ){

       filterObjQuery.name = nameReq;
       filterObjQuery.userStatus = userStatusReq;

   }else if(nameReq ){

        filterObjQuery.name = nameReq;

   }else if(userStatusReq ){
       
        filterObjQuery.userStatus = userStatusReq;

   }else if(userTypeReq ){
        filterObjQuery.userType = userTypeReq;
   }

   console.log(filterObjQuery);


    try {
        const users  = await User.find(filterObjQuery);

        if( users.length > 0 ){
            return res.status(200).send({
                status : 200,
                message : "Successfully Fetched All users !",
                users : responseConvertor.userResponse(users)// user Password will not be Returned in response.
            });
        }else{
            return res.status(200).send({
                status : 200,
                message : "No user found !"
                // users : objectConvertor.userResponse(users)// user Password will not be Returned in response.
            });
        }
    } catch (error) {
        console.log(error);
        return  res.status(500).send({
            status: 500,
            message : "Internal Error while Fetching all Users."
        })
    }
}


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

module.exports = {
    findUserByID ,
    findAllUsers , 
}