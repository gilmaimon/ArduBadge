package handlers

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"server/badges"
	"server/libraries/dal"
	"strings"
)

type BadgeHandler struct {
	LibrariesDal   dal.DAL
	BadgeGenerator *badges.Generator
}

func (h *BadgeHandler) Handle(c echo.Context) error {
	requestedLibrary := strings.TrimSuffix(c.Param("library"), ".svg")
	data, ok := h.LibrariesDal.GetLibrary(requestedLibrary)
	if !ok {
		svg := h.BadgeGenerator.GenerateNotFoundBadge(requestedLibrary)
		return c.Blob(http.StatusOK, "image/svg+xml", svg)
	} else {
		svg := h.BadgeGenerator.GenerateBadge(data)
		return c.Blob(http.StatusOK, "image/svg+xml", svg)
	}
}
