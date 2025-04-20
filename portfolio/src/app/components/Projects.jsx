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
import { useEffect, useState } from "react";
import { EXTRAS_URLS} from "../constants";

const randomColor = () => {
  const colors = ["blue"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ProjectCard = ({ title, desc, tools, img, links, ...extras }) => {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  
  return (
    <Flex
      direction="column"
      w="100%"
      h="100%"
      borderRadius="md"
      p={4}
      border="1px solid"
      borderColor={borderColor}
      _hover={{
        bg: hoverBg,
      }}
      {...extras}
    >
      <Flex align="center" gap={2} mb={2}>
        <Text fontSize="2xl" fontWeight={200} noOfLines={2}>
          {title}
        </Text>
      </Flex>
      
      <Text lineHeight="150%" flex="1">
        {desc}
      </Text>
      
      <Box mt={3}>
        <HStack spacing={4} wrap="wrap" mb={2}>
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
      </Box>
    </Flex>
  );
};

const ProjectsGrid = ({ items, columns = { base: 1, sm: 2, md: 3, xl: 1 } }) => {
  // Convert columns object to grid template columns string
  const getTemplateColumns = () => {
    const result = {};
    
    Object.entries(columns).forEach(([breakpoint, count]) => {
      if (count === 1) {
        result[breakpoint] = "1fr";
      } else {
        result[breakpoint] = `repeat(${count}, 1fr)`;
      }
    });
    
    return result;
  };

  return (
    <Grid 
      templateColumns={getTemplateColumns()}
      gap={4}
    >
      {items.map((obj, idx) => (
        <GridItem key={idx} height="100%">
          <ProjectCard {...obj} />
        </GridItem>
      ))}
    </Grid>
  );
};

const SectionContainer = ({ title, children, isLoading }) => {
  return (
    <Box w="100%" px={2}>
      <Heading 
        fontSize={32} 
        fontWeight={400} 
        mb={4} 
        textDecor="underline" 
        textUnderlineOffset={4} 
        textDecorationThickness={2}
      >
        {title}
      </Heading>
      {isLoading ? (
        <Progress isIndeterminate h="2px" />
      ) : (
        children
      )}
    </Box>
  );
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [archive, setArchive] = useState([]);
  const [loading, setLoading] = useState({ projects: true, archive: true });
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    fetch(EXTRAS_URLS.PROJECTS)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading((prev) => ({ ...prev, projects: false }));
      });
    fetch(EXTRAS_URLS.ARCHIVE)
      .then((res) => res.json())
      .then((data) => {
        setArchive(data);
        setLoading((prev) => ({ ...prev, archive: false }));
      });
  }, []);

  return (
    <Flex 
      direction={{ base: "column", xl: "row" }} 
      gap={6} 
      w="100%"
    >
      {/* Projects Section */}
      <Box 
        flex={{ base: "1", xl: "1" }}
        h={{ xl: "calc(100vh - 100px)" }}
        overflowY={{ xl: "auto" }}
      >
        <SectionContainer title="Projects" isLoading={loading.projects}>
          {!!projects && projects.length > 0 ? (
            <ProjectsGrid 
              items={projects} 
              columns={{ base: 1, sm: 2, md: 3, xl: 1 }}
            />
          ) : (
            <Text fontSize="lg" fontWeight={400}>
              Nothing to show here
            </Text>
          )}
        </SectionContainer>
      </Box>

      {/* Divider */}
      <Divider
        display={{ base: "block", xl: "none" }}
        orientation="horizontal"
        borderColor={borderColor}
        my={2}
      />
      <Divider
        display={{ base: "none", xl: "block" }}
        orientation="vertical"
        borderColor={borderColor}
        h="100%"
      />

      {/* Archive Section */}
      <Box 
        flex={{ base: "1", xl: "0 0 400px" }}
        h={{ xl: "calc(100vh - 100px)" }}
        overflowY={{ xl: "auto" }}
      >
        <SectionContainer title="Archive" isLoading={loading.archive}>
          {!!archive && archive.length > 0 ? (
            <ProjectsGrid 
              items={archive}
              columns={{ base: 1, sm: 2, md: 2, xl: 1 }}
            />
          ) : (
            <Text fontSize="lg" fontWeight={400}>
              Nothing to show here
            </Text>
          )}
        </SectionContainer>
      </Box>
    </Flex>
  );
}
