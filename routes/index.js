var express = require('express');
var router = express.Router();
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Azure Compute Give - Nameplates' });
});

router.post('/register', function(req, res, next) {
    console.log(req.connection.user);
    // An object of options to indicate where to post to
    var whoUrl = 'http://who/Data/Person/' + req.body.alias + '.xml';
    console.log(whoUrl);
    res.render('thanks');
});

module.exports = router;
