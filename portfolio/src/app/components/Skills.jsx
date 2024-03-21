import {
  Badge,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { getRepoCount } from "../data/managers/blog";
import { CustomBar } from "./Navbar";
import { More2 } from "iconsax-react";
import { skills, TYPES, TypeDict, Icons } from "../constants";

const getGithubSearchUrl = (lang, user = "theanuragshukla") =>
  `https://github.com/search?q=org%3A${user}++language%3A${lang}+&type=repositories`;

const SkillCard = ({
  name,
  level,
  projectCount,
  githubLink,
  SkillIcon = More2,
}) => {
  const getBadgeColor = () => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "gray";
      case "intermediate":
        return "blue";
      case "expert":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <Box w="100%">
      <Flex align="center" gap={2} justify="space-between">
        <HStack>
          <SkillIcon size={24} />
          <Heading fontSize="md" fontWeight={400} textTransform="capitalize">
            {name}{" "}
          </Heading>
        </HStack>
        <Badge borderRadius="full" px="2" colorScheme={getBadgeColor()}>
          {level}
        </Badge>
      </Flex>
      {!!githubLink && (
        <Text>
          <Link mt={2} color="teal.500" href={githubLink} isExternal>
            {projectCount} projects
          </Link>
        </Text>
      )}
      <Divider my={4} />
    </Box>
  );
};

export default function Skills() {
  const getCount = (lang) =>
    getRepoCount(lang)
      .then((res) => res.data)
      .then((res) => (!!res ? res : null));

  const [data, setData] = useState({});
  const elemRefs = useRef([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    async function fetchData(lang) {
      const res = await getCount(lang);
      if (!!res)
        setData((o) => ({
          ...o,
          [lang]: res.count,
        }));
    }
    if (!skills) return;
    skills[TYPES.PLANG].map(({ name }) => fetchData(name));
  }, []);

  const handleClick = (i) => {
    setIdx(i);
  };

  const [btns, setBtns] = useState([]);
  useEffect(() => {
    const obj = [];
    Object.entries(TypeDict).forEach(([k, v], i) => {
      if (v.length === 0) return;
      obj.push({
        title: v,
        onClick: () => {
          handleClick(i);
        },
        Icon: Icons[k],
      });
    });
    setBtns(obj);
  }, []);

  return (
    <Grid
      gap={10}
      width="100%"
      templateRows={{
        base: "auto 1fr",
      }}
      overflowX="hidden"
    >
      <Flex w="100%" justify="center">
        <CustomBar buttons={btns} />
      </Flex>
      <Flex justify="center">
        {Object.entries(skills).map(([k, v], i) => {
          if (i !== idx) return "";
          return (
            <VStack gap={0} w="100%" key={i}>
              <Heading
                fontSize={28}
                mb={4}
                fontWeight={500}
                ref={(elem) => (elemRefs[i] = elem)}
              >
                {TypeDict[k]}
              </Heading>
              <Grid
                templateColumns={{ base: "1fr", sm: "1fr 1fr" }}
                columnGap={8}
                w="min(100%, 800px)"
                p={4}
              >
                {v.map(({ name, level, Icon }, idx) => (
                  <GridItem w="100%" key={idx}>
                    <SkillCard
                      name={name}
                      level={level}
                      SkillIcon={Icon}
                      projectCount={data[name] || 0}
                      githubLink={
                        k.replaceAll("--", "") === TYPES.PLANG
                          ? getGithubSearchUrl(name)
                          : null
                      }
                    />
                  </GridItem>
                ))}
              </Grid>
            </VStack>
          );
        })}
      </Flex>
    </Grid>
  );
}
