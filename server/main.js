const https = require('https');
let express = require('express');
let compression = require('compression')

let config = require('./config');
let db = require('./db')(config.mongodb_path, config.db_name);
let libraries = require('./libraries');

//libraries reloader service
require('./utilities/reload_libraries.js').onInterval(1000 * config.libraries_refresh_interval_in_seconds);

// libraries access logger service
let access_logger = require('./utilities/access_log');
access_logger.cacheOnInterval(1000 * config.stats_refresh_interval_in_seconds);

let app = express();
/*** Routes ***/
app.use(compression());
require('./routes/static').use(app); // Static Content
require('./utilities/logs').bindVerbose(app, 'logs/access.log'); // Logs
require('./routes/badge').use(app, libraries, access_logger); // Badge
require('./routes/library').use(app, libraries, access_logger); // Lib Details
require('./routes/recent').use(app, access_logger); // Recently Watched
require('./routes/default_index').use(app); // For React


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
