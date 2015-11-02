
//vanlig route
router.get('/', function (req, res, next) {
    
    //kalla din funktion som vanligt
    getLedamot("Stefan", function(ledamotList) {
        
        //Här sker allting som du vill ska hända efter du fått ett callback
        //Du kan nästla flera callback funktioner här om du vill
        res.render('ledamot', {
            ledamotLista: ledamotList
        }
    }
});

function getLedamot(fnamn, callback) {   
    /*Massa async grejs som till slut ger mig variablen ledamotList*/
    /*Här har du dina API kall osv*/
    callback(ledamotList);
    return; 
}