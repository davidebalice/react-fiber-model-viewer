import { PresentationControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useXR, useXRInputSourceState } from "@react-three/xr";
import { Vector3 } from "three";
import Car from "./Car";
import Gundam from "./Gundam";
import House from "./House";

interface SceneProps {
  page: string;
  initialPosition: [number, number, number];
  initialRotation: [number, number, number];
  cameraPosition: [number, number, number];
  setCameraPosition: (position: [number, number, number]) => void;
  setInitialRotation: (rotation: [number, number, number]) => void;
  cameraPositionIndex: number;
  setCameraPositionIndex: (index: number) => void;
  loading: boolean;
  activeLookat: boolean;
  setLoading: (loading: boolean) => void;
  setHorizontal: (value: number) => void;
  setVertical: (value: number) => void;
  reset: number;
  handleMouseEnter?: () => void;
  handleMouseLeave?: () => void;
}

const CameraController: React.FC<{
  targetPosition: [number, number, number];
  rotation: [number, number, number];
  setHorizontal: (value: number) => void;
  setVertical: (value: number) => void;
}> = ({ targetPosition, rotation, setHorizontal, setVertical }) => {
  const { camera } = useThree();
  const controller = useXRInputSourceState("controller", "left");
  const { player } = useXR();

  useFrame(() => {
    // Inizializza l'offset da applicare alla posizione target
    const offset = new Vector3(0, 0, 0);

    // Verifica che esista almeno un controller
    if (controller) {
      if (controller.inputSource && controller.inputSource.gamepad) {
        if (!controller.inputSource?.gamepad) return;

     



          const { axes } = controller.inputSource.gamepad;
          const moveX = axes[2] !== undefined ? axes[2] : axes[0] || 0;
          const moveZ = axes[3] !== undefined ? axes[3] : axes[1] || 0;


/*
          const speed = 0.05;

          // Direzione di movimento rispetto alla camera
          const forward = new Vector3();
        //  player.getWorldDirection(forward);
          forward.y = 0;
          forward.normalize();

          const right = new Vector3();
          //right.crossVectors(player.up, forward).normalize();

          // Muove il "player" XR
          player.position.addScaledVector(forward, -moveZ * speed);
          player.position.addScaledVector(right, moveX * speed);

*/

 
      }
    } else {
      // Se non ci sono controller, puoi loggare questo stato
      //console.log("Nessun controller disponibile");
    }

    // Calcola il target combinato (posizione UI + offset XR)
    const currentTarget = new Vector3(
      targetPosition[0],
      targetPosition[1],
      targetPosition[2]
    ).add(offset);

    // Interpola la posizione della camera verso il target combinato
    camera.position.lerp(currentTarget, 0.05);

    // Imposta la rotazione (forzata a quella definita)
    camera.rotation.set(rotation[0], rotation[1], rotation[2]);
    camera.updateProjectionMatrix();
  });

  return null;
};

export default function Scene({
  reset,
  page,
  initialPosition,
  initialRotation,
  cameraPosition,
  cameraPositionIndex,
  setLoading,
  setInitialRotation,
  handleMouseEnter,
  handleMouseLeave,
  activeLookat,
  setHorizontal,
  setVertical,
}: SceneProps) {
  return (
    <>
      <PresentationControls global enabled={true} key={reset}>
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={2}
          castShadow
        />

        <CameraController
          targetPosition={cameraPosition}
          rotation={initialRotation}
          setHorizontal={setHorizontal}
          setVertical={setVertical}
        />
        {page === "Gundam" ? (
          <Gundam
            occlude={cameraPositionIndex}
            setLoading={setLoading}
            handleMouseLeave={handleMouseLeave}
            handleMouseEnter={handleMouseEnter}
          />
        ) : page === "House" ? (
          <House
            occlude={cameraPositionIndex}
            setLoading={setLoading}
            handleMouseLeave={handleMouseLeave}
            handleMouseEnter={handleMouseEnter}
          />
        ) : page === "Car" ? (
          <Car
            occlude={cameraPositionIndex}
            setLoading={setLoading}
            handleMouseLeave={handleMouseLeave}
            handleMouseEnter={handleMouseEnter}
          />
        ) : (
          <></>
        )}
      </PresentationControls>
    </>
  );
}
