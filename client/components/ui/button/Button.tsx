import { type ButtonHTMLAttributes } from "react";
import mergeClasses from "../../../utils/merge-classes.ts";
import classes from "./styles.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "fill" | "outline" | "link" | "text";
  color?: "primary" | "secondary" | "default";
};

const Button = (props: Props) => {
  const { className, variant = "fill", color = "default" } = props;

  return (
    <button
      {...props}
      className={mergeClasses(
        classes["root"],
        classes[color],
        classes[variant],
        className,
      )}
    ></button>
  );
};

export default Button;
