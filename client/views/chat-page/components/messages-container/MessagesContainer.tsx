import * as React from "react";
import { CHANNELS } from "../../../../../constants/network.ts";
import { useClientSocket } from "../../../../../providers/client-socket.tsx";
import { type Message } from "../../../../../types/data.ts";
import mergeClasses from "../../../../utils/merge-classes.ts";
import { MessageBox } from "../index.ts";
import classes from "./styles.module.css";

type Props = {
  className?: string;
};

const MessagesContainer = (props: Props) => {
  const { className } = props;

  const containerRef = React.useRef<null | HTMLDivElement>(null);

  const [messages, setMessages] = React.useState<Message[]>([]);

  const socket = useClientSocket();

  React.useEffect(() => {
    if (!socket) return;

    socket.on(CHANNELS.NOTIFY_MESSAGE, (message: Message) => {
      setMessages(c => [...c, message]);
    });

    return () => {
      socket.off(CHANNELS.NOTIFY_MESSAGE);
    };
  }, []);

  React.useEffect(() => {
    const { current: container } = containerRef;

    if (!container) return;

    const { height } = container.getBoundingClientRect();

    container.scroll({ behavior: "smooth", top: height + 5000 });
  }, [messages]);

  if (!socket) return null;
  const { id: socketId } = socket;

  const renderMessages = () => {
    return messages.map(message => {
      if (!socketId) return null;

      return (
        <MessageBox
          key={message.id}
          connectedSocketId={socketId}
          message={message}
        />
      );
    });
  };

  return (
    <div
      className={mergeClasses(classes["root"], className)}
      ref={containerRef}
    >
      {renderMessages()}
    </div>
  );
};

export default MessagesContainer;
