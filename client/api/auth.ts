import { API_ROUTES, SERVER_URL } from "../../shared/constants/network.ts";
import type { LoginFormSchema } from "../../shared/schemas/login-form.ts";
import { type LoginResponseBody } from "../../shared/types/network.ts";

type Result = {
  message: string;
  error: boolean;
};

export const login = async (data: LoginFormSchema): Promise<Result> => {
  const res = await fetch(`${SERVER_URL}${API_ROUTES.LOGIN}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  // const res = await fetch(`${SERVER_URL}${API_ROUTES.LOGIN}`, {
  //   method: "POST",
  //   headers: { "content-type": "application/json" },
  //   body: JSON.stringify(data),
  // });

  const body = (await res.json()) as LoginResponseBody;

  if (!res.ok) {
    return { message: body.message, error: true };
  }

  return { message: body.message, error: false };
};

export const logout = async () => {
  return Promise.resolve();
};
