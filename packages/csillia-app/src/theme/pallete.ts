import { createTheme } from "@mui/material";
import colors from "../styles/utilities/colorsJs.module.scss";

export const Theme: any = createTheme({
  components: {
    // Name of the component
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: `#ffff !important`,
          boxShadow: "none !important",
          borderRadius: "10px !important",
          border: "box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.16);",
        },
      },
    },
  },
});
