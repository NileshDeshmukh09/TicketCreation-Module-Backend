/**
 * Routes for Authentication and Authorization
 */

// UserType  |  UserID | Passsword 

// Customer  |  Nil11 | newNil11@
// Engineer  |  Nil02 | Customer@123
// Engineer  | user02  | newUser02@
// ADMIN     | admin |  Welcome987

// RESTFULL -APIs for Authentication
const express = require("express");
const authController = require("../controllers/auth.controller");
const { signupVerification } = require("../middlewares");
const router = express.Router();



/** SIGNUP - POST */
router.post("/auth/signup", [signupVerification.addMiddlewaresToSignupRequest] , authController.signup);

 /** SIGNIN - POST */
router.post("/auth/signin", authController.signin);

module.exports = router
   