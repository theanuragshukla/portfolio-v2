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
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const randomColor = () => {
  const colors = ["blue"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const projects = [
  {
    id: "1",
    title: "The Movie DataBase",
    desc: "This is a movie database designed and developed using reactJS in its core. This App uses TMDB API to fetch and display the data.",
    tools: ["react", "react-router", "styled-component"],
    img: "https://filmboard.mtu.edu/static/bucket/923aeb4a2b10f3e3cd793b3bde595df83c818cd5a4ea5d71486438f4b063c63ffa48fd6bc166ede140cd3d1f0a5e5c5db7388b63d1af96c9c69ebdce2c833acf.png",
    url: "https://theanuragshukla.github.io/tmdb",
    github: "https://github.com/theanuragshukla/tmdb",
  },

  {
    id: "3",
    title: "Dustbin Locator",
    desc: "Web App developed to help in locating and marking nearby Dustbins in the locality",
    tools: ["JavaScript", "PostgreSQL", "NodeJS"],
    img: "https://source.unsplash.com/random/q=dustbin,locator",
    url: "https://binLocator.onrender.com",
    github: "https://github.com/theanuragshukla/binLocator-hackathon",
  },
  {
    id: "4",
    title: "AdBid - BlockChain based AdSpace Bidding",
    desc: "This is a Platform which supports bidding for an AdSpace. This dapp is 100% decentralized and doesn't use any server for its operation. Deployed on Polygon Network and IPFS.",
    tools: ["ReactJS", "Solidity", "IPFS"],
    img: "https://source.unsplash.com/random/?blockchain,bidding",
    url: "https://bafybeih5tisg3kbny67gwgrawfl5qhijigrtpapq42fnit6y5nvndcmape.ipfs.dweb.link/",
    github: "https://github.com/theanuragshukla/AdBid_ETHForAll",
  },
  {
    id: "5",
    title: "Omegle Clone",
    desc: "A ReactJS based webApp which provides video and text-based chatting with strangers",
    tools: ["NodeJS", "ReactJS", "PostgreSQL", "Socket.IO"],
    img: "https://source.unsplash.com/random/?video,calling,strangers",
    url: "https://omegle-special-server.onrender.com/",
    github: "https://github.com/theanuragshukla/omegle",
  },
  {
    id: "6",
    title: "ChatNow",
    desc: "A chat application(web) , created using NodeJS and Socket.io. This is a realtime messaging System, which uses text files to store and process chats. All the chat-data is encrypted using cryptoJS.",
    tools: ["HTML", "CSS", "NodeJS", "JavaScript", "CryptoJS", "Socket.io"],
    img: "https://source.unsplash.com/random/?chatting",
    url: "https://chatnowjs.onrender.com",
    github: "https://github.com/theanuragshukla/chatnowjs",
  },
  {
    id: "7",
    title: "LiveStreaming via BlockChain",
    desc: "A LiveStreaming Platform built by using LivePeer API. This App allows users to start LiveStream and Share Camera and Screen with the World. This App communicates with Solidity SmartContract Deployed on Ethereum BlockChain using Web3JS.",
    tools: [
      "HTML",
      "CSS",
      "JavaScript",
      "Solidity",
      "Web3",
      "NodeJS",
      "Socket.io",
      "Remix",
    ],
    img: "https://raw.githubusercontent.com/theanuragshukla/TheBizzzaire/main/19aec9c0-fa44-4e01-b65e-7bc9fbda5dbb.jpeg",
    url: "https://livepeer-4su2.onrender.com",
    github: "https://github.com/theanuragshukla/TheBizzzaire",
  },
  {
    id: "8",
    title: "VoiceChat webApp",
    desc: "WebApp which provide realtime VoiceChat capability to users, along with other features like Texting, custom rooms, etc.",
    tools: ["NodeJS", "Socket.io"],
    img: "https://source.unsplash.com/random/?voice+chat",
    url: "https://socketvoice.onrender.com",
    github: "https://github.com/theanuragshukla/VoiceChat",
  },
  {
    id: "9",
    title: "ML Algorithms Blog + Quizzes",
    desc: "A webPage to showcase some basic and most used Machine Learning Algorithms. This website also provides practice problems for mentioned algoriths. Solution Submitted can be examined by the teachers through admin page.",
    tools: ["NodeJS", "PostgreSQL", "JWT", "BCryptJS"],
    img: "https://source.unsplash.com/random/?machine+learning",
    url: "https://mlalgos.onrender.com",
    github: "https://github.com/theanuragshukla/ml-algos",
  },
];

const ProjectCard = ({ title, desc, tools, img, url, github }) => {
  return (
    <Box w="100%" p={4}>
      <Flex align="center" gap={2}>
        <Text fontSize="2xl" fontWeight={400} noOfLines={2}>
          {title}
        </Text>
      </Flex>

      <Text lineHeight="150%">{desc}</Text>

      <HStack spacing={4} wrap="wrap" my={2}>
        <Button
          colorScheme="blue"
          variant="link"
          size="md"
          pl={0}
          as={Link}
          target="_blank"
          href={github}
          fontWeight={1000}
        >
          Github{" "}
        </Button>
        <Button
          colorScheme="blue"
          variant="link"
          fontWeight={1000}
          size="md"
          as={Link}
          target="_blank"
          href={url}
        >
          Live
        </Button>
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
    </Box>
  );
};

const Archive = () => {
  const [archive, setArchive] = useState([]);
  return (
    <Box>
      <Heading mx={4} fontSize={32} fontWeight={400} mb={4}>
        Archive
      </Heading>
      <Grid
        width="100%"
        overflow="scroll"
        templateColumns={{
          base: "1fr",
        }}
      >
        {!!archive && archive.length>0 ? archive.map((obj) => (
          <ProjectCard {...obj} />
        )) : (
          <Text fontSize="lg" fontWeight={400} mx={4}>
            Nothing to show here
          </Text>
        )
        }
      </Grid>
    </Box>
  );
};

export default function Projects() {
  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "1fr min(40%, 400px)" }}
      h={{ base: "auto", md: "calc(100vh - 100px)" }}
      overflowY="hidden"
    >
      <GridItem overflowY="scroll" h="100%">
        <Heading mx={4} fontSize={32} fontWeight={400} mb={4}>
          Projects
        </Heading>
        {projects.map((obj) => (
          <ProjectCard {...obj} />
        ))}
      </GridItem>
      <GridItem maxH="100%" overflowY="scroll">
        <Archive />
      </GridItem>
    </Grid>
  );
}
