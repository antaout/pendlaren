var parseString = require('xml2js').parseString;
var http = require('http');
url = 'http://api.sr.se/api/v2/playlists/rightnow?channelid=132';

var request = http.get(url, function (response) {
    var jsonHolder = '',
        data;

    response.on('data', function (chunk) {
        jsonHolder += chunk;
    });

    response.on('end', function (err) {

        parseString(jsonHolder, function (err, result) {

            data = JSON.stringify(result);
            data = JSON.parse(data);
            artist = data.sr.playlist[0].previoussong[0].artist[0];
            console.log(artist);
        });
    });
});


module.exports = request;