let db = require('./db')('127.0.0.1:27017', 'arduino-libs');

let libraries = require('../app/operations/libraries');

let reloadArduinoLibraries = require('./operations/reload_libraries.js')
let badgeUrl = require('./operations/badge');

reloadArduinoLibraries.onInterval(60 * 1000, function(err) {
    if(err) {
        console.log("Failed to Update libs");
    } else {
        console.log("Succesfuly updated libraries");
    }
})

var app = require('express')();
var request = require('request');

var fs = require('fs');
let path = require('path');

let arduinoLogoBase64 = function(filename){
    var bitmap = fs.readFileSync(filename);
    return new Buffer(bitmap).toString('base64');
}(path.join(__dirname, '../res', 'arduino_logo_tiny.png'));



app.get('/badge/:repo.svg', async function(req, res) {
    // get repo name
    let repoName = req.params.repo;
    
    // fetch a library with that name
    let library = await libraries.getMostRecent(repoName);
    
    // create appropriate badge url
    resPath = badgeUrl(arduinoLogoBase64, repoName, library != null, library? library.version: null);

    // serve that badge (svg file) to the user
    request.get(resPath, function(err, response, body) {
        if (!err) {
            res.send(body);
        }
    });
});

app.listen(80, '0.0.0.0');