import { LoginForm } from "../../form-manager/forms/index.ts";
import classes from "./styles.module.css";

const LoginPage = () => {
  return (
    <main className={classes["root"]}>
      <LoginForm className={classes["form"]} />
    </main>
  );
};

export default LoginPage;
