package main

import (
	"github.com/labstack/echo/v4"
	"log"
	"server/badges"
	"server/config"
	"server/handlers"
	"server/libraries"
	"server/libraries/dal"
	"server/middlewares"
)

// todo
// 3. sitemap

func main() {
	configuration := config.ReadServerConfiguration("server.yaml")

	// init and setup
	libs, err := libraries.FetchLatest()
	if err != nil {
		log.Fatalf("Failed to fetch libs")
	}
	dal := dal.NewInMemoryDAL(libs)

	badgeGenerator, err := badges.NewGenerator()
	if err != nil {
		log.Fatalf("Failed to create geneartor")
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

	// handlers and routes
	server.GET("/stats/recent", (&handlers.RecentHandler{LibrariesDal: dal}).Handle)
	server.GET("/library/:library", (&handlers.LibraryHandler{LibrariesDal: dal}).Handle)
	server.GET("/badge/:library", (&handlers.BadgeHandler{
		LibrariesDal:   dal,
		BadgeGenerator: badgeGenerator,
	}).Handle)

	// serving
	if configuration.TLS.Enabled {
		err = server.StartTLS(":443", configuration.TLS.CrtFile, configuration.TLS.KeyFile)
	} else {
		err = server.Start(":80")
	}

	if err != nil {
		log.Fatalf(err.Error())
	}
}
