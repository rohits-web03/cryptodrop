package utils

import (
	"crypto/rand"
	"encoding/base64"
)

// GenerateSecureToken creates a cryptographically secure random token.
func GenerateSecureToken(length int) (string, error) {
	b := make([]byte, length)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return base64.RawURLEncoding.EncodeToString(b), nil
}
