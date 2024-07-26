# Stage 1: Build React App
FROM node:22-alpine AS frontend-builder

# Set the working directory
WORKDIR /app

# Copy the React app source code
COPY client/package.json client/package-lock.json  ./

# Install dependencies
RUN npm install

# Copy the rest of the React app source code
COPY client/src/ /app/src
COPY client/public/ /app/public

RUN npm run build

# Stage 2: Build the Go binary
FROM golang:1.20-alpine AS builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files
COPY server-v2/go.mod server-v2/go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Copy the source code into the container
COPY server-v2 ./

# Build the Go app
RUN go build -o server .

# Stage 3: Run the Go binary
FROM alpine:latest

# Set the Current Working Directory inside the container
WORKDIR /root/

# Copy configuration and assets
COPY config-prod.yaml ./server.yaml
COPY server-v2/Verdana.ttf ./

# Copy the static content
COPY --from=frontend-builder /app/build/ /app/static/

# Copy the Pre-built binary file from the previous stage
COPY --from=builder /app/server .

# Expose http ports to the outside world
EXPOSE 80
EXPOSE 443

# Command to run the executable
CMD ["./server"]
