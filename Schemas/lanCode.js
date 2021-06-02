// Set up!

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var languagesCode = new Schema({
  language: String,
  languageCode: String,
});
//Make the schema available to the application.
module.exports = languagesCode;
