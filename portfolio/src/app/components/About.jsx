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
import renderBlog from "../common/RenderBlog";


  const blogStyles = {
    fontSize: 16,
    fontWeight: 500,
    defaultBold: 700,
  }

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
            {experience.achievements.map((achievement, idx) => (
              <ListItem key={idx} >{achievement}</ListItem>
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
      start: "Jan 2023",
      end: "Jan 2024",
      responsibilities: "MERN Developer",
      achievements: [
        `Built microservices for generating PDF from invoice payload`,
        `Built underlying PaaS for invoiceindia.com`,
        `Built web-app to facilitate managing customers, inventory, invoices, bills, etc. for companies.`,
      ],
    },
  ];

  const aboutMePara = [
    `I am a #b# Full Stack Web & mobile Developer #!b# from Gorakhpur, India. I build softwares and solutions which are seamless, creative and efficient. Apart from being a Developer, I am a #b# security Enthusiast #!b# .`,
    `Currently, I'm focusing on improving my Cybersecurity and Ethical hacking skills. On the learning side, I'm studying different software and security design patterns.`,
    `In my free time, I play chess and participate in CTFs and coding contests.`,
    `If you're reading this and have any ideas/projects or a career option, feel free to reach me via contact section or drop a mail at #b# www.anuragshukla@gmail.com #!b#`,
  ];

  const education = `Currently, I'm pursuing my #b# bachelors #!b# in #b# Computer Science & Engineering #!b# from #b# MMMUT, Gorakhpur, India. #!b# ;;; I have completed #b# High School #!b# & #b# Intermediate #!b# from #b# Udaya Public School, Gorakhpur, India #!b# in year 2018 & 2020 respectively.`;
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
            px={{ base: 2, md: 0 }}
          >
            <Flex alignItems="center" direction="column" gap={4}>
              <Avatar size={{ base: "2xl", md: "3xl", xl: "2xl" }} maxW="md" src="https://theanuragshukla.github.io/portfolio/static/media/myPhoto.610cd4307b0c9940c491.webp" />
              <Hide below="xl">
                <NamePlate align="center" />
              </Hide>
            </Flex>
            <VStack gap={4} pt={4} alignItems="flex-start" mb={12}>
              {aboutMePara.map((str, idx) => (
                <Text maxW={{ base: "600px", xl: "800px" }} key={idx} lineHeight="150%">
                  {renderBlog(str, blogStyles)}
                </Text>
              ))}

              <Heading fontWeight={400}>Work experience</Heading>
              <WorkExperience experiences={experiences} />

              <Heading fontWeight={400}>Education</Heading>
              <Text
                maxW={{ base: "600px", xl: "800px" }}
                fontSize="1.1rem"
                lineHeight="150%"
              >
                {renderBlog(education, blogStyles)}
              </Text>
            </VStack>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
}
