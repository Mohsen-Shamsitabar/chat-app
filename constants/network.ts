export const SERVER_PORT = 3001;
// export const SERVER_URL = `http://192.168.1.144:${SERVER_PORT}`;
export const SERVER_URL = `http://localhost:${SERVER_PORT}`;

export const CLIENT_PORT = 5173;
// export const CLIENT_URL = `http://192.168.1.144:${CLIENT_PORT}`;
export const CLIENT_URL = `http://localhost:${CLIENT_PORT}`;

export const API_ROUTES = {
  LOGIN: "/users/login",
} as const;

export const CLIENT_ROUTES = {
  LOGIN: "/",
  CHATROOM: "/chatroom",
} as const;

export const CHANNELS = {
  LOGIN: "users/login",
  SUBMIT_MESSAGE: "messages/submit",
  NOTIFY_MESSAGE: "messages/notify",

  // built in
  DISCONNECT: "disconnect",
  CONNECT: "connect",
} as const;
