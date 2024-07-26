package handlers

import (
	"net/http"
	"server/badges"
	"server/libraries/dal"
	"strings"
)

type BadgeHandler struct {
	LibrariesDal   dal.DAL
	BadgeGenerator *badges.Generator
}

func (h *BadgeHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	requestedLibrary := strings.TrimSuffix(strings.TrimPrefix(r.URL.Path, "/badge/"), ".svg")
	data, ok := h.LibrariesDal.GetLibrary(requestedLibrary)
	if !ok {
		svg := h.BadgeGenerator.GenerateNotFoundBadge(requestedLibrary)
		w.Header().Set("Content-Type", "image/svg+xml")
		w.Write(svg)
	} else {
		svg := h.BadgeGenerator.GenerateBadge(data)
		w.Header().Set("Content-Type", "image/svg+xml")
		w.Write(svg)
	}
}
