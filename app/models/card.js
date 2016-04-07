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

// pre hook for unique term validation
cardSchema.pre("save",function(next, done) {
    var self = this;
    mongoose.models["Card"].findOne({original : self.original},function(err, original) {
        if(original) {
            self.invalidate("original term must be unique");
            console.log("original term must be unique");
        } else {
          console.log('unique');
        }
    });
    next();
});

//export model
module.exports = mongoose.model('Card', cardSchema);
