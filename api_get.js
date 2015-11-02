var parseString = require('xml2js').parseString;
var async = require('async');
var srHttp = require('http');
var spotHttps = require('https');
var request = require('request');





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