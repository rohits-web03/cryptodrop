package main

import (
    "fmt"
    "net/http"
)

func main() {
    InitDB()

    http.HandleFunc("/register", RegisterHandler)
    http.HandleFunc("/auth", AuthenticateUser)
    fmt.Println("🚀 Server started on :8080")
    http.ListenAndServe(":8080", nil)
}
