// connect to Neon DB
// register users

package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"

    "golang.org/x/crypto/bcrypt"
)

type User struct {
    UserName  string `gorm:"column:userName;size:20;unique"`          // VARCHAR(20) UNIQUE
    UserEmail string `gorm:"column:userEmail;size:40;primaryKey"`      // VARCHAR(40) PRIMARY KEY
    Password  string `gorm:"column:pword;not null"`                // TEXT NOT NULL
}

func (User) TableName() string {
    return `"User Info"`
}

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }

    var reqUser User
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

    // Save to DB
    result := DB.Create(&reqUser)
    if result.Error != nil {
        http.Error(w, "Failed to register user", http.StatusInternalServerError)
        log.Println(result.Error)
        return
    }

    w.WriteHeader(http.StatusCreated)
    fmt.Fprintln(w, "✅ User registered successfully!")
}
