import { ThemeSwitcher } from "../../components/index.ts";
import classes from "./styles.module.css";

const HomePage = () => {
  const handleClick = () => {
    console.log("click");
  };

  return (
    <div className={classes["root"]}>
      <ThemeSwitcher />

      <h2>This is the homepage!</h2>

      <article>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis,
        error quasi adipisci voluptatibus quos laudantium quia, veritatis
        perferendis dolor distinctio id ad, veniam sint officia asperiores
        similique repellendus tempora soluta?
      </article>

      <button onClick={handleClick}>All good</button>
    </div>
  );
};

export default HomePage;
