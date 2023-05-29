const express = require("express");
const app = express();
app.use(express.json());
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { verifyUser } = require('./middlewares/auth');
const user = require("./routes/user-routes");
const routine = require('./routes/routine-routes');



app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));


//config
dotenv.config({
  path: "./config/.env",
});


// import route

app.use("/users", user);
app.use('/routines', verifyUser, routine);


// Error Handling middleware
app.use((err, req, res, next) => {
  console.error(err)
  if (err.name === 'CastError') {
      res.status(400)
  } else if (err.name == 'ValidationError') {
      res.status(400)
  }
  res.json({ error: err.message })
})

// Unknown Path handling middleware
app.use((req, res) => {
  res.status(404).json({ error: 'path not found' })
})


module.exports = app;

