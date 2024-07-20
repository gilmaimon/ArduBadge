package libraries

type ArduinoLibrary struct {
	Author     string `json:"author"`
	Maintainer string `json:"maintainer"`
	Name       string `json:"name"`
	Paragraph  string `json:"paragraph"`
	Repository string `json:"repository"`
	Sentence   string `json:"sentence"`
	URL        string `json:"url"`
	Version    string `json:"version"`
	Website    string `json:"website"`
}
