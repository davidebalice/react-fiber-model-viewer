import { Html, useGLTF, useProgress, Sky } from "@react-three/drei";
import { useEffect } from "react";
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
     <Sky
        distance={40000}
        sunPosition={[100, 20, 100]}
        inclination={0.5}
        azimuth={0.25}
      />
      
      <primitive
        object={gundam.scene}
        position-x={-1}
        position-y={1}
        position-z={-1}
        scale={[0.04, 0.04, 0.04]}
        rotation={[0, 0.2, 0]}
        castShadow
      >
       
      </primitive>
    </>
  );
}

