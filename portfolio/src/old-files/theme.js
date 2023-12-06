import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#ECEFF4",
      100: "#D8DEE9",
      200: "#E5E9F0",
      300: "#81A1C1",
      400: "#5E81AC",
      500: "#4C566A",
      600: "#434C5E",
      700: "#3B4252",
      800: "#2E3440",
      900: "#282C34",
    },
    gray: {
      50: "#D8DEE9",
      100: "#E5E9F0",
      200: "#ECEFF4",
      300: "#8FBCBB",
      400: "#88C0D0",
      500: "#81A1C1",
      600: "#5E81AC",
      700: "#4C566A",
      800: "#434C5E",
      900: "#3B4252",
    },
  },
  components: {
    IconButton: {
      baseStyle: {
        bg: "red",
      },
    },
  },
});

export default theme;
