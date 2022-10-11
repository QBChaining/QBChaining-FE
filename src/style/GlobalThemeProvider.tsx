import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import GlobalStyle from "./GlobalStyle";
const GlobalThemeProvider = ({ children }: any) => {
  return (
    <ThemeProvider theme={{ ...theme }}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default GlobalThemeProvider;
