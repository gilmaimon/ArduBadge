let path = require('path');

module.exports = {
    use: function(app) {
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build/index.html'))
        });
    }
}