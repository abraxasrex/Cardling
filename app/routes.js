var Card = require('./models/card');
var path = require('path');
function getCards(res) {
  Card.find(function (err, cards) {
    if(err) {
      res.send('getcards in routes.js err', err);
    } else {
      res.json(cards);
    }
  });
};

module.exports = function (app) {

  app.get('/api/cards', function(req, res) {
    getCards(res);
  });

  app.post('/api/cards', function(req, res) {
    var imagePath = req.body.src;
  //  var imagePath = '../public/img/' + req.body.src;
    Card.create({
      original: req.body.original,
      translated: req.body.translated,
      done: false,
      src: imagePath
    }, function(err, card) {
      if(err) {
        res.send(err);
      } else {
        getCards(res);
      }
    });
  });

  app.delete('/api/cards/:card_id', function(req, res) {
    Card.remove({
      _id : req.params.card_id
    }, function(err, card) {
      if (err) {
        res.send(err);
      } else {
        Card.find(function(err, cards) {
          if (err){
            res.send(err);
          } else {
            res.json(cards);
          }
        });
      }
    });
  });

  app.get('*', function (req, res) {
    res.sendfile('./public/index.html');
  });

};
