package models

import (
	"time"

	"github.com/google/uuid"
)

type Transfer struct {
	ID          uuid.UUID `json:"id" gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Token       string    `json:"token" gorm:"uniqueIndex;not null"` // secure random token
	CreatedAt   time.Time `json:"createdAt" gorm:"autoCreateTime"`
	UpdatedAt   time.Time `json:"updatedAt" gorm:"autoUpdateTime"`
	ExpiresAt   time.Time `json:"expiresAt" gorm:"not null"`
	Deleted     bool      `json:"deleted" gorm:"default:false"`
	TotalSize   int64     `json:"totalSize" gorm:"not null"` // sum of all file sizes
	IsAnonymous bool      `json:"isAnonymous" gorm:"default:true"`
	Files       []File    `json:"files" gorm:"foreignKey:TransferID"` // one-to-many relation
}
