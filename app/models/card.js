var mongoose = require('mongoose');

module.exports = mongoose.model('Card', {
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
