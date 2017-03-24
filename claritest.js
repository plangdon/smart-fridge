var Clarifai = require('clarifai');
var fs = require('fs');

Clarifai.initialize({
  'clientId': '',
  'clientSecret': ''
});

// get a token
function getToken() {
  Clarifai.getToken().then(
    handleResponse,
    handleError
  );
};

// get tags with an array of images
function getTags2() {
  Clarifai.getTagsByUrl([
    'https://samples.clarifai.com/wedding.jpg',
    'https://samples.clarifai.com/cookies.jpeg'
  ]).then(
    handleResponse,
    handleError
  );
};


function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}


function getTags() {
Clarifai.getTagsByImageBytes(base64_encode("uploads/out.png")).then(
  handleResponse,
  handleError
);
};

// select which tags are returned
function selectClasses() {
  Clarifai.getTagsByUrl(
    'https://samples.clarifai.com/wedding.jpg',
    {
      'selectClasses': ['people', 'dress', 'wedding']
    }
  ).then(
    handleResponse,
    handleError
  );
};

// get api info
function getInfo() {
  Clarifai.getInfo().then(
    handleResponse,
    handleError
  );
};

// get languages
function getLanguages() {
  Clarifai.getLanguages().then(
    handleResponse,
    handleError
  );
};

// get colors
function getColors() {
  Clarifai.getColorsByUrl('https://samples.clarifai.com/wedding.jpg').then(
    handleResponse,
    handleError
  );
};

// get api usage
function getUsage() {
  Clarifai.getUsage().then(
    handleResponse,
    handleError
  );
};

// create feedback
function createFeedback() {
  Clarifai.createFeedback('https://samples.clarifai.com/wedding.jpg', {
    'addTags': ['family', 'friends',],
    'removeTags': ['military', 'protest'],
  }).then(
    handleResponse,
    handleError
  );
};

function handleResponse(response){
  console.log('promise response:', JSON.stringify(response));
};

function handleError(err){
  console.log('promise error:', err);
};


getTags();
/*
selectClasses();
getColors();
getUsage();
getLanguages();
getInfo();
createFeedback();
*/
