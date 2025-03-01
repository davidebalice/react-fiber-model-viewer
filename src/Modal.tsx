import { FaWindowClose } from "react-icons/fa";
import classes from "./App.module.css";
import "./style.css";

interface HeaderProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<HeaderProps> = ({ setShowModal }) => {
  return (
    <>
      <div className={classes.overlay}>
        <div className={classes.modal}>
          <div onClick={() => setShowModal(false)} className={classes.close}>
            <FaWindowClose />
          </div>
          Interface for navigating a 3D scene or displaying a 3D model
          <br />
          developed using React Three Fiber and Drei
          <br />
          Models not included in the repository
          <br />
          <br />
          <b>Vr support</b> - tested on Meta Quest 2
          <br />
          <br />
          Used models:
          <br />
          <br />
          Gundam
          <br />
          <a
            href="https://sketchfab.com/3d-models/gundam-evolution-rx-78-2-c98e4d4382434ea280ab33a2bb6beb05"
            target="_blank"
          >
            https://sketchfab.com/3d-models/gundam-evolution-rx-78-2-c98e4d4382434ea280ab33a2bb6beb05
          </a>
          <br />
          <br />
          House
          <br />
          <a
            href="https://sketchfab.com/3d-models/industrial-apartment-with-loft-8d141ed4bcb7405aa8b41dc86672cd7c"
            target="_blank"
          >
            https://sketchfab.com/3d-models/industrial-apartment-with-loft-8d141ed4bcb7405aa8b41dc86672cd7c
          </a>
          <br />
          <br />
          Car
          <br />
          <a
            href="https://sketchfab.com/3d-models/bentley-car-0a6acbe0724b4fd0901b5a42c19c8952"
            target="_blank"
          >
            https://sketchfab.com/3d-models/bentley-car-0a6acbe0724b4fd0901b5a42c19c8952{" "}
          </a>
          <br />
        </div>
      </div>
    </>
  );
};

export default Modal;
