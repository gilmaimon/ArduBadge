let LibraryModel = require('./library_model');
let librariesReloader = require('./libraries_reloader')
let librariesRoute = require('./library_route')

module.exports = {
    getMostRecent : function(libName) {
        return new Promise(function(resolve, reject) {
            LibraryModel.find({name: libName}, {_id : false, _v: false})
                .then(function(docs) {
                    if(docs.length == 0) resolve(null);
                    else resolve(docs[docs.length - 1]);
                })
                .catch(reject);
        })
    },
    getVersion : function(libName, version) {
        return new Promise(function(resolve, reject) {
            LibraryModel.find({name: libName, version: version}, {_id : false, _v: false})
                .then(function(docs) {
                    if(docs.length == 0) resolve(null);
                    else resolve(docs[docs.length - 1]);
                })
                .catch(reject);
        })
    },
    getAllNames: function() {
        return new Promise(function(resolve, reject) {
            LibraryModel.distinct('name')
                .then(function(docs) {
                    resolve(docs);
                })
                .catch((err) => resolve([]))
        });
    },
    onInterval: librariesReloader.onInterval,
    use: librariesRoute.use
}