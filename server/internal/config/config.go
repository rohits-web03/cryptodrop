package config

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

type Config struct {
	DB_URL      string
	Port        string
	JWTSecret   string
	Environment string
	CorsConfig  cors.Options
}

var Envs = initConfig()

func initConfig() Config {
	log.Println("Running in development mode, loading .env")
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	return Config{
		DB_URL:      getEnv("DB_URL", ""),
		Port:        getEnv("PORT", "8080"),
		JWTSecret:   getEnv("JWT_SECRET", "not-so-secret-now-is-it?"),
		Environment: getEnv("ENV", "development"),
		CorsConfig:  CorsConfig(),
	}
}

// Gets the env by key or fallbacks
func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}

	return fallback
}

func CorsConfig() cors.Options {
	return cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodPatch, http.MethodDelete, http.MethodOptions},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	}

}
