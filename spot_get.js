var https = require('https');
    url = 'https://api.spotify.com/v1/search?q=tania%20bowra&type=artist';

var request = https.get(url, function(response) {
    
    var jsonHolder = '',
        data;
    
    response.on('data', function(chunk) {
        jsonHolder += chunk;
    });
    
    
    response.on('end', function(err) {
        
     
      

        console.log(jsonHolder);
    
        
    });



});