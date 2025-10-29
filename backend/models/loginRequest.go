package models

type LoginRequest struct {
    UserEmail string `json:"userEmail"`
    Password  string `json:"password"`
}
