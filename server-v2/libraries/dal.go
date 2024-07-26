package libraries

type DAL interface {
	GetLibrary(name string) (*ArduinoLibrary, bool)
	ListRecent() []ArduinoLibrary
}
