import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, useMediaQuery, VStack } from "@chakra-ui/react";

import "../../styles/global.scss";
import Resolver from "../../old-files/Shuffler";

export default function Home() {
    const [isMd] = useMediaQuery("(min-width: 768px)");

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
                        fontWeight={200}
                    >
                        <Resolver
                            strings={["I am Anurag"]}
                            loop={false}
                            constant="Hii, "
                            timeout={10}
                            iterations={5}
                            callback={() => console.log("Logo Finished")}
                        />
                    </Heading>
                </VStack>
            </Flex>
        </Box>
    );
}
