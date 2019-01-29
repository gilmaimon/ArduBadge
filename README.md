[![Maintainability](https://api.codeclimate.com/v1/badges/9dfc74cb3e65fb4dcd84/maintainability)](https://codeclimate.com/github/gilmaimon/Arduino-Library-Manager-Badge/maintainability) [![dependencies Status](https://david-dm.org/gilmaimon/Arduino-Library-Manager-Badge/status.svg)](https://david-dm.org/gilmaimon/Arduino-Library-Manager-Badge)

# ArduBadge (Arduino Library-Manager Badge)
### Visit the website! [www.ardu-badge.com](http://www.ardu-badge.com)

With the `Arduino Library-Manager` "Badge" (now `ArduBadge`) you can notify your users and GitHub visitors that your library is available for download via the built-in Arduino IDE [`Library Manager`](https://www.arduino.cc/en/guide/libraries).

The badge will show whether the library is available in the Library Manager and if so, what is the latest release available. Clicking on the badge will open up a **custom** explanation for new users on how to install libraries with the Library Manager and Arduino IDE.

## Getting Started
To get started visit [www.ardu-badge.com](http://www.ardu-badge.com)

### Examples
Exisitng Libraries:  

[![arduino-library-badge](http://www.ardu-badge.com/badge/ArduinoCloudStorage.svg?)](http://www.ardu-badge.com/ArduinoCloudStorage)
[![arduino-library-badge](http://www.ardu-badge.com/badge/ArduinoComponents.svg?)](http://www.ardu-badge.com/ArduinoComponents)
[![arduino-library-badge](http://www.ardu-badge.com/badge/FastLED.svg?)](http://www.ardu-badge.com/FastLED)
[![arduino-library-badge](http://www.ardu-badge.com/badge/HttpClient.svg?)](http://www.ardu-badge.com/HttpClient)
[![arduino-library-badge](http://www.ardu-badge.com/badge/MQTT.svg?)](http://www.ardu-badge.com/MQTT)
[![arduino-library-badge](http://www.ardu-badge.com/badge/MySensors.svg?)](http://www.ardu-badge.com/MySensors)

Non-Existing Libraries:  
[![arduino-library-badge](http://www.ardu-badge.com/badge/NoWay.svg?)](http://www.ardu-badge.com/NoWay)
[![arduino-library-badge](http://www.ardu-badge.com/badge/Not%20A%20Real%20Library.svg?)](http://www.ardu-badge.com/Not%20A%20Real%20Library)



## Contributing
Contributions are welcomed!
This section should help you get started.
### Dependencies
In order to have your own instance of the server, you need to first have:
#### Software Dependencies
- MongoDB instance
- Node.js & NPM
- React

#### Node.js Dependencies
- express
- mongoose
- request
- gunzip-file
- download-file
- rimraf
### Installing and Deployment
Clone the repository, and run:
1. ```npm install``` - to install all server related Node.js dependencies
1. ```cd client; npm install``` - to install all client related Node.js dependencies
2. ```cd client; npm build``` - to build react client files
3. ```npm start``` - to start the server

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
