import { Route, Routes } from "react-router";
import { ChatPage, ConversationPage, LoginPage } from "./views/index.ts";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<LoginPage />}
      ></Route>

      <Route
        path="chat"
        element={<ChatPage />}
      >
        <Route
          path=":userid"
          element={<ConversationPage />}
        />
      </Route>
    </Routes>
  );
};

export default App;
