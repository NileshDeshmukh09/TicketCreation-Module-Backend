const express =require("express");
const TicketServerConfig = require("./configs/TicketServer.config");


const app = express();


app.listen(TicketServerConfig.PORT, () => {
    console.log(`Ticket-Creation-Module-Server has started on the port http://localhost:${TicketServerConfig.PORT}` );
})