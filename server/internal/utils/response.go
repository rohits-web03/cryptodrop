package utils

import (
	"encoding/json"
	"net/http"
)

// JSONResponse sends a JSON response with given status, success flag, and message
func JSONResponse(w http.ResponseWriter, status int, success bool, message string) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(map[string]any{
		"success": success,
		"message": message,
	})
}
