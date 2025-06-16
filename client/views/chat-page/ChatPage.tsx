import { Outlet } from "react-router";

const ChatPage = () => {
  return (
    <div>
      <span>CHAT</span>

      <Outlet />
    </div>
  );
};

export default ChatPage;
