import {
  Badge,
  Box,
  Divider,
  Grid,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const SkillCard = ({ name, level, projectCount, githubLink }) => {
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
    <Box
      w="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      shadow="md"
    >
      <Heading fontSize="xl" textTransform="uppercase" mb={4}>
        {name}
      </Heading>
      <Text mt={2}>
        <Badge borderRadius="full" px="2" colorScheme={getBadgeColor()} mb={2}>
          {level}
        </Badge>
      </Text>
      <Text mt={2}>{`Project Count: ${projectCount}`}</Text>
      {githubLink && (
        <Link mt={2} color="teal.500" href={githubLink} isExternal>
          GitHub Link
        </Link>
      )}
    </Box>
  );
};

export default function Skills() {
  const getGithubSearchUrl = (lang, user = "theanuragshukla") =>
    `https://github.com/search?q=org%3A${user}++language%3A${lang}+&type=repositories`;
  const TYPES = {
    PLANG: "Programming language",
    TOOL: "tool",
    FRAMEWORK: "framework",
    LIB: "library",
    SLANG: "Scripting language",
    MLANG: "Markup Language",
  };
  const LEVEL = {
    1: "Beginnner",
    2: "Intermediate",
    3: "Expert",
    0: "Familier",
  };

  const getCount = (lang) =>
    fetch(`http://localhost:5000/lang-in-repo/${lang}`)
      .then((res) => res.json())
      .then((res) => res.data)
      .then((res) => (!!res ? res : null));

  const skills = {
    [TYPES.PLANG]: [
      { name: "Java", level: LEVEL[3] },
      { name: "TypeScript", level: LEVEL[3] },
      { name: "JavaScript", level: LEVEL[3] },
      { name: "Python", level: LEVEL[2] },
      { name: "C++", level: LEVEL[2] },
      { name: "C", level: LEVEL[2] },
      { name: "Go", level: LEVEL[1] },
      { name: "Solidity", level: LEVEL[3] },
    ],
    [TYPES.LIB]: [
      { name: "PostgreSQL", level: LEVEL[3] },
      { name: "MongoDB", level: LEVEL[3] },
      { name: "MySQL", level: LEVEL[3] },
      { name: "Redis", level: LEVEL[3] },
    ],
    [TYPES.FRAMEWORK]: [
      { name: "NextJS", level: LEVEL[3] },
      { name: "React", level: LEVEL[3] },
      { name: "Spring Boot", level: LEVEL[3] },
      { name: "Flask", level: LEVEL[2] },
      { name: "Truffle", level: LEVEL[3] },
      { name: "Django", level: LEVEL[3] },
    ],
    [TYPES.TOOL]: [
      { name: "Linux", level: LEVEL[3] },
      { name: "Docker", level: LEVEL[3] },
      { name: "Shell", level: LEVEL[3] },
      { name: "Git", level: LEVEL[3] },
      { name: "Google Apps Script", level: LEVEL[2] },
      { name: "Nginx", level: LEVEL[2] },
      { name: "Azure", level: LEVEL[2] },
    ],
  };

  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData(lang) {
      const res = await getCount(lang);
      if (!!res) console.log(res);
      setData((o) => ({
        ...o,
        [lang]: res.count,
      }));
    }
    if (!skills) return;
    skills[TYPES.PLANG].map(({ name }) => fetchData(name));
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const dividerColor = useColorModeValue("gray", "blue.200");

  return (
    <Box>
      {Object.entries(skills).map(([k, v]) => {
        if (v.length === 0) return "";
        return (
          <Box mb={8}>
            <Heading
              fontSize={28}
              textDecoration="underline"
              textUnderlineOffset={8}
              textTransform="capitalize"
              mb={4}
            >
              {k}
            </Heading>
            <Grid
              gap="10"
              width="100%"
              overflow="scroll"
              templateColumns={{
                base: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
                lg: "repeat(4, 1fr)",
              }}
              mb={8}
            >
              {v.map(({ name, level }) => (
                <SkillCard
                  name={name}
                  level={level}
                  projectCount={data[name] || 0}
                  githubLink={getGithubSearchUrl(name)}
                />
              ))}
            </Grid>
            <Divider height="2px" bg={dividerColor} />
          </Box>
        );
      })}
    </Box>
  );
}
