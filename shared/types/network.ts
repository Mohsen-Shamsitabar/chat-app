import type { Request, Response } from "express";
import { type LoginFormSchema } from "../schemas/login-form.ts";

export type LoginRequest = Request<unknown, unknown, LoginFormSchema>;

export type LoginResponseBody = {
  message: string;
};

export type LoginResponse = Response<LoginResponseBody>;
