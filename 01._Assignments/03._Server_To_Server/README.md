# 03a Data parsing server - Part III 📠

## Overview 🏔️

This assignment is a continuation of the previous assignments: _Data Parsing Server - Part I and Part II_.

The goal is to create a new server in a different programming language that can parse various data formats and communicate with the existing server from Part II.

---

## Assignment Requirements 📋

- Create a new server that can handle data parsing for the following formats:
  - _XML_
  - _CSV_
  - _YAML_
  - _TXT_
  - _JSON_
- Implement endpoints for each data parsing task.
- Ensure that the two servers can communicate with each other.
- When a **GET** request is made to Server A, it should act as a client to Server B, retrieve the response, and return it to the requester.
- When a **GET** request is made to Server B, it should act as a client to Server A, retrieve the response, and return it to the requester.
- No frontend implementation is required for this assignment.

---

## Codebase Structure

The codebase for this assignment is located in the `03._Server_To_Server` directory, which contains two main subdirectories:

- `01._Node`: Contains the _Node.js_ server implementation.
- `02._Python`: Contains the _Python_ server implementation.

### Node.js Server (Server A)

- **Location**: `01._Node`
- **Key Files**:
  - `Dockerfile.dev`: Docker configuration for the _Node.js_ server.
  - `package.json`: Contains dependencies and scripts for the _Node.js_ application.
  - `src/index.js`: Main entry point for the _Node.js_ server.
  - `src/routers/serverRoutes.js`: Defines the routes for the server, including the upload endpoint.
  - `src/domains/uploads/controller/uploadsController.js`: Handles file uploads and parsing.

### Python Server (Server B)

- **Location**: `02._Python`
- **Key Files**:
  - `Dockerfile.dev`: Docker configuration for the _Python_ server.
  - `pyproject.toml`: Contains project metadata and dependencies for the _Python_ application.
  - `src/main.py`: Main entry point for the _Python_ server, defining the endpoints for file uploads and parsing.
  - `src/fileParser.py`: Contains functions to parse different file formats (CSV, YAML, JSON, TXT, XML).

---

## Communication Between Servers

- The _Node.js_ server (Server A) and the _Python_ server (Server B) communicate via HTTP requests.
- When a file is uploaded to either server, it is parsed according to its format, and the parsed data is returned as a response.
- The _Node.js_ server can send requests to the _Python_ server to parse files and vice versa.

### Example Endpoints

- **Node.js Server (Server A)**:

  - `POST /api/v1/uploads`: Upload a file for parsing.
  - `GET /fetch-python`: Fetch data from the _Python_ server using the **GET** endpoint.

- **Python Server (Server B)**:
  - `POST /upload`: Upload a file for parsing.
  - `POST /parse-file-nodejs-server`: Parse a _file_ with this *POST* request, _Python_ server sends file to _NodeJs_ server which parses the file and returns a _JSON_ object
  - `GET /`: Basic endpoint returning a greeting message.

---

## Running the Servers

To run the servers, use Docker Compose. Navigate to the `03._Server_To_Server` directory and execute the following command:

```bash
docker-compose up --build
```

This command will build and start both servers, making them accessible on the following ports:

- _Node.js_ Server: `http://localhost:8080`
- _Python_ Server: `http://localhost:8000`