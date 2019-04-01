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
router.post("/search", (req, res) => {
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
  // calculate age
  function calcAge(person) {
    var dobData = person.birthday.split("-");
    var dob = [dobData[1], dobData[2], dobData[0]].join("/");
    var birthDate = new Date(dob);

    if (person.deathday === null) {
      var today = new Date();
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
      }
    } else {
      var dodData = person.deathday.split("-");
      var dod = [dodData[1], dodData[2], dodData[0]].join("/");
      var deathDate = new Date(dod);
      var age = deathDate.getFullYear() - birthDate.getFullYear();
      var m = deathDate.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && deathDate.getDate() < birthDate.getDate())) {
        age = age - 1;
      }
    }
    return age;
  }

  fetch(url)
    .then(result => result.json())
    .then(data => res.json({ ...data, age: calcAge(data) }));
});

router.get("/test", (req, res) => {
  console.log("testing person routes...");
});

module.exports = router;
