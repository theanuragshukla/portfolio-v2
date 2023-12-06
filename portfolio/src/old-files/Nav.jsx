import React from "react";
import { BatteryFull, Setting, Wifi } from "iconsax-react";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";

const Nav = () => {
  return (
    <Flex className="nav" h="40px" align="center" justify="space-between">
      <Text className="logo">/home/anurag/portfolio</Text>
      <Grid templateColumns={{ base: "1fr 1fr 1fr" }} w="90px">
        <GridItem>
          <Box>
            <Wifi />
          </Box>
        </GridItem>
        <GridItem>
          <Box>
            <BatteryFull />
          </Box>
        </GridItem>
        <GridItem>
          <Box>
            <Setting />
          </Box>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Nav;
