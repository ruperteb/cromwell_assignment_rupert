"use client";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  /* cssVariables: true, */
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

theme = responsiveFontSizes(theme);

export default theme;
