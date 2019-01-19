let fs = require('fs');
let path = require('path');
let request = require('request');

let badgeUrl = require('../utilities/badge');

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

module.exports = {
    use : function(app, libraries, access_logger) {
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
    }
}