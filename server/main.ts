import cors from "cors";
import express from "express";
import http from "http";
import { StatusCodes } from "http-status-codes";
import { Server, type Socket } from "socket.io";
import { LOG_CONTENT, MESSAGE_TYPE } from "../shared/constants/data.ts";
import {
  API_ROUTES,
  CHANNELS,
  SERVER_PORT,
  SERVER_URL,
} from "../shared/constants/network.ts";
import {
  loginFormSchema,
  type LoginFormSchema,
} from "../shared/schemas/login-form.ts";
import { type Message } from "../shared/types/data.ts";
import {
  type LoginRequest,
  type LoginResponse,
} from "../shared/types/network.ts";
import BiDirectionalMap from "../shared/utils/bi-directional-map.ts";
import createMessageId from "../shared/utils/create-message-id.ts";

const app = express();

app.use(express.json(), cors());

const connectedUsersMap = new BiDirectionalMap<
  LoginFormSchema["username"],
  Socket
>();

/**
 * Lowercase of all the connected users, to check name duplicates.
 */
const connectedUsersSet = new Set<LoginFormSchema["username"]>([]);

app.post(API_ROUTES.LOGIN, (req: LoginRequest, res: LoginResponse) => {
  const body = req.body;

  const { error } = loginFormSchema.safeParse(body);

  if (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

    return;
  }

  const { username } = body;

  const loweredUsername = username.toLowerCase();
  const alreadyLoggedIn = connectedUsersSet.has(loweredUsername);

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
    const loweredUsername = username.toLowerCase();

    connectedUsersMap.set(username, socket);
    connectedUsersSet.add(loweredUsername);

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
    const username = connectedUsersMap.getByValue(socket);

    if (!username) return;

    const message: Message = {
      id: createMessageId(),
      senderSocketId: socket.id,
      senderUsername: username,
      messageType: MESSAGE_TYPE.LOG,
      content: LOG_CONTENT.LEFT,
    };

    socket.broadcast.emit(CHANNELS.NOTIFY_MESSAGE, message);

    const loweredUsername = username.toLowerCase();

    connectedUsersMap.deleteByValue(socket);
    connectedUsersSet.delete(loweredUsername);
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
