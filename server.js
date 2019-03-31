const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//        --INIT APP--
const app = express();

//        --APP MIDDLEWARE--
// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO setup mongooseDB
// TODO connect to mongooseDB
// TODO create user model
// TODO add passport middleware

//        --ROUTE LOGIC--
const movie = require("./routes/movie");
const persons = require("./routes/persons");

//        --ROUTES--
app.use("/api/movie", movie);
app.use("/api/people", persons);

//        --SERVER--
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));
