// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { header } = require('express/lib/request');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

/**
 * Under this comment is the code for the functionality in which I'm parsing some HTTP request headers as a JSON.
 * Author: Yuri Cruz Soares da Silva.
 * e-mail: ycss.v1@gmail.com
 */
app.enable('trust proxy')
let headerObj = {}
app.get('/whoami', function(req, res, next){
  headerObj['ipaddress'] = req.ip;
  headerObj['language'] = req.headers["accept-language"];
  headerObj['software'] = req.headers['user-agent'];
  next()
}, function(req, res){
  res.json(headerObj)
})