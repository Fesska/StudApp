import React from "react";
import { ThemeProvider } from "@mui/material";

const MuiThemeProvider = ({ children, ...props }) => {
  return <ThemeProvider theme={props.theme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
