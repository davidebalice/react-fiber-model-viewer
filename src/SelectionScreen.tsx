import "./style.css";

interface SelectionScreenProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

const SelectionScreen: React.FC<SelectionScreenProps> = ({ setPage }) => {
  return (
    <>
      <div onClick={() => setPage("Gundam")}>gundam</div>
      <div onClick={() => setPage("House")}>house</div>
      </>
  );
};

export default SelectionScreen;
