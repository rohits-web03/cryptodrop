package models

import (
	"time"

	"github.com/google/uuid"
)

type File struct {
	ID         uuid.UUID `json:"id" gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	TransferID uuid.UUID `json:"transferId" gorm:"type:uuid;index;not null"` // foreign key
	Filename   string    `json:"filename" gorm:"not null"`
	Size       int64     `json:"size" gorm:"not null"`  // bytes
	Path       string    `json:"path" gorm:"not null"`  // storage path
	Index      int       `json:"index" gorm:"not null"` // per-transfer index (0,1,2…)
	CreatedAt  time.Time `json:"createdAt" gorm:"autoCreateTime"`
	UpdatedAt  time.Time `json:"updatedAt" gorm:"autoUpdateTime"`
	Deleted    bool      `json:"deleted" gorm:"default:false"`
}
