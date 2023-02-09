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
    // borderRadius: "20px",
    // border: "2px solid white",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
}));

const Loreflector = 5;

function Room() {
  //////////////////////////////////////////
  const [x, setx] = useState(null);
  function getX(val) {
    setx(val.target.value);
    console.warn(val.target.value);
  }
  const [y, sety] = useState(null);
  function getY(val) {
    sety(val.target.value);
    console.warn(val.target.value);
  }
  const [z, setz] = useState(null);
  function getZ(val) {
    setz(val.target.value);
    console.warn(val.target.value);
  }
  ////////////////////////////////////////
  //////////////////////////////////////////
  const [xx, setxx] = useState(null);
  function getXX(val) {
    setxx(val.target.value);
    console.warn(val.target.value);
  }
  const [yy, setyy] = useState(null);
  function getYY(val) {
    setyy(val.target.value);
    console.warn(val.target.value);
  }
  const [zz, setzz] = useState(Loreflector);
  function getZZ(val) {
    setzz(val.target.value);
    console.warn(val.target.value);
  }
  ////////////////////////////////////////
  ////////////////////////////////////////

  function Model(props) {
    const { nodes, materials } = useGLTF("/demo.glb");
    return (
      <group {...props} dispose={null} scale={1}>
        <group
          position={[x, y, z]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={0.25}
        >
          <mesh
            geometry={nodes.Cube005.geometry}
            material={materials["Material.001"]}
            position={[0.57, 10.32, -0.12]}
            rotation={[xx, yy, -Math.PI / zz]}
            scale={[3, 0.05, 3]}
          />
          <mesh
            geometry={nodes.Cylinder.geometry}
            material={materials["Material.002"]}
            position={[0, 5.25, 0]}
            scale={[0.5, 5, 0.5]}
          />
        </group>
        <group
          position={[10, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          scale={0.25}
        >
          <mesh
            geometry={nodes.Cylinder001.geometry}
            material={materials["Material.002"]}
            position={[0, 5.25, 0]}
            scale={[0.25, 5, 0.25]}
          />
          <mesh
            geometry={nodes.Cube006.geometry}
            material={materials["Material.003"]}
            position={[4.81, 11.25, 0]}
            scale={[6, 1, 1]}
          />
          <mesh
            geometry={nodes.Sphere.geometry}
            material={materials["Material.002"]}
            position={[0, 10.61, 0]}
            scale={0.5}
          />
        </group>
        <mesh
          geometry={nodes.Cube.geometry}
          material={nodes.Cube.material}
          position={[10.7, 2.6, -25.45]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[15, 0.03, 2.5]}
        />
        <mesh
          geometry={nodes.Cube001.geometry}
          material={nodes.Cube001.material}
          position={[10.72, 0.05, -10.46]}
          scale={[15, 0.03, 15]}
        />
        <mesh
          geometry={nodes.Cube002.geometry}
          material={nodes.Cube002.material}
          position={[-4.25, 2.53, -10.44]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[15, 0.03, 2.5]}
        />
        <mesh
          geometry={nodes.Cube003.geometry}
          material={nodes.Cube003.material}
          position={[10.72, 2.53, 4.5]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[15, 0.03, 2.5]}
        />
        <mesh
          geometry={nodes.Cube004.geometry}
          material={nodes.Cube004.material}
          position={[25.7, 2.53, -10.44]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[15, 0.03, 2.5]}
        />
      </group>
    );
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
            <directionalLight intensity={0.75} position={[50, 50, 50]} />
            <directionalLight intensity={0.75} position={[-50, -50, -50]} />
            <Model />
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
          // backgroundColor: "GrayText",
          padding: "10px",
        }}
      >
        <Stack direction="row" spacing={2}>
          {/* แผ่นสะท้อน */}
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
              <TextFieldCustom
                id="outlined-basic"
                label="X"
                onChange={getX}
                // defaultValue="5"
              />
              <TextFieldCustom
                id="outlined-basic"
                label="Y"
                onChange={getY}
                // defaultValue="5"
                // sx={{ mt: "-200px" }}
              />
              <TextFieldCustom
                id="outlined-basic"
                label="Z"
                onChange={getZ}
                // defaultValue="5"
                // sx={{ mt: "-200px" }}
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
              องศาแผ่นสะท้อน
            </Typography>
            <Stack spacing={1.5}>
              <TextFieldCustom
                id="outlined-basic"
                label="X"
                onChange={getXX}
                // defaultValue="5"
                // sx={{ mt: "-200px" }}
              />
              <TextFieldCustom
                id="outlined-basic"
                label="Y"
                onChange={getYY}
                // defaultValue="5"
                // sx={{ mt: "-200px" }}
              />
              <TextFieldCustom
                id="outlined-basic"
                label="Z"
                onChange={getZZ}
                defaultValue={Loreflector}
                // sx={{ mt: "-200px" }}
              />
            </Stack>
          </Box>
          {/* แผ่นสะท้อน */}
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
                onChange={getX}
                // defaultValue="5"
                // sx={{ mt: "-200px" }}
              />
              <TextFieldCustom
                id="outlined-basic"
                label="Y"
                onChange={getY}
                // defaultValue="5"
                // sx={{ mt: "-200px" }}
              />
              <TextFieldCustom
                id="outlined-basic"
                label="Z"
                onChange={getZ}
                // defaultValue="5"
                // sx={{ mt: "-200px" }}
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
              <TextFieldCustom
                id="outlined-basic"
                label="X"
                onChange={getX}
                // defaultValue="5"
                // sx={{ mt: "-200px" }}
              />
              <TextFieldCustom
                id="outlined-basic"
                label="Y"
                onChange={getY}
                // defaultValue="5"
                // sx={{ mt: "-200px" }}
              />
              <TextFieldCustom
                id="outlined-basic"
                label="Z"
                onChange={getZ}
                // defaultValue="5"
                // sx={{ mt: "-200px" }}
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
      {/* {console.log(zz)} */}
    </div>
  );
}

export default Room;
