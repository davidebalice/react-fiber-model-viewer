import { Canvas, useFrame } from "@react-three/fiber";
import {
  createXRStore,
  useXRInputSourceState,
  XR,
  XROrigin,
} from "@react-three/xr";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { BsCameraReelsFill, BsHeadsetVr } from "react-icons/bs";
import {
  FaCaretSquareDown,
  FaCaretSquareLeft,
  FaCaretSquareRight,
  FaCaretSquareUp,
} from "react-icons/fa";
import { FaSquareMinus, FaSquarePlus } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { Group } from "three";
import classes from "./App.module.css";
import {
  cameraPositionsCar,
  cameraPositionsGundam,
  cameraPositionsHouse,
} from "./cameraPosition";
import Header from "./Header";
import Modal from "./Modal";
import Preloader from "./Preloader";
import Scene from "./Scene";
import SelectionScreen from "./SelectionScreen";
const store = createXRStore();

function App() {
  const [showModal, setShowModal] = useState(false);
  const [reset, setReset] = useState(1);
  const [zoom, setZoom] = useState(6);
  const [horizontal, setHorizontal] = useState(0);
  const [vertical, setVertical] = useState(0);
  const [isMenuClosed, setIsMenuClosed] = useState(false);
  const initialPosition: [number, number, number] = [
    horizontal,
    vertical,
    zoom,
  ];
  const [initialRotation, setInitialRotation] = useState<
    [number, number, number]
  >([0, 0, 0]);
  const [page, setPage] = useState("selectionScreen");
  const [cameraIndex, setCameraIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cameraTitle, setCameraTitle] = useState("");
  const [cameraPosition, setCameraPosition] = useState(
    cameraPositionsGundam[0].position
  );
  const [cameraPositions, setCameraPositions] = useState(cameraPositionsGundam);
  const [activeLookat, setActiveLookat] = useState(false);
  const zoomOut = () => setZoom((prev) => Math.min(prev + 0.5));
  const zoomIn = () => setZoom((prev) => Math.max(prev - 0.5));
  const up = () => {
    setActiveLookat(false);
    setVertical((prev) => Math.min(prev - 0.1));
  };
  const down = () => {
    setActiveLookat(false);
    setVertical((prev) => Math.max(prev + 0.1));
  };
  const left = () => {
    setActiveLookat(false);
    setHorizontal((prev) => Math.min(prev + 0.1));
  };
  const right = () => {
    setActiveLookat(false);
    setHorizontal((prev) => Math.max(prev - 0.1));
  };
  const resetPosition = () => {
    setZoom(12);
    setVertical(1.5);
    setHorizontal(-1);
    setReset((prev) => prev + 0.1);
  };

  /*
  const rotateLeft = () => {
    setInitialRotation(([x, y, z]) => [x, y - 0.01, z]);
  };

  const rotateRight = () => {
    setInitialRotation(([x, y, z]) => [x, y + 0.01, z]);
  };

  const rotateUp = () => {
    setInitialRotation(([x, y, z]) => [x - 0.01, y, z]);
  };

  const rotateDown = () => {
    setInitialRotation(([x, y, z]) => [x + 0.01, y, z]);
  };
  */

  function Locomotion() {
    const leftController = useXRInputSourceState("controller", "left");
    const rightController = useXRInputSourceState("controller", "right");
    const ref = useRef<Group>(null);

    useFrame((_, delta) => {
      if (!ref.current) return;

      // Movimento orizzontale con lo stick sinistro
      if (leftController?.gamepad) {
        const thumbstickLeft = leftController.gamepad["xr-standard-thumbstick"];
        if (thumbstickLeft) {
          ref.current.position.x += (thumbstickLeft.xAxis ?? 0) * delta;
          ref.current.position.z += (thumbstickLeft.yAxis ?? 0) * delta;
        }
      }

      // Movimento verticale (su/giù) con lo stick destro
      if (rightController?.gamepad) {
        const thumbstickRight =
          rightController.gamepad["xr-standard-thumbstick"];
        if (thumbstickRight) {
          ref.current.position.y += (thumbstickRight.yAxis ?? 0) * delta;
        }
      }
    });

    return <XROrigin ref={ref} />;
  }

  useEffect(() => setLoading(true), [page]);

  useEffect(
    () => setCameraPosition(initialPosition),
    [zoom, horizontal, vertical, reset]
  );

  useEffect(() => console.log("initialPosition " + initialPosition), []);

  useEffect(() => {
    setReset((prev) => prev + 0.1);
    setCameraIndex(0);
    if (page === "Gundam") {
      setCameraPositions(cameraPositionsGundam);
      setHorizontal(cameraPositionsGundam[0].position[0]);
      setVertical(cameraPositionsGundam[0].position[1]);
      setZoom(cameraPositionsGundam[0].position[2]);
      setInitialRotation(cameraPositionsGundam[0].rotation);
      setCameraTitle(cameraPositionsGundam[0].title);
    } else if (page === "House") {
      setCameraPositions(cameraPositionsHouse);
      setHorizontal(cameraPositionsHouse[0].position[0]);
      setVertical(cameraPositionsHouse[0].position[1]);
      setZoom(cameraPositionsHouse[0].position[2]);
      setInitialRotation(cameraPositionsHouse[0].rotation);
      setCameraTitle(cameraPositionsHouse[0].title);
    } else if (page === "Car") {
      setCameraPositions(cameraPositionsCar);
      setHorizontal(cameraPositionsCar[0].position[0]);
      setVertical(cameraPositionsCar[0].position[1]);
      setZoom(cameraPositionsCar[0].position[2]);
      setInitialRotation(cameraPositionsCar[0].rotation);
      setCameraTitle(cameraPositionsCar[0].title);
    }
  }, [page]);

  useEffect(() => {
    interface KeyboardEventHandlers {
      ArrowUp: () => void;
      ArrowDown: () => void;
      ArrowLeft: () => void;
      ArrowRight: () => void;
      w: () => void;
      s: () => void;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const handlers: KeyboardEventHandlers = {
        ArrowUp: up,
        ArrowDown: down,
        ArrowLeft: left,
        ArrowRight: right,
        w: () => {},
        s: () => {},
      };

      const handler = handlers[event.key as keyof KeyboardEventHandlers];
      if (handler) {
        handler();
      }
    };

    interface WheelEventHandlers {
      deltaY: number;
    }

    const handleWheel = (event: WheelEventHandlers) => {
      if (event.deltaY > 0) {
        zoomOut();
      } else {
        zoomIn();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    // Funzione per rimuovere il pulsante WebXR dallo Shadow DOM
    const removeXRButton = () => {
      // Trova il div che contiene il ShadowRoot
      const xrButtonContainer = document.querySelector(
        "body > div:nth-child(4)"
      ); // Usa il selettore appropriato per il tuo caso
      if (xrButtonContainer && xrButtonContainer.shadowRoot) {
        const shadowRoot = xrButtonContainer.shadowRoot;
        const xrButton = shadowRoot.querySelector("button");
        const xrButton2 = shadowRoot.querySelector("div");
        if (xrButton) {
          xrButton.remove();
        }
        if (xrButton2) {
          xrButton2.remove();
        }
      }
    };

    // Usa MutationObserver per osservare le modifiche nel DOM
    const observer = new MutationObserver(() => {
      removeXRButton(); // Prova a rimuovere il pulsante ogni volta che cambia il DOM
    });

    // Osserva i cambiamenti nei child del body
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Rimuovi il pulsante subito se è già presente
    removeXRButton();

    // Pulisci l'osservatore quando il componente viene smontato
    return () => observer.disconnect();
  }, []);
  return (
    <>
      {showModal && <Modal setShowModal={setShowModal} />}

      {page === "selectionScreen" && (
        <SelectionScreen setPage={setPage} setShowModal={setShowModal} />
      )}

      {page !== "selectionScreen" && (
        <>
          {loading && <Preloader />}

          <Header setPage={setPage} setShowModal={setShowModal} />

          <div className={classes.cameraFixed}>
            {cameraPositions && (
              <>
                <div className={classes.cameraFixedButtonContainer}>
                  <div>
                    {" "}
                    <BsCameraReelsFill /> <span>select camera</span>
                  </div>

                  <div className={classes.cameraFixedButtonWrapper}>
                    {cameraIndex === 0 ? (
                      <>
                        <RiArrowLeftSLine
                          className={`${classes.cameraButton} ${classes.disabled}`}
                        />
                      </>
                    ) : (
                      <>
                        <RiArrowLeftSLine
                          className={classes.cameraButton}
                          onClick={() => {
                            setCameraIndex(cameraIndex - 1);
                            setCameraPosition(
                              cameraPositions[cameraIndex - 1].position
                            );
                            setInitialRotation(
                              cameraPositions[cameraIndex - 1].rotation
                            );
                            setHorizontal(
                              cameraPositions[cameraIndex - 1].position[0]
                            );
                            setVertical(
                              cameraPositions[cameraIndex - 1].position[1]
                            );
                            setZoom(
                              cameraPositions[cameraIndex - 1].position[2]
                            );
                            setReset((prev) => prev + 0.1);
                            setCameraTitle(
                              cameraPositions[cameraIndex - 1].title
                            );
                          }}
                        />
                      </>
                    )}

                    <p>{cameraTitle}</p>

                    {cameraIndex > cameraPositions.length - 2 ? (
                      <>
                        <RiArrowRightSLine
                          className={`${classes.cameraButton} ${classes.disabled}`}
                        />
                      </>
                    ) : (
                      <>
                        <RiArrowRightSLine
                          className={classes.cameraButton}
                          onClick={() => {
                            setCameraIndex(cameraIndex + 1);
                            setCameraPosition(
                              cameraPositions[cameraIndex + 1].position
                            );
                            setInitialRotation(
                              cameraPositions[cameraIndex + 1].rotation
                            );
                            setHorizontal(
                              cameraPositions[cameraIndex + 1].position[0]
                            );
                            setVertical(
                              cameraPositions[cameraIndex + 1].position[1]
                            );
                            setZoom(
                              cameraPositions[cameraIndex + 1].position[2]
                            );
                            setReset((prev) => prev + 0.1);
                            setCameraTitle(
                              cameraPositions[cameraIndex + 1].title
                            );
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

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
              <div className={classes.buttonTitle}>Camera</div>
              <div className={classes.cameraButtonContainer}>
                {cameraPositions &&
                  cameraPositions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveLookat(true);
                        setCameraIndex(index);
                        setCameraPosition(cameraPositions[index].position);
                        setInitialRotation(cameraPositions[index].rotation);
                        setHorizontal(cameraPositions[index].position[0]);
                        setVertical(cameraPositions[index].position[1]);
                        setZoom(cameraPositions[index].position[2]);
                        setCameraTitle(cameraPositions[index].title);
                        setReset((prev) => prev + 0.1);
                      }}
                      className={`${classes.cameraSideButton} ${
                        index === cameraIndex &&
                        classes.cameraSideButtonSelected
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
              </div>
              {/*
              
          
              <div className={classes.buttonTitle}>Rotation</div>
              <div className={classes.positionButtonContainer}>
                <div
                  onClick={rotateUp}
                  className={`${classes.positionButton} ${classes.up}`}
                >
                  <FaCaretSquareUp className={classes.positionButton2} />
                </div>
                <div
                  onClick={rotateDown}
                  className={`${classes.positionButton} ${classes.down}`}
                >
                  <FaCaretSquareDown className={classes.positionButton2} />
                </div>
                <div
                  onClick={rotateLeft}
                  className={`${classes.positionButton} ${classes.left}`}
                >
                  <FaCaretSquareLeft className={classes.positionButton2} />
                </div>
                <div
                  onClick={rotateRight}
                  className={`${classes.positionButton} ${classes.right}`}
                >
                  <FaCaretSquareRight className={classes.positionButton2} />
                </div>
              </div>
              horizontal: {horizontal}
              <br />
              vertical: {vertical}
              <br />
              zoom: {zoom}
              <br />
              rotation: {initialRotation[0]} {initialRotation[1]}
              <br />
                  */}
            </div>
          )}

          <div className={classes.buttonVrWrapper}>
            <button
              onClick={() => store.enterVR()}
              className={classes.buttonVr}
            >
              <BsHeadsetVr style={{ fontSize: "20px", marginTop: "4px" }} />
              <span>Enter VR</span>
            </button>
          </div>

          <Canvas
            shadows
            dpr={[1, 2]}
            style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
            camera={{ fov: 45, near: 0.1, far: 100, position: [-3, 1.8, 4] }}
          >
            <XR store={store}>
              <Locomotion />
              <Scene
                page={page}
                reset={reset}
                initialPosition={initialPosition}
                initialRotation={initialRotation}
                setInitialRotation={setInitialRotation}
                cameraPosition={cameraPosition}
                cameraPositionIndex={cameraIndex}
                setCameraPositionIndex={setCameraIndex}
                activeLookat={activeLookat}
                setHorizontal={setHorizontal}
                setVertical={setVertical}
                setCameraPosition={setCameraPosition}
                loading={loading}
                setLoading={setLoading}
              />
            </XR>
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
