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

/*GET spotify data.*/

router.get('/api/spot', function (req, res, next) {
    getArtist(id, function (srArtist) {


        getSpotUri(srArtist, function (spotObj) {
            res.json(spotObj);

        });


    });

});

/*GET sr data.*/
router.get('/api/sr', function (req, res, next) {
    getArtist(id, function (srArtist, body) {

    res.json(body);


    });

});

/*GET home page.*/
router.get('/', function (req, res, next) {
    trackError = '';
    var id = req.query["id"];

    getArtist(id, function (srBody) {
        
        try {
            srArtist = srBody.sr.playlist[0].song[0].artist[0];
            srTrack = srBody.sr.playlist[0].song[0].title[0];
        } catch(err){
            res.render('error', {
                message: "Cannot find song"
            });
            return;
        }
        
        if (srArtist.indexOf("&") > -1) {

            artistList = srArtist.split("&");
            srArtist = artistList[0];
        }
        if (srArtist.indexOf("[+]") > -1) {

            artistList = srArtist.split("[+]");
            srArtist = artistList[0];
        }

        async.parallel([

            function (callback) {

                    getSpotArtist(srArtist, callback);

                                },
            function (callback) {

                    getSpotTrack(srTrack, callback);
                    
                            }
                        ],

            function (err) {
                if(trackError != ''){
                    res.render('error', {
                        message : trackError
                        
                    });  
                return;
                }
                if (err) console.log(err);
                try{
                res.render('index', {
                    
                    spotArtistUri: spotArtistObj.artists.items[0].external_urls['spotify'],
                    spotArtistId: spotArtistObj.artists.items[0]['id'],
                    spotTrackId: spotTrackId,
                    spotTrackUri: spotTrackUri,
                    artist: srArtist,
                    title: srTrack
                
                });
                }catch(err){
                    message : trackError
                }

            });

    });

});


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
        try{
        spotArtistObj = JSON.parse(body);
        }catch(err){
            trackError = err;
            callback();
            return;
        }
            
        callback(spotArtistObj);
        return;
    });
}

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
        
        if(spotTrackObj.tracks.items[0] === undefined){
            
            trackError = 'cannot find track';
            callback();
            return;
        };
        
        if(spotTrackObj.tracks.items[0].external_urls === undefined){
              
            trackError = 'cannot find track';
            callback();
            return;
        };
        
        spotTrackId = spotTrackObj.tracks.items[0]['id'];
        spotTrackUri = spotTrackObj.tracks.items[0].external_urls['spotify'];
        
        callback();
        return;
    });
}

function getArtist(id, callback) {

    var request = require("request");

    var options = {
        method: 'GET',
        url: 'http://api.sr.se/api/v2/playlists/rightnow',
        qs: {
            channelid: id
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        parseString(body, function (err, result) {

            body = JSON.stringify(result);
            body = JSON.parse(body);

        });

        callback(body);
        return;
    });
}

module.exports = router;