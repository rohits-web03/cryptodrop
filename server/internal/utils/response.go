package utils

import (
	"encoding/json"
	"net/http"
)

type Payload struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Data    any    `json:"data,omitempty"`
}

// JSONResponse sends a JSON response with given status, success flag, and payload
func JSONResponse(w http.ResponseWriter, status int, payload Payload) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}
