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
