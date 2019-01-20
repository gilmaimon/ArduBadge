let path = require('path');
let express = require('express');

let oneYear = 1 * 365 * 24 * 60 * 60 * 1000;

module.exports = {
    use: function(app) {
        app.use(express.static(path.join(__dirname, '../../client/build'), { maxAge: oneYear }));
    }
}