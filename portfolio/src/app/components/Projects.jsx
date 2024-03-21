import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Link,
  Progress,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { ARCHIVE_JSON_URL, PROJECT_JSON_URL } from "../constants";

const randomColor = () => {
  const colors = ["blue"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ProjectCard = ({ title, desc, tools, img, links, ...extras }) => {
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  return (
    <Grid
      maxW="800px"
      w="100%"
      borderRadius="md"
      p={4}
      _hover={{
        bg: hoverBg,
      }}
    {...extras}
    >
      <Flex align="center" gap={2}>
        <Text fontSize="3xl" fontWeight={200} noOfLines={2}>
          {title}
        </Text>
      </Flex>

      <Text lineHeight="150%">{desc}</Text>

      <HStack spacing={4} wrap="wrap" my={2}>
        {links.map((link) => (
          <Button
            key={link.name}
            colorScheme="blue"
            variant="link"
            size="md"
            pl={0}
            as={Link}
            target="_blank"
            href={link.url}
            fontWeight={1000}
          >
            {link.name}
          </Button>
        ))}
      </HStack>

      <HStack spacing={2} wrap="wrap">
        {tools.map((tool, index) => (
          <Badge
            key={index}
            borderRadius="md"
            px="2"
            py={1}
            variant="outline"
            colorScheme={randomColor()}
          >
            {tool}
          </Badge>
        ))}
      </HStack>
      <Divider mt={4} />
    </Grid>
  );
};

const Archive = ({ archive = [], loading = true }) => {
  return (
    <Box>
      <Heading mx={4} fontSize={32} fontWeight={400} mb={4} textDecor="underline" textUnderlineOffset={4} textDecorationThickness={2}>
        Archive
      </Heading>
    <Grid templateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={4}>
    {loading ? (
      <Progress isIndeterminate h="2px" />
    ) : !!archive && archive.length > 0 ? (
      archive.map((obj, idx) => <ProjectCard key={idx} {...obj} />)
    ) : (
      <Text fontSize="lg" fontWeight={400} mx={4}>
        Nothing to show here
      </Text>
    )}
    </Grid>
    </Box>
  );
};

export default function Projects() {
  const [scrollHeight, setScrollHeight] = useState("90vh");
  const [projects, setProjects] = useState([]);
  const [archive, setArchive] = useState([]);
  const [loading, setLoading] = useState({ projects: true, archive: true });

  useEffect(() => {
    fetch(PROJECT_JSON_URL)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading((prev) => ({ ...prev, projects: false }));
      });
    fetch(ARCHIVE_JSON_URL)
      .then((res) => res.json())
      .then((data) => {
        setArchive(data);
        setLoading((prev) => ({ ...prev, archive: false }));
      });
  }, []);

  const projectsRef = useRef(null);
  useEffect(() => {
    if (projectsRef.current !== null)
      setScrollHeight(projectsRef.current.clientHeight);
  }, [projectsRef, projects]);

  return (
    <Grid templateColumns={{ base: "1fr", xl: "1fr auto 400px " }} gap={4}>
      <GridItem ref={projectsRef}>
        {loading.projects ? (
          <Progress isIndeterminate h="2px" />
        ) : !!projects && projects.length > 0 ? (
          projects.map((obj, idx) => <ProjectCard key={idx} {...obj} />)
        ) : (
          <Text fontSize="lg" fontWeight={400} mx={4}>
            Nothing to show here
          </Text>
        )}
      </GridItem>
      <Divider
        width={{ base: "100%", xl: "1px" }}
        h={{ base: "1px", xl: "100%" }}
        borderLeft="1px solid "
      />
      <GridItem maxH={scrollHeight} overflowY="scroll">
        <Archive archive={archive} loading={loading.archive} />
      </GridItem>
    </Grid>
  );
}
