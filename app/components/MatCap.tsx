"use client";

import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";
import { TextureLoader, Vector3 } from "three";
import { OrbitControls, OrthographicCamera, Line } from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  ChromaticAberration,
  Noise,
  Vignette,
  Scanline,
  Sepia,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useRef } from "react";

const MatCap = () => {
  return (
    <Canvas>
      {/* Camera Perspective */}
      {/* <OrthoCam /> */}
      {/* Mouse controls */}
      <OrbitControls />
      {/* Lighting */}
      <ambientLight intensity={0.25} />
      <spotLight position={[0, 10, 10]} />
      {/* Center Sphere */}
      <SphereMatCap />
      {/* Revolving Spheres */}
      <SphereMatCapVelocity radius="2" />
      <SphereMatCapVelocity radius="4" />
      <SphereMatCapVelocity radius="6" />
      <SphereMatCapVelocity radius="12" />
      {/* Circular Path */}
      <CircularOutline radius="2" />
      <CircularOutline radius="4" />
      <CircularOutline radius="6" />
      <CircularOutline radius="12" />
      {/* Effects */}
      {/* <Effects /> */}
      {/* Tests  */}
      {/* <BoxMatCap /> */}
      {/* <axesHelper args={[5]} /> */}
      {/* <Box /> */}
    </Canvas>
  );
};

export default MatCap;

function CircularOutline(props: any) {
  const radius = props.radius;
  const segments = 64;
  const points = Array.from(Array(segments + 1).keys()).map((i) => {
    const angle = (i / segments) * Math.PI * 2;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius, 0];
  });

  return (
    <Line
      points={points}
      color="red"
      lineWidth={1}
      rotation={[Math.PI / 2, 0, 0]}
    />
  );
}

function SphereMatCap() {
  const matcapTexture = useLoader(TextureLoader, "matcap-3.jpg");
  return (
    <mesh>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshMatcapMaterial matcap={matcapTexture} />
    </mesh>
  );
}

function SphereMatCapRotation(props) {
  const sphereRef = useRef(null);
  const radius = props.radius;
  const segments = 64;
  const points = Array.from(Array(segments + 1).keys()).map((i) => {
    const angle = (i / segments) * Math.PI * 2;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius, 0];
  });

  useFrame((_state, delta) => {
    const currentPointIndex =
      Math.floor(_state.clock.elapsedTime * 32) % points.length;
    const currentPoint = points[currentPointIndex];

    sphereRef.current.position.set(
      currentPoint[1],
      currentPoint[2],
      currentPoint[0]
    );
  });

  const matcapTexture = useLoader(TextureLoader, "matcap-2.jpg");
  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshMatcapMaterial matcap={matcapTexture} />
    </mesh>
  );
}

function SphereMatCapVelocity(props) {
  const sphereRef = useRef(null);
  const radius = props.radius;
  let velocity = 3.5; // Initial velocity
  const acceleration = 0.1; // Acceleration rate
  const angularVelocity = 0.25 / radius; // Angular velocity (rate of change of angle)

  const matcapTexture = useLoader(TextureLoader, "matcap-2.jpg");

  useFrame((state, delta) => {
    // Update velocity based on acceleration
    velocity += acceleration * delta;

    // Update angle of rotation based on velocity
    const angle = state.clock.elapsedTime * angularVelocity * velocity;

    // Calculate position on circular path
    const x = Math.cos(angle) * radius;
    const y = 0;
    const z = Math.sin(angle) * radius;

    // Set position of the sphere
    sphereRef.current.position.set(x, y, z);
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshMatcapMaterial matcap={matcapTexture} />
    </mesh>
  );
}

function BoxMatCap() {
  const matcapTexture = useLoader(TextureLoader, "matcap-1.jpg");
  const boxRef = useRef(null);

  const radius = 2;
  const segments = 64;
  const points = Array.from(Array(segments + 1).keys()).map((i) => {
    const angle = (i / segments) * Math.PI * 2;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius, 0];
  });

  useFrame((_state, delta) => {
    const currentPointIndex =
      Math.floor(_state.clock.elapsedTime * 32) % points.length;
    const currentPoint = points[currentPointIndex];

    boxRef.current.position.set(
      currentPoint[1],
      currentPoint[2],
      currentPoint[0]
    );
  });

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshMatcapMaterial matcap={matcapTexture} />
    </mesh>
  );
}

function Box() {
  const boxRef = useRef(null);

  const radius = 2;
  const segments = 64;
  const points = Array.from(Array(segments + 1).keys()).map((i) => {
    const angle = (i / segments) * Math.PI * 2;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius, 0];
  });

  useFrame((_state, delta) => {
    const currentPointIndex =
      Math.floor(_state.clock.elapsedTime * 32) % points.length;
    const currentPoint = points[currentPointIndex];

    boxRef.current.position.set(
      currentPoint[1],
      currentPoint[2],
      currentPoint[0]
    );
  });

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshNormalMaterial />
    </mesh>
  );
}
function OrthoCam() {
  return (
    <OrthographicCamera
      makeDefault // Make this camera the default camera for the scene
      position={[0, 0, 10]} // Set the initial position of the camera
      zoom={1} // Adjust the zoom level of the camera
      left={-5} // Set the left clipping plane
      right={5} // Set the right clipping plane
      top={2.5} // Set the top clipping plane
      bottom={-2.5} // Set the bottom clipping plane
      near={0.1} // Set the near clipping plane
      far={1000} // Set the far clipping plane
      //   up={[0, 0, 1]} // Set the up vector to [0, 0, 1] to fix the orthographic angle
    />
  );
}

function Effects() {
  return (
    <EffectComposer>
      {/* <DepthOfField
        focusDistance={0}
        focalLength={0.02}
        bokehScale={2}
        height={480}
      />
      <Bloom luminanceThreshold={0} luminanceSmoothing={0.1} height={300} />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
      {/* <ChromaticAberration
        blendFunction={BlendFunction.NORMAL} // blend mode
        offset={[0.0002, 0.002]} // color offset
      /> */}
      {/* <Noise
        premultiply // enables or disables noise premultiplication
        blendFunction={BlendFunction.ADD} // blend mode
      /> */}
      {/* <Scanline
        blendFunction={BlendFunction.OVERLAY} // blend mode
        density={1.25} // scanline density
      /> */}
      {/* <Sepia
        intensity={0.1} // sepia intensity
        blendFunction={BlendFunction.LUMINOSITY} // blend mode
      /> */}
    </EffectComposer>
  );
}
