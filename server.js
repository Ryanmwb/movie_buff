const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

// TODO add body parser middleware
// TODO setup mongooseDB
// TODO connect to mongooseDB
// TODO create user model
// TODO add passport middleware

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
