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
  client.getLanguagesForTranslate(function (err, languageCodes) {
    var params = {locale: 'en', languageCodes: languageCodes};
    client.getLanguageNames(params, function (err, data) {
      res.render('signup', { title: 'Azure Compute Give - Nameplates', languages: data, languageCodes: languageCodes});
    });
  });
  
});

router.post('/register', function(req, res, next) {
    // An object of options to indicate where to post to
    var translatedLanguages = []
    var langList = req.body.languageList;
    var promises = langList.map(function (lang) {
      var params = {
        text: req.body.name,
        from: 'en',
        to: lang
      };
      // Don't worry about access token, it will be auto-generated if needed. 
      return new Promise(function(resolve, reject) {
          client.translate(params, function(err, data) {
            translatedLanguages.push(data)  
            resolve("Success!");
        });
        return;
      });
    });
    Promise.all(promises).then(function () {
      res.render('thanks', {name: req.body.name, languageList: translatedLanguages});
      //do something with the finalized list of albums here
    });
});

module.exports = router;
