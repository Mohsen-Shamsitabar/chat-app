export const DOMAIN_NAME = "http://localhost";
export const IP_ADDRESS = "http://192.168.1.144";

export const SERVER_PORT = 3001;
export const SERVER_URL = `${DOMAIN_NAME}:${SERVER_PORT}`;

export const CLIENT_PORT = 5173;
export const CLIENT_URL = `${DOMAIN_NAME}:${CLIENT_PORT}`;

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
