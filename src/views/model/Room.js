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

export function Model(props) {
  const { nodes, materials } = useGLTF("/room_uv.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cylinder.geometry}
        material={materials["Material.003"]}
        position={[-81, 10.58, 80]}
        scale={[0.4, 10.57, 0.4]}
      />
      <mesh
        geometry={nodes.Plane002.geometry}
        material={nodes.Plane002.material}
        position={[-81, 0, 0]}
        scale={[20, 1, 81]}
      />
      <mesh
        geometry={nodes.Plane003.geometry}
        material={materials.Material}
        position={[20, 0, 0]}
        scale={[81, 1, 81]}
      />
    </group>
  );
}

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
