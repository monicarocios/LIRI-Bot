-// At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

const axios = require("axios");

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
        movie_this();
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
            // concertTime = moment.format("MM-DD-YYYY"))
            console.log(response.data[0].venue.city);
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
    
    switch(search) {
        case(!search):
        search = "The Sign Ace of Base";
        break;
    }

    spotify.search({ type: 'track', query: search }, function (err, response) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(response.tracks.items[0].artists[0].name);
        console.log(response.tracks.items[0].name);
        console.log(response.tracks.items[0].preview_url);
        console.log(response.tracks.items[0].album.name);
    });
}

function movie_this() {

    if (!search) {
        search = "Mr. Nobody";
        console.log("If you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947/>");
        console.log("It's on Netflix!");
    };

    const queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log(response.data.Year);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function find_random_file() {

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        console.log(data);

        spotify.search({ type: 'track', query: data }, function (err, response) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
    
            console.log(response.tracks.items[0].artists[0].name);
            console.log(response.tracks.items[0].name);
            console.log(response.tracks.items[0].preview_url);
            console.log(response.tracks.items[0].album.name);
        });

    });
}
