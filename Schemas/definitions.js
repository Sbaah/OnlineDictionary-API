// Set up!

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var definition = new Schema({
  authorName: { type: String, required: true },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  definition: { type: String, required: true },
  quality: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
});

//Make the schema available to the application.
module.exports = definition;
