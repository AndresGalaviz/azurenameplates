var express = require('express');
var router = express.Router();
var request = require('request');

var MsTranslator = require('mstranslator');
// Second parameter to constructor (true) indicates that 
// the token should be auto-generated. 
 
var client = new MsTranslator({
  api_key: "5e4afa9bf72c40508cb4fbee3b47f824"
}, true);
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Azure Compute Give - Nameplates' });
});

router.post('/register', function(req, res, next) {
    // An object of options to indicate where to post to
    var params = {
      text: req.body.name,
      from: 'en',
      to: 'hi'
    };
    console.log(req.body)
    // Don't worry about access token, it will be auto-generated if needed. 
    client.translate(params, function(err, data) {
      console.log(params)
      console.log(data);
      res.render('thanks', {name: data});
    });

});

module.exports = router;
