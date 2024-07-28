package badges

import (
	"github.com/essentialkaos/go-badge"
	"server/libraries"
	"strings"
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
	return g.generateBadge(library.Name+" "+library.Version, "#00C129")
}

func (g *Generator) GenerateNotFoundBadge(libraryName string) []byte {
	return g.generateBadge(libraryName, "#A2A2A2")
}

func (g *Generator) generateBadge(content string, color string) []byte {
	label := "ZXOLibrary Manager"
	badgeString := string(g.badgeGenerator.GenerateFlat(label, content, color))

	// spacing
	badgeString = strings.Replace(badgeString, "ZXO", "&#160;&#160;&#160;&#160;", 4)

	// insert arduino image before svg enclosing
	badgeString = strings.Replace(badgeString, "</svg>", `<image xmlns="http://www.w3.org/2000/svg" x="6" y="1" width="18" height="18" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAA3CAYAAAD6+O8NAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH4wEKDB43az9p7AAAAvhJREFUeNrtW82O2jAQtk0RHGiQckEFqX2BvkHPfZCqfZXtY1TafYBeetu9rkR7Qa3ErQfUleAWkzhIsFJI9pSKUiC245/xar4TQvGMvxmPZ8ZxCEEgEAgEAoFAIBAIt6AmhFRVVUkrpJRCNohvLqzNxGvojkvT9AqKE9py8RYhJpXXEEI8DIfDN5CjwVXUSEfIdrvd2CBACCFRFL2uqqpKkuTaZURAlE19rSQfeSYEHgwaiVpnlmV/QnaGrk4KjYTpaAmNA4VMpK1TQuTATCjL8/wHlYAQ4psrw+o6oyzLUoYL5/zOS11+CUKI77Z16NT6NmUfI0mSa5M6qO7qMlUJqRqjSa9peSZ5yOhiPp1Ry3p8fMxNEPflDFlZMvNTziFFUXw0vUX2+/1IxTiniKmeQdnodUzI/Mchu93uU9OAbrf7BUI1deiAkA43Oec/pXNIEzFXZGyVqzrzP5yL7Pg2dmQEIKBuJy7AoE7MdcJFhzgyZBsZ0+n0rVcD6DQ2s9ns3nYTVmnCtp7lclmZsqNyhJzrFUaj0TuIkeJimxqPx+cqqZtnuWUFjFe6A1/IPtjr9V6e+n8ymdBzoXtm9eygWnE+n+/iOO4TQkgURWQwGPz3zGq1+vt7sVj0TsmJ4/i99m4AsQ8x1ZeYmC/2IQabREjvQ55FDjFh0NCcouSQPM9/h+QMH05pe3OGmtz/DBG6bZMUfZfDbe1HdVZT6Nd0fM6/SbdWDimK4gMEZ9TvNcqyLFV1JUlyG0xikTk22Gw29650yRw/1DcrXb1LP0SapldWdbkgpOuISy94VC4c+ODhdOXmef7VlhNc3DpR0aPjeO0qC2oNr5qIQ537xaQuhHgI0Rk+j3mOoVpwNE56v9/vGWMsFEdAixZVDo2G7nQ6nTbn+xB6BR/Rsl6vf2lFNrSV5ruT9s2BqSrKsuyzLRIuVrJNPZzzu7ayvX57ASXxQuLBTKw22eMLzvnN4RhIZenBZwaN+fL4kwWCQCAQCAQCgUAgVPAEufXCdEfyaK8AAAAASUVORK5CYII="/></svg>`, 2)

	return []byte(badgeString)
}
