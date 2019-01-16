let fs = require('fs');
let path = require('path');

let app = require('express')();
let request = require('request');

let config = require('./config');

let db = require('./db')(config.mongodb_path, config.db_name);

//services
let libraries_reloader = require('./utilities/reload_libraries.js')


let badgeUrl = require('./utilities/badge');
let libraries = require('./libraries');
let access_logger = require('./utilities/access_log');

libraries_reloader.onInterval(1000 * config.libraries_refresh_interval_in_seconds, function(err) {
    if(err) {
        console.log("Failed to Update libs");
    } else {
        console.log("Succesfuly updated libraries");
    }
});



let arduinoLogoBase64 = function(filename){
    var bitmap = fs.readFileSync(filename);
    return new Buffer(bitmap).toString('base64');
}(path.join(__dirname, '../res', 'arduino_logo_tiny.png'));

function getSvgFromUrl(url) {
    return new Promise(function(resolve, reject) {
        request.get(resPath, function(err, response, body) {
            if (err) reject(err);
            else resolve(body);
        });
    })
}

app.get('/badge/:libname.svg', async function(req, res) {
    let libname = req.params.libname;
    
    // fetch a library with that name
    let library = await libraries.getMostRecent(libname);
    
    // log entry if it was for an existing library
    if(library) {
        access_logger.logEntry(req, "ACTION_GET_BADGE");
    }

    // create appropriate badge url
    resPath = badgeUrl(arduinoLogoBase64, libname, library);
    
    // serve that badge (svg file) to the user
    let svg = await getSvgFromUrl(resPath);
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.end(svg);
});

app.get('/library/:libname', async function(req, res) {
    let libname = req.params.libname;

    // fetch a library with that name
    let library = await libraries.getMostRecent(libname);
    
    // log entry if it was for an existing library
    if(library) {
        access_logger.logEntry(req, "ACTION_GET_LIBDATA");
    }

    let result = {};
    if(library) {
        result.data = library;
        result.found = true;
    } else {
        result.found = false;
    }

    res.json(result);
})

// get most watched
app.get('/stats/top/week', function(req, res) {
    //return most watched libraries in the last week
})

// get recently added
app.get('/stats/recent', function(req, res) {
    //return the last libraries to be acccessed for the first time
})

app.listen(config.port, '0.0.0.0');