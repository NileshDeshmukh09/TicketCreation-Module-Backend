/**
 * This file represents the schema for the ticket Resource
 */

 const mongoose = require("mongoose");
 const constants = require("../utils/constants");
 
 const ticketSchema = new mongoose.Schema({
     title : {
         type : String,
         required : true,
     }, 
 
     description : {
         type : String,
         required : true,
     },
 
     status : {
         type : String,
         required : true,
         default : constants.ticketStatus.open, // Possible values : OPEN / CLOSED / BLOCKED /IN_PROGRESS
     },
 
     reporter : { // Who created ticket - userID  of the creater
         type : String,
     },
 
     assignee : {
         type : String,
     },
 
     createdAt : {
         type : Date,
         immutable : true,
         default : () => {
             return Date.now();
         }
     },
 
     updatedAt : {
         type : Date,
         default : () => {
             return Date.now();
         }
     }
 })
 
 module.exports = mongoose.model("Ticket" , ticketSchema);