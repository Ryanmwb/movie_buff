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
const persons = require("./routes/persons");
const movies = require("./routes/movies");

//        --ROUTES--
app.use("/api/person", persons);
app.use("/api/movies", movies);

//        --SERVER--
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));
