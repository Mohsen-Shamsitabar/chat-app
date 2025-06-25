import { type MESSAGE_TYPE } from "../constants/data.ts";

export type MessageId = `M_${string}`;
export type MessageType = keyof typeof MESSAGE_TYPE;

export type Message = {
  id: MessageId;
  messageType: MessageType;
  senderSocketId: string;
  senderUsername: string;
  content: string;
};
