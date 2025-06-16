import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { CLIENT_URL, SERVER_PORT, SERVER_URL } from "../constants/network.ts";

const app = express();

app.use(
  express.json(),
  cors({
    origin: CLIENT_URL,
  }),
);

// app.get("/user", (req: Request, res: Response) => {
//   // Send back some JSON data as a response
//   res
//     .status(StatusCodes.OK)
//     .json({ message: "Successfully reached the user route!" });
// });

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const httpServer = http.createServer(app);

const ioServer = new Server(httpServer, {
  cors: {
    origin: CLIENT_URL,
  },
});

ioServer.on("connection", socket => {
  console.log("User connected:", socket.id);
  socket.emit("welcome", "Hello from the server!");
});

httpServer.listen(SERVER_PORT, () => {
  console.log(`Socket.IO server running at ${SERVER_URL}`);
});
