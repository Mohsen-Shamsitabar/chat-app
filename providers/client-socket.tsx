import * as React from "react";
import type { Socket } from "socket.io-client";

const Context = React.createContext<Socket | null>(null);

type ProviderProps = {
  children: React.ReactNode;
  socket: Socket;
};

export const ClientSocketProvider = (props: ProviderProps) => {
  const { children, socket } = props;

  return <Context.Provider value={socket}>{children}</Context.Provider>;
};

export const useClientSocket = () => React.useContext(Context);
