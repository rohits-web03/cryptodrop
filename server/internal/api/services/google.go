package services

import (
    "golang.org/x/oauth2"
    "golang.org/x/oauth2/google"
    "os"
)

var GoogleOauthConfig = &oauth2.Config{
    ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
    ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
    RedirectURL:  "http://localhost:8080/api/v1/auth/google/callback",
    Scopes: []string{
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
    },
    Endpoint: google.Endpoint,
}

var OauthStateString = "randomlySelectedString"
