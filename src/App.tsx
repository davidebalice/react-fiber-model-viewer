import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  FaCaretSquareDown,
  FaCaretSquareLeft,
  FaCaretSquareRight,
  FaCaretSquareUp,
} from "react-icons/fa";
import { FaSquareMinus, FaSquarePlus } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineResetTv } from "react-icons/md";
import classes from "./App.module.css";
import { cameraPositionsGundam, cameraPositionsHouse } from "./cameraPosition";
import Preloader from "./Preloader";
import Scene from "./Scene";
import SelectionScreen from "./SelectionScreen";

function App() {
  const [reset, setReset] = useState(1);
  const [zoom, setZoom] = useState(6);
  const [vertical, setVertical] = useState(1);
  const [horizontal, setHorizontal] = useState(0);
  const [isMenuClosed, setIsMenuClosed] = useState(false);
  const initialPosition: [number, number, number] = [
    horizontal,
    vertical,
    zoom,
  ];
  const initialRotation: [number, number, number] = [-0.05, 0, 0];
  const [page, setPage] = useState("selectionScreen");
  const [cameraIndex, setCameraIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cameraPosition, setCameraPosition] = useState(initialPosition);
  const [cameraPositions, setCameraPositions] = useState(cameraPositionsGundam);
  const [activeLookat, setActiveLookat] = useState(false);
  //const [cameraLookAt, setCameraLookAt] = useState<[number, number, number]>([0, 0, 0]);
  const zoomOut = () => setZoom((prev) => Math.min(prev + 0.5, 8.5));
  const zoomIn = () => setZoom((prev) => Math.max(prev - 0.5, 2.2));
  const up = () => setVertical((prev) => Math.min(prev - 0.1));
  const down = () => setVertical((prev) => Math.max(prev + 0.1));
  const left = () => setHorizontal((prev) => Math.min(prev + 0.1));
  const right = () => setHorizontal((prev) => Math.max(prev - 0.1));
  const resetPosition = () => {
    setZoom(12);
    setVertical(1.5);
    setHorizontal(-1);
    setReset((prev) => prev + 0.1);
  };

  useEffect(() => setLoading(true), []);
  useEffect(
    () => setCameraPosition(initialPosition),
    [zoom, horizontal, vertical, reset]
  );

  useEffect(() => {
    if (page === "Gundam") {
      setCameraPositions(cameraPositionsGundam);
    } else if (page === "House") {
      setCameraPositions(cameraPositionsHouse);
    }
  }, [page]);

  return (
    <>
      {page === "selectionScreen" && <SelectionScreen setPage={setPage} />}

      {page !== "selectionScreen" && (
        <>
          {loading && <Preloader />}

          {isMenuClosed ? (
            <div
              className={classes.openContainer}
              onClick={() => setIsMenuClosed(false)}
            >
              <IoIosArrowForward className={classes.openContainer2} />
            </div>
          ) : (
            <div
              className={`${classes.buttonContainer} ${
                isMenuClosed ? classes.closed : ""
              }`}
            >
              <div
                className={classes.closeContainer}
                onClick={() => setIsMenuClosed(true)}
              >
                <IoIosArrowBack className={classes.closeContainer2} />
              </div>

              <div className={classes.buttonTitle}>Zoom</div>
              <div className={classes.buttonContainer2}>
                <div onClick={zoomOut} className={classes.zoomButton}>
                  <FaSquareMinus className={classes.zoomButton2} />
                </div>
                <div onClick={zoomIn} className={classes.zoomButton}>
                  <FaSquarePlus className={classes.zoomButton2} />
                </div>
              </div>

              <div className={classes.buttonTitle}>Position</div>
              <div className={classes.positionButtonContainer}>
                <div
                  onClick={up}
                  className={`${classes.positionButton} ${classes.up}`}
                >
                  <FaCaretSquareUp className={classes.positionButton2} />
                </div>
                <div
                  onClick={down}
                  className={`${classes.positionButton} ${classes.down}`}
                >
                  <FaCaretSquareDown className={classes.positionButton2} />
                </div>
                <div
                  onClick={left}
                  className={`${classes.positionButton} ${classes.left}`}
                >
                  <FaCaretSquareLeft className={classes.positionButton2} />
                </div>
                <div
                  onClick={right}
                  className={`${classes.positionButton} ${classes.right}`}
                >
                  <FaCaretSquareRight className={classes.positionButton2} />
                </div>
              </div>

              <div className={classes.buttonTitle}>Reset</div>
              <div onClick={resetPosition} className={classes.resetButton}>
                <MdOutlineResetTv className={classes.resetButton2} />
              </div>

              <div className={classes.buttonTitle}>Camera</div>
              <div className={classes.cameraButtonContainer}>
                {cameraPositions &&
                  cameraPositions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCameraIndex(index);
                        setCameraPosition(
                          cameraPositions[cameraIndex].position
                        );
                      }}
                      className={classes.cameraButton}
                    >
                      Camera {index + 1}
                    </button>
                  ))}
              </div>
            </div>
          )}

          <Canvas
            shadows
            dpr={[1, 2]}
            style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
            camera={{ fov: 45, near: 0.1, far: 2000, position: [-3, 1.8, 4] }}
          >
            <Scene
              initialPosition={initialPosition}
              initialRotation={initialRotation}
              cameraPosition={cameraPosition}
              setCameraPosition={setCameraPosition}
              loading={loading}
              setLoading={setLoading}
            />
          </Canvas>
        </>
      )}
    </>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found");
}
