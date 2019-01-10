let db = require('./db')('127.0.0.1:27017', 'arduino-libs');

let reloadArduinoLibraries = require('./operations/reload_libraries.js')

reloadArduinoLibraries();