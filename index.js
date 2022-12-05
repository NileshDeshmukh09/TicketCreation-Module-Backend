const express =require("express");
const TicketServerConfig = require("./configs/TicketServer.config");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");
const User = require("./models/user.model");
const cors = require("cors");

const app = express();


app.use(
    cors()
);

app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/**
 * Setup the mongodb connection 
 */
// console.log(process.env.DB_URL);
 mongoose.connect(process.env.DB_URL, ()=>{
    console.log("MongoDB connected ");
    
    /** Intialize the admin */
    createAdmin();
    
});

async function createAdmin(){

    
    try{
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
    }catch( error ){
        console.log( error.message );
    }
}




const authRouter = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const ticketRoutes = require('./routes/ticket.routes');
const homeRoutes = require('./routes/home.routes');


app.use(  homeRoutes );
app.use( '/ticketsmodule/api/v1' , authRouter );
app.use( '/ticketsmodule/api/v1' , userRoutes );
app.use( '/ticketsmodule/api/v1' , ticketRoutes );


app.listen(TicketServerConfig.PORT, () => {
    console.log(`Ticket-Creation-Module-Server has started on the port http://localhost:${TicketServerConfig.PORT}` );
})