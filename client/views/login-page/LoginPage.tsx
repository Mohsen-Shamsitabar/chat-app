import { io } from "socket.io-client";
import { SERVER_URL } from "../../../constants/network.ts";
import { Header } from "../../components/index.ts";
import { LoginForm } from "../../form-manager/forms/index.ts";
import classes from "./styles.module.css";

const socket = io(SERVER_URL);

socket.on("connect", () => {
  console.log("Connected with ID:", socket.id);
});

socket.on("welcome", message => {
  console.log("Server says:", message);
});

const LoginPage = () => {
  return (
    <main className={classes["root"]}>
      <Header />

      <LoginForm />
    </main>
  );
};

export default LoginPage;
