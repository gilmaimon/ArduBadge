function clearCollection(model) {
    return new Promise(function(resolve, reject) {
        // remove every item from the given model
        model.deleteMany({}).exec().then(function(res) {
            resolve(null);
        });
    });
}

var download_file = require('download-file')
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

const gunzip = require('gunzip-file')
function extractJsonFileFromGz(folder, gzFilename, jsonFilename) {
    return new Promise(function(resolve, reject) {
        gunzip(folder + gzFilename, folder + jsonFilename, (err) => {
            resolve(null);
            // TODO expect failure
        })
    });
}

var fs = require('fs');
function readLibrariesFromFile(folder, filename) {
    return new Promise(function(resolve, reject) {
        // read the file
        fs.readFile(folder + filename, 'utf8', function(err, data) {
            if(err && data) reject(`Error while reading json file: ${err}`);
            else {
                // parse as json
                jsonData = JSON.parse(data);
                if(jsonData && jsonData.libraries) resolve(jsonData.libraries);
                else reject('Error while parsing the extracted file as json');
            }
        })
    });
}

var rimraf = require("rimraf");
function clearFolder(folder) {
    return new Promise(function(resolve, reject) {
        rimraf(folder, function() {
            resolve(null);
        });
    })
}

let LibraryModel = require('../models/library');
module.exports = async function reloadArduinoLibraries() {
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
        await clearCollection(LibraryModel);
        await downloadGzFile(tmpFolder, gzFilename);
        await extractJsonFileFromGz(tmpFolder, gzFilename, jsonFilename)
        libraries = await readLibrariesFromFile(tmpFolder, jsonFilename);
        await LibraryModel.insertMany(libraries);
        await clearFolder(tmpFolder);
        console.log("Done Refreshing");

    } catch (error) {
        console.log(`Refresh Operation Failed. ${error}`)
    }
}