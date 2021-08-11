const mongoose = require('mongoose');

const { Schema } = mongoose;

const cultureSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  cuisine: {
    type: String
  }
});

const Culture = mongoose.model('Culture', cultureSchema);

module.exports = Culture;
