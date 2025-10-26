package api

import (
	"fmt"
	"log"
	"net/http"

	_ "github.com/rohits-web03/cryptodrop/docs"
	httpSwagger "github.com/swaggo/http-swagger"

	"github.com/rohits-web03/cryptodrop/internal/api/handlers"
	"github.com/rohits-web03/cryptodrop/internal/config"
	"github.com/rs/cors"
)

func SetupRouter() http.Handler {
	mainMux := http.NewServeMux()

	c := cors.New(config.Envs.CorsConfig)

	// Apply the middleware to your main mux
	handler := c.Handler(mainMux)

	apiMux := http.NewServeMux()
	apiMux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}
		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		fmt.Fprintf(w, "Welcome to CryptoDrop API!")
	})

	authMux := http.NewServeMux()
	authMux.HandleFunc("/sign-up", handlers.RegisterUser)
	authMux.HandleFunc("/login", handlers.LoginUser)
	authMux.HandleFunc("/logout", handlers.Logout)

	//Google OAuth routes
	authMux.HandleFunc("/google/login", handlers.HandleGoogleLogin)
	authMux.HandleFunc("/google/callback", handlers.HandleGoogleCallback)

	fileMux := http.NewServeMux()
	fileMux.HandleFunc("/", handlers.UploadFiles)

	shareMux := http.NewServeMux()
	shareMux.HandleFunc("/{token}", handlers.GetSharedFiles)
	shareMux.HandleFunc("/{token}/download/{index}", handlers.DownloadSharedFile)

	// Mount fileMux under /files
	apiMux.Handle("/files/", http.StripPrefix("/files", fileMux))

	// Mount shareMux under /share
	apiMux.Handle("/share/", http.StripPrefix("/share", shareMux))

	// Mount authMux under /auth
	apiMux.Handle("/auth/", http.StripPrefix("/auth", authMux))

	// Mount apiMux under /api/v1/
	mainMux.Handle("/api/v1/", http.StripPrefix("/api/v1", apiMux))

	// Health check
	mainMux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		fmt.Fprintf(w, "OK")
	})

	// Swagger documentation
	mainMux.HandleFunc("/docs/", httpSwagger.WrapHandler)

	log.Println("Router initialized with core and API routes.")
	return handler
}
