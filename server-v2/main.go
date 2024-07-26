package main

import (
	"github.com/labstack/echo/v4"
	"log"
	"server/badges"
	"server/handlers"
	"server/libraries"
	"server/libraries/dal"
	"time"
)

// todo
// 1. fetching more than once
// 2. https somehow
// 3. sitemap
// 4. caching to lower load

func librariesUpdater(dal *dal.InMemoryDAL) {
	go func() {
		for {
			time.Sleep(time.Hour)

			// fetch and update libraries
			libs, err := libraries.FetchLatest()
			if err != nil {
				log.Fatalf("Failed to fetch libs")
			}
			dal.Update(libs)
		}
	}()
}

func main() {
	libs, err := libraries.FetchLatest()
	if err != nil {
		log.Fatalf("Failed to fetch libs")
	}
	dal := dal.NewInMemoryDAL(libs)

	badgeGenerator, err := badges.NewGenerator()
	if err != nil {
		log.Fatalf("Failed to create geneartor")
	}

	librariesUpdater(dal)

	server := echo.New()
	server.GET("/stats/recent", (&handlers.RecentHandler{LibrariesDal: dal}).Handle)
	server.GET("/library/:library", (&handlers.LibraryHandler{LibrariesDal: dal}).Handle)
	server.GET("/badge/:library", (&handlers.BadgeHandler{
		LibrariesDal:   dal,
		BadgeGenerator: badgeGenerator,
	}).Handle)

	err = server.Start(":80")
	if err != nil {
		return
	}
}
