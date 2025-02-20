import { useMemo } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

const GradientBackground = () => {
  const { scene } = useThree();

  const gradientTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 256);
      gradient.addColorStop(0, "#555555");
      gradient.addColorStop(1, "#111111");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  useMemo(() => {
    scene.background = gradientTexture;
  }, [scene, gradientTexture]);

  return null;
};

export default GradientBackground;
