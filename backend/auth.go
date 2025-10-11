// fetch and store the login details from FE
// connect Neon DB
// authenticate the user
// return proper auth message
// redirect to other pages, if needed

package main

import (
	"cryptodrop-backend/models"
	"encoding/json"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

func AuthenticateUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var reqUser models.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&reqUser); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	if reqUser.UserEmail == "" || reqUser.Password == "" {
		http.Error(w, "Email and password cannot be empty", http.StatusBadRequest)
		return
	}

	var existing models.User
	if err := DB.Where(`"userEmail" = ?`, reqUser.UserEmail).First(&existing).Error; err != nil {
		http.Error(w, "User not found", http.StatusUnauthorized)
		return
	}

	// Compare password hash
	if err := bcrypt.CompareHashAndPassword([]byte(existing.Password), []byte(reqUser.Password)); err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Authentication successful"))
}
