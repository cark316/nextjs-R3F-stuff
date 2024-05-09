"use client";

import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls, OrthographicCamera, Plane } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  // Load GLTF models
  const table = useLoader(GLTFLoader, "/Table.glb");
  const microwave = useLoader(GLTFLoader, "/Microwave.glb");

  // Calculate bounding box for each model
  const tableBoundingBox = new THREE.Box3().setFromObject(table.scene);
  const microwaveBoundingBox = new THREE.Box3().setFromObject(microwave.scene);

  // Calculate center of each model
  const tableCenter = tableBoundingBox.getCenter(new THREE.Vector3());
  const microwaveCenter = microwaveBoundingBox.getCenter(new THREE.Vector3());

  // Position each model individually at (0, 0, 0)
  //   table.scene.position.copy(tableCenter.multiplyScalar(-1));
  //   console.log(table.scene.position);
  //   microwave.scene.position.copy(microwaveCenter.multiplyScalar(-1));
  //   console.log(microwave.scene.position);

  // Set fixed positions for each model
  table.scene.position.set(3, -0.35, -0.75); // Example fixed position for table
  microwave.scene.position.set(-3, 0.325, -2.05); // Example fixed position for microwave
  return (
    <group>
      <primitive object={table.scene} />
      <primitive object={microwave.scene} />
    </group>
  );
}

function SceneRender() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <axesHelper />
        <OrbitControls />
        <ambientLight intensity={2} />
        <Model />
        <mesh rotation={[Math.PI / 2, Math.PI, 0]}>
          <Plane position={[0, 0, -0.35]} args={[5, 5, 5]} receiveShadow>
            <meshPhongMaterial color={"grey"} />
          </Plane>
        </mesh>
      </Suspense>
    </Canvas>
  );
}

export default SceneRender;

{
  /* <pointLight position={[2, 2, 2]} intensity={0.1} />
        <spotLight position={[3, 3, 3]} intensity={0.5} angle={Math.PI / 4} />
        <spotLightHelper /> */
}
