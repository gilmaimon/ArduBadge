package handlers

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"server/libraries"
)

type LibraryHandler struct {
	LibrariesDal libraries.DAL
}

type libraryResponse struct {
	Data  libraries.ArduinoLibrary `json:"data"`
	Found bool                     `json:"found"`
}

func (h *LibraryHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
}

func (h *LibraryHandler) Handle(c echo.Context) error {
	requestedLibrary := c.Param("library")
	data, ok := h.LibrariesDal.GetLibrary(requestedLibrary)
	response := libraryResponse{
		Data:  *data,
		Found: ok,
	}

	return c.JSON(http.StatusOK, response)
}
