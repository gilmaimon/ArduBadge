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

module.exports = mongoose.model('Library', librarySchema)