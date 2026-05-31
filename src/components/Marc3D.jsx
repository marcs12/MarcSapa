import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  Text3D,
  Environment,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const fontPath = "/fonts/helvetiker_bold.typeface.json";

function PrismText({ hovered }) {
  const group = useRef();

  useFrame((state) => {
    const x = state.pointer.x;
    const y = state.pointer.y;

    if (group.current) {
      group.current.rotation.y += (x * 0.1 - group.current.rotation.y) * 0.06;
      group.current.rotation.x += (-y * 0.05 - group.current.rotation.x) * 0.06;
      group.current.position.x += (x * 0.05 - group.current.position.x) * 0.06;
      group.current.position.y += (y * 0.025 - group.current.position.y) * 0.06;
    }
  });

  return (
    <group ref={group}>
      <Center>
        <group>
          {/* COOL PRISM LAYER — adjust opacity/color here */}
          <Text3D
            font={fontPath}
            size={2.35}
            height={0.7}
            curveSegments={48}
            bevelEnabled
            bevelThickness={0.1}
            bevelSize={0.075}
            bevelSegments={16}
            position={[0.006, -0.006, -0.14]}
          >
            MARC
            <meshBasicMaterial
              transparent
              opacity={0.02}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              color="#8df7ff"
            />
          </Text3D>

          {/* WARM PRISM LAYER — adjust opacity/color here */}
          <Text3D
            font={fontPath}
            size={2.35}
            height={0.68}
            curveSegments={48}
            bevelEnabled
            bevelThickness={0.1}
            bevelSize={0.075}
            bevelSegments={16}
            position={[-0.01, 0.008, -0.16]}
          >
            MARC
            <meshBasicMaterial
              transparent
              opacity={hovered === "create" ? 0.03 : 0.02}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              color={hovered === "create" ? "#ff4ecd" : "#fff176"}
            />
          </Text3D>

          {/* MAIN GLASS SHELL — adjust prism/glass look here */}
          <Text3D
            font={fontPath}
            size={2.35}
            height={0.78}
            curveSegments={64}
            bevelEnabled
            bevelThickness={0.11}
            bevelSize={0.08}
            bevelSegments={18}
          >
            MARC
            <MeshTransmissionMaterial
              color="#dfe8ff"
              thickness={0.7}
              roughness={0.1}
              ior={1.22}
              chromaticAberration={0.01}
              transmission={0.65}
              opacity={0.28}
              anisotropy={0.04}
              distortion={0}
              distortionScale={0}
              temporalDistortion={0}
              clearcoat={0}
              attenuationDistance={2.4}
              attenuationColor="#9fb4ff"
              transparent
              reflectivity={0}
              samples={16}
              resolution={1024}
            />
          </Text3D>
        </group>
      </Center>
    </group>
  );
}

export default function Marc3D({ hovered }) {
  return (
    <div className="marc-3d">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
      >
        {/* LIGHTING — adjust these intensities first */}
        <ambientLight intensity={1} />

        <directionalLight position={[0, 4, 7]} intensity={1} color="#ffffff" />

        <pointLight position={[-5, 1, -2]} intensity={0.12} color="#00d9ff" />
        <pointLight position={[5, 1, -2]} intensity={0.12} color="#ff3bd5" />
        <pointLight position={[0, 3, -2]} intensity={0.08} color="#fff176" />
        <pointLight position={[0, -3, -1]} intensity={0.06} color="#4dff88" />

        <PrismText hovered={hovered} />

        {/* ENVIRONMENT — keep this very low to prevent blinking */}
        <Environment preset="warehouse" background={false} intensity={0.002} />
      </Canvas>
    </div>
  );
}
