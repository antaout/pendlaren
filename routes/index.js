var express = require('express');
var router = express.Router();
module.exports = router;
var request = require("request");
var parseString = require('xml2js').parseString;



var titelModule = require('../sr_get.js');
var titel = titelModule.titel;

var titelModule = require('../spot_get.js');
var spotUri = titelModule.spotUri;

//var util = require('util');

/*GET home page.*/ 
router.get('/', function(req, res, next) {
  //res.render('index', {sr: util.inspect(sr)});
    res.render('index', titel);
    
});

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
