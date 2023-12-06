import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { HashRouter } from "react-router-dom";
import Router from "./Router";
import theme from "../styles/theme";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <HashRouter>
        <Router />
      </HashRouter>
    </ChakraProvider>
  );
}
