import { BsSignDeadEnd } from "react-icons/bs";
import classes from "./styles.module.css";

const NotFoundPage = () => {
  return (
    <div>
      <div className={classes["error-container"]}>
        <BsSignDeadEnd className={classes["icon"]} />

        <h2>The page that you are looking for doesnt exist!</h2>
      </div>
    </div>
  );
};

export default NotFoundPage;
