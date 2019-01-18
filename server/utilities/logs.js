let winston = require('winston');
let expressWinston = require('express-winston');

module.exports = {
    bindVerbose: function(app, filename) {
        app.use(expressWinston.logger({
            transports: [
                new winston.transports.File({filename: filename})
            ],
            format: winston.format.combine(
                winston.format.json(),
                winston.format.colorize()
            )
        }));
    }
}
