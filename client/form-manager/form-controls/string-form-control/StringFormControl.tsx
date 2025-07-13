import { type FormState, type UseFormRegister } from "react-hook-form";
import { type LoginFormSchema } from "../../../../shared/schemas/login-form.ts";
import { Input } from "../../../components/index.ts";
import classes from "./styles.module.css";

type Props = {
  label: string;
  name: keyof LoginFormSchema;
  register: UseFormRegister<LoginFormSchema>;
  formState: FormState<LoginFormSchema>;
};

const StringFormControl = (props: Props) => {
  const { register, formState, name, label } = props;

  const { errors } = formState;
  const labelId = `${name}-label`;

  const renderError = () => {
    if (!errors[name]) return null;

    const { message } = errors[name];

    return <span>{message}</span>;
  };

  return (
    <div className={classes["root"]}>
      <label
        id={labelId}
        htmlFor={name}
      >
        {label}
      </label>

      <Input
        placeholder="example: mohsen"
        type="text"
        id={name}
        aria-labelledby={labelId}
        aria-label={label}
        {...register(name)}
      />

      {renderError()}
    </div>
  );
};

export default StringFormControl;
