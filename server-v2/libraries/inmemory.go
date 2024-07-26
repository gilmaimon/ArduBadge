package libraries

type InMemoryDAL struct {
	libraries *map[string]ArduinoLibrary
}

func NewInMemoryDAL(values []ArduinoLibrary) *InMemoryDAL {
	var result InMemoryDAL
	result.Update(values)
	return &result
}

func (i *InMemoryDAL) Update(values []ArduinoLibrary) {
	newLibraries := make(map[string]ArduinoLibrary)
	for _, library := range values {
		newLibraries[library.Name] = library
	}

	i.libraries = &newLibraries
}

func (i *InMemoryDAL) GetLibrary(name string) (*ArduinoLibrary, bool) {
	value, ok := (*i.libraries)[name]
	return &value, ok
}

func (i *InMemoryDAL) ListRecent() []ArduinoLibrary {
	libs := i.libraries
	counter := 0
	var result []ArduinoLibrary
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
