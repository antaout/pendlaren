var https = require('https');
    url = 'https://api.spotify.com/v1/search?q=' + fName + '%20'+ sName + '&type=artist';

var request = https.get(url, function(response) {
    
    var jsonHolder = '',
        data;
    
    response.on('data', function(chunk) {
        jsonHolder += chunk;
    });
    
    
    response.on('end', function(err) {
        
      
      

        var obj = JSON.parse(jsonHolder);
      
        console.log(obj.artists.items[0].external_urls.spotify);
    
        
    });



});