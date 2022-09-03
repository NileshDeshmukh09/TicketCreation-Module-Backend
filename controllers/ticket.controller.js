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


/**
 * Controller to Update the Ticket
 */
 exports.updateTicket = async (req, res) => {

     /**
      * Check the Ticket exists 
      */
     const ticket = await Ticket.findOne({
          _id: req.params.id
     });

     if (ticket == null) {
          return res.status(200).send({
               message: "Ticket doesn't exist "
          })
     }

     try {


          /**
           * Only the Ticket Requester be allowed to update the Ticket
           */

          const user = await User.findOne({
               userId: req.userId
          });

          console.log(ticket.assignee);

          if( ticket.assignee == undefined ){
               ticket.assignee = req.userId;
          }
          console.log(req.userId);
          if ( (user.ticketsCreated == undefined || !user.ticketsCreated.includes(req.params.id)) && !(user.userType == constants.userTypes.admin )&& !(ticket.assignee == req.userId) ) {
               return res.status(403).send({
                    message: "Only Owner of the Ticket is allowed to Update Ticket "
               })
          }

          /**
          * Update the Attributes of the Saved Ticket 
          */

          ticket.title = req.body.title != undefined ? req.body.title : ticket.title;
          ticket.description = req.body.description != undefined ? req.body.description : ticket.description;
          ticket.status = req.body.status != undefined ? req.body.status : ticket.status;

          /**
           * Ability to Re-assign the ticket
           */
          if( user.userType == constants.userTypes.admin ){
               ticket.assignee = req.body.assignee != undefined ? req.body.assignee : ticket.assignee ;
          }

          const  engineer = await User.findOne({
               userId : ticket.assignee,
          });

          console.log("Engineer :" , engineer);
          /** 
          * Saved the Changed Ticket
          */
          const updatedTicket = await ticket.save();

          /**  
           *  Return the Updated Ticket
           */
          return res.status(200).send({
               message: "Ticket Updated successfully !",
               ticket: responseConvertor.ticketResponse(updatedTicket)
          });
     }

     catch (error) {
          console.log("Someone updating tickets  , who has not created ticket !");
          return res.status(403).send({
               message: "Ticket can be Updated Only by Customer , who created it !"
          })
     }
}

