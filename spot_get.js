var titelModule = require('./sr_get');
var titel = titelModule.titel;
var https = require('https');
    url = 'https://api.spotify.com/v1/search?q=' + titel + '&type=artist';

var request = https.get(url, function(response) {
    
    var jsonHolder = '',
        data;
    
    response.on('data', function(chunk) {
        jsonHolder += chunk;
    });
    
    
    response.on('end', function(err) {
        
      
      

        var obj = JSON.parse(jsonHolder);
      
        spotUri = obj.artists.items[0].external_urls.spotify;
    
        
    });



});