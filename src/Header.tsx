import classes from "./App.module.css";
import "./style.css";
interface HeaderProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setPage, setShowModal }) => {
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

        <div>
            <img
              src="./public/assets/model/textures/info.png"
              className={classes.github}
              alt="info"
              onClick={()=>setShowModal(true)}
            />
          <a
            href="https://github.com/davidebalice/react-fiber-model-viewer"
            target="_blank"
          >
            <img
              src="./public/assets/model/textures/github.png"
              className={classes.github}
              alt="logo github"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
