import { Box, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <Grid
      px={{ base: 4, md: 8 }}
      pb={8}
      pt={2}
      templateRows="auto 1fr"
      maxW="1920px"
      margin="auto"
    >
      <Box mb={4}>
        <Navbar />
      </Box>
      <GridItem overflow="scroll">
        <Outlet />
      </GridItem>
    </Grid>
  );
}
