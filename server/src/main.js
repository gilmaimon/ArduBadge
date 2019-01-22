const https = require('https');
let express = require('express');
let compression = require('compression')
let path = require('path');

let config = require('./config');
let db = require('./db')(config.mongodb_path, config.db_name);
let libraries = require('./libraries/library');

//libraries reloader service
libraries.onInterval(1000 * config.libraries_refresh_interval_in_seconds);

// libraries access logger service
let access_logger = require('./stats/access_log');
access_logger.cacheOnInterval(1000 * config.stats_refresh_interval_in_seconds);

let app = express();
/*** Routes ***/
app.use(compression());

// Static Content
const oneYear = 1 * 365 * 24 * 60 * 60 * 1000;
app.use(express.static(path.join(__dirname, '../../client/build'), { maxAge: oneYear }));

require('./logs/log_route').bindVerbose(app, 'logs/access.log'); // Logs
require('./badges/badge_route').use(app, libraries, access_logger); // Badge
libraries.use(app, libraries, access_logger); // Lib Details
require('./stats/recent_route').use(app, access_logger); // Recently Watched

// For React
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'))
});

if(config.https_configuration.active) {
    // Starting https server
    const ssl = require('./ssl');
    const httpsServer = https.createServer(ssl.getCredentials(config), app);
    httpsServer.listen(config.https_port || 443, () => {
        console.log('HTTPS Server running on port 443');
    });

    if(config.https_configuration.redirect_http) {
        // Starting http server that redirects everything to https
        require('./utilities/http_redirect_https_server').listen(config.http_port || 80);
    }
} else {
    app.listen(config.http_port || 80);
}
