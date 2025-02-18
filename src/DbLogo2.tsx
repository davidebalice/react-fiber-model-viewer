import { useGLTF } from "@react-three/drei";
import "./style.css";

export default function DbLogo2() {
  const dblogo2 = useGLTF("./public/assets/model/dblogo2.gltf");

  return (
    <>
      <primitive
        object={dblogo2.scene}
        position-x={-10.25}
        position-z={-9.3}
        position-y={2.55}
        rotation-x={1.6}
        rotation-y={0}
        rotation-z={0.1}
        scale={[75, 75, 75]}
        CastShadow
        ReceiceShadow
      />
    </>
  );
}
