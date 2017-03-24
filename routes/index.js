var express = require('express');
var router = express.Router();
var fs = require('fs');
var Clarifai = require('clarifai');
var scoreKeeper = {};

Clarifai.initialize({
  'clientId': 'yours',
  'clientSecret': 'yours'
});


var app = express();
var config = JSON.parse(require("fs").readFileSync("./config.json"));



function processImg(imgBuffer) {
Clarifai.getTagsByImageBytes(imgBuffer).then(
  handleResponse,
  handleError
);
};



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

});



router.post('/captureImage', function(req, res, next) {
	//console.log("FormData "+ req.body.base64);
	var base64Data = req.body.base64.replace(/^data:image\/png;base64,/, "");
  scoreKeeper = {};
  var myRes;

  Clarifai.getTagsByImageBytes(base64Data, {
    'model': 'food-items-v0.1'
    //'model': 'general-v1.3'
  }).then(function(response){

    res.send(JSON.stringify(response));

    },
    handleError
  ).then(function(){


  });
});




function handleResponse(response){
  console.log('promise response:', JSON.stringify(response));
};

function handleError(err){
  console.log('promise error:', err);
};

module.exports = router;
