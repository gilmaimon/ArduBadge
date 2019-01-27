//let urlencode = require('urlencode');
async function getSitemap(libraries) {
    urls = []
    allLibNames = await libraries.getAllNames();
    for(let i = 0; i < allLibNames.length; i++) {
        urls.push({
            url: `/${(allLibNames[i])}`
        });
    }
    
    return require('sitemap').createSitemap({
        hostname: 'http://www.ardu-badge.com',
        cacheTime: 600000, // 600 sec - cache purge period
        urls: urls
    });
}

module.exports = {
    use : function(app, libraries) {
        app.get('/sitemap.xml', async function(req, res) {
            sm = await getSitemap(libraries);
            sm.toXML( function (err, xml) {
                if (err) return res.status(500).end();
                
                res.header('Content-Type', 'application/xml');
                res.send( xml );
            });
        });
    }
}