const express = require("express");
const cors = require("cors");
const globalErrHandler = require("./middlewares/globalErrHandler");
const path = require('path');
const dotenv = require('dotenv').config();
require("./config/dbConnect");
const accountRoute = require("./routes/accounts/accountRoute");
const transactionsRoute = require("./routes/transactions/transactionsRoute");
const usersRoute = require("./routes/users/usersRoute");

const app = express();

//middlewares
app.use(express.json()); //pass incoming data
//cors middleware
app.use(cors());
//users route
app.use("/api/v1/users", usersRoute);
//account routes
app.use("/api/v1/accounts", accountRoute);

//transactions route
app.use("/api/v1/transactions", transactionsRoute);



    app.use(express.static(path.join(__dirname,'../client/build')));

    app.get('*' , (req, res) =>
    res.sendFile(
        path.resolve(__dirname, '../' , 'client' , 'build' , 'index.html')
    ));


//Error handlers
app.use(globalErrHandler);
//listen to server
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server is up and runing on port ${PORT}`));
