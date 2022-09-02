/**
 * Routes for Authentication and Authorization
 * 
 */

// RESTFULL -APIs for Authentication
const express = require("express");
const authController = require("../controllers/auth.controller");
const { signupVerification } = require("../middlewares");
const router = express.Router();

/** SIGNUP - POST */
router.post("/ticketsmodule/api/v1/auth/signup",[signupVerification.addMiddlewaresToSignupRequest], authController.signup);

module.exports = router
   