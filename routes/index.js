var express = require('express');
var router = express.Router();
module.exports = router;
var request = require("request");
var parseString = require('xml2js').parseString;

var id = "2576";

/*GET home page.*/
router.get('/', function (req, res, next) {
    getArtist(id, function (srArtist) {
        console.log(srArtist);
            
        if (srArtist.indexOf("&") > -1) {

            artistList = srArtist.split("&");
            srArtist = artistList[0];
            console.log(artistList);
        }
        if (srArtist.indexOf("[+]") > -1) {
            
            artistList = srArtist.split("[+]");
            srArtist = artistList[0];
            console.log(artistList);
        }
        
        getSpotUri(srArtist, function (spotObj) {
            res.render('index', {
                spotUri : spotObj.artists.items[0].external_urls['spotify'],
                spotId : spotObj.artists.items[0]['id'],
                artist : srArtist
            });
    
        });


    });

});


function getSpotUri(srArtist, callback) {

    var request = require("request");

    var options = {
        method: 'GET',
        url: 'https://api.spotify.com/v1/search',
        qs: {
            q: '*' + srArtist,
            type: 'artist'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        var obj = JSON.parse(body);
    
        callback(obj);
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





module.exports = router;

/*GET SR page
router.get('/sr', function(req, res) {

var http = require('http');
    url = 'http://api.sr.se/api/v2/channels/132';
var request = http.get(url, function(response) {
    
    var jsonHolder = '',
        data;
    
    response.on('data', function(chunk) {
        jsonHolder += chunk;
    });
    
    
    response.on('end', function(err) {
        
        parseString(jsonHolder, function (err, result) {
            
            data = JSON.stringify(result);
            data = JSON.parse(data);
            img = data.sr.image;  
            siteUrl = data.sr.siteurl;
            
            console.log(siteUrl);
        });
});
});
});
*/
/*
    var options = { method: 'GET',
                   url: 'http://api.sr.se/api/v2/channels/132',
                   qs: { siteurl: '', image: '', name: '',
                     utformat: 'json' },
                   headers: 
                   { 'postman-token': '94ee30fd-63af-bcac-3554-160082ac33f5',
                    'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        
        console.log(JSON.stringify(body));
        
        res.render('sr', { 
            json: body,
        });
        
    });
*/