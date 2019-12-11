-// At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config();
// var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
const axios = require("axios");

const inquirer = require("inquirer");

const moment = require("moment");

const fs = require("fs");

// Take two arguments.
// The first will be the action (i.e.  `concert-this``spotify-this-song``movie-this``do-what-it-says`)
// The second will be the search
const action = process.argv[2];
const search = process.argv[3];

// We will then create a switch-case statement (if-else would also work).
// The switch-case will direct which function gets run.
switch (action) {
    case "concert-this":
        find_concert();
        break;

    case "spotify-this-song":
        find_song();
        break;

    case "movie-this":
        find_movie();
        break;

    case "do-what-it-says":
        find_random_file();
        break;
}

// Name of the venue

// * Venue location

// * Date of the Event (use moment to format this as "MM/DD/YYYY")

function find_concert() {

    // Run a request with axios to the bandsintown api with the artist specified
    axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log(response.data[0].venue.name);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function find_song() {

    axios.get().then(
        function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function movie_this() {

    axios.get().then(
        function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function find_random_file() {

    axios.get().then(
        function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

// so now need to find url for each one so that it's calling each api 
// need to fix concert api so it shows the right parts of json-but alreayd figured our i have to cinlude data and then the brackets 
// then need the right information to show up, need to right part of JSON
// then take screenshots of each of the actions working
