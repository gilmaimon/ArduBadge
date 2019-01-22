let fs = require('fs');
let path = require('path');

let badgen = require('badgen');

let arduinoLogoBase64 = function(filename){
    var bitmap = fs.readFileSync(filename);
    return new Buffer(bitmap).toString('base64');
}(path.join(__dirname, '../../res', 'arduino_logo_tiny.png'));

function getSvgBadge(libname, version, library) {
    let status = libname;
    if(version) {
        status += ` ${version}`
    } else if(library) {
        status += ` ${library.version}`
    }
    
    return badgen({
        subject: 'Library Manager',
        status: status,
        color: library? 'green' :'grey',
        icon: `data:image/png;base64,${arduinoLogoBase64}`,
        iconWidth: 17
    })
}

module.exports = {
    use : function(app, libraries, access_logger) {
        app.get('/badge/:libname.svg', async function(req, res) {
            let libname = req.params.libname;
            let version = req.query.version;
            
            let library;
            if(version) {
                // fetch a library with that name and the specified version
                library = await libraries.getVersion(libname, version);
            } else {
                // fetch a library with that name
                library = await libraries.getMostRecent(libname);
            }
            
            // log entry if it was for an existing library
            if(library) {
                access_logger.logEntry(req, "ACTION_GET_BADGE");
            }
                                
            let svg = await getSvgBadge(libname, version, library);
            res.setHeader('Content-Type', 'image/svg+xml');
            res.end(svg);
        });
    }
}