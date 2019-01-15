let AccessEntryModel = require('./models/access_entry');

module.exports = {
    logEntry: function(req) {
        return new Promise(function(resolve, reject) {
            let entry = new AccessEntryModel({
                repo_name: req.params.repo,
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
            });
            entry.save(function (err) {
                if (err) reject(err);
                else resolve();
            })
        })
    }
}