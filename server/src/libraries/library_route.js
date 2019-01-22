module.exports = {
    use: function(app, libraries, access_logger) {
        app.get('/library/:libname', async function(req, res) {
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
    }
}