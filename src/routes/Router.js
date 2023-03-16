import React from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
import FullLayout from "../layouts/FullLayout/FullLayout";
/****End Layouts*****/

/*****Pages******/
import Dashboard1 from "../views/dashboards/Dashboard1";
import Plot from "../views/page/Plot";
import SiteSurvay from "../views/page/SiteSurvay";
import Comparerissize from "../views/page/Comparerissize";

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="Plot" /> },
      { path: "Plot", exact: true, element: <Plot /> },
      { path: "/Sit-Survay", element: <SiteSurvay /> },
      { path: "/test", element: <Dashboard1 /> },
      { path: "/Compare-RIS-size", element: <Comparerissize /> },
    ],
  },
];

export default ThemeRoutes;
