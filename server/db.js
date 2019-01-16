let mongoose = require('mongoose');

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
                })
        }
    }
    return new Database();
}