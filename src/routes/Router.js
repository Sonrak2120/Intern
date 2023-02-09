import React from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
import FullLayout from "../layouts/FullLayout/FullLayout";
import Test3 from "../test/Test3";
/****End Layouts*****/

/*****Pages******/
import Dashboard1 from "../views/dashboards/Dashboard1";
import Plot from "../views/page/Plot";
import SiteSurvay from "../views/page/SiteSurvay";

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="dashboards" /> },
      { path: "dashboards", exact: true, element: <Dashboard1 /> },
      { path: "plot", element: <Plot /> },
      { path: "/Sit-Survay", element: <SiteSurvay /> },
      { path: "/test", element: <Test3 /> },
      // { path: "/form-elements/autocomplete", element: <ExAutoComplete /> },
      // { path: "/form-elements/button", element: <ExButton /> },
      // { path: "/form-elements/checkbox", element: <ExCheckbox /> },
      // { path: "/form-elements/radio", element: <ExRadio /> },
      // { path: "/form-elements/slider", element: <ExSlider /> },
      // { path: "/form-elements/switch", element: <ExSwitch /> },
    ],
  },
];

export default ThemeRoutes;
