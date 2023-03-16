import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { Button, Select, MenuItem } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import {
  PolarChart,
  Series,
  ArgumentAxis,
  Export,
  Legend,
  Point,
  Tooltip,
} from "devextreme-react/polar-chart";
import {
  Chart,
  CommonSeriesSettings,
  Margin,
  Title,
  Size,
  Grid,
  ValueAxis,
} from "devextreme-react/chart";
import Stack from "@mui/material/Stack";
import { TextField, Typography } from "@mui/material";

export const types = [{ val: "dBm", name: "dBm" }];

function Plot() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [openalert, setOpenalert] = React.useState(false);
  const [dataplot, setData] = React.useState("");

  const handleClose2 = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen2(false);
    setOpen3(false);
    setOpenalert(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const { handleSubmit, control } = useForm();

  const [filezip, setfilezip] = useState("");
  const handleUploadxlxs = (e) => {
    const fileupload = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setfilezip(fileupload);
    };
    reader.readAsDataURL(fileupload);
  };

  const handledownload = () => {
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(filezip);
    a.download = filezip.name;
    a.click();
  };

  const handleSubmits = async (event) => {
    setOpen(false);

    let headersList = {
      Accept: "*/*",
    };
    var data = {
      split_: split,
      degree_p: degree,
      freq: freq,
      file_zip: filezip,
    };
    let formdata = new FormData();
    formdata.append("split_", split);
    formdata.append("degree_p", degree);
    formdata.append("freq", freq);
    formdata.append("file_zip", filezip);
    let bodyContent = formdata;
    const reqOptions = await axios({
      url: "http://127.0.0.1:5000/plot",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    });
    let response = reqOptions;
    console.log(response.data);
    setData(response.data);
    if (reqOptions.data.message === "File uploaded successfully") {
      setOpen2(true);
    } else if (reqOptions.data.message === "invalid degree position") {
      setOpen3(true);
    } else if (reqOptions.data.message === "File extension not allowed") {
      setOpen4(true);
    } else {
      setOpenalert(true);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [split, setsplit] = useState("");
  const [degree, setdegree] = useState("");
  const [freq, setfreq] = useState("");
  const degreeType = ["หน้าชื่อไฟล์", "หลังชื่อไฟล์"];

  const onSubmit = (data) => {
    handleSubmits(data);
  };
  return (
    <div>
      {console.log(dataplot.polar_plot)}
      <div style={{ marginTop: "20px" }}>
        <Grid2 container justifyContent="center" spacing={6}>
          <Grid2>
            <PolarChart
              id="chart"
              dataSource={dataplot.polar_plot}
              title="Polar Plot"
            >
              <Size height={580} width={600} />
              <CommonSeriesSettings type="line" />
              {types.map((item) => (
                <Series key={item.val} valueField={item.val} name={item.name}>
                  {" "}
                  <Point symbol="circle" size={6} />
                </Series>
              ))}
              <Tooltip enabled={true} />
              <ArgumentAxis
                inverted={true}
                startAngle={90}
                tickInterval={45}
                period={360}
                title="dBm"
              />
              <Export enabled={true} />
              <Legend visible={false} />
            </PolarChart>
          </Grid2>
          <Grid2>
            <Chart palette="Violet" dataSource={dataplot.cart_plot}>
              <Size height={580} width={600} />
              <CommonSeriesSettings argumentField="cart_degree" type="line" />
              {types.map((item) => (
                <Series key={item.val} valueField={item.val} name={item.name}>
                  <Point symbol="circle" size={6} />
                </Series>
              ))}
              <ValueAxis title="dBm" pane="top" />

              <Margin bottom={20} />
              <ArgumentAxis
                title="Degree"
                valueMarginsEnabled={false}
                discreteAxisDivisionMode="crossLabels"
                tickInterval={30}
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
              <Title text="Cartesian Plot"></Title>
              <Tooltip enabled={true} />
            </Chart>
          </Grid2>
        </Grid2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
          textAlign: "center",
          marginTop: "15px",
        }}
      >
        <Button variant="outlined" color="primary3" onClick={handleClickOpen}>
          เพิ่มไฟล์ข้อมูล
        </Button>
        <Dialog
          maxWidth="30"
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle id="alert-dialog-title">
              {"เพิ่มไฟล์ข้อมูล"}
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2} justifyContent="center" alignItems={"center"}>
                <Stack spacing={{ xs: 1, sm: 2, md: 2 }} sx={{ mt: 5 }}>
                  <Controller
                    render={({ field: { onChange } }) => (
                      <TextField
                        sx={{ width: "450px" }}
                        id="split"
                        label="Split"
                        onChange={(e) => setsplit(e.target.value)}
                        required
                      />
                    )}
                    name="split"
                    control={control}
                    defaultValue=""
                  />

                  <Controller
                    render={({ field: { onChange } }) => (
                      <Box>
                        <FormControl fullWidth>
                          <InputLabel>ตำแหน่ง(องศา)*</InputLabel>
                          <Select
                            id="cc"
                            label="ตำแหน่ง(องศา)*"
                            // onChange={(e) => setdegree(e.target.value)}
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              const apiValue =
                                selectedValue === "หน้าชื่อไฟล์" ? "0" : "1";
                              setdegree(apiValue);
                            }}
                            required
                          >
                            {degreeType.map((name) => (
                              <MenuItem key={name} value={name}>
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    )}
                    name="degree"
                    control={control}
                    defaultValue=""
                  />
                  <Controller
                    render={({ field: { onChange } }) => (
                      <TextField
                        sx={{ width: "450px" }}
                        id="freq"
                        label="ความถี่"
                        onChange={(e) => setfreq(e.target.value)}
                        required
                      />
                    )}
                    name="freq"
                    control={control}
                    defaultValue=""
                  />
                  <Controller
                    render={({ field: { onChange } }) => (
                      <Box className="box2" sx={{ width: "450px" }}>
                        <p style={{ color: "red" }}>*ไฟล์ Zip/rar</p>
                        <Button
                          style={{ minWidth: "100%", marginTop: "16px" }}
                          variant="contained"
                          component="label"
                        >
                          เลือกไฟล์
                          <input
                            hidden
                            accept=".rar,.zip"
                            multiple
                            type="file"
                            onChange={handleUploadxlxs}
                            required
                          />
                        </Button>
                        <div style={{ display: "flex" }}>
                          {(() => {
                            if (filezip === "") {
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
                      </Box>
                    )}
                    name="departID"
                    control={control}
                    defaultValue=""
                  />
                  <br />
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>ยกเลิก</Button>
              <Button type="submit">Plot</Button>
            </DialogActions>
          </form>
        </Dialog>
        <Snackbar
          open={open2}
          autoHideDuration={5000}
          onClose={handleClose2}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose2}
            severity="success"
            sx={{ width: "100%" }}
          >
            เสร็จสมบูรณ์
          </Alert>
        </Snackbar>
        <Snackbar
          open={openalert}
          onClose={handleClose2}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose2} severity="error" sx={{ width: "100%" }}>
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
            <strong>กรุณาตรวจสอบตำแหน่งขององศา</strong>
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
            <strong>ไม่อนุญาตให้ใช้นามสกุลไฟล์</strong>
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Plot;
