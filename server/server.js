var bodyParser = require('body-parser');
var express = require('express');
var helper = require('./helper.js');

//configs
var port = process.env.PORT || 3000;
var db = require('./db/db.js');

var app = express();

//Connector
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client'));

//Routes
app.get('/designs', function(req, res) {
    return res.json(db.length);
});

app.get('/designs/:id', function(req, res) {
  var id = JSON.parse(req.params.id);
  if (helper.isValidID(id)) {
    return res.json(db[id]);
  }
  return res.sendStatus(404);
});

app.put('/designs/:id', function(req, res) {
  var id = req.params.id;
  var vote = JSON.parse(req.body.vote);
  if (helper.isValidID(id) && helper.isValidVote(vote)) {
    helper.addVote(id, vote);
    return res.sendStatus(200);
  }
  return res.sendStatus(404);
});

//Listener
app.listen(port, function(err) {
  if (err) {
    return console.err(err);
  }
  console.log('designVoter listening on ' + port);
});

module.exports = app;
