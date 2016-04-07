var mongoose = require('mongoose');

//set schema
var Schema = mongoose.Schema;
var cardSchema = new Schema({
  original: {
    type: String,
    default: ''
  },
  translated: {
    type: String,
    default: ''
  },
  src: {
    type: String,
    default: '../public/img/fishjpg'
  }
});

//export model
module.exports = mongoose.model('Card', cardSchema);
