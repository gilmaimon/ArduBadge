package handlers

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"server/libraries"
)

type RecentHandler struct {
	LibrariesDal libraries.DAL
}

func (h *RecentHandler) Handle(c echo.Context) error {
	recent := h.LibrariesDal.ListRecent()
	return c.JSON(http.StatusOK, recent)
}
