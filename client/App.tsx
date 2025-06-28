import * as React from "react";
import { Route, Routes } from "react-router";
import { CLIENT_ROUTES } from "../constants/network.ts";
import { LoggedUserManagerProvider } from "../managers/logged-user.tsx";
import { type LoginFormSchema } from "../schemas/login-form.ts";
import { Header } from "./components/index.ts";
import { ChatPage, LoginPage, NotFoundPage } from "./views/index.ts";

const App = () => {
  const [loggedUser, setLoggedUser] = React.useState<null | LoginFormSchema>(
    null,
  );

  return (
    <LoggedUserManagerProvider
      loggedUser={loggedUser}
      setLoggedUser={setLoggedUser}
    >
      <Header />

      <Routes>
        <Route
          path={CLIENT_ROUTES.LOGIN}
          element={<LoginPage />}
        ></Route>

        <Route
          path={CLIENT_ROUTES.CHATROOM}
          element={<ChatPage />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </LoggedUserManagerProvider>
  );
};

export default App;
