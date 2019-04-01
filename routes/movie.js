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
// @desc    get movie details
// @access  Public
router.get("/:id/details", (req, res) => {
  var id = req.params.id;
  var url = "".concat(base, "movie/", id, key);
  fetch(url)
    .then(result => result.json())
    .then(data => res.json(data));
});

// @route   get api/movie/now_playing
// @desc    movies that are now playing
// @access  Public
router.get("/playing_now", (req, res) => {
  console.log("now playing server route called ....");
  var url = "".concat(base, "movie/now_playing", key);
  fetch(url)
    .then(result => result.json())
    .then(data => res.json(data));
});

// @route   get api/movie/coming_soon
// @desc    upcoming movies
// @access  Public
router.get("/coming_soon", (req, res) => {
  var url = "".concat(base, "movie/upcoming", key);
  fetch(url)
    .then(result => result.json())
    .then(data => res.json(data));
});

// @route   get api/movie/:id/credits
// @desc    movie credits
// @access  Public
router.get("/:id/credits", (req, res) => {
  var id = req.params.id;
  var url = "".concat(base, "movie/", id, "/credits", key);
  fetch(url)
    .then(result => result.json())
    .then(data => res.json(data));
});

// @route   get api/movie/:id/recommendations
// @desc    movie recommendations
// @access  Public
router.get("/:id/recommendations", (req, res) => {
  var id = req.params.id;
  var url = "".concat(base, "movie/", id, "/recommendations", key);
  fetch(url)
    .then(result => result.json())
    .then(data => res.json(data));
});

// @route   get api/movie/search
// @desc    search for movie
// @access  Public
router.post("/search", (req, res) => {
  var query = req.body.movie;
  var url = "".concat(base, "search/movie/", key, "&query=", query);
  fetch(url)
    .then(result => result.json())
    .then(data => {
      res.json(data);
    });
});

// @route   get api/movie/discover
// @desc    advance search for movies
// @access  Public
router.get("/discover", (req, res) => {
  // get user inputs
  var sort_by = "&sort_by=".concat(req.body.sortBy);
  var with_genres = "&with_genres=".concat(req.body.with_genres); //string of integers seperated by commas i.e. [21, 15]
  var releaseAfter = "&release_date.gte=".concat(req.body.releaseAfter);
  var releaseBefore = "&release_date.lte=".concat(req.body.releaseBefore);

  var props = [];
  if (req.body.sort_by) {
    props.push(sort_by);
  }
  if (req.body.with_genres) {
    props.push(with_genres);
  }
  if (req.body.releaseAfter) {
    props.push(releaseAfter);
  }
  if (req.body.releaseBefore) {
    props.push(releaseBefore);
  }

  // join inputs
  props = props.join("").toString();
  var url = "".concat(base, "discover/movie", key, props);
  fetch(url)
    .then(result => result.json())
    .then(data => res.json(data));
});

module.exports = router;
