# 04a SSE Example

## Overview 🏔️

This assignment involves creating a simple _Server-Sent Events (SSE)_ example using _Node.js_ and _Express_. The goal is to understand how _SSE_ works and to implement a basic server that can send real-time updates to clients.

---

## Assignment Requirements 📋

- Create a server that uses _SSE_ to **push updates to connected clients**.
- Implement endpoints for **subscribing to events**, **publishing messages**, and **closing connections**.
- Ensure that the server can handle **multiple client connections**.

---

## Codebase Structure 🏗️

The codebase for this assignment is located in the `01._SSE_Example` directory. The key files and their purposes are as follows:

### Key Files

- **`package.json`**: Contains project metadata and dependencies for the _Node.js_ application.
- **`src/index.js`**: Main entry point for the server, implementing the _SSE_ functionality.

### Dependencies

The project uses the following dependencies:

- **Express**: A web framework for _Node.js_ that simplifies the process of building web applications.

---

## Implementation Details

### Server Setup 👩‍🍳

The server is set up using _Express_ and listens for incoming connections on a specified port. The main functionalities include:

1. **Static File Serving**: The server serves static files from the `public` directory (if any).
2. **Subscribe Endpoint**:

   - **Path**: `/subscribe`
   - **Method** `GET`
   - **Functionality**: Clients can connect to this endpoint to receive real-time updates. The server sets the appropriate headers for SSE and keeps the connection open.
   - **Example Response**: Sends a welcome message to the client upon subscription.

3. **Publish Endpoint**:

   - **Path**: `/publish`
   - - **Method** `GET`
   - **Functionality**: This endpoint allows the server to send messages to all connected clients. It iterates through the list of clients and sends a message to each.
   - **Example Response**: Returns a confirmation message indicating that the message has been emitted.

4. **Close Endpoint**:
   - **Path**: `/close`
   - - **Method** `GET`
   - **Functionality**: This endpoint closes all active client connections.
   - **Example Response**: Returns a message indicating that the connections have been closed.

### Example Code

Here is a brief overview of the main code in `src/index.js`:

```javascript
import express from "express";

const app = express();

// In runtime storing the connected clients
const clients = [];

// Subscribe endpoint
app.get("/subscribe", (req, res) => {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  clients.push(res);
  res.write("data: You have subscribed \n\n");
});

// Publish endpoint
app.get("/publish", (req, res) => {
  clients.forEach((client) =>
    client.write(`data: You received this message xD \n\n`)
  );
  res.send({ data: "message emitted" });
});

// Close endpoint - all clients will be closed
app.get("/close", (req, res) => {
  clients.forEach((client) => client.end());
  res.send({ data: "connections have been closed" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server listening on", PORT));
```

---

## Running the Server 🏃‍♂️

To run the server, ensure you have Node.js installed and execute the following commands in the `01._SSE_Example` directory:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   node src/index.js
   ```

The server will start listening on port **8080** (or the port specified in the environment variable).