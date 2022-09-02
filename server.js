const express =require("express");
const TicketServerConfig = require("./configs/TicketServer.config");
const mongoose = require("mongoose");
const logger = require("morgan");
const databaseConfig = require("./configs/database.config");
const bodyParser = require("body-parser");

const app = express();

app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/**
 * Setup the mongodb connection 
 */
 mongoose.connect(databaseConfig.DB_URL, ()=>{
    console.log("MongoDB connected ");
    
    
})

const authRouter = require('./routes/user.routes');
app.use( authRouter );


app.listen(TicketServerConfig.PORT, () => {
    console.log(`Ticket-Creation-Module-Server has started on the port http://localhost:${TicketServerConfig.PORT}` );
})