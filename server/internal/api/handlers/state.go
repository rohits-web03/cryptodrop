package handlers

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"strings"
)

// GenerateState creates a random state string containing optional metadata (e.g., "login" or "register")
func GenerateState(data map[string]string) (string, error) {
	// Generate 16 random bytes for uniqueness
	randomBytes := make([]byte, 16)
	if _, err := rand.Read(randomBytes); err != nil {
		return "", fmt.Errorf("failed to generate random bytes: %w", err)
	}
	randomPart := base64.RawURLEncoding.EncodeToString(randomBytes)

	// Marshal metadata as JSON and encode
	payloadBytes, err := json.Marshal(data)
	if err != nil {
		return "", fmt.Errorf("failed to marshal state data: %w", err)
	}
	payloadPart := base64.RawURLEncoding.EncodeToString(payloadBytes)

	// Final format: randomPart.payloadPart
	return fmt.Sprintf("%s.%s", randomPart, payloadPart), nil
}

// DecodeState decodes the metadata back from the state string
func DecodeState(state string) (map[string]string, error) {
	parts := strings.Split(state, ".")
	if len(parts) != 2 {
		return nil, fmt.Errorf("invalid state format")
	}

	payloadBytes, err := base64.RawURLEncoding.DecodeString(parts[1])
	if err != nil {
		return nil, fmt.Errorf("failed to decode state payload: %w", err)
	}

	var data map[string]string
	if err := json.Unmarshal(payloadBytes, &data); err != nil {
		return nil, fmt.Errorf("failed to unmarshal state JSON: %w", err)
	}

	return data, nil
}
