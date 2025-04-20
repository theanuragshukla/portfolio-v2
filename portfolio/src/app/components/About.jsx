import React, { useEffect, useState } from "react";
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
  Spacer,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";

import "../../styles/global.scss";
import NamePlate from "../common/NamePlate";
import renderBlog from "../common/RenderBlog";
import { EXTRAS_URLS } from "../constants";
import Loader from "../common/Loader";
import { setLocale } from "yup";

const blogStyles = {
  fontSize: 16,
  fontWeight: 500,
  defaultBold: 700,
};

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
            {experience.end === "ongoing" ? "Responsibilities" : "Achievements"}
            :
          </Text>
          <UnorderedList>
            {experience.achievements.map((achievement, idx) => (
              <ListItem key={idx}>{achievement}</ListItem>
            ))}
          </UnorderedList>
          <Divider my={2} />
        </Box>
      ))}
    </>
  );
};

export default function About() {
  const [aboutMePara, setAboutMePara] = React.useState([]);
  const [experiences, setExperiences] = React.useState([]);
  const [education, setEducation] = React.useState("");

  const [loading, setLoading] = useState({
    aboutMePara: true,
    experiences: true,
    education: true,
  });

  useEffect(() => {
    fetch(EXTRAS_URLS.ABOUT)
      .then((res) => res.json())
      .then((data) => {
        setAboutMePara(data);
        setLoading((prev) => ({ ...prev, aboutMePara: false }));
      });
    fetch(EXTRAS_URLS.EXPERIENCE)
      .then((res) => res.json())
      .then((data) => {
        setExperiences(data);
        setLoading((prev) => ({ ...prev, experiences: false }));
      });

    fetch(EXTRAS_URLS.EDUCATION)
      .then((res) => res.json())
      .then((data) => {
        setEducation(data[0]);
        setLoading((prev) => ({ ...prev, education: false }));
      });
  }, []);
  return (
    <>
      <Hide above="xl">
        <NamePlate />
      </Hide>
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
          <Avatar
            size={{ base: "2xl", md: "3xl", xl: "2xl" }}
            maxW="md"
            src="https://theanuragshukla.github.io/portfolio/static/media/myPhoto.610cd4307b0c9940c491.webp"
          />
          <Hide below="xl">
            <NamePlate align="center" />
          </Hide>
        </Flex>
        <VStack flexGrow={1} gap={4} pt={4} alignItems="flex-start" mb={12} w="100%" maxW="3xl">
          {loading.aboutMePara ? (
            <Loader isLoading />
          ) : (
            aboutMePara.map((str, idx) => (
              <Text
                maxW={{ base: "600px", xl: "800px" }}
                key={idx}
                lineHeight="150%"
              >
                {renderBlog(str, blogStyles)}
              </Text>
            ))
          )}

          <Heading fontWeight={400}>Work experience</Heading>
          {loading.experiences ? (
            <Loader isLoading />
          ) : (
            <WorkExperience experiences={experiences} />
          )}

          <Heading fontWeight={400}>Education</Heading>
          <Text
            maxW={{ base: "600px", xl: "800px" }}
            fontSize="1.1rem"
            lineHeight="150%"
          >
            {loading.education ? <Loader isLoading /> : renderBlog(education, blogStyles)}
          </Text>
        </VStack>
      </Flex>
    </>
  );
}
