let mongoose = require('mongoose');
let mail_reporter = require('./email_reporter/email_sender')

module.exports = function(mongdb_server_url, dbname) {
    class Database {
        constructor() {
            this._connect()
        }
        
        _connect() {
            mongoose.connect(`mongodb://${mongdb_server_url}/${dbname}`, { useNewUrlParser: true })
                .then(() => {
                    console.log('Database connection successful')
                })
                .catch(err => {
                    console.error('Database connection error')
                    mail_reporter.send_email("ArduBadge Failed!", "Ardubadge failed with error:\n" + err)
                    .catch(function(error) {
                        console.log(error);
                    })
                    .then(function(info) {
                        process.exit(1337);
                    })
                })
        }
    }
    return new Database();
}