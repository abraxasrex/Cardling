var express  = require('express');
var app     = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/cards', function(err, db){
  if(!err) {
    console.log('mongoose is connected');
  } else {
    console.log(err);
  }
});

app.use(express.static(__dirname + '/public'));  //set the static file name to public ...on top of current dir name?)
app.use(morgan('dev')); //logs to dev console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

require('./app/routes.js')(app);

var port = process.env.PORT || 8080;
app.listen(port);

console.log('listening on port', port);
