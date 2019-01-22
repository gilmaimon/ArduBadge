let winston = require('winston');
let expressWinston = require('express-winston');

const BYTES_IN_GB = 1024 * 1024 * 1024;

module.exports = {
    bindVerbose: function(app, filename) {
        app.use(expressWinston.logger({
            transports: [
                new winston.transports.File({filename: filename, maxsize: BYTES_IN_GB})
            ],
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
                winston.format.colorize()
            )
        }));
    }
}
