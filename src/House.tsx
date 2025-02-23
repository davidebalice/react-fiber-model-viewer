import { Environment, Sky, useGLTF, useProgress } from "@react-three/drei";
import { useEffect } from "react";
import Glass from "./Glass";
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
  const Garden2 = useGLTF("./public/assets/model/garden2.gltf");
  const Street = useGLTF("./public/assets/model/street.gltf");

  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setLoading(false);
    }
  }, [progress]);

  return (
    <>
      <Environment preset="warehouse" />

      <Sky
        distance={40000}
        sunPosition={[100, 20, 100]}
        inclination={0.5}
        azimuth={0.25}
      />

      <Glass />

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
        object={Street.scene}
        position-x={3}
        position-y={-0.8}
        position-z={13}
        scale={[0.3, 0.3, 0.3]}
        rotation={[0, 1.76, 0]}
        castShadow
      ></primitive>

      <primitive
        object={Garden.scene}
        position-x={8.5}
        position-y={0.8}
        position-z={1.1}
        scale={[1.1, 1, 1.2]}
        rotation={[0, 1.76, 0]}
        castShadow
      ></primitive>

      <primitive
        object={Garden2.scene}
        position-x={-7.4}
        position-y={0.8}
        position-z={4.34}
        scale={[1.1, 1, 1.2]}
        rotation={[0, 1.76, 0]}
        castShadow
      ></primitive>
    </>
  );
}
