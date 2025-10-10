package main

import (
    "fmt"
    "net/http"
)

func main() {
    InitDB()

    http.HandleFunc("/register", RegisterHandler)

    fmt.Println("🚀 Server started on :8080")
    http.ListenAndServe(":8080", nil)
}
