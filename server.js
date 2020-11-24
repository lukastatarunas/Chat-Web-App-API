const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});

const index = require("./routes/index");
app.use(index);

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = 'response';
  socket.emit("FromAPI", response);
};

const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`Listening on port ${port}`));