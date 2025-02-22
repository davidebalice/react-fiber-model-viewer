import { a, useSpring } from "@react-spring/three";
import { OrbitControls, Text, useCursor } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { useState } from "react";
import { RepeatWrapping, TextureLoader } from "three";
import Header from "./Header";
import "./style.css";

interface SelectionScreenProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

function Background() {
  const texture = useLoader(TextureLoader, "./public/assets/bg.jpg");
  return <primitive attach="background" object={texture} />;
}

function GroundPlane() {
  const texturePlane = useLoader(TextureLoader, "./public/assets/plane.jpg");
  texturePlane.wrapS = RepeatWrapping;
  texturePlane.wrapT = RepeatWrapping;
  texturePlane.repeat.set(4, 4);

  return (
    <mesh
      position={[0, -1.55, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial map={texturePlane} />
    </mesh>
  );
}

function Card({
  position,
  onClick,
  textureUrl,
  text,
}: {
  position: [number, number, number];
  onClick: () => void;
  textureUrl: string;
  text: string;
}) {
  const [hovered, setHovered] = useState(false);
  const texture = useLoader(TextureLoader, textureUrl);
  useCursor(hovered, "pointer", "auto");

  const { scale } = useSpring({
    scale: hovered ? 1.1 : 1,
    config: { tension: 200, friction: 10 },
  });

  return (
    <a.mesh
      scale={scale}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[2, 3, 0.1]} />
      <meshStandardMaterial map={texture} />

      <mesh position={[0, -1, 0.07]}>
        <planeGeometry args={[1.7, 0.4]} />
        <meshBasicMaterial color="#333" />
      </mesh>

      <Text
        position={[0, -1.11, 0.08]}
        fontSize={0.17}
        color={hovered ? "orange" : "white"}
        anchorX="center"
        anchorY="bottom"
      >
        {text}
      </Text>
    </a.mesh>
  );
}

const SelectionScreen: React.FC<SelectionScreenProps> = ({ setPage }) => {
  return (
    <>
      <Header setPage={setPage} />
      <Canvas camera={{ position: [3, 2, 8], fov: 50 }} shadows>
        <Background />
        <OrbitControls />
        <ambientLight intensity={0.4} />
        <spotLight position={[1.2, 1.2, 1.2]} intensity={0.6} castShadow />

        <GroundPlane />

        <Text
          position={[0, 2.65, 0]}
          fontSize={0.35}
          color="#444"
          anchorX="center"
          anchorY="middle"
        >
          Model viewer
        </Text>

        <Text
          position={[0, 2.2, 0]}
          fontSize={0.2}
          color="#444"
          anchorX="center"
          anchorY="middle"
        >
          Interface for navigating a 3D scene or displaying a 3D model
        </Text>

        <Text
          position={[0, 1.9, 0]}
          fontSize={0.2}
          color="#444"
          anchorX="center"
          anchorY="middle"
        >
          developed using React Three Fiber and Drei
        </Text>

        <Card
          position={[-2.5, 0, 0]}
          onClick={() => setPage("Gundam")}
          textureUrl="./public/assets/card1.jpg"
          text="Gundam"
        />
        <Card
          position={[0, 0, 0]}
          onClick={() => setPage("House")}
          textureUrl="./public/assets/card2.jpg"
          text="House"
        />
        <Card
          position={[2.5, 0, 0]}
          onClick={() => setPage("Car")}
          textureUrl="./public/assets/card1.jpg"
          text="Car"
        />
      </Canvas>
    </>
  );
};

export default SelectionScreen;
