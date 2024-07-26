package handlers

import (
	"encoding/json"
	"net/http"
	"server/libraries/dal"
)

type RecentHandler struct {
	LibrariesDal dal.DAL
}

func (h *RecentHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	recent := h.LibrariesDal.ListRecent()
	data, _ := json.Marshal(recent)
	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}
