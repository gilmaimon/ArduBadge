let express = require('express');

module.exports = {
    listen: function(port) {
        var httpApp = express();
        httpApp.get('*', function(req, res) {  
            res.redirect('https://' + req.headers.host + req.url);
        })
        httpApp.listen(port);
    }
}