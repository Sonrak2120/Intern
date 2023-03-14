import React from "react";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import TextField from "@mui/material/TextField";
import { styled, Button, Select, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import ColorMap from "../model/ColorMap";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import "../../App.css";
import { Box, Stack, Typography } from "@mui/material";
import Progess from "../../assets/global/Progress";

import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  CommonAxisSettings,
  Export,
  Legend,
  Margin,
  Title,
  Subtitle,
  Tooltip,
  Grid,
  Label,
  ValueAxis,
  Point,
  Size,
  Format,
} from "devextreme-react/chart";
// import service from "../data2";
import service from "../page/data";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const countriesInfo = service.getCountriesInfo();
const energySources = service.getEnergySources();
// const types = ["line", "stackedline", "fullstackedline"];
export const types = [{ val: "SSE", name: "SSE" }];
export const types2 = [{ val: "PRx", name: "PRx" }];
export const types3 = [{ val: "BER", name: "BER" }];

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

const RIS = ["D", "U", "C"];
const DSC = ["R", "U", "B"];



function SiteSurvay() {
  const [change_model, setchange_model] = useState(true);
  const [nodes, setnodes] = useState({});
  const [materials_nodes, setmaterials_nodes] = useState(useGLTF("/room_uv.gltf"));
  // useEffect(() => {
    
  //   console.log("materials_nodes")
  //   console.log(materials_nodes)
    
  // }, [change_model]);
function Model(props) {
   
    return (
      <group {...props} dispose={null}>
        <mesh
          geometry={materials_nodes.nodes.Cylinder.geometry}
          material={materials_nodes.materials["Material.003"]}
          position={[-81, 10.58, 80]}
          scale={[0.4, 10.57, 0.4]}
        />
        <mesh
          geometry={materials_nodes.nodes.Plane002.geometry}
          material={materials_nodes.nodes.Plane002.material}
          position={[-81, 0, 0]}
          scale={[20, 1, 81]}
        />
        <mesh
          geometry={materials_nodes.nodes.Plane003.geometry}
          material={materials_nodes.materials.Material}
          position={[20, 0, 0]}
          scale={[81, 1, 81]}
        />
      </group>
    );
  }


  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open8, setOpen8] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const [open7, setOpen7] = React.useState(false);
  const [openalert, setOpenalert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [filezip, setfilxls] = useState("");
  const handleUploadxlxs = (e) => {
    const fileupload = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setfilxls(fileupload);
    };
    reader.readAsDataURL(fileupload);
  };
  // console.log("data_ris", da);

  const handledownload = () => {
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(filezip);
    a.download = filezip.name;
    a.click();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
    setOpen5(false);
    setOpen6(false);
    setOpen7(false);
    setOpen8(false);
    setOpenalert(false);
  };
  const uploadfile = async (event) => {
    setOpen(false);
    setLoading(true);

    let headersList = {
      Accept: "*/*",
    };
    var data = {
      file: filezip,
    };
    let formdata = new FormData();
    formdata.append("file", filezip);
    let bodyContent = formdata;
    const reqOptions = await axios({
      url: "http://127.0.0.1:5000/read_ris_file",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    });
    let response = reqOptions;
    // console.log(response.data.data_ris);
    setdata_ris(response.data.data_ris);
    setLoading(false);
    if (reqOptions.data.message == "success") {
      setOpen2(true);
    } else if (reqOptions.data.message == "File is not square matrix") {
      setOpen3(true);
    } else if (reqOptions.data.message == "Please upload excel file") {
      setOpen4(true);
    } else {
      setOpenalert(true);
    }
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [x_BS, setx_BS] = React.useState([]);
  const [y_BS, sety_BS] = React.useState([]);
  const [z_BS, setz_BS] = React.useState([]);
  const [x_IRS, setx_IRS] = React.useState([]);
  const [y_IRS, sety_IRS] = React.useState([]);
  const [z_IRS, setz_IRS] = React.useState([]);
  const [lightspeed, setlightspeed] = React.useState([]);
  const [fc, setfc] = React.useState([]);
  const [bs_an, setbs_an] = React.useState([]);
  const [DSC_type, setDSC_type] = React.useState([]);
  const [IRS_type, setIRS_type] = React.useState([]);
  const [N_cp, setN_cp] = React.useState([]);
  const [Lc, setLc] = React.useState([]);
  const [Lp, setLp] = React.useState([]);
  const [As, setAs] = React.useState([]);
  const [K_f_dB, setK_f_dB] = React.useState([]);
  const [NSD, setNSD] = React.useState([]);
  const [iterMax, setiterMax] = React.useState([]);
  const [Np_IRS_set, setNp_IRS_set] = React.useState([]);
  const [Ptx_dBm, setPtx_dBm] = React.useState([]);
  const [n_elm, setn_elm] = React.useState([]);
  const [Bw, setBw] = React.useState([]);
  const [N_UE, setN_UE] = React.useState([]);
  const [ue_an, setue_an] = React.useState([]);
  const [data_ris, setdata_ris] = React.useState([]);
  const [dataplot, setData] = React.useState("");

  const handleSubmits = async (event) => {
    setLoading(true);
    let headersList = {
      Accept: "application/json",
    };
    var data = {
      x_BS: parseFloat(x_BS),
      y_BS: parseFloat(y_BS),
      z_BS: parseFloat(z_BS),
      x_IRS: parseFloat(x_IRS),
      y_IRS: parseFloat(y_IRS),
      z_IRS: parseFloat(z_IRS),
      lightspeed: parseFloat(lightspeed),
      fc: parseFloat(fc),
      bs_an: parseFloat(bs_an),
      DSC_type: DSC_type,
      IRS_type: IRS_type,
      N_cp: parseFloat(N_cp),
      Lc: parseFloat(Lc),
      Lp: parseFloat(Lp),
      As: parseFloat(As),
      K_f_dB: parseFloat(K_f_dB),
      NSD: parseFloat(NSD),
      iterMax: parseFloat(iterMax),
      Np_IRS_set: parseFloat(Np_IRS_set),
      Ptx_dBm: parseFloat(Ptx_dBm),
      n_elm: parseFloat(n_elm),
      Bw: parseFloat(Bw),
      N_UE: parseFloat(N_UE),
      ue_an: 8,
      data_ris: data_ris,
    };

    // console.log(data_ris);

    let bodyContent = data;

    const reqOptions = await axios({
      url: "http://127.0.0.1:5000/new-site-survey",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    });
    let response = reqOptions;
    console.log(response.data);
    setLoading(false);
    setchange_model(!change_model);
    setmaterials_nodes(useGLTF("/room_uv.gltf")) ;
    setData(response.data);
    if (reqOptions.data.message == "success") {
      setOpen6(true);
      // window.location.reload("Refresh");
    } else if (
      reqOptions.data.message == "Please check your location parameter"
    ) {
      setOpen7(true);
    } else if (
      reqOptions.data.message ==
      "Please check your RIS file and number of element parameter"
    ) {
      setOpen8(true);
    } else if (reqOptions.data.message == "Please upload RIS data file") {
      setOpen5(true);
    } else {
      setOpenalert(true);
    }
  };
  console.log("dataplot==", dataplot);

  const onSubmit = (data) => {
    handleSubmits(data);
  };

  return (
    <div
      style={{
        backgroundColor: "GrayText",
      }}
    >
      <Progess load={loading} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "GrayText",
            padding: "10px",
          }}
        >
          <Grid2
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <Grid2
              container
              direction="row"
              // justifyContent="center"
              // alignItems="center"
              spacing={5}
            >
              <Grid2>
                <Box
                  sx={{
                    margin: "auto",
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "7px",
                    height: "100%",
                    width: "350px",
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
                    Parameter Main
                  </Typography>
                  <Stack spacing={1.5}>
                    {/* <Controller
                  render={({ field: { onChange } }) => (
                    <TextFieldCustom
                      id="lightspeed"
                      label="lightspeed"
                      onChange={(e) => setlightspeed(e.target.value)}
                      required
                    />
                  )}
                  name="lightspeed"
                  control={control}
                  defaultValue=""
                /> */}
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="fc"
                          label="Carrier Frequency"
                          onChange={(e) => setfc(e.target.value)}
                          required
                        />
                      )}
                      name="fc"
                      control={control}
                      defaultValue=""
                    />
                  </Stack>
                </Box>
              </Grid2>

              <Grid2>
                <Box
                  sx={{
                    margin: "auto",
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "7px",
                    height: "100%",
                    width: "350px",
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
                    Parameter Base
                  </Typography>
                  <Stack spacing={1.5}>
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="x_BS"
                          label="x_BS"
                          onChange={(e) => setx_BS(e.target.value)}
                          required
                        />
                      )}
                      name="x_BS"
                      control={control}
                      defaultValue=""
                    />
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="y_BS"
                          label="y_BS"
                          onChange={(e) => sety_BS(e.target.value)}
                          required
                        />
                      )}
                      name="y_BS"
                      control={control}
                      defaultValue=""
                    />
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="z_BS"
                          label="z_BS"
                          onChange={(e) => setz_BS(e.target.value)}
                          required
                        />
                      )}
                      name="z_BS"
                      control={control}
                      defaultValue=""
                    />
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="bs_an"
                          label="Number of antenna"
                          onChange={(e) => setbs_an(e.target.value)}
                          required
                        />
                      )}
                      name="bs_an"
                      control={control}
                      defaultValue=""
                    />
                  </Stack>
                </Box>
              </Grid2>
              <Grid2>
                <Box
                  sx={{
                    margin: "auto",
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "7px",
                    height: "100%",
                    width: "350px",
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
                    Parameter UE
                  </Typography>
                  <Stack spacing={1.5}>
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="N_UE"
                          label="Number of user"
                          onChange={(e) => setN_UE(e.target.value)}
                          required
                        />
                      )}
                      name="N_UE"
                      control={control}
                      defaultValue=""
                    />
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          disabled
                          id="ue_an"
                          label="Number of antenna"
                          defaultValue="8"
                          onChange={(e) => setue_an(e.target.value)}
                          required
                        />
                      )}
                      name="ue_an"
                      control={control}
                      defaultValue=""
                    />
                  </Stack>
                </Box>
              </Grid2>
            </Grid2>
            <Grid2
              container
              direction="row"
              // justifyContent="center"
              // alignItems="center"
              spacing={10}
            >
              <Grid2>
                <Box
                  sx={{
                    margin: "auto",
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "7px",
                    height: "100%",
                    width: "450px",
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
                    Parameter Channel
                  </Typography>
                  <Stack spacing={1.5}>
                    {/* <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="DSC_type"
                          label="Dedicated subcarriers type"
                          onChange={(e) => setDSC_type(e.target.value)}
                          required
                        />
                      )}
                      name="DSC_type"
                      control={control}
                      defaultValue=""
                    /> */}
                    <Controller
                      render={({ field: { onChange } }) => (
                        <Box>
                          <FormControl fullWidth>
                            <InputLabel>Dedicated subcarriers type*</InputLabel>
                            <Select
                              value={DSC_type}
                              label="Dedicated subcarriers type*"
                              onChange={(e) => {
                                setDSC_type(e.target.value);
                              }}
                              required
                            >
                              {DSC.map((name) => (
                                <MenuItem key={name} value={name}>
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      )}
                      name="DSC_type"
                      control={control}
                      defaultValue=""
                    />
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="N_cp"
                          label="Sub-Carrier Cyclic prefix"
                          onChange={(e) => setN_cp(e.target.value)}
                          required
                        />
                      )}
                      name="N_cp"
                      control={control}
                      defaultValue=""
                    />
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="Lc"
                          label="Number of Nlos Lc"
                          onChange={(e) => setLc(e.target.value)}
                          required
                        />
                      )}
                      name="Lc"
                      control={control}
                      defaultValue=""
                    />
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="Lp"
                          label="Number of Nlos Lp "
                          onChange={(e) => setLp(e.target.value)}
                          required
                        />
                      )}
                      name="Lp"
                      control={control}
                      defaultValue=""
                    />
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="As"
                          label="Angle Spread"
                          onChange={(e) => setAs(e.target.value)}
                          required
                        />
                      )}
                      name="As"
                      control={control}
                      defaultValue=""
                    />
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="K_f_dB"
                          label="Rician Factor"
                          onChange={(e) => setK_f_dB(e.target.value)}
                          required
                        />
                      )}
                      name="K_f_dB"
                      control={control}
                      defaultValue=""
                    />
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="NSD"
                          label="Noise power Spectral density "
                          onChange={(e) => setNSD(e.target.value)}
                          required
                        />
                      )}
                      name="NSD"
                      control={control}
                      defaultValue=""
                    />
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="iterMax"
                          label="Maximum Iteration"
                          onChange={(e) => setiterMax(e.target.value)}
                          required
                        />
                      )}
                      name="iterMax"
                      control={control}
                      defaultValue=""
                    />
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="Np_IRS_set"
                          label="Number of Successive time slot"
                          onChange={(e) => setNp_IRS_set(e.target.value)}
                          required
                        />
                      )}
                      name="Np_IRS_set"
                      control={control}
                      defaultValue=""
                    />
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="Ptx_dBm"
                          label="Transmit power"
                          onChange={(e) => setPtx_dBm(e.target.value)}
                          required
                        />
                      )}
                      name="Ptx_dBm"
                      control={control}
                      defaultValue=""
                    />
                    {/*  */}
                  </Stack>
                </Box>
              </Grid2>
              <Grid2>
                <Box
                  sx={{
                    margin: "auto",
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "7px",

                    width: "450px",
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
                    Parameter RIS
                  </Typography>
                  <Stack spacing={1.5}>
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="x_IRS"
                          label="x_IRS"
                          onChange={(e) => setx_IRS(e.target.value)}
                          required
                        />
                      )}
                      name="x_IRS"
                      control={control}
                      defaultValue=""
                    />
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="y_IRS"
                          label="y_IRS"
                          onChange={(e) => sety_IRS(e.target.value)}
                          required
                        />
                      )}
                      name="y_IRS"
                      control={control}
                      defaultValue=""
                    />
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="z_IRS"
                          label="z_IRS"
                          onChange={(e) => setz_IRS(e.target.value)}
                          required
                        />
                      )}
                      name="z_IRS"
                      control={control}
                      defaultValue=""
                    />
                    {/* <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="IRS_type"
                          label="Reconfigurable smart surface type"
                          onChange={(e) => setIRS_type(e.target.value)}
                          required
                        />
                      )}
                      name="IRS_type"
                      control={control}
                      defaultValue=""
                    /> */}

                    <Controller
                      render={({ field: { onChange } }) => (
                        <Box>
                          <FormControl fullWidth>
                            <InputLabel>RIS*</InputLabel>
                            <Select
                              value={IRS_type}
                              label="RIS*"
                              onChange={(e) => {
                                setIRS_type(e.target.value);
                              }}
                              required
                            >
                              {RIS.map((name) => (
                                <MenuItem key={name} value={name}>
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      )}
                      name="IRS_type"
                      control={control}
                      defaultValue=""
                    />
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="n_elm"
                          label="Size"
                          onChange={(e) => setn_elm(e.target.value)}
                          required
                        />
                      )}
                      name="n_elm"
                      control={control}
                      defaultValue=""
                    />
                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="Bw"
                          label="Bandwidth"
                          onChange={(e) => setBw(e.target.value)}
                          required
                        />
                      )}
                      name="Bw"
                      control={control}
                      defaultValue=""
                    />
                    <Controller
                      render={({ field: { onChange } }) => (
                        <Box className="box2" sx={{ width: "100%" }}>
                          <p style={{ color: "red" }}>
                            **import phase value(0-360) .xlsx file
                          </p>
                          <Button
                            style={{ width: "100%", marginTop: "16px" }}
                            variant="contained"
                            component="label"
                          >
                            เลือกไฟล์
                            <input
                              hidden
                              accept=".xlsx"
                              multiple
                              type="file"
                              onChange={handleUploadxlxs}
                              required
                            />
                          </Button>
                          <div style={{ display: "flex" }}>
                            {(() => {
                              if (filezip == "") {
                                return (
                                  <div
                                    style={{
                                      display: "flex",
                                      color: "red",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      textAlign: "center",
                                      margin: "auto",
                                      marginTop: "16px",
                                    }}
                                  >
                                    <p>ยังไม่เลือกไฟล์</p>
                                  </div>
                                );
                              } else {
                                return (
                                  <div
                                    style={{
                                      // display: "flex",
                                      color: "green",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      textAlign: "center",
                                      margin: "auto",
                                      marginTop: "16px",
                                    }}
                                  >
                                    <Button
                                      onClick={handledownload}
                                      variant="outlined"
                                    >
                                      {"ตรวจสอบไฟล์ : "}
                                      {filezip.name}
                                    </Button>
                                    <Button
                                      onClick={uploadfile}
                                      variant="contained"
                                    >
                                      {"IMPORT"}
                                    </Button>
                                    <Typography style={{ marginTop: "16px" }}>
                                      {" "}
                                      {"เวลาแก้ไขไฟล์ล่าสุด : "}
                                      {filezip.lastModifiedDate
                                        .toString()
                                        .substring(0, 25)}
                                    </Typography>
                                  </div>
                                );
                              }
                            })()}
                          </div>
                          <Button
                            variant="contained"
                            type="submit"
                            sx={{ mt: "16px", width: "100%" }}
                          >
                            Process
                          </Button>
                        </Box>
                      )}
                      name="departID"
                      control={control}
                      defaultValue=""
                    />
                  </Stack>
                </Box>
              </Grid2>
            </Grid2>
          </Grid2>
        </div>
      </form>

      <div style={{ marginTop: "50px", backgroundColor: "white" }}>
        <Typography>กราฟ</Typography>
        <Box
          sx={{
            // margin: "auto",
            mt: "50px",
            ml: "50px",
            mr: "50px",
            mb: "50px",
            backgroundColor: "white",
            // width: "100%",
            borderRadius: "7px",
            border: 2,
          }}
        >
          {" "}
          <Canvas
            camera={{ fov: 60, position: [0, 180, 50] }}
            style={{ height: "550px" }}
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
        </Box>
      </div>

      <Chart
        palette="Violet"
        dataSource={dataplot.data_prx}
        title="Received Power"
        style={{
          backgroundColor: "white",
          margin: "auto",
        }}
      >
        <CommonSeriesSettings
          argumentField="distance"
          type="spline"
          color="#E600FD"
        />
        <CommonAxisSettings>
          <Grid visible={true} />
        </CommonAxisSettings>
        {types2.map((item) => (
          <Series key={item.val} valueField={item.val} name={item.name} />
        ))}
        <Margin bottom={20} />

        <ValueAxis
          title="Received Power(dBm)"
          //   linearThreshold={-3}
          // type="logarithmic"
          pane="top"
        />

        <ArgumentAxis
          allowDecimals={false}
          axisDivisionFactor={60}
          title="Distance(m)"
        >
          {/* <Label>
                <Format type="decimal" />
              </Label> */}
        </ArgumentAxis>
        <Legend
          verticalAlignment="bottom"
          horizontalAlignment="center"
          itemTextPosition="bottom"
        />
        <Export enabled={true} />
        <Legend visible={false} />
        <Tooltip enabled={true} />
      </Chart>
      <Chart
        palette="Violet"
        dataSource={dataplot.data_spectral_efficiency}
        style={{
          backgroundColor: "white",
          margin: "auto",
        }}
      >
        {/* <Size height={580} width={800} /> */}
        <CommonSeriesSettings argumentField="SNR" type="line" color="#16DA34" />
        {types.map((item) => (
          <Series key={item.val} valueField={item.val} name={item.name}>
            {" "}
            <Point symbol="circle" size={6} />
          </Series>
        ))}
        <ValueAxis
          title="Spectral Efficiency"
          //   linearThreshold={-3}
          // type="logarithmic"
          pane="top"
        />

        <Margin bottom={20} />
        <ArgumentAxis
          title="SNR(dB)"
          valueMarginsEnabled={false}
          discreteAxisDivisionMode="crossLabels"
          // inverted={true}
          tickInterval={2}
        >
          <Grid visible={true}></Grid>
        </ArgumentAxis>
        <Legend
          verticalAlignment="bottom"
          horizontalAlignment="center"
          itemTextPosition="bottom"
        />
        <Export enabled={true} />
        <Legend visible={false} />
        <Title text="Spectral Efficiency">
          {/* <Subtitle text="(Millions of Tons, Oil Equivalent)" /> */}
        </Title>
        <Tooltip enabled={true} />
      </Chart>
      <Chart
        palette="Violet"
        dataSource={dataplot.data_ber}
        style={{
          backgroundColor: "white",
          margin: "auto",
        }}
      >
        {/* <Size height={580} width={800} /> */}
        <CommonSeriesSettings argumentField="SNR" type="line" color="#16DA34" />
        {types3.map((item) => (
          <Series key={item.val} valueField={item.val} name={item.name}>
            {" "}
            <Point symbol="circle" size={6} />
          </Series>
        ))}
        <ValueAxis
          title="Bit Error Rate"
          //   linearThreshold={-3}
          // type="logarithmic"
          pane="top"
        />

        <Margin bottom={20} />
        <ArgumentAxis
          title="SNR(dB)"
          valueMarginsEnabled={false}
          discreteAxisDivisionMode="crossLabels"
          // inverted={true}
          tickInterval={2}
        >
          <Grid visible={true}></Grid>
        </ArgumentAxis>
        <Legend
          verticalAlignment="bottom"
          horizontalAlignment="center"
          itemTextPosition="bottom"
        />
        <Export enabled={true} />
        <Legend visible={false} />
        <Title text="Bit Error Rate">
          {/* <Subtitle text="(Millions of Tons, Oil Equivalent)" /> */}
        </Title>
        <Tooltip enabled={true} />
      </Chart>

      {/* {console.log(zz)} */}

      {/* <Stack>
          <ColorMap />
        </Stack> */}
      <Snackbar
        open={open2}
        autoHideDuration={5000}
        onClose={handleClose2}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose2} severity="success" sx={{ width: "100%" }}>
          <AlertTitle>success</AlertTitle>
          อัปโหลดไฟล์เสร็จสมบูรณ์
        </Alert>
      </Snackbar>
      <Snackbar
        open={openalert}
        // autoHideDuration={5000}
        onClose={handleClose2}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose2} severity="error" sx={{ width: "100%" }}>
          <AlertTitle>Error</AlertTitle>
          ผิดพลาด
        </Alert>
      </Snackbar>
      <Snackbar
        open={open3}
        autoHideDuration={5000}
        onClose={handleClose2}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose2} severity="error" sx={{ width: "100%" }}>
          <AlertTitle>Error</AlertTitle>พบข้อผิดพลาด —{" "}
          <strong>รูปแบบไฟล์ไช่เมทริกซ์</strong>
        </Alert>
      </Snackbar>
      <Snackbar
        open={open4}
        autoHideDuration={5000}
        onClose={handleClose2}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose2} severity="error" sx={{ width: "100%" }}>
          <AlertTitle>Error</AlertTitle>พบข้อผิดพลาด —{" "}
          <strong>กรุณาอัพโหลดไฟล์ excel</strong>
        </Alert>
      </Snackbar>
      <Snackbar
        open={open5}
        autoHideDuration={5000}
        onClose={handleClose2}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose2} severity="error" sx={{ width: "100%" }}>
          <AlertTitle>Error</AlertTitle>พบข้อผิดพลาด —{" "}
          <strong>โปรดอัปโหลดไฟล์ข้อมูล RIS</strong>
        </Alert>
      </Snackbar>
      <Snackbar
        open={open6}
        autoHideDuration={5000}
        onClose={handleClose2}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose2} severity="success" sx={{ width: "100%" }}>
          <AlertTitle>success</AlertTitle>
          เสร็จสมบูรณ์
        </Alert>
      </Snackbar>
      <Snackbar
        open={open7}
        autoHideDuration={5000}
        onClose={handleClose2}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose2} severity="error" sx={{ width: "100%" }}>
          <AlertTitle>Error</AlertTitle>พบข้อผิดพลาด —{" "}
          <strong>โปรดตรวจสอบตำแหน่งของพารามิเตอร์</strong>
        </Alert>
      </Snackbar>
      <Snackbar
        open={open8}
        autoHideDuration={5000}
        onClose={handleClose2}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose2} severity="error" sx={{ width: "100%" }}>
          <AlertTitle>Error</AlertTitle>พบข้อผิดพลาด —{" "}
          <strong>โปรดตรวจสอบไฟล์ RIS และจำนวนองค์ประกอบพารามิเตอร์</strong>
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SiteSurvay;
