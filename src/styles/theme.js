import { createTheme } from "@mui/material";

export const lightTheme = {
  text: "rgb(45,45,45)",
  text2: "rgb(68, 68, 68)",
  textFade: "rgba(45, 45, 45, 0.3)",
  textSecondary: "rgb(241, 241, 241)",
  textSecondary2: "rgb(216, 216, 216)",
  textSecondaryFade: "rgba(241, 241, 241, 0.4)",
  bg: "rgb(255,255,255)",
  bgAlpha: "rgba(250,250,250,.3)",
  bg2: "rgb(245,245,245)",
  bg3: "rgb(230,230,230)",
  bgSecondary: "rgb(20, 20, 20)",
  red: "rgb(200, 117, 117)",
  primary: "rgb(52, 131, 235)",
};
export const darkTheme = {
  text: "rgb(210,210,210)",
  text2: "rgb(187, 187, 187)",
  textFade: "rgba(210, 210, 210, 0.3)",
  textSecondary: "rgb(45, 45, 45)",
  textSecondary2: "rgb(68, 68, 68)",
  textSecondaryFade: "rgba(45, 45, 45, 0.4)",
  bg: "rgb(15,15,15)",
  bgAlpha: "rgba(0,0,0,.3)",
  bg2: "rgb(30,30,30)",
  bg3: "rgb(50,50,50)",
  bgSecondary: "rgb(245, 245, 245)",
  red: "rgb(200, 117, 117)",
  primary: "rgb(52, 131, 235)",
};

export const muiDarkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export const muiLightTheme = createTheme({
  palette: {
    mode: "light",
  },
});
