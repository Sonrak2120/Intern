import React from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
import FullLayout from "../layouts/FullLayout/FullLayout";
import Test3 from "../views/page/Test3";
/****End Layouts*****/

/*****Pages******/
import Dashboard1 from "../views/dashboards/Dashboard1";
import Plot from "../views/page/Plot";
import SiteSurvay from "../views/page/SiteSurvay";
import Tab2 from "../views/page/Tab2";

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      // { path: "/", element: <Navigate to="dashboards" /> },
      // { path: "dashboards", exact: true, element: <Dashboard1 /> },
      { path: "/", element: <Navigate to="Plot" /> },
      { path: "Plot", exact: true, element: <Plot /> },
      // { path: "plot", element: <Plot /> },
      { path: "/Sit-Survay", element: <SiteSurvay /> },
      { path: "/test", element: <Test3 /> },
      { path: "/Tab2", element: <Tab2 /> },
      // { path: "/form-elements/button", element: <ExButton /> },
      // { path: "/form-elements/checkbox", element: <ExCheckbox /> },
      // { path: "/form-elements/radio", element: <ExRadio /> },
      // { path: "/form-elements/slider", element: <ExSlider /> },
      // { path: "/form-elements/switch", element: <ExSwitch /> },
    ],
  },
];

export default ThemeRoutes;
