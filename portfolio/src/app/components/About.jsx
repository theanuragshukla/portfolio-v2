import React, { useState } from "react";
import {
    Avatar,
    Flex,
    Grid,
    GridItem,
    Heading,
    Hide,
    Text,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";

import "../../styles/global.scss";
import NamePlate from "../common/NamePlate";
import Terminal from "../../old-files/Terminal";

export default function About() {
    const [wins, setWins] = useState([
        {
            id: 1,
            title: "Terminal",
            active: false,
            height: "100%",
            width: "100%",
            max: false,
            min: false,
            element: Terminal,
        },
    ]);

    const shadow = useColorModeValue(
        { boxShadow: "0px 0px 15px -3px rgba(0, 0, 0, 0.2)" },
        { boxShadow: "0px 0px 15px -3px rgba(255, 255, 255,  0.4)" }
    );

    return (
        <>
            <Hide above="xl">
                <NamePlate />
            </Hide>
            <Grid templateColumns={{ base: "1fr" }}>
                <GridItem>
                    <Flex
                        flexDir={{
                            base: "column",
                            md: "row-reverse",
                            xl: "column",
                        }}
                        align={{
                            base: "center",
                            md: "flex-start",
                            xl: "center",
                        }}
                        justify={{
                            base: "center",
                            md: "space-around",
                            xl: "center",
                        }}
                        pt={4}
                        gap={4}
                    >
                        <Flex alignItems="center" direction="column" gap={4}>
                            <Avatar
                                size={{ base: "2xl", md: "3xl", xl: "2xl" }}
                            />
                            <Hide below="xl">
                                <NamePlate align="center" />
                            </Hide>
                        </Flex>
                        <VStack gap={4} pt={4} alignItems="flex-start">
                            <Text
                                maxW={{ base: "600px", xl: "800px" }}
                                fontSize="1.1rem"
                                lineHeight="150%"
                            >
                                I am a Full Stack Web & mobile Developer from
                                Gorakhpur, India. I have a passion for creating
                                seamless, beautiful and creative websites. I
                                have experience with various programming
                                languages and specifically web technologies.
                            </Text>
                            <Heading fontWeight={400}>Education</Heading>
                            <Text
                                maxW={{ base: "600px", xl: "800px" }}
                                fontSize="1.1rem"
                                lineHeight="150%"
                            >
                                Currently, I'm pursuing my bachelors in Computer
                                Science & Engineering from MMMUT, Gorakhpur,
                                India.
                                <br />I have completed High School &
                                Intermediate from Udaya Public School,
                                Gorakhpur, India in year 2018 & 2020
                                respectively.
                            </Text>
                            <Heading fontWeight={400}>Education</Heading>
                            <Text
                                maxW={{ base: "600px", xl: "800px" }}
                                fontSize="1.1rem"
                                lineHeight="150%"
                            >
                                Currently, I'm pursuing my bachelors in Computer
                                Science & Engineering from MMMUT, Gorakhpur,
                                India.
                                <br />I have completed High School &
                                Intermediate from Udaya Public School,
                                Gorakhpur, India in year 2018 & 2020
                                respectively.
                            </Text>
                            <Heading fontWeight={400}>Education</Heading>
                            <Text
                                maxW={{ base: "600px", xl: "800px" }}
                                fontSize="1.1rem"
                                lineHeight="150%"
                            >
                                Currently, I'm pursuing my bachelors in Computer
                                Science & Engineering from MMMUT, Gorakhpur,
                                India.
                                <br />I have completed High School &
                                Intermediate from Udaya Public School,
                                Gorakhpur, India in year 2018 & 2020
                                respectively.
                            </Text>
                        </VStack>
                    </Flex>
                </GridItem>
            </Grid>
        </>
    );
}
