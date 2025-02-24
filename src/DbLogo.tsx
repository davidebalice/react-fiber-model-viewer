import { useGLTF } from "@react-three/drei";
import "./style.css";

export default function DbLogo() {
  const dblogo = useGLTF("./public/assets/model/dblogo.gltf");

  return (
    <>
      <primitive
        object={dblogo.scene}
        position-x={0.1}
        position-y={3.76}
        position-z={-2.4}
        rotation-x={1.55}
        rotation-y={0}
        rotation-z={1.4}
        scale={[20, 20, 20]}
        CastShadow
        ReceiceShadow
      />
    </>
  );
}
