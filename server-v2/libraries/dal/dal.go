package dal

import "server/libraries"

type DAL interface {
	GetLibrary(name string) (*libraries.ArduinoLibrary, bool)
	ListRecent() []libraries.ArduinoLibrary
}
