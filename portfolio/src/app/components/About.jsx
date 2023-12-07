import React from "react";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Hide,
  HStack,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";

import "../../styles/global.scss";
import NamePlate from "../common/NamePlate";

const WorkExperience = ({ experiences }) => {
  return (
    <>
      {experiences.map((experience, index) => (
        <Box key={index} width="100%">
          <Text
            fontWeight="300"
            fontSize={24}
            textDecor="underline"
            textUnderlineOffset={4}
            textDecorationThickness={1}
          >
            {experience.name}
          </Text>
          <HStack justifyContent="space-between" alignItems="center" mt={0}>
            <Text>
              {experience.start} - {experience.end}
            </Text>
          </HStack>
          <Text mt={0}>{experience.responsibilities}</Text>
          <Text mt={2} fontWeight="400" fontSize={20}>
            Achievements:
          </Text>
          <UnorderedList>
            {experience.achievements.map((achievement) => (
              <ListItem>{achievement}</ListItem>
            ))}
          </UnorderedList>
          <Divider my={2} />
        </Box>
      ))}
    </>
  );
};

export default function About() {
  const experiences = [
    {
      name: "The Development Studio",
      start: "Jan 2021",
      end: "current",
      responsibilities: "Full Stack MERN Developer",
      achievements: [
        "Built microservices for generating PDF from invoice payload",
        "Built underlying PaaS for invoiceindia.com",
        "Built web-app to facilitate managing customers, inventory, invoices, bills, etc. for companies.",
      ],
    },
  ];

  const aboutMePara = [
    "Hey, I am a Full Stack Web & mobile Developer from Gorakhpur, India. I build softwares and solutions which are seamless, creative and comply with 12-factor standards. Apart from being a Developer, I recognize myself as a Cybersecurity Architect.",
    "One of the major advantage I've over others is my vast knowledge-base. It helps me to analyze a problem from different perspective find solutions by utilising more than one technology which normal people don't know is a possibility.",
    "Currently, I'm focusing on improving my skills Cybersecurity and Ethical hacking skills. On the learning side, I'm studying different software and security design patterns.",
    "In my free time, I play chess and participate in CTFs and coding contests.",
    "If you're reading this and have any ideas/projects or a career option, feel free to reach me via contact section or drop a mail at www.anuragshukla@gmail.com",
  ];

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
              <Avatar size={{ base: "2xl", md: "3xl", xl: "2xl" }} />
              <Hide below="xl">
                <NamePlate align="center" />
              </Hide>
            </Flex>
            <VStack gap={4} pt={4} alignItems="flex-start">
              {aboutMePara.map((str) => (
                <Text
                  maxW={{ base: "600px", xl: "800px" }}
                  fontSize="1.1rem"
                  lineHeight="150%"
                >
                  {str}
                </Text>
              ))}

              <Heading fontWeight={400}>Education</Heading>
              <Text
                maxW={{ base: "600px", xl: "800px" }}
                fontSize="1.1rem"
                lineHeight="150%"
              >
                Currently, I'm pursuing my bachelors in Computer Science &
                Engineering from MMMUT, Gorakhpur, India.
                <br />I have completed High School & Intermediate from Udaya
                Public School, Gorakhpur, India in year 2018 & 2020
                respectively.
              </Text>
              <Heading fontWeight={400}>Work experience</Heading>
              <WorkExperience experiences={experiences} />
            </VStack>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
}
