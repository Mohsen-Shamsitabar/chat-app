import cors from "cors";
import express from "express";
import http from "http";
import { StatusCodes } from "http-status-codes";
import { Server, type Socket } from "socket.io";
import { LOG_CONTENT, MESSAGE_TYPE } from "../constants/data.ts";
import {
  API_ROUTES,
  CHANNELS,
  SERVER_PORT,
  SERVER_URL,
} from "../constants/network.ts";
import {
  loginFormSchema,
  type LoginFormSchema,
} from "../schemas/login-form.ts";
import { type Message } from "../types/data.ts";
import type { LoginRequest, LoginResponse } from "../types/network.ts";
import BiDirectionalMap from "../utils/bi-directional-map.ts";
import createMessageId from "../utils/create-message-id.ts";

const app = express();

app.use(express.json(), cors());

const connectedUsers = new BiDirectionalMap<
  LoginFormSchema["username"],
  Socket
>();

app.post(API_ROUTES.LOGIN, (req: LoginRequest, res: LoginResponse) => {
  const body = req.body;

  const { error } = loginFormSchema.safeParse(body);

  if (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

    return;
  }

  const { username } = body;

  const alreadyLoggedIn = connectedUsers.keyHas(username);

  if (alreadyLoggedIn) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Username already taken!" });

    return;
  }

  res.status(StatusCodes.OK).json({ message: "Successfully logged in." });
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const httpServer = http.createServer(app);

const ioServer = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

ioServer.on("connection", socket => {
  console.log("Socket connected:", socket.id);

  socket.on(CHANNELS.LOGIN, (username: LoginFormSchema["username"]) => {
    connectedUsers.set(username, socket);

    const message: Message = {
      id: createMessageId(),
      senderSocketId: socket.id,
      senderUsername: username,
      messageType: MESSAGE_TYPE.LOG,
      content: LOG_CONTENT.JOINED,
    };

    socket.broadcast.emit(CHANNELS.NOTIFY_MESSAGE, message);
  });

  socket.on(CHANNELS.DISCONNECT, () => {
    const disconnectedUsername = connectedUsers.getByValue(socket);

    if (!disconnectedUsername) return;

    const message: Message = {
      id: createMessageId(),
      senderSocketId: socket.id,
      senderUsername: disconnectedUsername,
      messageType: MESSAGE_TYPE.LOG,
      content: LOG_CONTENT.LEFT,
    };

    socket.broadcast.emit(CHANNELS.NOTIFY_MESSAGE, message);

    connectedUsers.deleteByValue(socket);
  });

  socket.on(CHANNELS.SUBMIT_MESSAGE, (message: Message) => {
    // use broadcast to only effect other sockets.
    socket.broadcast.emit(CHANNELS.NOTIFY_MESSAGE, message);

    // to make sure same sockets receive the message. (--Bad Aproach--)
    socket.emit(CHANNELS.NOTIFY_MESSAGE, message);
  });
});

httpServer.listen(SERVER_PORT, () => {
  console.log(`Socket.IO server running at ${SERVER_URL}`);
});
