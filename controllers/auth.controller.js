const User = require("../models/user.model");

/** Registration Controller  for the User  */

exports.signup = async ( req, res ) => {

    const UserDetailsStoredInDB = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        userType: req.body.userType,
        password: bcrypt.hashSync(req.body.password, 8),
        userStatus: userStatus
    }

     /**
     * Create the New User and Added to the database
     */
      try {
        const createdUser = await User.create(userObjToBeStoredInDB);

         /**
         * Return the response
         */
          const ResponseOfNewUser = {
            name: userCreated.name,
            userId: userCreated.userId,
            email: userCreated.email,
            userType: userCreated.userType,
            userStatus: userCreated.userStatus,
            createdAt: userCreated.createdAt,
            updatedAt: userCreated.updatedAt
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