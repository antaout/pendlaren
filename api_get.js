var parseString = require('xml2js').parseString;
var async = require('async');
var srHttp = require('http');
var spotHttps = require('https');
var request = require('request');

var id = "2576";
getArtist(id, function (srArtist) {
    console.log(srArtist);
    getSpotUri(srArtist, function (spotUri){
       console.log(spotUri);   
    });

});

function getSpotUri(srArtist, callback) {

    var request = require("request");

    var options = {
        method: 'GET',
        url: 'https://api.spotify.com/v1/search',
        qs: {
            q: srArtist,
            type: 'artist'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        var obj = JSON.parse(body);

        spotUri = obj.artists.items[0].external_urls.spotify;
        callback(spotUri);
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
            srArtist = body.sr.playlist[0].song[0].artist[0];

        });

        callback(srArtist);
        return;
    });
}
/*
    var spotOptions = {
        host: 'api.spotify.com',
        path: '/v1/search?q=*' + srArtist + '&type=artist'
    };
    getSpotUri = function (response) {
        var jsonHolder = '';

        response.on('data', function (chunk) {
            jsonHolder += chunk;
        });

        response.on('end', function () {
            var obj = JSON.parse(jsonHolder);
            spotUri = obj.artists.items[0].external_urls.spotify;
            console.log(spotUri);

        });
        spotHttps.request(spotOptions, getSpotUri).end();
    }*/
/*
    var srOptions = {
        host: 'api.sr.se',
        path: '/api/v2/playlists/rightnow?channelid=' + id
    };

    var jsonHolder = '',
        data;

    response.on('data', function (chunk) {
        jsonHolder += chunk;
    });

    response.on('end', function (err) {

        parseString(jsonHolder, function (err, result) {

            data = JSON.stringify(result);
            data = JSON.parse(data);
            srArtist = data.sr.playlist[0].song[0].artist[0];
            console.log(srArtist);
            callback(srArtist);
        });
    });
    */
/*    
var srRequest = srHttp.get(srUrl, function (response) {
    var jsonHolder = '',
        data;

    response.on('data', function (chunk) {
        jsonHolder += chunk;
    });

    response.on('end', function (err) {

        parseString(jsonHolder, function (err, result) {

            data = JSON.stringify(result);
            data = JSON.parse(data);
            srArtist = data.sr.playlist[0].song[0].artist[0];
            console.log(srArtist);
        });
    });
});
*/
/*
var spotUrl = 'https://api.spotify.com/v1/search?q=*' + srArtist + '&type=artist';
var spotRequest = spotHttps.get(spotUrl, function (response) {

    var jsonHolder = '',
        data;

    response.on('data', function (chunk) {
        jsonHolder += chunk;
    });


    response.on('end', function (err) {

        var obj = JSON.parse(jsonHolder);

        spotUri = obj.artists.items[0].external_urls.spotify;

        console.log(srArtist);
        console.log(spotUri);
    });

});

*/