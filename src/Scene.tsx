import { Environment, PresentationControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import Gundam from "./Gundam";

interface SceneProps {
  initialPosition: [number, number, number];
  initialRotation: [number, number, number];
  cameraPosition: [number, number, number];
  setCameraPosition: (position: [number, number, number]) => void;
  cameraPositionIndex: number;
  setCameraPositionIndex: (index: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  handleMouseEnter?: () => void;
  handleMouseLeave?: () => void;
}

const CameraController: React.FC<{
  targetPosition: [number, number, number];
  lookAtPosition: [number, number, number];
  rotation: [number, number, number];
}> = ({ targetPosition, lookAtPosition, rotation }) => {
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

    camera.lookAt(
      new Vector3(lookAtPosition[0], lookAtPosition[1], lookAtPosition[2])
    );
  });
  return null;
};

export default function Scene({
  initialRotation,
  cameraPosition,
  cameraPositionIndex,
  setLoading,
  handleMouseEnter,
  handleMouseLeave,
}: SceneProps) {
  return (
    <>
      <PresentationControls global>
        <Environment preset="warehouse" />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={2}
          castShadow
        />

        <CameraController
          targetPosition={cameraPosition}
          lookAtPosition={[-1, 0.8, -0.4]}
          rotation={initialRotation}
        />

        <Gundam
          occlude={cameraPositionIndex}
          setLoading={setLoading}
          handleMouseLeave={handleMouseLeave}
          handleMouseEnter={handleMouseEnter}
        />
      </PresentationControls>
    </>
  );
}
