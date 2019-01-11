let fs = require('fs');
let path = require('path');

let app = require('express')();
let request = require('request');

let config = require('./config');

let db = require('./db')(config.mongodb_path, config.db_name);
let libraries_reloader = require('./utilities/reload_libraries.js')
let badgeUrl = require('./utilities/badge');
let libraries = require('./libraries');
let access_logger = require('./access_log');

libraries_reloader.onInterval(1000 * config.libraries_refresh_interval_in_seconds, function(err) {
    if(err) {
        console.log("Failed to Update libs");
    } else {
        console.log("Succesfuly updated libraries");
    }
})

let arduinoLogoBase64 = function(filename){
    var bitmap = fs.readFileSync(filename);
    return new Buffer(bitmap).toString('base64');
}(path.join(__dirname, '../res', 'arduino_logo_tiny.png'));

app.get('/badge/:repo.svg', async function(req, res) {
    access_logger.logEntry(req);

    // get repo name
    let repoName = req.params.repo;
    
    // fetch a library with that name
    let library = await libraries.getMostRecent(repoName);
    
    // create appropriate badge url
    resPath = badgeUrl(arduinoLogoBase64, repoName, library);
    
    // serve that badge (svg file) to the user
    request.get(resPath, function(err, response, body) {
        if (!err) {
            res.setHeader('Content-Type', 'image/svg+xml');
            res.end(body);
        }
    });
});

app.listen(config.port, '0.0.0.0');