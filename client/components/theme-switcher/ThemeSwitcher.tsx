import * as React from "react";
import { AiOutlineMoon, AiOutlineSun } from "react-icons/ai";
import { THEME_STORAGE_KEY, Themes } from "./constants.ts";
import classes from "./styles.module.css";

type Theme = (typeof Themes)[keyof typeof Themes];

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = React.useState<Theme>(
    (localStorage.getItem(THEME_STORAGE_KEY) ?? Themes.LIGHT) as Theme,
  );

  React.useEffect(() => {
    const rootNode = document.querySelector<HTMLDivElement>("#root");

    if (!rootNode) throw new Error(`No "rootNode" provided!`);

    rootNode.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  const handleClick = () => {
    const newTheme: Theme =
      currentTheme === Themes.DARK ? Themes.LIGHT : Themes.DARK;

    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    setCurrentTheme(newTheme);
  };

  const renderIcon = () => {
    if (currentTheme === Themes.LIGHT) {
      return <AiOutlineMoon />;
    }

    return <AiOutlineSun />;
  };

  return (
    <div
      className={classes["root"]}
      onClick={handleClick}
    >
      {renderIcon()}
    </div>
  );
};

export default ThemeSwitcher;
