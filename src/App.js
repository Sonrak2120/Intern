import React from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { baseTheme } from "./assets/global/Theme-variable";
import Themeroutes from "./routes/Router";

import "./App.css";

const App = () => {
  const routing = useRoutes(Themeroutes);
  const theme = baseTheme;
  return (
    <ThemeProvider theme={theme} className="App-headder">
      {routing}
    </ThemeProvider>
    // <Test />
  );
};

export default App;
