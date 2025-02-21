import classes from "./App.module.css";
import "./style.css";
interface HeaderProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ setPage }) => {
  return (
    <>
      <div className={classes.header}>
        <img
          src="./public/assets/model/textures/logo.png"
          className={classes.logo}
          alt="logo davidebalice.dev"
        />
        <div className={classes.menu}>
          <div
            onClick={() => setPage("selectionScreen")}
            className={classes.button}
          >
            home
          </div>
          <div onClick={() => setPage("Gundam")} className={classes.button}>
            gundam
          </div>
          <div onClick={() => setPage("House")} className={classes.button}>
            house
          </div>
          <div onClick={() => setPage("Car")} className={classes.button}>
            car
          </div>
        </div>

        <a href="fdsfsd">
          <img
            src="./public/assets/model/textures/github.png"
            className={classes.github}
            alt="logo github"
          />
        </a>
      </div>
    </>
  );
};

export default Header;
