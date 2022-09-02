const User = require("../models/user.model");
const constants = require("../utils/constants");
const bcrypt = require("bcryptjs");
/** Registration Controller  for the User  */

exports.signup = async ( req, res ) => {

    var userStatus = req.body.userStatus;
    const UserDetailsStoredInDB = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        userType: req.body.userType,
        password: bcrypt.hashSync(req.body.password, 8),
        userStatus: userStatus,
    }

     /**
     * Create the New User and Added to the database
     */
      try {
        const createdUser = await User.create(UserDetailsStoredInDB);

         /**
         * Return the response
         */
          const ResponseOfNewUser = {
            name: createdUser.name,
            userId: createdUser.userId,
            email: createdUser.email,
            userType: createdUser.userType,
            userStatus: createdUser.userStatus,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt
        }

        res.status(201).send({
            status : 201,
            message: `${createdUser.userId} , Added Successully !`,
            user: ResponseOfNewUser
        });
    } catch (err) {

        console.error( err.message);
        res.status(500).send({
            message: "Internal Server Error ,when Insert User !"
        })
    }

}