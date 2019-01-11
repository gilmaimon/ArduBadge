# Arduino Library-Manager Badge

## What is it?
With this badge you can notify your users and GitHub visitors that your library is available for download via the built-in Arduino IDE [`Library Manager`](https://www.arduino.cc/en/guide/libraries).

The badge will show whether the library is available in the Library Manager and if so, what is the latest release available. Clicking on the badge will open up explanation for new users on how to install libraries with the Library Manager and Arduino IDE.

## Examples
Exisitng Libraries:  
[![arduino-library-badge](http://arduino-library-badge.gilmaimon.xyz:4040/badge/ArduinoCloudStorage.svg)](https://www.arduino.cc/en/guide/libraries) [![arduino-library-badge](http://arduino-library-badge.gilmaimon.xyz:4040/badge/ArduinoComponents.svg)](https://www.arduino.cc/en/guide/libraries) [![arduino-library-badge](http://arduino-library-badge.gilmaimon.xyz:4040/badge/FastLED.svg)](https://www.arduino.cc/en/guide/libraries) [![arduino-library-badge](http://arduino-library-badge.gilmaimon.xyz:4040/badge/HttpClient.svg)](https://www.arduino.cc/en/guide/libraries) [![arduino-library-badge](http://arduino-library-badge.gilmaimon.xyz:4040/badge/MQTT.svg)](https://www.arduino.cc/en/guide/libraries) [![arduino-library-badge](http://arduino-library-badge.gilmaimon.xyz:4040/badge/ArduinoJson.svg)](https://www.arduino.cc/en/guide/libraries)

Non-Existing Libraries:  
[![arduino-library-badge](http://arduino-library-badge.gilmaimon.xyz:4040/badge/NoWay.svg)](https://www.arduino.cc/en/guide/libraries) [![arduino-library-badge](http://arduino-library-badge.gilmaimon.xyz:4040/badge/Not%20A%20Real%20Library.svg)](https://www.arduino.cc/en/guide/libraries)

# How-To
In order to get a badge for your library, all you need to do is to add this markdown in your readme page:
```markdown
[![arduino-library-badge](http://arduino-library-badge.gilmaimon.xyz:4040/badge/LIBRARY_NAME.svg)](https://www.arduino.cc/en/guide/libraries)
```
Just replace `LIBRARY_NAME` with your own library name.

# Coming Up
- Clicking the badge will redirect to a custom page for explaining how to get specifically your library via the arduino IDE
- Dedicated Domain Name and Server (moving to port 80)
- Website with github integration
