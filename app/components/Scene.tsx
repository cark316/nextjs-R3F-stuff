"use client";

import React from "react";
import { OrbitControls } from "@react-three/drei";
import { useFrame, Canvas } from "@react-three/fiber";

const Scene = () => {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={1} />
      <CubeMesh />
    </Canvas>
  );
};

export default Scene;

function CubeMesh() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"black"} />
      </mesh>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"white"} wireframe={true} />
      </mesh>
    </group>
  );
}
