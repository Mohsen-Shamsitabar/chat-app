import { type AllHTMLAttributes } from "react";
import mergeClasses from "../../../utils/merge-classes.ts";
import classes from "./styles.module.css";

type Props = AllHTMLAttributes<HTMLInputElement>;

const Input = (props: Props) => {
  const { className, ...otherProps } = props;

  return (
    <input
      {...otherProps}
      className={mergeClasses(classes["root"], className)}
    />
  );
};

export default Input;
