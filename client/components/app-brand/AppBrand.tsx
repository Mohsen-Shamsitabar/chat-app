import { FaRocketchat } from "react-icons/fa";
import classes from "./styles.module.css";

const AppBrand = () => {
  return (
    <span className={classes["root"]}>
      <span>Chat App</span>

      <FaRocketchat className={classes["icon"]} />
    </span>
  );
};

export default AppBrand;
