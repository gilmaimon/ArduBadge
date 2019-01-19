let path = require('path');
let express = require('express');

module.exports = {
    use: function(app) {
        app.use(express.static(path.join(__dirname, '../../client/build')));
    }
}