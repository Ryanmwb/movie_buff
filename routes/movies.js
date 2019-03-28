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

// @route   get api/movie/:id
// @desc    get details about movie
// @access  Public
router.get("/:id", (req, res) => {
  var id = req.params.id;
  var url = "".concat(base, "movie/", id, key);
  fetch(url)
    .then(result => result.json())
    .then(data => res.json(data));
});

// @route   get api/movie/:id/credits
// @desc    get credits of a particular movie
// @access  Public
router.get("/:id/credits", (req, res) => {
  var id = req.params.id;
  var url = "".concat(base, "movie/", id, "/credits", key);
  console.log(url);
  fetch(url)
    .then(result => result.json())
    .then(data => res.json(data));
});

// @route   get api/movie/:id/recommendations
// @desc
// @access  Public
router.get("/:id/recommendations", (req, res) => {
  var id = req.params.id;
  var url = "".concat(base, "movie/", id, "/recommendations", key);
  fetch(url)
    .then(result => result.json())
    .then(data => res.json(data));
});

// @route   get api/movie/now_playing
// @desc    get movies that are now playing
// @access  Public
router.get("/now_playing", (req, res) => {
  var pageNumber = 1;
  var page = "&page=".concat(pageNumber);
  var url = "".concat(base, "movie/", "now_playing", key, page);
  console.log(url);
  fetch(url)
    .then(result => result.json())
    .then(data => res.json(data));
});

// @route   get api/movie/upcoming
// @desc    get pages of upcoming movies
// @access  Public
router.get("/upcoming", (req, res) => {
  var url = "".concat(base, "movie/", "upcoming", key);
  var test =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=4a0f0029d366912b50a509d879bc1675&language=en-US&page=2";
  console.log(test);
  fetch(test)
    .then(result => result.json())
    .then(data => res.json(data));
});

// @route   get api/person/popular
// @desc    get pages of popular people in film industry
// @access  Public

module.exports = router;
