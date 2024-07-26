package middlewares

import (
	"fmt"
	"github.com/labstack/echo/v4"
)

func EnableCaching(server *echo.Echo, cacheDurationHours int) {
	cacheHeader := fmt.Sprintf("public, max-age=%d", 3600*cacheDurationHours)
	server.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Response().Header().Set(echo.HeaderCacheControl, cacheHeader)
			return next(c)
		}
	})
}
