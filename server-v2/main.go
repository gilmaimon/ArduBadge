package main

import (
	"log"
	"net/http"
	"server/badges"
	"server/handlers"
	"server/libraries"
	"server/libraries/dal"
)

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

	http.Handle("/stats/recent", &handlers.RecentHandler{LibrariesDal: dal})

	http.Handle("/library/", &handlers.LibraryHandler{LibrariesDal: dal})

	http.Handle("/badge/", &handlers.BadgeHandler{
		LibrariesDal:   dal,
		BadgeGenerator: badgeGenerator,
	})

	log.Println("Now server is running on port 80")
	err = http.ListenAndServe(":80", nil)
	if err != nil {
		return
	}
}
