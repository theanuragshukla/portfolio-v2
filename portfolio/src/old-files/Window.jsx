import React from "react";
import {
  ArrowCircleDown,
  Box1,
  CloseCircle,
  LayoutMaximize,
} from "iconsax-react";
import "./global.scss";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { motion } from "framer-motion";

function Window({ info,  children, wins, setWins }) {

  return (
      <Grid
        templateRows="auto 1fr"
        className={info.max ? "window max" : "window"}
        h={info.max ? "100%" : info.height}
        w={info.max ? "100%" : info.width}
        zIndex={info.active ? 99 : 1}
        overflow="hidden"
      borderRadius="md"
      as={motion.div}
      drag
      dragSnapToOrigin
      >
        <GridItem>
          <Grid
            className="title"
            height="30px"
            templateColumns="auto 1fr auto"
            alignItems="center"
          >
            <GridItem>
              <Flex className="icon" justify="center" align="center">
                <Box1 />
              </Flex>
            </GridItem>
            <GridItem className="handle">
              <Flex className="name" justify="center" align="center">
                {info.title}
              </Flex>
            </GridItem>
            <GridItem>
              <Flex justify="center" align="center" gap={1}>
                {info.max ? (
                  <ArrowCircleDown  />
                ) : (
                  <LayoutMaximize  />
                )}
                <CloseCircle />
              </Flex>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem overflowY="scroll">{children}</GridItem>
      </Grid>

  );
}

export default Window;
