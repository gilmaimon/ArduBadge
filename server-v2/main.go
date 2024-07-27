package main

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"log"
	"server/badges"
	"server/config"
	"server/handlers"
	"server/libraries"
	"server/middlewares"
)

// todo - sitemap

func main() {
	configuration := config.ReadServerConfiguration("server.yaml")

	// init and setup
	libs, err := libraries.FetchLatest()
	if err != nil {
		log.Fatalf("Failed to fetch libs")
	}
	dal := libraries.NewInMemoryDAL(libs)

	badgeGenerator, err := badges.NewGenerator()
	if err != nil {
		log.Fatalf("Failed to create badges geneartor")
	}

	libraries.RunPeriodicLibrariesUpdates(dal, configuration.Libraries.RefreshRateHours)

	server := echo.New()

	// middlewares
	if configuration.Cache.Enabled {
		middlewares.EnableCaching(server, configuration.Cache.TimeInHours)
	}

	if configuration.Logging.Enabled {
		middlewares.EnableLogging(server)
	}

	// Static files
	server.Static("/static", configuration.Server.StaticDir+"/static")
	server.File("/favicon.png", configuration.Server.StaticDir+"/favicon.png")
	server.GET("/manifest.json", func(c echo.Context) error {
		return c.File(configuration.Server.StaticDir + "/manifest.json")
	})

	// API routes
	server.GET("/stats/recent", (&handlers.RecentHandler{LibrariesDal: dal}).Handle)
	server.GET("/library/:library", (&handlers.LibraryHandler{LibrariesDal: dal}).Handle)
	server.GET("/badge/:library", (&handlers.BadgeHandler{
		LibrariesDal:   dal,
		BadgeGenerator: badgeGenerator,
	}).Handle)

	// Catch-all route for single-page application (SPA)
	server.GET("*", func(c echo.Context) error {
		return c.File(configuration.Server.StaticDir + "/index.html")
	})

	// serving
	if configuration.TLS.Enabled {
		go func() {
			redirecter := echo.New()
			redirecter.Pre(middleware.HTTPSRedirect())
			_ = redirecter.Start(":80")
		}()

		err = server.StartTLS(fmt.Sprintf(":%d", configuration.TLS.Port), configuration.TLS.CrtFile, configuration.TLS.KeyFile)
	} else {
		err = server.Start(fmt.Sprintf(":%d", configuration.Server.Port))
	}

	if err != nil {
		log.Fatalf(err.Error())
	}
}
