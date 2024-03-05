let mongoose = require('mongoose');
let validator = require('validator');

let urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    // unique: true,
    lowercase: true,
    // validate: (value) => {
    //   return validator.isUrl(value);
    // }
  },
  shortUrl: {
    type: Number,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Url', urlSchema);