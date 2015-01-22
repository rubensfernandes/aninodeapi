// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Mixed = mongoose.Schema.Types.Mixed;

var AniDbSchema   = new Schema({
    aired_from : Number,
    authors: Array,
    avg : Number,
    chapters: Number,
    english : String,
    genres: Array,
    image: String,
    japanese: String,
  	related: Mixed,
  	resource_uri: String,
  	serialization: Array,
  	status: String,
  	synonyms: String,
  	synopsis: String,
  	title: String,
  	volumes: Number,
  	weight: Number,
  	id: Number,
  	type: String,
  	synopsis_portuguese: String
});

module.exports = mongoose.model('Anidb', AniDbSchema);