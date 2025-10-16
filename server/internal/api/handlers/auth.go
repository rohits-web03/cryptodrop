package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/rohits-web03/cryptodrop/internal/config"
	"github.com/rohits-web03/cryptodrop/internal/models"
	"github.com/rohits-web03/cryptodrop/internal/repositories"
	"github.com/rohits-web03/cryptodrop/internal/utils"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// POST /auth/sign-up
func RegisterUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JSONResponse(w, http.StatusMethodNotAllowed, utils.Payload{
			Success: false,
			Message: "Method not allowed",
		})
		return
	}

	type Input struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var input Input

	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()
	if err := dec.Decode(&input); err != nil {
		utils.JSONResponse(w, http.StatusBadRequest, utils.Payload{
			Success: false,
			Message: "Invalid input",
		})
		return
	}

	if input.Email == "" || input.Username == "" || input.Password == "" {
		utils.JSONResponse(w, http.StatusBadRequest, utils.Payload{
			Success: false,
			Message: "Invalid input",
		})
		return
	}

	// Check if username already exists
	var existingUser models.User
	if err := repositories.DB.Where("username = ?", input.Username).First(&existingUser).Error; err == nil {
		utils.JSONResponse(w, http.StatusBadRequest, utils.Payload{
			Success: false,
			Message: "Username is already taken",
		})
		return
	}

	// Check if email already exists
	err := repositories.DB.Where("email = ?", input.Email).First(&existingUser).Error

	switch err {
	case nil: // email exists
		utils.JSONResponse(w, http.StatusBadRequest, utils.Payload{
			Success: false,
			Message: "User already exists with this email",
		})
		return

	case gorm.ErrRecordNotFound: // new user, create account
		hashedPassword, hashErr := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
		if hashErr != nil {
			utils.JSONResponse(w, http.StatusInternalServerError, utils.Payload{
				Success: false,
				Message: "Failed to hash password",
			})
			return
		}

		newUser := models.User{
			Username: input.Username,
			Email:    input.Email,
			Password: string(hashedPassword),
		}

		if createErr := repositories.DB.Create(&newUser).Error; createErr != nil {
			utils.JSONResponse(w, http.StatusInternalServerError, utils.Payload{
				Success: false,
				Message: "Database insert failed",
			})
			return
		}

	default: // some other DB error
		utils.JSONResponse(w, http.StatusInternalServerError, utils.Payload{
			Success: false,
			Message: "Database query failed",
		})
		return
	}

	utils.JSONResponse(w, http.StatusCreated, utils.Payload{
		Success: true,
		Message: "User registered successfully",
	})
}

// JWT Claims struct
type Claims struct {
	UserID   string `json:"userId"`
	Username string `json:"username"`
	jwt.RegisteredClaims
}

// POST /auth/login
func LoginUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JSONResponse(w, http.StatusMethodNotAllowed, utils.Payload{
			Success: false,
			Message: "Method not allowed",
		})
		return
	}

	// Parse request body
	var input struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()
	if err := dec.Decode(&input); err != nil {
		utils.JSONResponse(w, http.StatusBadRequest, utils.Payload{
			Success: false,
			Message: "Invalid input",
		})
		return
	}

	if input.Username == "" || input.Password == "" {
		utils.JSONResponse(w, http.StatusBadRequest, utils.Payload{
			Success: false,
			Message: "Invalid input",
		})
		return
	}

	var user models.User
	err := repositories.DB.Where("username = ?", input.Username).First(&user).Error
	switch err {
	case nil:
		// user found
	case gorm.ErrRecordNotFound:
		utils.JSONResponse(w, http.StatusUnauthorized, utils.Payload{
			Success: false,
			Message: "Invalid credentials",
		})
		return
	default:
		utils.JSONResponse(w, http.StatusInternalServerError, utils.Payload{
			Success: false,
			Message: "Database error",
		})
		return
	}

	// Compare password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		utils.JSONResponse(w, http.StatusUnauthorized, utils.Payload{
			Success: false,
			Message: "Invalid credentials",
		})
		return
	}

	// Load JWT secret
	secret := config.Envs.JWTSecret
	if secret == "" {
		utils.JSONResponse(w, http.StatusInternalServerError, utils.Payload{
			Success: false,
			Message: "No config found for JWT",
		})
		return
	}

	// Build JWT claims
	expiration := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		UserID:   user.ID.String(),
		Username: user.Username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expiration),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	// Sign token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		utils.JSONResponse(w, http.StatusInternalServerError, utils.Payload{
			Success: false,
			Message: "Failed to create token",
		})
		return
	}

	// Cookie max-age
	maxAge := int(expiration.Unix() - time.Now().Unix())

	// Check if we’re in production
	isProd := config.Envs.Environment == "production"

	// SameSite cookie policy
	sameSite := http.SameSiteLaxMode
	if isProd {
		sameSite = http.SameSiteNoneMode
	}

	// Set cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    tokenString,
		Path:     "/",
		MaxAge:   maxAge,
		Secure:   isProd,
		HttpOnly: true,
		SameSite: sameSite,
	})

	utils.JSONResponse(w, http.StatusOK, utils.Payload{
		Success: true,
		Message: "Login successful",
	})
}

// POST /api/auth/logout
func Logout(w http.ResponseWriter, r *http.Request) {
	isProd := config.Envs.Environment == "production"

	// Delete the token cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    "", // empty value
		Path:     "/",
		MaxAge:   -1, // maxAge < 0 deletes the cookie
		Secure:   isProd,
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
	})

	utils.JSONResponse(w, http.StatusOK, utils.Payload{
		Success: true,
		Message: "Logged out successfully",
	})
}
