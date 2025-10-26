package handlers

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/google/uuid"
	"github.com/rohits-web03/cryptodrop/internal/models"
	"github.com/rohits-web03/cryptodrop/internal/repositories"
	"github.com/rohits-web03/cryptodrop/internal/utils"
	"gorm.io/gorm"
)

// POST /api/v1/files
// UploadFile godoc
// @Summary Upload one or more files anonymously
// @Description Upload multiple files (≤100 MB total) and receive a share token
// @Tags Files
// @Accept multipart/form-data
// @Produce json
// @Param files formData file true "Files to upload" style(form) explode(true)
// @Success 200 {object} utils.Payload
// @Failure 400 {object} utils.Payload
// @Router /api/v1/files [post]
func UploadFiles(w http.ResponseWriter, r *http.Request) {
	const maxUploadSize = 100 << 20 // 100 MB
	if err := r.ParseMultipartForm(maxUploadSize); err != nil {
		utils.JSONResponse(w, http.StatusBadRequest, utils.Payload{
			Success: false,
			Message: "Invalid file upload form",
		})
		return
	}

	formFiles := r.MultipartForm.File["files"]
	if len(formFiles) == 0 {
		utils.JSONResponse(w, http.StatusBadRequest, utils.Payload{
			Success: false,
			Message: "No files provided",
		})
		return
	}

	// Calculate total size
	var totalSize int64
	for _, f := range formFiles {
		totalSize += f.Size
	}
	if totalSize > maxUploadSize {
		utils.JSONResponse(w, http.StatusBadRequest, utils.Payload{
			Success: false,
			Message: "Total file size exceeds 100 MB limit",
		})
		return
	}

	// Create uploads directory if missing
	uploadDir := "uploads"
	_ = os.MkdirAll(uploadDir, os.ModePerm)

	// Generate transfer token
	token, err := utils.GenerateSecureToken(32) // 256-bit token
	if err != nil {
		utils.JSONResponse(w, http.StatusInternalServerError, utils.Payload{
			Success: false,
			Message: "Failed to create transfer token",
		})
		return
	}

	// Begin DB transaction
	db := repositories.DB
	err = db.Transaction(func(tx *gorm.DB) error {
		// Create transfer record
		transfer := models.Transfer{
			Token:       token,
			ExpiresAt:   time.Now().Add(1 * time.Hour),
			IsAnonymous: true,
			TotalSize:   totalSize,
		}

		if err := tx.Create(&transfer).Error; err != nil {
			return err
		}

		// Store each file
		for i, handler := range formFiles {
			src, err := handler.Open()
			if err != nil {
				continue
			}
			defer src.Close()

			fileID := uuid.New()
			dstPath := filepath.Join(uploadDir, fileID.String()+"_"+handler.Filename)

			dst, err := os.Create(dstPath)
			if err != nil {
				continue
			}
			defer dst.Close()

			size, err := io.Copy(dst, src)
			if err != nil {
				continue
			}

			file := models.File{
				TransferID: transfer.ID,
				Filename:   handler.Filename,
				Path:       dstPath,
				Size:       size,
				Index:      i,
			}
			if err := tx.Create(&file).Error; err != nil {
				return err
			}
		}

		return nil
	})

	if err != nil {
		utils.JSONResponse(w, http.StatusInternalServerError, utils.Payload{
			Success: false,
			Message: "Failed to store files",
		})
		return
	}

	shareLink := fmt.Sprintf("http://localhost:8080/api/v1/share/%s", token)
	utils.JSONResponse(w, http.StatusOK, utils.Payload{
		Success: true,
		Message: "Files uploaded successfully",
		Data: map[string]interface{}{
			"shareLink": shareLink,
			"expiresIn": "1h",
		},
	})
}
