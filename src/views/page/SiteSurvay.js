import React from "react";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import TextField from "@mui/material/TextField";
import { styled, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

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

function SiteSurvay() {
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
  const [dataplot, setData] = React.useState("");
  const handleSubmits = async (event) => {
    let headersList = {
      Accept: "application / json",
    };
    var data = {
      x_BS: x_BS,
      z_BS: z_BS,
      x_IRS: x_IRS,
      y_IRS: y_IRS,
      z_IRS: z_IRS,
      lightspeed: lightspeed,
      fc: fc,
      bs_an: bs_an,
      DSC_type: DSC_type,
      IRS_type: IRS_type,
      N_cp: N_cp,
      Lc: Lc,
      Lp: Lp,
      As: As,
      NSD: NSD,
      iterMax: iterMax,
      Np_IRS_set: Np_IRS_set,
      Ptx_dBm: Ptx_dBm,
      n_elm: n_elm,
      Bw: Bw,
      N_UE: N_UE,
      ue_an: ue_an,
    };
    let formdata = new FormData();
    formdata.append("x_BS", x_BS);
    formdata.append("z_BS", z_BS);
    formdata.append("x_IRS", x_IRS);
    formdata.append("y_IRS", y_IRS);
    formdata.append("z_IRS", z_IRS);
    formdata.append("lightspeed", lightspeed);
    formdata.append("fc", fc);
    formdata.append("bs_an", bs_an);
    formdata.append("DSC_type", DSC_type);
    formdata.append("IRS_type", IRS_type);
    formdata.append("N_cp", N_cp);
    formdata.append("Lc", Lc);
    formdata.append("Lp", Lp);
    formdata.append("As", As);
    formdata.append("K_f_dB", K_f_dB);
    formdata.append("NSD", NSD);
    formdata.append("iterMax", iterMax);
    formdata.append("Np_IRS_set", Np_IRS_set);
    formdata.append("Ptx_dBm", Ptx_dBm);
    formdata.append("n_elm", n_elm);
    formdata.append("Bw", Bw);
    formdata.append("N_UE", N_UE);
    formdata.append("ue_an", ue_an);

    let bodyContent = formdata;
    const reqOptions = await axios({
      url: "http://127.0.0.1:5000/new-site-survey",
      method: "GET",
      headers: headersList,
      data: bodyContent,
    });
    let response = reqOptions;
    console.log(response.data);
    setData(response.data);
  };

  const onSubmit = (data) => {
    handleSubmits(data);
  };

  return (
    <div className="wrapper2">
      <form onSubmit={handleSubmit(onSubmit)}>
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
                height: "100%",
                width: "100%",
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
                      id="lightspeed"
                      label="lightspeed"
                      onChange={(e) => setlightspeed(e.target.value)}
                      required
                    />
                  )}
                  name="lightspeed"
                  control={control}
                  defaultValue=""
                />
                <Controller
                  render={({ field: { onChange } }) => (
                    <TextFieldCustom
                      id="fc"
                      label="fc"
                      onChange={(e) => setfc(e.target.value)}
                      required
                    />
                  )}
                  name="fc"
                  control={control}
                  defaultValue=""
                />
                <Controller
                  render={({ field: { onChange } }) => (
                    <TextFieldCustom
                      id="bs_an"
                      label="bs_an"
                      onChange={(e) => setbs_an(e.target.value)}
                      required
                    />
                  )}
                  name="bs_an"
                  control={control}
                  defaultValue=""
                />
                <Controller
                  render={({ field: { onChange } }) => (
                    <TextFieldCustom
                      id="DSC_type"
                      label="DSC_type"
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
                      id="IRS_type"
                      label="IRS_type"
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
                      id="N_cp"
                      label="N_cp"
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
                      label="Lc"
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
                      label="Lp"
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
                      label="As"
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
                      label="K_f_dB"
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
                      label="NSD"
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
                      label="iterMax"
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
                      label="Np_IRS_set"
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
                      label="Ptx_dBm"
                      onChange={(e) => setPtx_dBm(e.target.value)}
                      required
                    />
                  )}
                  name="Ptx_dBm"
                  control={control}
                  defaultValue=""
                />
                <Controller
                  render={({ field: { onChange } }) => (
                    <TextFieldCustom
                      id="n_elm"
                      label="n_elm"
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
                      label="Bw"
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
                    <TextFieldCustom
                      id="N_UE"
                      label="N_UE"
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
                      label="ue_an"
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
          </Stack>
          <Button type="submit">Process</Button>
        </Box>
      </form>
      {/* {console.log(zz)} */}
    </div>
  );
}

export default SiteSurvay;
