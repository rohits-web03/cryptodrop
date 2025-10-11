package api

import (
	"fmt"
	"log"
	"net/http"

	"github.com/rohits-web03/cryptodrop/internal/config"
	"github.com/rs/cors"
)

func SetupRouter() http.Handler {
	mainMux := http.NewServeMux()

	c := cors.New(config.Envs.CorsConfig)

	// Apply the middleware to your main mux
	handler := c.Handler(mainMux)

	apiMux := http.NewServeMux()
	apiMux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		fmt.Fprintf(w, "Welcome to CryptoDrop API!")
	})

	mainMux.Handle("/api/v1/", apiMux)
	mainMux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		fmt.Fprintf(w, "OK")
	})

	log.Println("Router initialized with core and API routes.")
	return handler
}
