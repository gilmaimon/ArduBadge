package badges

import (
	"github.com/essentialkaos/go-badge"
	"server/libraries"
)

type Generator struct {
	badgeGenerator *badge.Generator
}

func NewGenerator() (*Generator, error) {
	g, err := badge.NewGenerator("Verdana.ttf", 12)

	if err != nil {
		return nil, err
	}

	return &Generator{badgeGenerator: g}, nil
}

func (g *Generator) GenerateBadge(library *libraries.ArduinoLibrary) []byte {
	return g.badgeGenerator.GenerateFlat("Library Manager", library.Name+" "+library.Version, "#00C129")
}

func (g *Generator) GenerateNotFoundBadge(libraryName string) []byte {
	return g.badgeGenerator.GenerateFlat("Library Manager", libraryName, "#A2A2A2")
}
