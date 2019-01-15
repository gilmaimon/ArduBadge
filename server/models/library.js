let mongoose = require('mongoose')

let librarySchema = new mongoose.Schema({
    name: String,
    version: String,
    author: String,
    maintainer: String,
    sentence: String,
    paragraph: String,
    website: String,
    category: String,
    architectures: Array,
    types: Array,
    repository: String,
    url: String,
    size: Number,
    checksum: String
});
librarySchema.index({ name: 1, version: 1}, { unique: true });
let model = mongoose.model('Library', librarySchema);

module.exports = model;
