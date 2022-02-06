import express from "express";
import * as path from "path";
import http from "http";
import chalk from "chalk";
import socketio from "socket.io";

import ServerToClient from "./Events/ServerToClient";
import ClientToServer from "./Events/ClientToServer";

import * as Janitor from "./Util/Janitor";

var engine = express(),
  server = http.createServer(engine),
  io = new socketio.Server<ClientToServer, ServerToClient>();

io.on("connect", (socket) => {
  socket.on("joinRoom", (username, room) => {
    if (username === null || username === "") username = "OthelloUser";
    else username = Janitor.Clean(username);

    socket.join();
  });
});

server.listen(3000, () => {
  console.log(`[+] Sever is listening on port 3000 (TIME: ${new Date()})`);
});
