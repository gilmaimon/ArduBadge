let fs = require('fs');
let path = require('path');

let express = require('express');
let app = express();
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
}(path.join(__dirname, '/res', 'arduino_logo_tiny.png'));

function getSvgFromUrl(url) {
    return new Promise(function(resolve, reject) {
        request.get(resPath, function(err, response, body) {
            if (err) reject(err);
            else resolve(body);
        });
    })
}

app.use(express.static(path.join(__dirname, 'ui/build')));
app.get('/badge/:repo.svg', async function(req, res) {
    access_logger.logEntry(req);

    // get repo name
    let repoName = req.params.repo;
    
    // fetch a library with that name
    let library = await libraries.getMostRecent(repoName);
    
    // create appropriate badge url
    resPath = badgeUrl(arduinoLogoBase64, repoName, library);
    
    // serve that badge (svg file) to the user
    let svg = await getSvgFromUrl(resPath);
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.end(svg);
});

app.get('/library/:libname', async function(req, res) {
    // get repo name
    let libname = req.params.libname;

    // fetch a library with that name
    let library = await libraries.getMostRecent(libname);
    
    let result = {};
    if(library) {
        result.data = library;
        result.found = true;
    } else {
        result.found = false;
    }

    res.json(result);
})

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'ui/public/index.html'))
});

app.listen(config.port, '0.0.0.0');