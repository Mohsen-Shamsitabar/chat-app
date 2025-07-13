import * as React from "react";
import { MESSAGE_TYPE } from "../../../../../shared/constants/data.ts";
import { CHANNELS } from "../../../../../shared/constants/network.ts";
import { type Message } from "../../../../../shared/types/data.ts";
import createMessageId from "../../../../../shared/utils/create-message-id.ts";
import { Button, Input } from "../../../../components/index.ts";
import { useLoggedUserManager } from "../../../../managers/logged-user.tsx";
import { useClientSocket } from "../../../../providers/client-socket.tsx";
import mergeClasses from "../../../../utils/merge-classes.ts";
import classes from "./styles.module.css";

type Props = {
  className?: string;
};

const MessageInput = (props: Props) => {
  const { className } = props;

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

    const messageObject: Message = {
      id: createMessageId(),
      senderSocketId: socketId,
      senderUsername: loggedUser!.username,
      messageType: MESSAGE_TYPE.USER_SENT,
      content: message,
    };

    socket.emit(CHANNELS.SUBMIT_MESSAGE, messageObject);

    setMessage("");
  };

  return (
    <form className={mergeClasses(classes["root"], className)}>
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
