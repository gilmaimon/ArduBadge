package middlewares

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func EnableLogging(server *echo.Echo) {
	server.Use(middleware.Logger())
}
