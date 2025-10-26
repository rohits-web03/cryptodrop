package handlers

import (
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/rohits-web03/cryptodrop/internal/models"
	"github.com/rohits-web03/cryptodrop/internal/repositories"
	"github.com/rohits-web03/cryptodrop/internal/utils"
)

// GET /api/v1/share/{token}
// GetSharedFiles godoc
// @Summary Retrieve shared file details
// @Description Fetch metadata of all files in a transfer using its share token
// @Tags Files
// @Produce json
// @Param token path string true "Share token"
// @Success 200 {object} utils.Payload
// @Failure 404 {object} utils.Payload
// @Failure 410 {object} utils.Payload
// @Router /api/v1/share/{token} [get]
func GetSharedFiles(w http.ResponseWriter, r *http.Request) {
	token := r.PathValue("token")
	if token == "" {
		utils.JSONResponse(w, http.StatusBadRequest, utils.Payload{
			Success: false,
			Message: "Missing share token",
		})
		return
	}

	db := repositories.DB
	var transfer models.Transfer

	// Fetch transfer and preload its files
	err := db.Preload("Files").
		Where("token = ? AND deleted = ?", token, false).
		First(&transfer).Error

	if err != nil {
		utils.JSONResponse(w, http.StatusNotFound, utils.Payload{
			Success: false,
			Message: "Invalid or expired share link",
		})
		return
	}

	// Check expiry
	if time.Now().After(transfer.ExpiresAt) {
		utils.JSONResponse(w, http.StatusGone, utils.Payload{
			Success: false,
			Message: "This link has expired",
		})
		return
	}

	// Prepare safe response
	files := make([]map[string]interface{}, 0, len(transfer.Files))
	for _, f := range transfer.Files {
		files = append(files, map[string]interface{}{
			"name":  f.Filename,
			"size":  f.Size,
			"index": f.Index,
		})
	}

	utils.JSONResponse(w, http.StatusOK, utils.Payload{
		Success: true,
		Message: "Files retrieved successfully",
		Data: map[string]any{
			"expiresAt": transfer.ExpiresAt,
			"files":     files,
		},
	})
}

// GET /api/v1/share/{token}/download/{index}
// DownloadSharedFile godoc
// @Summary Download a specific file from a shared transfer
// @Description Download the file corresponding to the given index in the anonymous transfer
// @Tags Files
// @Produce octet-stream
// @Param token path string true "Share token"
// @Param index path int true "File index"
// @Success 200 {file} file
// @Failure 404 {object} utils.Payload
// @Failure 410 {object} utils.Payload
// @Router /api/v1/share/{token}/download/{index} [get]
func DownloadSharedFile(w http.ResponseWriter, r *http.Request) {
	token := r.PathValue("token")
	indexStr := r.PathValue("index")
	if token == "" || indexStr == "" {
		utils.JSONResponse(w, http.StatusBadRequest, utils.Payload{
			Success: false,
			Message: "Missing token or index",
		})
		return
	}

	index, err := strconv.Atoi(indexStr)
	if err != nil {
		utils.JSONResponse(w, http.StatusBadRequest, utils.Payload{
			Success: false,
			Message: "Invalid index",
		})
		return
	}

	db := repositories.DB
	var transfer models.Transfer

	// Fetch transfer
	err = db.Where("token = ? AND deleted = ?", token, false).First(&transfer).Error
	if err != nil {
		utils.JSONResponse(w, http.StatusNotFound, utils.Payload{
			Success: false,
			Message: "Invalid or expired share link",
		})
		return
	}

	// Check expiry
	if time.Now().After(transfer.ExpiresAt) {
		utils.JSONResponse(w, http.StatusGone, utils.Payload{
			Success: false,
			Message: "This link has expired",
		})
		return
	}

	// Fetch the file by index in this transfer
	var file models.File
	err = db.Where("transfer_id = ? AND \"index\" = ? AND deleted = ?", transfer.ID, index, false).
		First(&file).Error
	if err != nil {
		utils.JSONResponse(w, http.StatusNotFound, utils.Payload{
			Success: false,
			Message: "File not found",
		})
		return
	}

	// Open the file for reading
	f, err := os.Open(file.Path)
	if err != nil {
		utils.JSONResponse(w, http.StatusInternalServerError, utils.Payload{
			Success: false,
			Message: "Failed to read file",
		})
		return
	}
	defer f.Close()

	w.Header().Set("Content-Disposition", "attachment; filename=\""+file.Filename+"\"")
	w.Header().Set("Access-Control-Expose-Headers", "Content-Disposition")
	http.ServeFile(w, r, file.Path)
}
