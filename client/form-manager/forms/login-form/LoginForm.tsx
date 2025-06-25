import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { type AllHTMLAttributes } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { CLIENT_ROUTES } from "../../../../constants/network.ts";
import { useLoggedUserManager } from "../../../../managers/logged-user.tsx";
import {
  type LoginFormSchema,
  loginFormSchema,
} from "../../../../schemas/login-form.ts";
import { login } from "../../../api/auth.ts";
import { Button } from "../../../components/index.ts";
import mergeClasses from "../../../utils/merge-classes.ts";
import { StringFormControl } from "../../form-controls/index.ts";
import classes from "./styles.module.css";

type Props = AllHTMLAttributes<HTMLFormElement>;

const LoginForm = (props: Props) => {
  const { className, ...otherProps } = props;

  const { handleSubmit, register, formState, setError, clearErrors } = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const navigate = useNavigate();

  const loggedUserManager = useLoggedUserManager();

  if (!loggedUserManager) return null;
  const { loggedUser, setLoggedUser } = loggedUserManager;

  const { errors } = formState;
  const errorCount = Object.keys(errors).length;

  const onSubmit: SubmitHandler<LoginFormSchema> = async data => {
    const { error, message } = await login(data);

    if (error) {
      setError("username", { message });
      return;
    }

    clearErrors();
    setLoggedUser(data);
    void navigate(CLIENT_ROUTES.CHATROOM);
  };

  React.useEffect(() => {
    if (loggedUser) {
      void navigate(CLIENT_ROUTES.CHATROOM);
    }
  }, []);

  return (
    <form
      {...otherProps}
      className={mergeClasses(className, classes["root"])}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <StringFormControl
        label="Username"
        name={"username"}
        formState={formState}
        register={register}
      />

      <div className={classes["btn-container"]}>
        <Button
          disabled={!!errorCount}
          type="submit"
          variant="fill"
          color="primary"
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
