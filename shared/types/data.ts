import { type LOG_CONTENT, type MESSAGE_TYPE } from "../constants/data.ts";
import { type LoginFormSchema } from "../schemas/login-form.ts";

type MessageType = typeof MESSAGE_TYPE;
type LogContent = (typeof LOG_CONTENT)[keyof typeof LOG_CONTENT];

export type MessageId = `M_${string}`;

export type UserMessage = {
  id: MessageId;
  messageType: MessageType["USER_SENT"];
  senderSocketId: string;
  senderUsername: LoginFormSchema["username"];
  content: string;
};

export type LogMessage = {
  id: MessageId;
  messageType: MessageType["LOG"];
  senderSocketId: string;
  senderUsername: LoginFormSchema["username"];
  content: LogContent;
};

export type Message = UserMessage | LogMessage;
