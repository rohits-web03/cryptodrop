# Use official Go image
FROM golang:1.25-alpine

# Set environment variables for Go build (cross-platform safe)
ENV CGO_ENABLED=0 \
    GO111MODULE=on \
    GOOS=linux \
    GOARCH=amd64

# Set working directory
WORKDIR /app

# Copy module files first
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the project
COPY . .

# Expose the port
EXPOSE 8080

# Build the binary
RUN go build -o server ./cmd/server/main.go

# Run the server
CMD ["./server"]
