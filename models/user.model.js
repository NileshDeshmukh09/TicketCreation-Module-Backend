
/**
* Schema for the user Model will be provided Here
*/

const mongoose = require("mongoose");
const databaseConfig = require("../configs/database.config");
const constants = require("../utils/constants");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 10,
        unqiue: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    },
    userType: {
        type: String,
        required: true,
        default: constants.userTypes.customer
        //   default : "CUSTOMER"
    },
    userStatus: {
        type: String,
        required: true,
        default: constants.userStatus.approved
    },

    ticketsCreated: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Ticket" /* Collection Name */
        /* One to Many Relationship between the Ticket's and the User */
    },

    ticketsAssigned: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Ticket"
    }


});



module.exports = mongoose.model("User", userSchema);


