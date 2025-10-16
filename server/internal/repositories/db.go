package repositories

import (
	"log"

	"github.com/rohits-web03/cryptodrop/internal/config"
	"github.com/rohits-web03/cryptodrop/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	dsn := config.Envs.DB_URL
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	// Run migrations
	err = db.AutoMigrate(
		&models.User{},
		&models.Transfer{},
		&models.File{},
	)
	if err != nil {
		log.Fatal("Migration failed:", err)
	}
	DB = db
	log.Println("Successfully connected to database")
}
