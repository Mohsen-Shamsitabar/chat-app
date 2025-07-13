import { MESSAGE_TYPE } from "../../../../../shared/constants/data.ts";
import { type Message } from "../../../../../shared/types/data.ts";
import mergeClasses from "../../../../utils/merge-classes.ts";
import classes from "./styles.module.css";

type Props = {
  message: Message;
  connectedSocketId: string;
  className?: string;
};

const MessageBox = (props: Props) => {
  const { message, connectedSocketId, className } = props;

  if (message.messageType === MESSAGE_TYPE.LOG) {
    const text = `${message.senderUsername} ${message.content}`;

    return <span className={classes["log-text"]}>{text}</span>;
  }

  const isAuthor = connectedSocketId === message.senderSocketId;

  return (
    <div
      className={mergeClasses(
        classes["root"],
        isAuthor ? classes["root--author"] : undefined,
        className,
      )}
    >
      <span className={classes["username"]}>{message.senderUsername}</span>

      <p className={classes["content"]}>{message.content}</p>
    </div>
  );
};

export default MessageBox;
