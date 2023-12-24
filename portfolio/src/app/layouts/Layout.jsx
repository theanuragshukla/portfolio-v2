import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [navConfig, modifyNav] = useState({
    visible: true,
    noLogo: false,
    allButtons:true,
    colorModeSwitch: true,
  });
  useEffect(() => {
    const x = localStorage.getItem("isAdmin");
    if (!!x) {
      const { status } = JSON.parse(x);
      if (status === true) {
        setIsAdmin(true);
      }
    }
  }, []);
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
        <Navbar isAdmin={isAdmin} {...navConfig} />
      </Box>
      <GridItem overflow="scroll">
        <Outlet
          context={{
            isAdmin,
            modifyNav,
          }}
        />
      </GridItem>
    </Grid>
  );
}
