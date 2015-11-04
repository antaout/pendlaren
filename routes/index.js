var express = require('express');
var router = express.Router();
module.exports = router;
var request = require("request");
var parseString = require('xml2js').parseString;
var async = require('async');

var spotArtistObj = '';
var spotTrackObj = '';
var spotTrackId = '';
var spotTrackUri = '';
var trackError = '';

var id = "2576";

/*
*GET spotify data.
*/

router.get('/api/spot', function (req, res, next) {
    getArtist(id, function (srArtist) {


        getSpotArtist(srArtist, function (callback) {
            res.json(callback);

        });


    });

});

/*
*GET sr data.
*/
router.get('/api/sr', function (req, res, next) {
    getArtist(id, function (srBody) {

        res.json(srBody);


    });

});

/*
*GET home page.
*/

/*
*Skapar router
*/
router.get('/', function (req, res, next) {
/*
*Nollställer trackError strängen
*/
    trackError = '';
/*
*Sätter SR kanal ID till URL
*/
    var id = req.query["id"];

/*
*Startar funktionen för SR API
*/
    getArtist(id, function (srBody) {

        /*
        *Catch för att fånga upp undefined fel, annars värdesätt variabler
        */
        try {
            srArtist = srBody.sr.playlist[0].song[0].artist[0];
            srTrack = srBody.sr.playlist[0].song[0].title[0];
            srChannel = srBody.sr.playlist[0].channel[0].$["name"];

        /*
        *Vid fel, skriv ut text på index.jade
        */
        } catch (err) {
            res.render('error', {
                message: "Kunde inte hitta låt"
            });
            return;
        }

        /*
        *Om det är flera artister, splittar vid första 
        *ampersanden och tar första värdet i arrayen.
        */
        if (srArtist.indexOf("&") > -1) {

            artistList = srArtist.split("&");
            srArtist = artistList[0];
        }
        if (srArtist.indexOf("[+]") > -1) {

            artistList = srArtist.split("[+]");
            srArtist = artistList[0];
        }

        /*
        *Startar funktionerna för att hämta Artist
        *och Låt från Spotify API, använder async.paralell
        *för att köra dem samtidigt.
        */
        async.parallel([

            function (callback) {

                    getSpotArtist(srArtist, callback);

                                },
            function (callback) {

                    getSpotTrack(srTrack, callback);

                            }
                        ],

            function (err) {
                if (trackError != '') {
                    res.render('error', {
                        message: trackError

                    });
                    return;
                }
                if (err) console.log(err);
            /*
            *Om inga problem uppstår rendera sidan 
            *och värdesätt objekt
            */
            try {
                    res.render('index', {

                        spotArtistUri: spotArtistObj.artists.items[0].external_urls['spotify'],
                        spotArtistId: spotArtistObj.artists.items[0]['id'],
                        spotTrackId: spotTrackId,
                        spotTrackUri: spotTrackUri,
                        artist: srArtist,
                        title: srTrack,
                        channel: srChannel

                    });
                } catch (err) {
                    message: trackError
                }

            });

    });

});

/*
*Funktion för att hämta SR Artisten
*som JSON objekt i Spotify.
*/
function getSpotArtist(srArtist, callback, error) {

    var request = require("request");

    var options = {
        method: 'GET',
        url: 'https://api.spotify.com/v1/search',
        qs: {
            q: '*' + srArtist,
            type: 'artist',
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        try {
            spotArtistObj = JSON.parse(body);
        } catch (err) {
            trackError = err;
            callback();
            return;
        }

        callback(spotArtistObj);
        return;
    });
}
/*
*Funktion för att hämta SR låten 
*som JSON objekt i Spotify.
*/
function getSpotTrack(srTrack, callback, error) {

    var request = require("request");

    var options = {
        method: 'GET',
        url: 'https://api.spotify.com/v1/search',
        qs: {
            q: '*' + srTrack,
            type: 'track',
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        spotTrackObj = JSON.parse(body);

        if (spotTrackObj.tracks.items[0] === undefined) {

            trackError = 'Kunde inte hitta låt';
            callback();
            return;
        };

        if (spotTrackObj.tracks.items[0].external_urls === undefined) {

            trackError = 'Kunde inte hitta låt';
            callback();
            return;
        };

        spotTrackId = spotTrackObj.tracks.items[0]['id'];
        spotTrackUri = spotTrackObj.tracks.items[0].external_urls['spotify'];

        callback();
        return;
    });
}

/*
*Funktion för att hämta kanal data från SR.
*/
function getArtist(id, callback) {

    var request = require("request");

    var options = {
        method: 'GET',
        url: 'http://api.sr.se/api/v2/playlists/rightnow',
        qs: {
            channelid: id
        }
    };

/*
*Datan finns enbart som XML på SR 
*så gör om den till ett JSON objekt 
*/  
    request(options, function (error, response, body) {    

        parseString(body, function (err, result) {

            body = JSON.stringify(result);
            body = JSON.parse(body);

        });

        callback(body);
        return;
    });
}

module.exports = router;