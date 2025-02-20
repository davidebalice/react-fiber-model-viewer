import { useGLTF, useProgress, Sky, Environment } from "@react-three/drei";
import { useEffect } from "react";
import "./style.css";
import GradientBackground from "./GradientBackground";

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
    
  <GradientBackground/>
  {/*
  <Sky
  sunPosition={[0, 0.01, 0]} // Posizione del sole bassa per un'illuminazione minima
  turbidity={40} // Più alto = più foschia (effetto sfumato)
  rayleigh={0} // Controlla la dispersione della luce, minore = meno blu
  mieCoefficient={0.000001} // Riduce la luce diffusa
  mieDirectionalG={1} // Rende la luce più focalizzata
/>
  */}



<Environment preset="warehouse"  />





{/*
 <Sky
        distance={40000}
        sunPosition={[100, 20, 100]}
        inclination={0.5}
        azimuth={0.25}
      />
*/}










      
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

