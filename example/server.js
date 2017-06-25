var express = require('express');
var app = express();

app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
 res.sendFile(__dirname + '/index.html');
});



app.listen(process.env.PORT || 3000, function () {
  console.log(`Example app listening on port ${process.env.PORT || 3000}!`);
});


