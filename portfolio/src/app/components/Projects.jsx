import {
  Badge,
  Box,
  Divider,
  Grid,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const randomColor = () => {
  const colors = ["green", "red", "blue", "teal", "cyan", "purple"];
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
    <Box
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      m={4}
      shadow="md"
    >
      <Text fontSize="xl" fontWeight="semibold" mb={2} noOfLines={2}>
        {title}
      </Text>

      <Text noOfLines={2} mb={4}>
        {desc}
      </Text>

      <Stack direction="row" spacing={1} mb={4} wrap="wrap">
        {tools.map((tool, index) => (
          <Badge
            key={index}
            borderRadius="full"
            px="2"
            colorScheme={randomColor()}
          >
            {tool}
          </Badge>
        ))}
      </Stack>

      <Link href={url} color="teal.500" isExternal>
        View Project
      </Link>

      <Text mt={2}>
        <Link href={github} color="gray.500" isExternal>
          GitHub Repository
        </Link>
      </Text>
    </Box>
  );
};

export default function Projects() {
  const dividerColor = useColorModeValue("gray", "blue.200");
  return (
    <Box>
      <Heading
        fontSize={28}
        textDecoration="underline"
        textUnderlineOffset={8}
        textTransform="capitalize"
        mb={4}
      >
        Projects
      </Heading>
      <Grid
        gap="4"
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
        {projects.map((obj) => (
          <ProjectCard {...obj} />
        ))}
      </Grid>
      <Divider height="2px" bg={dividerColor} />
    </Box>
  );
}
