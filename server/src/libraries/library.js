let LibraryModel = require('./library_model');
let librariesReloader = require('./libraries_reloader')
let librariesRoute = require('./library_route')

let email_reporter = require('../email_reporter/email_sender')

module.exports = {
    getMostRecent : function(libName) {
        return new Promise(function(resolve, reject) {
            LibraryModel.find({name: libName}, {_id : false, _v: false})
                .then(function(docs) {
                    if(docs.length == 0) resolve(null);
                    else resolve(docs[docs.length - 1]);
                })
                .catch(function(error) {
                    email_reporter.send_email(
                        "ArduBadge Exception", 
                        "Error in library.js:getMostRecent:\n" + error
                    );
                    
                    reject(error);
                });
        })
    },
    getVersion : function(libName, version) {
        return new Promise(function(resolve, reject) {
            LibraryModel.find({name: libName, version: version}, {_id : false, _v: false})
                .then(function(docs) {
                    if(docs.length == 0) resolve(null);
                    else resolve(docs[docs.length - 1]);
                })
                .catch(function(error) {
                    email_reporter.send_email(
                        "ArduBadge Exception", 
                        "Error in library.js:getMostRecent:\n" + error
                    );
                    
                    reject(error);
                });
        })
    },
    getAllNames: function() {
        return new Promise(function(resolve, reject) {
            LibraryModel.distinct('name')
                .then(function(docs) {
                    resolve(docs);
                })
                .catch(function(error) {
                    email_reporter.send_email(
                        "ArduBadge Exception", 
                        "Error in library.js:getMostRecent:\n" + error
                    );
                    
                    reject(error);
                });
        });
    },
    onInterval: librariesReloader.onInterval,
    use: librariesRoute.use
}