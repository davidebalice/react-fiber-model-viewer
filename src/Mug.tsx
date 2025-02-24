import { useGLTF } from "@react-three/drei";
import "./style.css";

export default function Mug() {
  const mug = useGLTF("./public/assets/model/mug.gltf");
  
  return (
    <>
      <primitive
        object={mug.scene}
        position-x={0.3}
        position-y={0.92}
        position-z={-0.30}
        rotation-y={-2}
        scale={[0.04, 0.04, 0.04]}
        castShadow
        receiveShadow
      >
      </primitive>
    </>
  );
}
