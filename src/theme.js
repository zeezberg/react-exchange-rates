import { createTheme, responsiveFontSizes } from "@mui/material";
import { teal } from "@mui/material/colors";

let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: teal[200],
      main: teal[500],
      dark: teal[800],
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
