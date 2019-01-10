let LibraryModel = require('./library_model');
let db = require('./db')('127.0.0.1:27017', 'arduino-libs');

// let lib = new LibraryModel( {
//     name: "AudioZero",
//     version: "1.0.1",
//     author: "Arduino",
//     maintainer: "Arduino \u003cinfo@arduino.cc\u003e",
//     sentence: "Allows playing audio files from an SD card. For Arduino Zero only.",
//     paragraph: "With this library you can use the Arduino Zero DAC outputs to play audio files.\u003cbr /\u003eThe audio files must be in the raw .wav format.",
//     website: "http://arduino.cc/en/Reference/Audio",
//     category: "Signal Input/Output",
//     architectures: [
//         "samd"
//     ],
//     "types": [
//         "Arduino"
//     ],
//     repository: "https://github.com/arduino-libraries/AudioZero.git",
//     url: "http://downloads.arduino.cc/libraries/github.com/arduino-libraries/AudioZero-1.0.1.zip",
//     archiveFileName: "AudioZero-1.0.1.zip",
//     size: 4925,
//     checksum: "SHA-256:c938f00aceec2f91465d1486b4cd2d3e1299cdc271eb743d2dedcd8c2dd355a8"
// });


// lib.save()
//     .then(doc => {
//         console.log(doc)
//     })
//     .catch(err => {
//         console.error(err)
//     })

// return;


function clearCollection() {
    return new Promise(function(resolve, reject) {
        LibraryModel.deleteMany({}).exec().then(function(res) {
            resolve(null);
        });
    });
}

async function refreshArduinoLibraries() {
    await clearCollection();
}

refreshArduinoLibraries();

return;