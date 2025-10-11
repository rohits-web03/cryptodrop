package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/rohits-web03/cryptodrop/internal/api"
)

func main() {
	const defaultPort = "8080"
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	mux := api.SetupRouter()

	server := &http.Server{
		Addr:    fmt.Sprintf(":%s", port),
		Handler: mux,
		// Timeouts prevent resource exhaustion from slow clients
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	log.Printf("Starting CryptoDrop server on http://localhost:%s", port)

	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("Could not listen on port %s: %v", port, err)
	}
}
