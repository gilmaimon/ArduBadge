package libraries

import (
	"log"
	"time"
)

func RunPeriodicLibrariesUpdates(dal *InMemoryDAL, refreshRateHours int64) {
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
