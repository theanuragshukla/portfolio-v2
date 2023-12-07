import React from "react";
import {
  Box,
  Flex,
  Heading,
  VStack,
} from "@chakra-ui/react";

import "../../styles/global.scss";
import Resolver from "../../old-files/Shuffler";

export default function Home() {
  return (
    <Box>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        h="100%"
        align={{ base: "center" }}
        justify="center"
        pt={4}
        gap={2}
        minH="50vh"
      >
        <VStack align="flex-start" w="100%">
          <Heading
            fontSize={{ base: 24, sm: 36, md: 52 }}
            fontWeight={{ base: 400, md: 200 }}
          >
            <Resolver
              strings={["Anurag", "a web developer", "a security architect"]}
              loop={true}
              constant="Hii, I'm "
              timeout={10}
              iterations={5}
              callback={() => {}}
            />
          </Heading>
        </VStack>
      </Flex>
    </Box>
  );
}
