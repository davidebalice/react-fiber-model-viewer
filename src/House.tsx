import { Environment, Sky, useGLTF, useProgress } from "@react-three/drei";
import { useEffect } from "react";
import "./style.css";

interface HouseProps {
  occlude: number;
  setLoading: (loading: boolean) => void;
  handleMouseEnter?: () => void;
  handleMouseLeave?: () => void;
}

export default function House({
  occlude,
  setLoading,
  handleMouseEnter,
  handleMouseLeave,
}: HouseProps) {
  const House = useGLTF("./public/assets/model/house.gltf");
  const Garden = useGLTF("./public/assets/model/garden.gltf");

  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setLoading(false);
    }
  }, [progress]);

  return (
    <>
      {/*
  <Sky
  sunPosition={[0, 0.01, 0]} // Posizione del sole bassa per un'illuminazione minima
  turbidity={40} // Più alto = più foschia (effetto sfumato)
  rayleigh={0} // Controlla la dispersione della luce, minore = meno blu
  mieCoefficient={0.000001} // Riduce la luce diffusa
  mieDirectionalG={1} // Rende la luce più focalizzata
/>
  */}

      <Environment preset="warehouse" />

      <Sky
        distance={40000}
        sunPosition={[100, 20, 100]}
        inclination={0.5}
        azimuth={0.25}
      />

      <primitive
        object={House.scene}
        position-x={0}
        position-y={0}
        position-z={0}
        scale={[1, 1, 1]}
        rotation={[0, 0.2, 0]}
        castShadow
      ></primitive>

      <primitive
        object={Garden.scene}
        position-x={-1.5}
        position-y={1.9}
        position-z={-3}
        scale={[2, 2, 2]}
        rotation={[0, 1.7, 0]}
        castShadow
      ></primitive>
    </>
  );
}
