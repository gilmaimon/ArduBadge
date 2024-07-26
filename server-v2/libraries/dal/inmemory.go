package dal

import "server/libraries"

type InMemoryDAL struct {
	libraries *map[string]libraries.ArduinoLibrary
}

func NewInMemoryDAL(values []libraries.ArduinoLibrary) *InMemoryDAL {
	var result InMemoryDAL
	result.Update(values)
	return &result
}

func (i *InMemoryDAL) Update(values []libraries.ArduinoLibrary) {
	newLibraries := make(map[string]libraries.ArduinoLibrary)
	for _, library := range values {
		newLibraries[library.Name] = library
	}

	i.libraries = &newLibraries
}

func (i *InMemoryDAL) GetLibrary(name string) (*libraries.ArduinoLibrary, bool) {
	value, ok := (*i.libraries)[name]
	return &value, ok
}

func (i *InMemoryDAL) ListRecent() []libraries.ArduinoLibrary {
	libs := i.libraries
	counter := 0
	var result []libraries.ArduinoLibrary
	for _, value := range *libs {
		if len(value.Name)+len(value.Version) > 25 {
			continue
		}

		result = append(result, value)
		counter++
		if counter == 10 {
			break
		}
	}
	return result
}
