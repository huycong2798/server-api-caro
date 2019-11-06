
    
//#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require("../app");
var debug = require("debug")("server-api-caro:server");
var http = require("http");
const { initdb } = require("../db");
const socketio = require('socket.io');
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "8000");
initdb()
  .then(() => {
    /**
     * Get port from environment and store in Express.
     */

    app.set("port", port);

    /**
     * Create HTTP server.
     */

    server = http.createServer(app);

    const io = socketio(server);
    
    io.on('connection',(socket) =>{
      console.log("socket-id:",socket.id);
      socket.on('JOIN_ROOM', function(room) {
        console.log('joining room', room);
        socket.join(room);
      });

      socket.on('QUIT_ROOM', function(room) {
        console.log('leaving room', room);
        socket.leave(room);
      });

      socket.on('SEND_MESSAGE', function(data) {
        console.log("data",data);
        io.in(data.roomId).emit('RECEIVE_MESSAGE', data);
        //io.emit('RECEIVE_MESSAGE', data);

      });

    })

    app.set('io', io);
    /**
     * Listen on provided port, on all network interfaces.
     */

    server.listen(port);
    server.on("error", onError);
    server.on("listening", onListening);
  })
  .catch(err => {
    console.error("Failed to make all database connections!");
    console.error(err);
    process.exit(1);
  });

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
