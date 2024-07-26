package handlers

import (
	"encoding/json"
	"net/http"
	"server/libraries"
	"server/libraries/dal"
	"strings"
)

type LibraryHandler struct {
	LibrariesDal dal.DAL
}

type libraryResponse struct {
	Data  libraries.ArduinoLibrary `json:"data"`
	Found bool                     `json:"found"`
}

func (h *LibraryHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	requestedLibrary := strings.TrimPrefix(r.URL.Path, "/library/")
	data, ok := h.LibrariesDal.GetLibrary(requestedLibrary)
	response := libraryResponse{
		Data:  *data,
		Found: ok,
	}
	bytes, _ := json.Marshal(response)

	w.Header().Set("Content-Type", "application/json")
	w.Write(bytes)
}
