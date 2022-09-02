/**
 * Routes for Authentication and Authorization
 * 
 */

// RESTFULL -APIs for Authentication
const authController = require("../controllers/auth.controller");


module.exports = (app)=>{
    
    /** SIGNUP - POST */
    app.post("/ticketsmodule/api/v1/auth/signup", authController.signup);

   
}