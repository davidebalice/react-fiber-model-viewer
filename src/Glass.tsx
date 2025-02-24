export default function Glass() {
  function GlassBox() {
    return (
      <mesh rotation={[1.56, 0, -0.2]} position={[1, 4.3, 4.32]}>
        <boxGeometry args={[6, 0.01, 2]} />
        <meshPhysicalMaterial
          color="skyblue"
          transparent
          opacity={0.5}
          roughness={0.1}
          metalness={0.1}
          transmission={0.3}
          thickness={0.3}
          ior={1}
        />
      </mesh>
    );
  }

  function GlassBox2() {
    return (
      <mesh rotation={[1.56, 0, -0.2]} position={[-1, 1.5, 4.73]}>
        <boxGeometry args={[2, 0.01, 2]} />
        <meshPhysicalMaterial
          color="skyblue"
          transparent
          opacity={0.5}
          roughness={0.1}
          metalness={0.1}
          transmission={0.3}
          thickness={0.3}
          ior={1}
        />
      </mesh>
    );
  }

  function GlassBox3() {
    return (
      <mesh rotation={[1.56, 0, -0.2]} position={[3.15, 1.63, 3.89]}>
        <boxGeometry args={[1, 0.01, 2]} />
        <meshPhysicalMaterial
          color="skyblue"
          transparent
          opacity={0.5}
          roughness={0.1}
          metalness={0.1}
          transmission={0.3}
          thickness={0.3}
          ior={1}
        />
      </mesh>
    );
  }

  function GlassBox4() {
    return (
      <mesh rotation={[1.56, 0, -0.43]} position={[1.0, 1, 4.15]}>
        <boxGeometry args={[0.65, 0.01, 2.4]} />
        <meshPhysicalMaterial
          color="skyblue"
          transparent
          opacity={0.5}
          roughness={0.1}
          metalness={0.1}
          transmission={0.3}
          thickness={0.3}
          ior={1}
        />
      </mesh>
    );
  }

  function GlassBox5() {
    return (
      <mesh rotation={[1.56, 0, -0.07]} position={[1.68, 1, 4.07]}>
        <boxGeometry args={[0.65, 0.01, 2.4]} />
        <meshPhysicalMaterial
          color="skyblue"
          transparent
          opacity={0.5}
          roughness={0.1}
          metalness={0.1}
          transmission={0.3}
          thickness={0.3}
          ior={1}
        />
      </mesh>
    );
  }

  function GlassBox6() {
    return (
      <mesh rotation={[1.56, 0, -0.2]} position={[1.3, 2.5, 4.22]}>
        <boxGeometry args={[2.6, 0.01, 0.6]} />
        <meshPhysicalMaterial
          color="skyblue"
          transparent
          opacity={0.5}
          roughness={0.1}
          metalness={0.1}
          transmission={0.3}
          thickness={0.3}
          ior={1}
        />
      </mesh>
    );
  }

  function GlassBox7() {
    return (
      <mesh rotation={[1.56, 0, -0.2]} position={[0.45, 0.5, 4.42]}>
        <boxGeometry args={[0.53, 0.01, 3.6]} />
        <meshPhysicalMaterial
          color="skyblue"
          transparent
          opacity={0.5}
          roughness={0.1}
          metalness={0.1}
          transmission={0.3}
          thickness={0.3}
          ior={1}
        />
      </mesh>
    );
  }
  function GlassBox8() {
    return (
      <mesh rotation={[1.56, 0, -0.2]} position={[2.31, 0.5, 4.05]}>
        <boxGeometry args={[0.53, 0.01, 3.6]} />
        <meshPhysicalMaterial
          color="skyblue"
          transparent
          opacity={0.5}
          roughness={0.1}
          metalness={0.1}
          transmission={0.3}
          thickness={0.3}
          ior={1}
        />
      </mesh>
    );
  }
  return (
    <>
      <GlassBox />
      <GlassBox2 />
      <GlassBox3 />
      <GlassBox4 />
      <GlassBox5 />
      <GlassBox6 />
      <GlassBox7 />
      <GlassBox8 />
    </>
  );
}
