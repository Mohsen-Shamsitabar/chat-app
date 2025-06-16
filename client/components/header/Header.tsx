import { FaRocketchat } from "react-icons/fa";
import ThemeSwitcher from "../theme-switcher/ThemeSwitcher.tsx";
import classes from "./styles.module.css";

const Header = () => {
  return (
    <header className={classes["root"]}>
      <nav>
        <span>
          Chat App <FaRocketchat />
        </span>

        <ThemeSwitcher />
      </nav>
    </header>
  );
};

export default Header;
