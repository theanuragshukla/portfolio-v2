import {
  Badge,
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { getRepoCount } from "../data/managers/blog";
import { CustomBar } from "./Navbar";
import { FaJava, FaLinux, FaReact } from "react-icons/fa";
import { SiGnubash, SiKalilinux, SiPostgresql } from "react-icons/si";

const getGithubSearchUrl = (lang, user = "theanuragshukla") =>
  `https://github.com/search?q=org%3A${user}++language%3A${lang}+&type=repositories`;

const TYPES = {
  PLANG: "Programming language",
  SLANG: "Scripting",
  DBS: "library",
  FRAMEWORK: "framework",
  TOOL: "tool",
  SEC: "Security",
};

const TypeDict = {
  [TYPES.PLANG]: "Languages",
  [TYPES.SLANG]: "Scripting",
  [TYPES.DBS]: "Databases",
  [TYPES.FRAMEWORK]: "Frameworks",
  [TYPES.TOOL]: "Tools",
  [TYPES.SEC]: "Security",
};
const LEVEL = {
  0: "Familier",
  1: "Beginnner",
  2: "Intermediate",
  3: "Expert",
};

const skills = {
  [TYPES.PLANG]: [
    { name: "Java", level: LEVEL[3] },
    { name: "TypeScript", level: LEVEL[3] },
    { name: "JavaScript", level: LEVEL[3] },
    { name: "Python", level: LEVEL[2] },
    { name: "C++", level: LEVEL[2] },
    { name: "C", level: LEVEL[2] },
    { name: "Go", level: LEVEL[3] },
    { name: "Solidity", level: LEVEL[3] },
  ],
  [TYPES.SLANG]: [
    { name: "Lua", level: LEVEL[1] },
    { name: "Bash", level: LEVEL[2] },
    { name: "PHP", level: LEVEL[1] },
    { name: "Google Apps Script", level: LEVEL[2] },
  ],
  [TYPES.DBS]: [
    { name: "PostgreSQL", level: LEVEL[3] },
    { name: "MongoDB", level: LEVEL[3] },
    { name: "MySQL", level: LEVEL[3] },
    { name: "Redis", level: LEVEL[3] },
  ],
  [TYPES.FRAMEWORK]: [
    { name: "NextJS", level: LEVEL[3] },
    { name: "ExpressJS", level: LEVEL[3] },
    { name: "React", level: LEVEL[3] },
    { name: "Spring Boot", level: LEVEL[3] },
    { name: "Flask", level: LEVEL[2] },
    { name: "Truffle", level: LEVEL[3] },
    { name: "Django", level: LEVEL[2] },
  ],
  [TYPES.TOOL]: [
    { name: "Linux", level: LEVEL[3] },
    { name: "Docker", level: LEVEL[3] },
    { name: "Git & Github", level: LEVEL[3] },
    { name: "Nginx", level: LEVEL[2] },
    { name: "Azure", level: LEVEL[2] },
  ],
  [TYPES.SEC]: [],
};

const Icons = {
  [TYPES.PLANG]: FaJava,
  [TYPES.SLANG]: SiGnubash,
  [TYPES.DBS]: SiPostgresql,
  [TYPES.FRAMEWORK]: FaReact,
  [TYPES.TOOL]: FaLinux,
  [TYPES.SEC]: SiKalilinux,
};

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
    <Box w="100%">
      <Flex align="center" gap={2} justify="space-between">
        <Heading fontSize="md" fontWeight={400} textTransform="capitalize">
          {name}{" "}
        </Heading>
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

  function chunkArrayInGroups(arr, size) {
    var myArray = [];
    for (var i = 0; i < arr.length; i += size) {
      myArray.push(arr.slice(i, i + size));
    }
    return myArray;
  }

  const GroupCategories = (categories) => {
    return (
      <Box>
        {categories.map(([k, v], i) => {
          if (v.length === 0) return "";
          return (
            <Box px={4}>
              {!k.startsWith("--") && (
                <Heading
                  fontSize={28}
                  mb={4}
                  fontWeight={500}
                  ref={(elem) => (elemRefs[i] = elem)}
                >
                  {TypeDict[k]}
                </Heading>
              )}
              <VStack gap={0}>
                {v.map(({ name, level }) => (
                  <SkillCard
                    name={name}
                    level={level}
                    projectCount={data[name] || 0}
                    githubLink={
                      k.replaceAll("--", "") === TYPES.PLANG
                        ? getGithubSearchUrl(name)
                        : null
                    }
                  />
                ))}
              </VStack>
              {}
            </Box>
          );
        })}
      </Box>
    );
  };

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
  }, [TypeDict]);

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
            <VStack gap={0} w="100%" maxW={500}>
              <Heading
                fontSize={28}
                mb={4}
                fontWeight={500}
                ref={(elem) => (elemRefs[i] = elem)}
              >
                {TypeDict[k]}
              </Heading>
              {v.map(({ name, level }) => (
                <SkillCard
                  name={name}
                  level={level}
                  projectCount={data[name] || 0}
                  githubLink={
                    k.replaceAll("--", "") === TYPES.PLANG
                      ? getGithubSearchUrl(name)
                      : null
                  }
                />
              ))}
            </VStack>
          );
        })}
      </Flex>
    </Grid>
  );
}
