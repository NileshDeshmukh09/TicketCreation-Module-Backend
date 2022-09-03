const User = require("../models/uesr.model");
const Ticket = require("../models/ticket.model");
const constants = require("../utils/constants");
const responseConvertor = require("../utils/responseConvertor");



exports.createTicket = async (req, res) => {

    const ticketObj = {
         title: req.body.title,
         description: req.body.description,
         ticketPriority: req.body.ticketPriority
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
