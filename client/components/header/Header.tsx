import { type AllHTMLAttributes } from "react";
import { useLoggedUserManager } from "../../../managers/logged-user.tsx";
import mergeClasses from "../../utils/merge-classes.ts";
import AppBrand from "../app-brand/AppBrand.tsx";
import ThemeSwitcher from "../theme-switcher/ThemeSwitcher.tsx";
import classes from "./styles.module.css";

type Props = AllHTMLAttributes<HTMLDivElement>;

const Header = (props: Props) => {
  const { className, ...otherProps } = props;

  const loggedUserManager = useLoggedUserManager();

  if (!loggedUserManager) return null;

  const { loggedUser } = loggedUserManager;

  const renderUsername = () => {
    if (!loggedUser) return null;

    const { username } = loggedUser;

    return (
      <span className={classes["logged-info"]}>
        <span>Logged as: </span>
        <span>{username}</span>
      </span>
    );
  };

  return (
    <header
      {...otherProps}
      className={mergeClasses(className, classes["root"])}
    >
      <nav className={classes["navbar"]}>
        <AppBrand />

        {renderUsername()}

        <ThemeSwitcher />
      </nav>
    </header>
  );
};

export default Header;
