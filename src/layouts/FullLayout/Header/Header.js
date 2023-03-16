import React from "react";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

const Header = (props) => {
  return (
    <AppBar sx={props.sx} elevation={0} className={props.customClass}>
      <Toolbar>
        <IconButton
          color="primary2"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <MenuOutlinedIcon width="20" height="20" />
        </IconButton>

        <Typography
          variant="h1"
          sx={{
            color: "white",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            margin: "auto",
          }}
        >
          กลุ่มวิจัยอุปกรณ์สเปกโทรสโกปีและเซนเซอร์
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
