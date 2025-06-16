import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod/v4";
import { Button } from "../../../components/index.ts";
import { StringFormControl } from "../../form-controls/index.ts";
import classes from "./styles.module.css";

const loginFormSchema = z
  .object({
    username: z.string().min(4).max(16).nonempty().nonoptional(),
  })
  .required();

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const { errors } = formState;
  const errorCount = Object.keys(errors).length;

  const onSubmit: SubmitHandler<LoginFormSchemaType> = data => {
    console.log(data);

    // Do something
  };

  return (
    <form
      className={classes["root"]}
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
          type="submit"
          disabled={errorCount > 0}
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
