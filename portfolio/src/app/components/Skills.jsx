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
import { FaHardHat, FaJava, FaLinux, FaReact } from "react-icons/fa";
import {
  SiC,
  SiCplusplus,
  SiDjango,
  SiDocker,
  SiExpress,
  SiFlask,
  SiGit,
  SiGnubash,
  SiGo,
  SiGoogleappsscript,
  SiIpfs,
  SiJavascript,
  SiKalilinux,
  SiLinux,
  SiLua,
  SiMarkdown,
  SiMicrosoftazure,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNgrok,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiRust,
  SiSolidity,
  SiSpringboot,
  SiTypescript,
  SiWireshark,
} from "react-icons/si";
import { More2 } from "iconsax-react";
import { GiFirewall } from "react-icons/gi";

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
    { name: "Java", level: LEVEL[3], Icon: FaJava },
    { name: "TypeScript", level: LEVEL[3], Icon: SiTypescript },
    { name: "JavaScript", level: LEVEL[3], Icon: SiJavascript },
    { name: "Python", level: LEVEL[2], Icon: SiPython },
    { name: "C++", level: LEVEL[2], Icon: SiCplusplus },
    { name: "C", level: LEVEL[2], Icon: SiC },
    { name: "Go", level: LEVEL[3], Icon: SiGo },
    { name: "Solidity", level: LEVEL[3], Icon: SiSolidity },
    { name: "Rust", level: LEVEL[0], Icon: SiRust },
  ],
  [TYPES.SLANG]: [
    { name: "Lua", level: LEVEL[1], Icon: SiLua },
    { name: "MarkDown", level: LEVEL[3], Icon: SiMarkdown },
    { name: "Bash", level: LEVEL[2], Icon: SiGnubash },
    { name: "PHP", level: LEVEL[1], Icon: SiPhp },
    { name: "Google Apps Script", level: LEVEL[2], Icon: SiGoogleappsscript },
  ],
  [TYPES.DBS]: [
    { name: "PostgreSQL", level: LEVEL[3], Icon: SiPostgresql },
    { name: "MongoDB", level: LEVEL[3], Icon: SiMongodb },
    { name: "MySQL", level: LEVEL[3], Icon: SiMysql },
    { name: "Redis", level: LEVEL[3], Icon: SiRedis },
  ],
  [TYPES.FRAMEWORK]: [
    { name: "React", level: LEVEL[3], Icon: SiReact },
    { name: "NextJS", level: LEVEL[3], Icon: SiNextdotjs },
    { name: "NodeJS", level: LEVEL[3], Icon: SiNodedotjs },
    { name: "NestJS", level: LEVEL[2], Icon: SiNestjs },
    { name: "ExpressJS", level: LEVEL[3], Icon: SiExpress },
    { name: "Spring Boot", level: LEVEL[3], Icon: SiSpringboot },
    { name: "Flask", level: LEVEL[2], Icon: SiFlask },
    { name: "Truffle", level: LEVEL[3], Icon: SiIpfs },
    { name: "HardHat", level: LEVEL[3], Icon: FaHardHat },
    { name: "Django", level: LEVEL[2], Icon: SiDjango },
  ],
  [TYPES.TOOL]: [
    { name: "Linux", level: LEVEL[3], Icon: SiLinux },
    { name: "Docker", level: LEVEL[3], Icon: SiDocker },
    { name: "Git & Github", level: LEVEL[3], Icon: SiGit },
    { name: "Nginx", level: LEVEL[2], Icon: SiNginx },
    { name: "Azure", level: LEVEL[2], Icon: SiMicrosoftazure },
  ],
  [TYPES.SEC]: [
    { name: "NMap", level: LEVEL[2] },
    { name: "Metasploit", level: LEVEL[2] },
    { name: "Firewall", level: LEVEL[3], Icon: GiFirewall },
    { name: "Wireshark", level: LEVEL[2], Icon: SiWireshark },
    { name: "Burpsuite", level: LEVEL[2] },
    { name: "Nikto", level: LEVEL[2] },
    { name: "BeeF", level: LEVEL[2] },
    { name: "SQLMap", level: LEVEL[2] },
    { name: "OWASP ZAP", level: LEVEL[2] },
    { name: "Dirb", level: LEVEL[2] },
    { name: "Ngrok", level: LEVEL[3], Icon: SiNgrok },
  ],
};

const Icons = {
  [TYPES.PLANG]: FaJava,
  [TYPES.SLANG]: SiGnubash,
  [TYPES.DBS]: SiPostgresql,
  [TYPES.FRAMEWORK]: FaReact,
  [TYPES.TOOL]: FaLinux,
  [TYPES.SEC]: SiKalilinux,
};

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
            <VStack gap={0} w="100%">
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
                {v.map(({ name, level, Icon }) => (
                  <GridItem w="100%">
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
