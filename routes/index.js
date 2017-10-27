var express = require('express');
var router = express.Router();
var request = require('request');
var nodemailer = require('nodemailer');
var MsTranslator = require('mstranslator');
var azure = require('azure-storage');
// Second parameter to constructor (true) indicates that 
// the token should be auto-generated. 
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'andres.galaviz@gmail.com',
    pass: '.Tnomfcib0!'
  }
});

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
    var alias = req.body.alias;
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
      console.log(req.body.name, langList, alias)
      var mailOptions = {
        from: 'andres.galaviz@gmail.com',
        to: 'angalavi@microsoft.com',
        subject: 'alias',
        text: req.body.name + ";" + langList + ";" + alias
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.render('thanks', {name: req.body.name, languageList: translatedLanguages});
      //do something with the finalized list of albums here
    });
});

module.exports = router;
