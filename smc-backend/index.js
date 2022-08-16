const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const fs = require("fs");
const cors = require("cors")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.use(morgan("dev"));
// app.use(expressValidator());
app.use(require("./apps/routes"));
app.use(cors())

// Auth Error Handler
app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      res.status(401).json({ message: "Unauthorized!" });
    } else {
      next(err);
    }
  });
  
  // mongoose.set('debug', true)
  
  mongoose
    .connect("mongodb://localhost:27017/smc", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("error=>", err));

app.listen(8080, ()=>console.log("Server running at 8080"))