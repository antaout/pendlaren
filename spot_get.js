var srArtist = require('./sr_get');
console.log(srArtist.request);

var https = require('https');
url = 'https://api.spotify.com/v1/search?q=*daughter&type=artist';

var request = https.get(url, function (response) {

    var jsonHolder = '',
        data;

    response.on('data', function (chunk) {
        jsonHolder += chunk;
        //console.log(jsonHolder);
    });


    response.on('end', function (err) {

        var obj = JSON.parse(jsonHolder);

        spotUri = obj.artists.items[0].external_urls.spotify;
        console.log(spotUri);

    });

});