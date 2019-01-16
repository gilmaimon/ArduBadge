let AccessEntryModel = require('../models/access_entry');

module.exports = {
    logEntry: function(req, action) {
        return new Promise(function(resolve, reject) {
            let entry = new AccessEntryModel({
                repo_name: req.params.libname,
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                action: action
            });
            entry.save(function (err) {
                if (err) reject(err);
                else resolve();
            })
        })
    }
}