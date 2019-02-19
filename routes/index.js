var express = require('express');
var router = express.Router();
var request =  require('request');

const rootURL = 'https://api.github.com/';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { userData: null });
});

router.post('/', function(req, res){
  var option = {
    url: `${rootURL}users/${req.body.username}?access_token=${process.env.GITHUB_TOKEN}`,
    headers: {
      'User-Agent': 'fagleyali',
      'Authorization': 'token ' + process.env.GITHUB_TOKEN
    }
  }
  request(option ,function(err, response,body){
    var userData = JSON.parse(body);
    option.url = userData.repos_url;
    request(option, function(err, response,body){
      userData.repos = JSON.parse(body);
      console.log(userData.repos[0]);
      res.render('index',{userData})
    });
      
  });

});
module.exports = router;
