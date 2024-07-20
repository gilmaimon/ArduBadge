package libraries

import (
	"compress/gzip"
	"encoding/json"
	"github.com/Masterminds/semver/v3"
	"net/http"
)

type arduinoLibrariesResponse struct {
	Libraries []ArduinoLibrary `json:"libraries"`
}

func FetchLatest() ([]ArduinoLibrary, error) {
	libraries, err := FetchAll()
	if err != nil {
		return nil, err
	}

	latestMap := make(map[string]ArduinoLibrary)
	for _, library := range libraries {
		previous, exists := latestMap[library.Name]
		if !exists {
			latestMap[library.Name] = library
			continue
		}
		previousVersion, _ := semver.NewVersion(previous.Version)
		newVersion, _ := semver.NewVersion(library.Version)
		if newVersion.GreaterThan(previousVersion) {
			latestMap[library.Name] = library
		}
	}

	var latest []ArduinoLibrary
	for _, library := range latestMap {
		latest = append(latest, library)
	}

	return latest, nil
}

func FetchAll() ([]ArduinoLibrary, error) {
	ArduinoLibrariesUrl := "https://downloads.arduino.cc/libraries/library_index.json.gz"

	data, err := http.Get(ArduinoLibrariesUrl)
	if err != nil {
		return nil, err
	}

	reader, err := gzip.NewReader(data.Body)
	if err != nil {
		return nil, err
	}
	defer reader.Close()

	var response arduinoLibrariesResponse
	if err := json.NewDecoder(reader).Decode(&response); err != nil {
		return nil, err
	}
	return response.Libraries, nil
}
