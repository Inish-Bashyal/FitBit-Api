const express = require("express");
const app = express();
app.use(express.json());
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));


//config
dotenv.config({
  path: "./config/.env",
});


// import route
const user = require("./routes/user-routes");


app.use("/users", user);



module.exports = app;

