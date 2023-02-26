import React from "react";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import TextField from "@mui/material/TextField";
import { styled, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

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
export const types2 = [{ val: "se", name: "se" }];

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

function Tab2() {
  const [open, setOpen] = React.useState(false);
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
    // setdata_ris(response.data.data_ris);
    setLoading(false);
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
  const [size, setSize] = useState([0]);
  const [Bw, setBw] = React.useState([]);
  const [N_UE, setN_UE] = React.useState([]);
  const [ue_an, setue_an] = React.useState([]);
  const [data_ris, setdata_ris] = React.useState([]);
  const [dataplot, setData] = React.useState("");

  const [input, setInput] = useState([0]);

  const OnbtnUpClick = () => {
    if (input.length < 10) {
      setInput([...input, input[input.length - 1] + 1]);
      setSize([...size, 0]);
    }
  };

  const OnbtnDelClick = () => {
    const temp = input;
    const temp2 = size;
    if (temp.length > 1) temp.pop();
    temp2.pop();
    setInput([...temp]);
    setSize([...temp2]);
  };

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
      size: size,
      Bw: parseFloat(Bw),
      N_UE: parseFloat(N_UE),
      ue_an: parseFloat(ue_an),
      // data_ris: data_ris,
    };

    console.log(typeof size);

    let bodyContent = data;

    const reqOptions = await axios({
      url: "http://127.0.0.1:5000/compare-ris-size",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    });
    let response = reqOptions;
    console.log(response.data);
    setLoading(false);
    setData(response.data);
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
                          id="bs_an"
                          label="Number of antena"
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
                          id="ue_an"
                          label="Number of antena"
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
                    <Controller
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
                    />

                    <Controller
                      render={({ field: { onChange } }) => (
                        <TextFieldCustom
                          id="N_cp"
                          label="Sub-Carrier"
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
                          id="IRS_type"
                          label="Reconfigurable smart surface type"
                          onChange={(e) => setIRS_type(e.target.value)}
                          required
                        />
                      )}
                      name="IRS_type"
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
                        <>
                          <Typography>Size*</Typography>
                          <div
                            style={{
                              display: "flex",
                            }}
                          >
                            <div>
                              <Stack spacing={2}>
                                {input.map((item, index) => {
                                  return (
                                    <div key={index}>
                                      <TextField
                                        id="outlined-basic"
                                        label={`>Input size ตัวที่ ${item + 1}`}
                                        variant="outlined"
                                        type="number"
                                        onChange={(e) => {
                                          const temp = size;
                                          temp[index] = Number(e.target.value);
                                          setSize([...temp]);
                                        }}
                                        required
                                      />
                                    </div>
                                  );
                                })}
                              </Stack>
                              <div
                                style={{
                                  justifyContent: "center",
                                  alignContent: "center",
                                  display: "flex",
                                }}
                              >
                                <IconButton onClick={OnbtnUpClick}>
                                  <AddCircleIcon />
                                </IconButton>
                                <IconButton onClick={OnbtnDelClick}>
                                  <RemoveCircleIcon />
                                </IconButton>
                              </div>
                            </div>
                            <div
                              style={{
                                justifyContent: "center",
                                alignContent: "center",
                                display: "flex",
                                width: "50%",
                              }}
                            >
                              <Button
                                variant="contained"
                                type="submit"
                                style={{
                                  height: "75px",
                                  width: "70%",
                                  margin: "auto",
                                }}
                                onClick={() => {
                                  if (size.every((item) => item >= 10)) {
                                    console.log(size);
                                  } else {
                                    alert("ขนาดต้องมากกว่า 10");
                                  }
                                }}
                              >
                                Process
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                      name="size"
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
      <div style={{ marginTop: "50px" }}>
        <Chart
          palette="Violet"
          dataSource={dataplot.se_plot}
          title="Received Power(dBm)"
          style={{
            backgroundColor: "white",
            margin: "auto",
          }}
        >
          <CommonSeriesSettings
            argumentField="size"
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

          <ValueAxis title="SNE" pane="top" />

          <ArgumentAxis
            allowDecimals={false}
            axisDivisionFactor={60}
            title="SIZE"
          ></ArgumentAxis>
          <Legend
            verticalAlignment="bottom"
            horizontalAlignment="center"
            itemTextPosition="bottom"
          />
          <Export enabled={true} />
          <Legend visible={false} />
          <Tooltip enabled={true} />
        </Chart>
        {/* <Chart
          palette="Violet"
          dataSource={dataplot.data_spectral_efficiency}
          style={{
            backgroundColor: "white",
            margin: "auto",
          }}
        >
          <CommonSeriesSettings
            argumentField="SNR"
            type="line"
            color="#16DA34"
          />
          {types.map((item) => (
            <Series key={item.val} valueField={item.val} name={item.name}>
              {" "}
              <Point symbol="circle" size={6} />
            </Series>
          ))}
          <ValueAxis
            title="SE"
            pane="top"
          />

          <Margin bottom={20} />
          <ArgumentAxis
            title="Size"
            valueMarginsEnabled={false}
            discreteAxisDivisionMode="crossLabels"
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
          <Title text="RIS">
          </Title>
          <Tooltip enabled={true} />
        </Chart> */}
      </div>
    </div>
  );
}

export default Tab2;