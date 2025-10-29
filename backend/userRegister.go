package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "strings"

    "golang.org/x/crypto/bcrypt"
    "gorm.io/gorm"
    "cryptodrop-backend/models"
)

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }

    var reqUser models.User
    err := json.NewDecoder(r.Body).Decode(&reqUser)
    if err != nil {
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

    // Hash the password before saving
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(reqUser.Password), bcrypt.DefaultCost)
    if err != nil {
        http.Error(w, "Error processing password", http.StatusInternalServerError)
        return
    }

    // Replace plaintext with hashed password
    reqUser.Password = string(hashedPassword)

    // Check if email already exists
    var existing models.User
    if err := DB.Where(`"userEmail" = ?`, reqUser.UserEmail).First(&existing).Error; err == nil {
        http.Error(w, "User with this email already exists", http.StatusConflict)
        return
    }else if err := DB.Where(`"userName" = ?`, reqUser.UserName).First(&existing).Error; err == nil {
        http.Error(w, "User with this username already exists", http.StatusConflict)
        return
    } else if err != nil && err != gorm.ErrRecordNotFound {
        http.Error(w, "Database error", http.StatusInternalServerError)
        log.Println("DB lookup error:", err)
        return
    }

    // Create user
    result := DB.Create(&reqUser)
    if result.Error != nil {
        if strings.Contains(result.Error.Error(), "duplicate key value violates unique constraint") {
            http.Error(w, "Email already registered", http.StatusConflict)
            return
        }
        http.Error(w, "Failed to register user", http.StatusInternalServerError)
        log.Println(result.Error)
        return
    }
        w.WriteHeader(http.StatusCreated)
        fmt.Fprintln(w, "✅ User registered successfully!")
    }

// To be added:
// add check for email ID
// 