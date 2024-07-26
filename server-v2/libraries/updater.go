package libraries

import (
	"log"
	"server/libraries/dal"
	"time"
)

func RunPeriodicLibrariesUpdates(dal *dal.InMemoryDAL, refreshRateHours int64) {
	go func() {
		for {
			time.Sleep(time.Hour * time.Duration(refreshRateHours))

			// fetch and update libraries
			libs, err := FetchLatest()
			if err == nil {
				dal.Update(libs)
			}

			log.Println("Failed to fetch libs")
		}
	}()
}
