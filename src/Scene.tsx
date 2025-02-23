import { PresentationControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import Gundam from "./Gundam";
import House from "./House";
import Car from "./Car";

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
  reset: number;
  handleMouseEnter?: () => void;
  handleMouseLeave?: () => void;
}

const CameraController: React.FC<{
  targetPosition: [number, number, number];
  rotation: [number, number, number];
}> = ({ targetPosition, rotation }) => {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.lerp(
      new Vector3(targetPosition[0], targetPosition[1], targetPosition[2]),
      0.05
    );
    camera.rotation.x = rotation[0];
    camera.rotation.y = rotation[1];
    camera.rotation.z = rotation[2];
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
