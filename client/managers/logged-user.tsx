import * as React from "react";
import { type LoginFormSchema } from "../../shared/schemas/login-form.ts";

type LoggedUserManager = {
  loggedUser: LoginFormSchema | null;
  setLoggedUser: React.Dispatch<
    React.SetStateAction<{
      username: string;
    } | null>
  >;
};

const Context = React.createContext<LoggedUserManager | null>(null);

type ProviderProps = React.PropsWithChildren<LoggedUserManager>;

export const LoggedUserManagerProvider = (props: ProviderProps) => {
  const { children, ...data } = props;

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useLoggedUserManager = () => React.useContext(Context);
