var express = require('express');
var router = express.Router();

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
