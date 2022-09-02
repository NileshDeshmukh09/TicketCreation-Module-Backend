const express =require("express");
const PORT = 8888

const app = express();


app.listen(PORT, () => {
    console.log(`Ticket-Creation-Module-Server has started on the port http://localhost:${PORT}` );
})