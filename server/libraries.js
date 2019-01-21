let LibraryModel = require('./models/library');

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
    }
}