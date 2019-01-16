let AccessEntryModel = require('../models/access_entry');

let recentlyStartedWatching = []

const NUM_RECENTLY_WATCHED = 10;

function cacheRecentlyStartedWatching() {    
    AccessEntryModel.aggregate([
        { $group: { _id: "$name", first_time: { $min: "$time" } } },
        { $sort: { firstTime: -1 } },
        { $limit: NUM_RECENTLY_WATCHED },
        { $lookup: {
            from: 'libraries',
            localField: '_id',
            foreignField: 'name',
            as: 'library'
        }},
        { $project: {
            joint: { $slice: ["$library", -1]}
        }}
    ], function(err, data) {
        if(err) {
            reject(err);
            return;
        }  

        let result = []
        for(let i = 0; i < data.length; i++) {
            result.push({
                name: data[i]._id,
                version: data[i].joint[0].version,
                author: data[i].joint[0].author,
                website: data[i].joint[0].website
            });
        }
        recentlyStartedWatching = result;
    }
    );
}

module.exports = {
    logEntry: function(req, action) {
        return new Promise(function(resolve, reject) {
            let entry = new AccessEntryModel({
                name: req.params.libname,
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                action: action
            });
            entry.save(function (err) {
                if (err) reject(err);
                else resolve();
            })
        })
    },

    cacheOnInterval: function(interval) {
        cacheRecentlyStartedWatching();
        setInterval(function() {
            cacheRecentlyStartedWatching();
        }, interval);
    },
    recentNewLibnames: function(num) {
        return recentlyStartedWatching;
    }
}