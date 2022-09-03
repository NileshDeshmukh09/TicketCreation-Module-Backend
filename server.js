const express =require("express");
const TicketServerConfig = require("./configs/TicketServer.config");
const databaseConfig = require("./configs/database.config");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");
const User = require("./models/user.model");

const app = express();

app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/**
 * Setup the mongodb connection 
 */
 mongoose.connect(databaseConfig.DB_URL, ()=>{
    console.log("MongoDB connected ");
    
    /** Intialize the admin */
    init();
    
});

async function init(){

    var user = await User.findOne({ userId : "admin" });

    if( user ){
        return;
    }else{
        
        /**
         * Create the ADMIN user
        */
       const user = await User.create({
           name  : "Nilesh",
           userId : "admin",
           email : "nileshDesh@gmail.com",
           userType : "ADMIN",
           password : bcrypt.hashSync("Welcome987" , 8)
       });
       console.log("ADMIN is CREATED !")
    }
}




const authRouter = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const ticketRoutes = require('./routes/ticket.routes');
app.use( authRouter );
app.use( userRoutes );
app.use( ticketRoutes );


app.listen(TicketServerConfig.PORT, () => {
    console.log(`Ticket-Creation-Module-Server has started on the port http://localhost:${TicketServerConfig.PORT}` );
})