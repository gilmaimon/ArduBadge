let fs = require('fs');
let path = require('path');

let badgen = require('badgen');

let arduinoLogoBase64 = function(filename){
    var bitmap = fs.readFileSync(filename);
    return new Buffer(bitmap).toString('base64');
}(path.join(__dirname, '../res', 'arduino_logo_tiny.png'));

function getSvgBadge(libname, library) {
    let status = libname;
    if(library) {
        status += ` ${library.version}`
    }
    
    return badgen({
        subject: 'Library Manager',
        status: status,
        color: library? '46c018' :'969696',
        icon: `data:image/png;base64,${arduinoLogoBase64}`,
        iconWidth: 17
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
                                
            let svg = await getSvgBadge(libname, library);
            res.setHeader('Content-Type', 'image/svg+xml');
            res.end(svg);
        });
    }
}