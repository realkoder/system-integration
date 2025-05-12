# 06a WebSocket Example

## Overview 🏔️

This assignment involves creating a simple _WebSocket_ example using two different implementations: one using the native _WebSocket API_ with _Node.js_ and the other using _Socket.IO_. My goal is to understand how _WebSockets_ work and to compare the two approaches.

---

## Assignment Requirements 📋

- Create a simple _WebSocket_ server that can handle _real-time communication_ between clients.
- Implement two versions of the _WebSocket server_:
  - **Node.js WebSocket (WS)**: A basic implementation using the native _WebSocket API_.
  - **Socket.IO**: A more feature-rich implementation using the _Socket.IO library_.
- Compare the two implementations in terms of **functionality**, **ease of use**, and **performance**.

---

## Codebase Structure 🏗️

The codebase for this assignment is located in the following directories:

- **`01._Nodejs_WS`**: Contains the implementation using the native _WebSocket API_.
- **`02._Nodejs_SocketIO`**: Contains the implementation using _Socket.IO_.

### Node.js WebSocket (WS) Implementation

- **Location**: `01._Nodejs_WS`
- **Key Files**:
  - **`app.js`**: Main entry point for the _WebSocket_ server using the native _WebSocket API_.

#### Key Features

- **Connection Handling**: The server listens for new connections and maintains a list of connected clients.
- **Message Broadcasting**: When a message is received from a client, it is broadcasted to all connected clients.
- **Connection Count**: Clients can request the current number of active connections.

---

### Socket.IO Implementation

- **Location**: `02._Nodejs_SocketIO`
- **Key Files**:
  - **`app.js`**: Main entry point for the _WebSocket_ server _using Socket.IO_.

#### Key Features

- **Connection Handling**: Similar to the _WS_ implementation, but with additional features provided by _Socket.IO_.
- **Event-Based Communication**: Uses event emitters to handle messages and connection counts.
- **Automatic Reconnection**: _Socket.IO_ provides **built-in support for automatic reconnections**.

---

## Comparison of Implementations

| Feature                    | Node.js WebSocket (WS)                                                     | Socket.IO                                                                        |
| -------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Library**                | Native WebSocket API                                                       | Socket.IO                                                                        |
| **Ease of Use**            | Basic implementation, requires manual handling of connections and messages | Higher-level abstraction, easier to implement features like rooms and namespaces |
| **Automatic Reconnection** | No built-in support                                                        | Yes                                                                              |
| **Message Broadcasting**   | Manual implementation                                                      | Built-in support for broadcasting                                                |
| **Connection Count**       | Manual implementation                                                      | Built-in event handling                                                          |

[Another comparison between socket.io and websocket](https://ably.com/topic/socketio-vs-websocket)