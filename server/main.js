let fs = require('fs');
let path = require('path');

const http = require('http');
const https = require('https');

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.ardu-badge.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.ardu-badge.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/www.ardu-badge.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

let express = require('express');
let app = express();
let request = require('request');

let config = require('./config');
let db = require('./db')(config.mongodb_path, config.db_name);
let badgeUrl = require('./utilities/badge');
let libraries = require('./libraries');
let logs = require('./utilities/logs');

//services
let libraries_reloader = require('./utilities/reload_libraries.js')
let access_logger = require('./utilities/access_log');

libraries_reloader.onInterval(1000 * config.libraries_refresh_interval_in_seconds, function(err) {
    if(err) {
        console.log("Failed to Update libs");
    } else {
        console.log("Succesfuly updated libraries");
    }
});

access_logger.cacheOnInterval(1000 * config.stats_refresh_interval_in_seconds);

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

// for static react files
app.use(express.static(path.join(__dirname, '../client/build')));

// log request for non static content
logs.bindVerbose(app, 'logs/access.log');

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
    res.send("NotImplemented");
})

// get recently added
app.get('/stats/recent', async function(req, res) {
    //return the last libraries to be acccessed for the first time
    try {
        let recentlyWatched = await access_logger.recentNewLibnames(10);
        res.json(recentlyWatched);
    } catch(err) {
        res.json([]);
    }
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
});

// Starting https server
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(config.https_port || 443, () => {
	console.log('HTTPS Server running on port 443');
});

// Starting http server that redirects over to https
var httpApp = express();
httpApp.get('*', function(req, res) {  
    res.redirect('https://' + req.headers.host + req.url);
})
httpApp.listen(config.http_port);