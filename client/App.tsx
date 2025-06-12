import { Route, Routes } from "react-router";
import { io } from "socket.io-client";
import { HomePage } from "./views/index.ts";

const socket = io("http://localhost:3001");

socket.on("connect", () => {
  console.log("Connected with ID:", socket.id);
});

socket.on("welcome", message => {
  console.log("Server says:", message);
});

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />
    </Routes>
  );
};

export default App;
