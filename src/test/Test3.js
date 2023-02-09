import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
// import { dataSource } from "./data";

import { createSlice } from "@reduxjs/toolkit";

import {
  PolarChart,
  Series,
  ArgumentAxis,
  Export,
  Legend,
  Point,
  Tooltip,
  // CommonSeriesSettings,
} from "devextreme-react/polar-chart";
import {
  Chart,
  // Series,
  // ArgumentAxis,
  CommonSeriesSettings,
  // Export,
  // Legend,
  Margin,
  Title,
  Subtitle,
  Size,
  // Tooltip,
  Grid,
  Label,
  ValueAxis,
} from "devextreme-react/chart";
import Stack from "@mui/material/Stack";
import { TextField, Typography } from "@mui/material";

export const types = [{ val: "dBm", name: "dBm" }];

function Test3() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [openalert, setOpenalert] = React.useState(false);
  const [dataplot, setData] = React.useState("");

  const handleClick2 = () => {
    setOpen2(true);
    setOpenalert(true);
  };

  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen2(false);
    setOpenalert(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [filezip, setfilezip] = useState("");
  const handleUploadxlxs = (e) => {
    const fileupload = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setfilezip(fileupload);
    };
    reader.readAsDataURL(fileupload);
  };
  // console.log("ffile_zip", filezip);

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
      file: filezip,
    };
    let formdata = new FormData();
    formdata.append("split_", split);
    formdata.append("degree_p", degree);
    formdata.append("freq", freq);
    formdata.append("file", filezip);
    let bodyContent = formdata;
    const reqOptions = await axios({
      url: "http://127.0.0.1:5000/read_ris_file",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    });
    let response = reqOptions;
    // console.log(response.data);
    setData(response.data);
    if (reqOptions.data.message == "File uploaded successfully") {
      setOpen2(true);
      // window.location.reload("Refresh");
    } else {
      setOpenalert(true);
      // console.log("ผิดพลาด", reqOptions.data.message);
      window.location.reload("Refresh");
    }
  };
  // console.log(open2);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [split, setsplit] = useState("");
  const [degree, setdegree] = useState("");
  const [freq, setfreq] = useState("");

  const onSubmit = (data) => {
    handleSubmits(data);
  };
  return (
    <div>
      {console.log(dataplot.polar_plot)}

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
                <Stack
                  //   direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 2 }}
                  sx={{ mt: 5 }}
                >
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
              <Button type="submit">เพิ่ม</Button>
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
          // autoHideDuration={5000}
          onClose={handleClose2}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose2} severity="error" sx={{ width: "100%" }}>
            ผิดพลาด
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Test3;
