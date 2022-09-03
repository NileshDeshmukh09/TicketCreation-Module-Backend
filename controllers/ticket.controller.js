const User = require("../models/user.model");
const Ticket = require("../models/ticket.model");
const constants = require("../utils/constants");
const responseConvertor = require("../utils/responseConvertor");



exports.createTicket = async (req, res) => {

    const ticketObj = {
         title: req.body.title,
         description: req.body.description
    }

    /**
     * If the Engineer  is available 
     */
    try {
         const engineer = await User.findOne({
              userType: constants.userTypes.engineer,
              userStatus: constants.userStatus.approved,
         })

         if (engineer) {
              ticketObj.assignee = engineer.userId
         }

         const ticket = await Ticket.create(ticketObj);

         /**
          * Ticket is created Now 
          * We should update the Customer and Engineer Documents 
          */

         /**
          * Find Out the Customer
          */

         if (ticket) {

              const user = await User.findOne({
                   userId: req.userId
              })
              /**
               * Update the Customer
               */
              user.ticketsCreated.push(ticket._id);
              await user.save();

              /**
               * Update the Engineer
               */
              engineer.ticketsAssigned.push(ticket._id);
              await engineer.save();

              return res.status(201).send({
                   message: "Ticket , created Successfully !",
                   ticket: responseConvertor.ticketResponse(ticket)
              })
         }

    } catch (error) {
         console.log(error);

         return res.status(500).send({
              status: 500,
              message: "Internal Server Error "
         })
    }
}


/* API to fetch all the Tickets */
exports.getAllTickets = async (req, res) => {
     /**
     * I want to get the list of all the tickets
     */
     const queryObj = {};


     const user = await User.findOne({ userId: req.userId });

     /**
      * If ADMIN , can able to see all the tickets created 
      */
     if (user.userType === constants.userTypes.admin) {
          /**
           * Return all the ticket 
           * No need to change in the QueryObj
           */
     }
     else if (user.userType == constants.userTypes.engineer) {
          /**
           * Get all the tickets Created or Assigned !
           */
          queryObj.assignee = req.userId;

     }
     else if (user.userType == constants.userTypes.customer) {

          /**
           * if CUSTOMER ,should get ticket created by Him.
           */
          if (user.ticketsCreated == null || user.ticketsCreated.length == 0) {
               return res.status(200).send({
                    message: "No tickets created by You !!!"
               })
          }

          queryObj._id = {
               $in: user.ticketsCreated /* Array's of TicketID's */
          }
     }

     if (req.query.status != undefined) {
          queryObj.status = req.query.status;
     };


     console.log(queryObj);
     const tickets = await Ticket.find(queryObj);
     console.log("tickets.length : ", tickets.length);

     if (tickets == null || tickets.length == 0) {
          return res.status(200).send({
               message: `No Tickets Found with status = ${queryObj.status} !`
          })
     }

     return res.status(200).send({
          message: `${user.userType} | ${user.userId} , Fetched All Tickets !`,
          tickets: responseConvertor.ticketListResponse(tickets)
     });

}


/**
 * Controller to fetch the Tickets based on ID's 
 */
 exports.getOneTicket = async (req, res) => {

     const ticket = await Ticket.findOne({
          _id: req.params.id
     });

     res.status(200).send({
          status : 200,
          message : "Ticket get successfully !",
          Ticket : responseConvertor.ticketResponse(ticket)
     });
}