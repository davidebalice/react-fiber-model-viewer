import "./style.css";

interface SelectionScreenProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

const SelectionScreen: React.FC<SelectionScreenProps> = ({ setPage }) => {
  return (
    <>
      <div onClick={() => setPage("Gundam")}>fffsafsafsasfasaf</div>
    </>
  );
};

export default SelectionScreen;
