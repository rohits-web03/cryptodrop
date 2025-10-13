package handlers

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/rohits-web03/cryptodrop/internal/models"
	"github.com/rohits-web03/cryptodrop/internal/utils"
)

var files = make(map[string]models.File) // temporary in-memory store

// POST /api/v1/files/upload
// UploadFile godoc
// @Summary Upload one or more files
// @Description Upload files and get their unique download links
// @Tags Files
// @Accept multipart/form-data
// @Produce json
// @Param files formData file true "Files to upload" style(form) explode(true)
// @Success 200 {object} utils.Payload
// @Failure 400 {object} utils.Payload
// @Router /api/v1/files/upload [post]
func UploadFile(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseMultipartForm(100 << 20); err != nil { // 100 MB total max
		utils.JSONResponse(w, http.StatusBadRequest, utils.Payload{
			Success: false,
			Message: "Invalid file upload",
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

	uploadDir := "uploads"
	os.MkdirAll(uploadDir, os.ModePerm)

	var uploadedFiles []map[string]interface{}

	for _, handler := range formFiles {
		src, err := handler.Open()
		if err != nil {
			continue // skip any failed file, don’t abort entire upload
		}
		defer src.Close()

		id := utils.GenerateID()
		dstPath := filepath.Join(uploadDir, id.String()+"_"+handler.Filename)

		dst, err := os.Create(dstPath)
		if err != nil {
			continue
		}
		defer dst.Close()

		size, err := io.Copy(dst, src)
		if err != nil {
			continue
		}

		files[id.String()] = models.File{
			ID:         id,
			Filename:   handler.Filename,
			Path:       dstPath,
			Size:       size,
			UploadedAt: time.Now(),
			UpdatedAt:  time.Now(),
		}

		fileURL := fmt.Sprintf("http://localhost:8080/api/v1/files/download/%s", id.String())
		uploadedFiles = append(uploadedFiles, map[string]interface{}{
			"id":       id.String(),
			"filename": handler.Filename,
			"size":     size,
			"url":      fileURL,
		})
	}

	utils.JSONResponse(w, http.StatusOK, utils.Payload{
		Success: true,
		Message: "Files uploaded successfully",
		Data:    uploadedFiles,
	})
}

// GET /api/v1/files
// ListFiles godoc
// @Summary List all uploaded files
// @Description List all uploaded files with their download links
// @Tags Files
// @Produce json
// @Success 200 {object} utils.Payload
// @Failure 400 {object} utils.Payload
// @Router /api/v1/files [get]
func ListFiles(w http.ResponseWriter, r *http.Request) {
	var allFiles []map[string]interface{}

	for id, f := range files {
		allFiles = append(allFiles, map[string]interface{}{
			"id":       id,
			"filename": f.Filename,
			"size":     f.Size,
			"url":      fmt.Sprintf("http://localhost:8080/api/v1/files/download/%s", id),
		})
	}

	utils.JSONResponse(w, http.StatusOK, utils.Payload{
		Success: true,
		Message: "Files listed successfully",
		Data:    allFiles,
	})
}

// GET /api/v1/files/download/{id}
// DownloadFile godoc
// @Summary Download a file
// @Description Download a file by its ID
// @Tags Files
// @Produce json
// @Param id path string true "File ID"
// @Success 200 {object} utils.Payload
// @Failure 400 {object} utils.Payload
// @Router /api/v1/files/download/{id} [get]
func DownloadFile(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	file, ok := files[id]
	if !ok {
		utils.JSONResponse(w, http.StatusNotFound, utils.Payload{
			Success: false,
			Message: "File not found",
		})
		return
	}

	w.Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=\"%s\"", file.Filename))
	http.ServeFile(w, r, file.Path)
}
