import { Environment, useGLTF, useProgress } from "@react-three/drei";
import { useEffect } from "react";
import GradientBackground from "./GradientBackground";
import "./style.css";

interface CarProps {
  occlude: number;
  setLoading: (loading: boolean) => void;
  handleMouseEnter?: () => void;
  handleMouseLeave?: () => void;
}

export default function Car({
  occlude,
  setLoading,
  handleMouseEnter,
  handleMouseLeave,
}: CarProps) {
  const car = useGLTF("./public/assets/model/car2.gltf");

  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setLoading(false);
    }
  }, [progress]);

  return (
    <>
      <GradientBackground />

      <Environment preset="warehouse" />

      <primitive
        object={car.scene}
        position-x={-1}
        position-y={1}
        position-z={-1}
        scale={[0.01, 0.01, 0.01]}
        rotation={[0, 0.2, 0]}
        castShadow
      ></primitive>
    </>
  );
}
