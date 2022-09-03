/**
 * This File will have the Logic to Transform the Object
 */


 function userResponseByID(user){
    findByIDResponse = [];

    findByIDResponse.push({
        name : user.name,
        userId : user.userId,
        email : user.email,
        userType : user.userType,
        userStatus : user.userStatus,
    })
return findByIDResponse;
}

module.exports = {userResponseByID }