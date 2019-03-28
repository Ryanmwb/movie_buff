//        --VARS FOR ROUTES--
const express = require("express");
const router = express.Router();
// import fetch
const fetch = require("node-fetch");
//import key
const theMovieDBKey = require("../config/keys").movieAPI;
const key = "?api_key=".concat(theMovieDBKey);
// set theMovieDB base url
const base = "https://api.themoviedb.org/3/";

// @route   get api/person/popular
// @desc    get pages of popular people in film industry
// @access  Public
router.get("/popular", (req, res) => {
  var url = "".concat(base, "person/popular", key);
  fetch(url)
    .then(result => result.json())
    .then(data => res.json(data));
});

// @route   get api/person/search
// @desc    search for people by name
// @access  Public
router.get("/search", (req, res) => {
  var query = "&query=".concat(req.body.query);
  var url = "".concat(base, "search/person", key, query);
  fetch(url)
    .then(result => result.json())
    .then(data => res.json(data));
});

// @route   get api/person/:id/credits
// @desc    search for people's movie credits by name
// @access  Public
router.get("/:id/credits", (req, res) => {
  var id = req.params.id;
  var url = "".concat(base, "person/", id, "/movie_credits", key);
  fetch(url)
    .then(result => result.json())
    .then(data => res.json(data));
});

// @route   get api/person/:id/details
// @desc    search for a persons details via id
// @access  Public
router.get("/:id/details", (req, res) => {
  var id = req.params.id;
  var url = "".concat(base, "person/", id, key);
  fetch(url)
    .then(result => result.json())
    .then(data => res.json(data));
});

module.exports = router;
