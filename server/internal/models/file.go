package models

import (
	"time"

	"github.com/google/uuid"
)

type File struct {
	ID         uuid.UUID `json:"id" gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Filename   string    `json:"filename" gorm:"type:varchar(255);not null"`
	Path       string    `json:"path" gorm:"type:varchar(255);not null"`
	Size       int64     `json:"size" gorm:"type:bigint;not null"`
	UploadedAt time.Time `json:"uploadedAt" gorm:"autoCreateTime"`
	UpdatedAt  time.Time `json:"updatedAt" gorm:"autoUpdateTime"`
}
