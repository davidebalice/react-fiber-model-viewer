import { Environment, PresentationControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";
import Gundam from "./Gundam";

interface SceneProps {
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
  handleMouseEnter?: () => void;
  handleMouseLeave?: () => void;
}

const CameraController: React.FC<{
  targetPosition: [number, number, number];
  lookAtPosition: [number, number, number];
  rotation: [number, number, number];
  activeLookat: boolean;
}> = ({ targetPosition, lookAtPosition, rotation, activeLookat }) => {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.lerp(
      new Vector3(targetPosition[0], targetPosition[1], targetPosition[2]),
      0.05
    );
    camera.rotation.x = rotation[0];
    camera.rotation.y = rotation[1];
    camera.rotation.z = rotation[2];
    /*
    {
      activeLookat &&
        camera.lookAt(
          new Vector3(lookAtPosition[0], lookAtPosition[1], lookAtPosition[2])
        );
    }
*/
    camera.updateProjectionMatrix();
  });
  return null;
};

export default function Scene({
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
  const dragging = useRef(false);
  const lastMouse = useRef<{ x: number; y: number } | null>(null);

  // Funzione per iniziare il drag
  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  // Funzione per muovere la camera con il mouse
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current || !lastMouse.current) return;

    const deltaX = (e.clientX - lastMouse.current.x) * 0.005;
    const deltaY = (e.clientY - lastMouse.current.y) * 0.005;

    setInitialRotation(
      (prev: [number, number, number]): [number, number, number] => [
        Math.min(Math.max(prev[0] + deltaY, -Math.PI / 2), Math.PI / 2),
        prev[1] + deltaX,
        prev[2],
      ]
    );

    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  // Funzione per terminare il drag
  const handleMouseUp = () => {
    dragging.current = false;
    lastMouse.current = null;
  };

  return (
    <>
      <PresentationControls global enabled={true}>
        {/*
          <div
          style={{ width: "100vw", height: "100vh", cursor: "grab" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} 
        >
        */}
      
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
            activeLookat={activeLookat}
          />

          <Gundam
            occlude={cameraPositionIndex}
            setLoading={setLoading}
            handleMouseLeave={handleMouseLeave}
            handleMouseEnter={handleMouseEnter}
          />
        {/*
        </div>
        
        */}
      </PresentationControls>
    </>
  );
}
