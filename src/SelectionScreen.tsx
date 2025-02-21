import classes from "./App.module.css";
import Header from "./Header";
import "./style.css";
interface SelectionScreenProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

const SelectionScreen: React.FC<SelectionScreenProps> = ({ setPage }) => {
  return (
    <>
      <Header setPage={setPage} />
      <div className={classes.selectionScreen}>
        <div className={classes.selectionTitle}>title</div>
        <div className={classes.cardContainer}>
          <div
            onClick={() => setPage("Gundam")}
            className={classes.selectionCard}
          >
            <div>
              <img src="./public/assets/card1.jpg" style={{ width: "100%" }} />
            </div>{" "}
            <div className={classes.selectionText}>gundam</div>
          </div>

          <div
            onClick={() => setPage("House")}
            className={classes.selectionCard}
          >
            <div>
              <img src="./public/assets/card2.jpg" style={{ width: "100%" }} />
            </div>
            <div className={classes.selectionText}>house</div>
          </div>

          <div
            onClick={() => setPage("House")}
            className={classes.selectionCard}
          >
            <div>
              <img src="./public/assets/card2.jpg" style={{ width: "100%" }} />
            </div>
            <div className={classes.selectionText}>car</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectionScreen;
