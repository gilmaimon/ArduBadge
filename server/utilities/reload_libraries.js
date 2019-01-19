let fs = require('fs');

let download_file = require('download-file')
let gunzip = require('gunzip-file')
let rimraf = require("rimraf");

let LibraryModel = require('../models/library');

function downloadGzFile(folder, filename) {
    return new Promise(function(resolve, reject) {
        // download libraries gz file to the specified folder
        download_file('http://downloads.arduino.cc/libraries/library_index.json.gz', {
            directory: folder,
            filename: filename
        },
        function(err) {
            if(err) reject(`Error while downloading gz file: ${err}`);
            else resolve('library_index.json.gz');
        });
    });    
}

function extractJsonFileFromGz(folder, gzFilename, jsonFilename) {
    return new Promise(function(resolve, reject) {
        gunzip(folder + gzFilename, folder + jsonFilename, (err) => {
            resolve(null);
            // TODO expect failure
        })
    });
}

function readLibrariesFromFile(folder, filename) {
    return new Promise(function(resolve, reject) {
        // read the file
        fs.readFile(folder + filename, 'utf8', function(err, data) {
            if(err && data) reject(`Error while reading json file: ${err}`);
            else {
                try {
                    // parse as json
                    jsonData = JSON.parse(data);
                    if(jsonData && jsonData.libraries) resolve(jsonData.libraries);
                    else reject('Error while parsing the extracted file as json');
                } catch(err) {
                    reject("Bad Json");
                }
            }
        })
    });
}

function clearFolder(folder) {
    return new Promise(function(resolve, reject) {
        rimraf(folder, function() {
            resolve(null);
        });
    })
}

function reloadArduinoLibraries() {
    return new Promise(async function(resolve, reject) {
        const tmpFolder = 'tmp/';
        const gzFilename = 'library_index.json.gz';
        const jsonFilename = 'library_index.json';
        try {
            /* The following code:
                - Removes all libraries
                - Downloades the packed gz file
                - Extracts the json libraries data
                - Parses the json file
                - Delets tmp folder
                - Adds libraries to the db
            */
            await clearFolder(tmpFolder);
            await downloadGzFile(tmpFolder, gzFilename);
            await extractJsonFileFromGz(tmpFolder, gzFilename, jsonFilename)
            libraries = await readLibrariesFromFile(tmpFolder, jsonFilename);

            for(let iLib = 0; iLib < libraries.length; iLib++) {
                let lib = libraries[iLib];
                await LibraryModel.findOneAndUpdate(
                    {name: lib.name, version: lib.version},
                    lib,
                    {upsert: true, new: true, runValidators: true}
                );
            }
            resolve(null);

        } catch (error) {
            reject(`Refresh Operation Failed. ${error}`)
        }
    });
}
module.exports = {
    onInterval: function(interval, callback) {
        setInterval(function() {
            reloadArduinoLibraries()
                .then(function(result) {
                    if(callback) callback(false); //false == no error
                })
                .catch(function(err) {
                    if(callback) callback(true); //error = true
                })
        }, interval);
    }
}
