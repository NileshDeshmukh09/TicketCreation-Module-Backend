const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller");
const { authJWT, JWTAuth } = require("../middlewares");

module.exports = router

    /** createTicket - POST  */
router.post("/ticketsmodule/api/v1/tickets" ,[ JWTAuth.verifyToken ], ticketController.createTicket );
    
  