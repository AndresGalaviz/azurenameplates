var express = require('express');
var router = express.Router();
var request = require('request');
var nodeSSPI = require('node-sspi')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Azure Compute Give - Nameplates' });
});

router.post('/register', function(req, res, next) {
    console.log(req.connection.user);
    // An object of options to indicate where to post to
    var whoUrl = 'http://who/Data/Person/' + req.body.alias + '.xml';
    console.log(whoUrl);
    request(whoUrl, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
    });
    res.render('thanks');
});

module.exports = router;
