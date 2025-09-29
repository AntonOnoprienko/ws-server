import { createServer } from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 4000;

const HOST =
  process.env.RAILWAY_STATIC_URL || `http://localhost:${PORT}`;

const server = createServer();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let activeSessions = 0;

io.on("connection", (socket) => {
  activeSessions++;
  console.log(`✅ New connection! Active sessions: ${activeSessions}`);

  io.emit("updateSessions", activeSessions);

  socket.on("disconnect", () => {
    activeSessions--;
    console.log(`❌ Disconnected! Active sessions: ${activeSessions}`);
    io.emit("updateSessions", activeSessions);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Socket.io server running on ${HOST}`);
});
