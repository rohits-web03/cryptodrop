# CryptoDrop API Server

This is the backend server for **CryptoDrop**, a secure file-sharing platform built in **Go**. It provides RESTful APIs for user authentication, file uploads, and file management.

## API Documentation

* The API is fully documented with **Swagger**.
* Access the interactive documentation at `/docs/index.html` once the server is running.
* After updating handlers or adding endpoints, please add necessary comments and regenerate the documentation with:

```bash
swag init -g cmd/server/main.go
```

* Commit the generated `docs/` directory to keep the documentation in sync with your code.

## Docker Setup

If you're running the server using the `Dockerfile` in `server/`, follow these steps:
1. Build the server image:
```bash
docker build -t cryptodrop-server .
```
2. Run the server container:
```bash
docker run --env-file .env -p 8080:8080 --name cryptodrop-server cryptodrop-server
```

If you're running the server using the `docker-compose.yml` root directory, follow the instructions in root `README.md`

