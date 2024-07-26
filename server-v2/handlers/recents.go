package handlers

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"server/libraries/dal"
)

type RecentHandler struct {
	LibrariesDal dal.DAL
}

func (h *RecentHandler) Handle(c echo.Context) error {
	recent := h.LibrariesDal.ListRecent()
	return c.JSON(http.StatusOK, recent)
}
