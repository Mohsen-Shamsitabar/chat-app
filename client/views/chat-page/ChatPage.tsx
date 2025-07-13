import * as React from "react";
import { useNavigate } from "react-router";
import { io, type Socket } from "socket.io-client";
import {
  CHANNELS,
  CLIENT_ROUTES,
  SERVER_URL,
} from "../../../shared/constants/network.ts";
import { useLoggedUserManager } from "../../managers/logged-user.tsx";
import { ClientSocketProvider } from "../../providers/client-socket.tsx";
import { MessageInput, MessagesContainer } from "./components/index.ts";
import classes from "./styles.module.css";

const ChatPage = () => {
  const navigate = useNavigate();
  const loggedUserManager = useLoggedUserManager();
  const [socket, setSocket] = React.useState<null | Socket>(null);

  React.useEffect(() => {
    if (!loggedUserManager) return;

    const { loggedUser } = loggedUserManager;

    if (!loggedUser) {
      void navigate(CLIENT_ROUTES.LOGIN);
      return;
    }

    //=== SOCKET ===//

    const clientSocket = io(SERVER_URL);

    setSocket(clientSocket);
  }, []);

  React.useEffect(() => {
    if (!socket) return;
    if (!loggedUserManager) return;

    const { loggedUser } = loggedUserManager;

    if (!loggedUser) {
      void navigate(CLIENT_ROUTES.LOGIN);
      return;
    }

    const { username } = loggedUser;

    socket.on(CHANNELS.CONNECT, () => {
      console.log("Connected with ID:", socket.id);
    });

    socket.emit(CHANNELS.LOGIN, username);

    return () => {
      socket.off(CHANNELS.CONNECT);
      socket.off(CHANNELS.LOGIN);
    };
  }, [socket]);

  if (!socket) return null;

  return (
    <main className={classes["root"]}>
      <ClientSocketProvider socket={socket}>
        <MessagesContainer className={classes["messages"]} />

        <MessageInput />
      </ClientSocketProvider>
    </main>
  );
};

export default ChatPage;
