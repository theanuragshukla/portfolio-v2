import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Link,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";

import "../../styles/global.scss";
import Navbar from "./Navbar";
import { Navigate, useOutletContext } from "react-router-dom";
import { IoDocumentText } from "react-icons/io5";
import { EXTRAS_URLS } from "../constants";

const RespHeading = ({ children }) => {
  return (
    <Text lineHeight="150%" fontSize={{ base: 30, md: 36 }} fontWeight={300} >
      {children}
    </Text>
  );
};

export default function Home() {
  const { modifyNav } = useOutletContext();
  const [isSm] = useMediaQuery('(max-width: 480px)')

  useEffect(() => {
    modifyNav((o) => ({
      ...o,
      noLogo: true,
      allButtons: isSm,
    }));
    return () => {
      modifyNav((o) => ({
        ...o,
        noLogo: false,
        allButtons: true,
      }));
    };
  }, [modifyNav, isSm]);
  return (
    <Box>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        h="100%"
        align={{ base: "center" }}
        px={{ base: 8, sm: 8, md: 24 }}
        mt={{ base: 8, sm: 4, md: 4 }}
        gap={2}
        minH="50vh"
      >
        <VStack align="flex-start" w="min(100%, 800px)">
          <Box mb={8}>
            <RespHeading>Hello! 👋</RespHeading>
          </Box>
          <RespHeading>
            I'm{" "}
            <Heading as="span" fontWeight={700}>
              Anurag Shukla
            </Heading>
            , a competent Fullstack developer who navigates the intricacies of
            code with confidence, architecting solutions that ensure optimal
            system performance and a flawless user experience.
          </RespHeading>

          <Navbar noLogo extraButtons={[
            {
              title: "Resume",
              onClick:()=>{window.open(EXTRAS_URLS.RESUME, "_blank")},
              Icon: IoDocumentText,
            }
          ]} colorModeSwitch={false} visible={!isSm} />
          <Flex fontSize={{ base: 16, md: 24 }} mt={6} wrap="wrap">
            <Text>Get in touch 👉</Text>
            <Text
              textUnderlineOffset={8}
              textDecor="underline"
              textDecorationColor="blue"
            >
              <Link href="mailto:www.anuragshukla@gmail.com">
                www.anuragshukla@gmail.com
              </Link>
            </Text>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
}
