import { createContext, useState } from "react";
import Helmet from "react-helmet";
import { ThemeProvider } from "styled-components";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { GlobalStyle } from "./styles/glogalStyles";
import {
  lightTheme,
  darkTheme,
  muiLightTheme,
  muiDarkTheme,
} from "./styles/theme";
import MuiThemeProvider from "./styles/MuiThemeProvider";
import AppRouter from "./hoc/AppRouter";
import { AuthProvider } from "./hoc/AuthProvider";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? lightTheme : darkTheme;
  const muiThemeStyle = theme === "light" ? muiLightTheme : muiDarkTheme;

  return (
    <>
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <ThemeProvider theme={themeStyle}>
          <MuiThemeProvider theme={muiThemeStyle}>
            <LocalizationProvider
              dateAdapter={AdapterMoment}
              adapterLocale={"ru"}
            >
              <GlobalStyle />
              <Helmet>
                <title>StudApp - Project </title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                  rel="preconnect"
                  href="https://fonts.gstatic.com"
                  crossorigin
                />
                <link
                  href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;1,300&display=swap"
                  rel="stylesheet"
                />
              </Helmet>
              <AuthProvider>
                <AppRouter />
              </AuthProvider>
            </LocalizationProvider>
          </MuiThemeProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
