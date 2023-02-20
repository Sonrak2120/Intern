import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { cloneUniformsGroups } from "three";
import { color2 } from "./color";

// console.log(color2);

const color1 = ["#00FCCB", "rgb(255, 255, 0)", "0xff0000"];
const Matt = [];
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 161; j++) {
    Matt.push(new THREE.MeshPhongMaterial({ color: color2[i][j] }));
  }
}

export function Model(props) {
  const { nodes, materials } = useGLTF("/plane.gltf");
  return (
    <group {...props} dispose={null}>
      <group position={[-4.5, 0, 80]}>
        {Object.entries(nodes).map(([key, value], inx) => {
          return (
            <mesh key={key} geometry={value.geometry} material={Matt[inx]} />
          );
        })}
      </group>
    </group>
  );
}

// console.log("color1==", typeof color1[0]);

function ColorMap() {
  return (
    <div>
      <div style={{ height: "100vh" }}>
        <Canvas
          camera={{
            fov: 50,
            position: [0, 190, 0],
          }}
          style={{ width: "100px" }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[0, 0.5, -1]} distance={1} intensity={2} />
          <directionalLight
            position={[-10, 10, 5]}
            intensity={2}
            lookAt={[0, 0, 0]}
          />
          <directionalLight
            position={[-10, -10, 0]}
            intensity={1}
            lookAt={[0, 0, 0]}
          />
          {/* <Box args={[1, 1, 1]} visible>
            <meshStandardMaterial attach="material" color="hotpink" />
          </Box> */}
          <Model />
          <OrbitControls enableRotate={false} />
        </Canvas>
      </div>
    </div>
  );
}

export default ColorMap;
