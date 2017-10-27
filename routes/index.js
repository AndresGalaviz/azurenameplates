var express = require('express');
var router = express.Router();
var http = require("http");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Azure Compute Give - Nameplates' });
});

router.post('/register', function(req, res, next) {
    // An object of options to indicate where to post to
    var whoUrl = 'http://who/Data/Person/' + req.body.alias + '.xml';
    console.log(whoUrl);
    whoUrl = 'https://www.w3schools.com/xml/note.xml'
    var options = {
      url: whoUrl,
      method: 'GET',
    };
    
    var req = http.request(options, function(res) {
      console.log(res);
    });
    res.send('ok');
});

module.exports = router;
