import { nanoid } from "nanoid";
import * as React from "react";
import { type AllHTMLAttributes } from "react";
import { MESSAGE_TYPE } from "../../../../../constants/data.ts";
import { CHANNELS } from "../../../../../constants/network.ts";
import { useLoggedUserManager } from "../../../../../managers/logged-user.tsx";
import { useClientSocket } from "../../../../../providers/client-socket.tsx";
import { type Message, type MessageId } from "../../../../../types/data.ts";
import { Button, Input } from "../../../../components/index.ts";
import mergeClasses from "../../../../utils/merge-classes.ts";
import classes from "./styles.module.css";

type Props = AllHTMLAttributes<HTMLFormElement>;

const MessageInput = (props: Props) => {
  const { className, ...otherProps } = props;

  const [message, setMessage] = React.useState<string>("");

  const loggedUserManager = useLoggedUserManager()!;

  const { loggedUser } = loggedUserManager;

  const socket = useClientSocket();

  if (!socket) return null;
  const { id: socketId } = socket;

  const handleInputChange: React.FormEventHandler<HTMLInputElement> = event => {
    const newValue = event.currentTarget.value;

    setMessage(newValue);
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (!message) return;
    if (!socketId) return;

    const messageId: MessageId = `M_${nanoid()}`;

    const messageObject: Message = {
      id: messageId,
      senderSocketId: socketId,
      messageType: MESSAGE_TYPE.USER_SENT,
      senderUsername: loggedUser!.username,
      content: message,
    };

    socket.emit(CHANNELS.SUBMIT_MESSAGE, messageObject);

    setMessage("");
  };

  return (
    <form
      {...otherProps}
      className={mergeClasses(classes["root"], className)}
    >
      <Input
        value={message}
        onChange={handleInputChange}
        placeholder="text"
      />

      <Button
        color="primary"
        onClick={handleSubmit}
        disabled={!message}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default MessageInput;
