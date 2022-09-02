/**
 * Routes for Authentication and Authorization
 * 
 */

// RESTFULL -APIs for Authentication
const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

/** SIGNUP - POST */
router.post("/ticketsmodule/api/v1/auth/signup", authController.signup);

module.exports = router
   