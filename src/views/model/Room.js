import React from "react";
import { useState } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material";

import "../../App.css";
import { Box, Stack, Typography } from "@mui/material";

const TextFieldCustom = styled(TextField)(({ them }) => ({
  "& .css-1m3yc3-MuiInputBase-root-MuiOutlinedInput-root": {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
}));

const Loreflector = 0;

function Room(props) {
  const { nodes, materials } = useGLTF("/room_uv.gltf");
  //////////////////////////////////////////
  const [x, setx] = useState(null);
  function getX(val) {
    setx(val.target.value);

    if (val.target.value < 0) {
      setyy(1800);
    }
  }
  const [y, sety] = useState(null);
  function getY(val) {
    sety(val.target.value);
  }
  const [z, setz] = useState(null);
  function getZ(val) {
    setz(val.target.value);
  }
  ////////////////////////////////////////
  //////////////////////////////////////////
  const [setxx] = useState(null);
  function getXX(val) {
    setxx(val.target.value);
  }
  const [yy, setyy] = useState(null);
  function getYY(val) {
    setyy(val.target.value);
  }
  const [setzz] = useState(null);
  function getZZ(val) {
    setzz(val.target.value);
  }
  ////////////////////////////////////////
  //////////////////////////////////////////
  const [xxx, setxxx] = useState(null);
  function getXXX(val) {
    setxxx(val.target.value);
  }
  const [yyy, setyyy] = useState(null);
  function getYYY(val) {
    setyyy(val.target.value);
  }
  const [zzz, setzzz] = useState(null);
  function getZZZ(val) {
    setzzz(val.target.value);
  }

  return (
    <div className="wrapper2">
      <div className="wrapper">
        <Canvas
          camera={{ fov: 30, position: [50, 50, 50] }}
          style={{ height: "420px" }}
        >
          <Suspense fallback={null}>
            <ambientLight />
            <directionalLight
              position={[1, 1, 1]}
              intensity={0.75}
              lookAt={[20, -20, 20]}
            />
            <directionalLight
              position={[-1, 0, -1]}
              intensity={0.75}
              lookAt={[20, -20, 20]}
            />
            <group {...props} dispose={null}>
              <group position={[x, y, z]} rotation={[Math.PI, yy + 0, Math.PI]}>
                <mesh
                  geometry={nodes.Sphere001_1.geometry}
                  material={nodes.Sphere001_1.material}
                  position={[0, 21.33, 0]}
                />
                <mesh
                  geometry={nodes.Cube013_1.geometry}
                  material={materials["Material.008"]}
                  position={[0.94, 21.75, 0]}
                  scale={[0.1, 10, 10]}
                />
                <mesh
                  geometry={nodes.Cylinder001.geometry}
                  material={materials["Material.009"]}
                  position={[0, 10.58, 0]}
                  scale={[0.4, 10.57, 0.4]}
                />
              </group>
              <group
                position={[xxx, yyy, zzz]}
                rotation={[-Math.PI, yy + 0, -Math.PI]}
              >
                <mesh
                  geometry={nodes.Cube020_1.geometry}
                  material={materials["Material.010"]}
                  position={[0, 22.63, 0]}
                  scale={[4.07, 2, 2]}
                />
                <mesh
                  geometry={nodes.Sphere005.geometry}
                  material={nodes.Sphere005.material}
                  position={[0, 21.33, 0]}
                />
                <mesh
                  geometry={nodes.Cylinder005.geometry}
                  material={materials["Material.010"]}
                  position={[0, 10.58, 0]}
                  scale={[0.4, 10.57, 0.4]}
                />
              </group>
              <group position={[0, 10, 82]} scale={[101, 10, 1]}>
                <mesh
                  geometry={nodes.Cube009.geometry}
                  material={materials["Material.005"]}
                />
                <mesh
                  geometry={nodes.Cube009_1.geometry}
                  material={materials["Material.006"]}
                />
                <mesh
                  geometry={nodes.Cube009_2.geometry}
                  material={materials.Material}
                />
              </group>
            </group>
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
            />
          </Suspense>
        </Canvas>
      </div>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Box
            sx={{
              margin: "auto",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "7px",
              height: "200px",
              width: "150px",
            }}
          >
            <Typography
              sx={{
                color: "black",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginBottom: "10px",
              }}
            >
              ตำแหน่งแผ่นสะท้อน
            </Typography>
            <Stack spacing={1.5}>
              <TextFieldCustom id="outlined-basic" label="X" onChange={getX} />
              <TextFieldCustom
                id="outlined-basic"
                label="Y"
                onChange={getY}
                // defaultValue="5"
              />
              <TextFieldCustom id="outlined-basic" label="Z" onChange={getZ} />
            </Stack>
          </Box>
          <Box
            sx={{
              margin: "auto",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "7px",
              height: "200px",
              width: "150px",
            }}
          >
            <Typography
              sx={{
                color: "black",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginBottom: "10px",
              }}
            >
              องศาแผ่นสะท้อน
            </Typography>
            <Stack spacing={1.5}>
              <TextFieldCustom id="outlined-basic" label="X" onChange={getXX} />
              <TextFieldCustom id="outlined-basic" label="Y" onChange={getYY} />
              <TextFieldCustom
                id="outlined-basic"
                label="Z"
                onChange={getZZ}
                defaultValue={Loreflector}
              />
            </Stack>
          </Box>
          <Box
            sx={{
              margin: "auto",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "7px",
              height: "200px",
              width: "150px",
            }}
          >
            <Typography
              sx={{
                color: "black",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginBottom: "10px",
              }}
            >
              ตำแหน่ง Antenna
            </Typography>
            <Stack spacing={1.5}>
              <TextFieldCustom
                id="outlined-basic"
                label="X"
                onChange={getXXX}
              />
              <TextFieldCustom
                id="outlined-basic"
                label="Y"
                onChange={getYYY}
              />
              <TextFieldCustom
                id="outlined-basic"
                label="Z"
                onChange={getZZZ}
              />
            </Stack>
          </Box>
          <Box
            sx={{
              margin: "auto",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "7px",
              height: "200px",
              width: "150px",
            }}
          >
            <Typography
              sx={{
                color: "black",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginBottom: "10px",
              }}
            >
              องศา Antenna
            </Typography>
            <Stack spacing={1.5}>
              <TextFieldCustom id="outlined-basic" label="X" />
              <TextFieldCustom id="outlined-basic" label="Y" />
              <TextFieldCustom id="outlined-basic" label="Z" />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </div>
  );
}

export default Room;
