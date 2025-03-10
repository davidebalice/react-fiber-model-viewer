import { Environment, useGLTF, useProgress } from "@react-three/drei";
import { useEffect } from "react";
import GradientBackground from "./GradientBackground";
import "./style.css";

interface GundamProps {
  occlude: number;
  setLoading: (loading: boolean) => void;
  handleMouseEnter?: () => void;
  handleMouseLeave?: () => void;
}

export default function Gundam({
  occlude,
  setLoading,
  handleMouseEnter,
  handleMouseLeave,
}: GundamProps) {
  const gundam = useGLTF("./public/assets/model/gundam.gltf");

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
        object={gundam.scene}
        position-x={-1}
        position-y={1}
        position-z={-1}
        scale={[0.04, 0.04, 0.04]}
        rotation={[0, 0.2, 0]}
        castShadow
      ></primitive>
    </>
  );
}
