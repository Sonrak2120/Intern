import React from "react";
import { Box, Link, Typography } from "@mui/material";
const Footer = () => {
  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography>
        © 2021 All rights reserved by{" "}
        <Link href="https://www.google.com">Sonrak&Sathita ComSci-KPS</Link>{" "}
      </Typography>
    </Box>
  );
};

export default Footer;
