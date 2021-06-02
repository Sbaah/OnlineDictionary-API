// Set up!

const mongoose = require('mongoose');
const definitionSchema = require('./definitions');
var Schema = mongoose.Schema;

var otherLanTerm = new Schema({
  wordEnglish: { type: String, required: true },
  wordNonEnglish: { type: String, required: true },
  wordExpanded: { type: String, default: null },
  languageCode: { type: String, required: true },
  image: { type: String, default: null },
  imageType: { type: String, default: null },
  audio: { type: String, default: null },
  audioType: { type: String, default: null },
  linkAuthoritative: { type: String, default: null },
  linkWikipedia: { type: String, default: null },
  linkYouTube: { type: String, default: null },
  authorName: { type: String, required: true },

  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  dateRevised: {
    type: Date,
    default: Date.now(),
  },
  fieldOfStudy: { type: String, default: null },
  helpYes: { type: Number, default: 0 },
  helpNo: { type: Number, default: 0 },
  definitions: [definitionSchema],
  termEnglishId: { type: mongoose.ObjectId, required: true },
});
//Make the schema available to the application.
module.exports = otherLanTerm;
