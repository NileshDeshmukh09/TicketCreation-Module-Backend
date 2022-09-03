
/**
 *  The routes for the User 
 *  Resource
 */

const express = require("express");
const router = express.Router();
 const userController = require("../controllers/user.controller");
 const { JWTAuth } = require("../middlewares")
 
 
 /** FIND-ALL-USERS -- GET */
router.get("/ticketsmodule/api/v1/users",[JWTAuth.verifyToken , JWTAuth.isAdmin] , userController.findAllUsers)
 
 /** FIND-USER-BY-ID -- GET */
router.get("/ticketsmodule/api/v1/users/:userId", [JWTAuth.verifyToken , JWTAuth.isAdmin], userController.findUserByID )


  /** UPDATE-USER --  PUT */
  router.put("/ticketsmodule/api/v1/users/:userId", [JWTAuth.verifyToken ], userController.updateUserByID )
 

module.exports = router