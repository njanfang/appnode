var express = require('express');
var app = express();app.get('/', function (req, res) {
  res.send('Hello World Njanfang!');
});app.listen(1020, function () {
  console.log('Example app listening on port 1020!');
});