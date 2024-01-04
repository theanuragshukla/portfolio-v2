import React, { useEffect, useMemo, useState } from "react";

import {
  Icon,
  Button,
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useMediaQuery,
  Show,
  Hide,
  useDisclosure,
  Spacer,
} from "@chakra-ui/react";
import { HiTerminal } from "react-icons/hi";
import {
  AddCircle,
  ArrowCircleLeft,
  Book,
  Box1,
  CloseCircle,
  HambergerMenu,
  Link1,
  Moon,
  ProfileCircle,
  SearchNormal,
  Sun1,
} from "iconsax-react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { AnimatePresence, motion } from "framer-motion";
import { GiBrain } from "react-icons/gi";
import "../../styles/nav.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Buttons from "../common/Buttons";

export const CustomBar = ({ buttons }) => {
  return !!buttons ? (
    <>
      <Flex
        h="60px"
        align="center"
        className="nav"
        justify="space-between"
        gap={{ base: 2, sm: 0 }}
        pos="relative"
      >
        <Flex gap={2} justify="center" align="center">
          <Buttons buttons={buttons} />
        </Flex>
      </Flex>
    </>
  ) : (
    ""
  );
};

export default function Navbar({
  isAdmin = false,
  noLogo = false,
  colorModeSwitch = true,
  allButtons = true,
  visible = true,
}) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isMd] = useMediaQuery("(max-width: 768px)");
  const ham = useDisclosure();
  const navigate = useNavigate();
  const controls = useMemo(() => [
    {
      title: "About Me",
      onClick: () => {
        navigate("/about");
        ham.onClose();
      },
      Icon: ProfileCircle,
    },
    {
      title: "Skills",
      onClick: () => {
        navigate("/skills");
        ham.onClose();
      },
      Icon: GiBrain,
    },
    {
      title: "Projects",
      onClick: () => {
        navigate("/projects");
        ham.onClose();
      },
      Icon: Box1,
    },
    {
      title: "Contact",
      onClick: () => {
        navigate("/links");
        ham.onClose();
      },
      Icon: Link1,
    },

    {
      title: "Blog",
      onClick: () => {
        navigate("/blog");
        ham.onClose();
      },
      Icon: Book,
    },
  ], [ham, navigate]);

  const blogControls = useMemo(() => [
    {
      title: "Back",
      onClick: () => {
        navigate(-1);
        ham.onClose();
      },
      Icon: ArrowCircleLeft,
    },

    {
      title: "Search",
      onClick: () => {
        ham.onClose();
      },
      Icon: SearchNormal,
    },
    ...(isAdmin
      ? [
          {
            title: "New Blog",
            onClick: () => {
              ham.onClose();
              navigate("/blog/new");
            },
            Icon: AddCircle,
          },
        ]
      : []),
  ], [ham, isAdmin, navigate]);

  const [buttons, setButtons] = useState([...controls]);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/blog")) {
      setButtons(() => [...blogControls]);
      return;
    }
    setButtons(() => [...controls]);
  }, [location.pathname, isAdmin, controls, blogControls]);

  return !!visible ? (
    <>
      <Flex
        h="60px"
        align="center"
        className="nav"
        justify="space-between"
        gap={{ base: 2, sm: 0 }}
        pos="relative"
      >
        {!!noLogo ? (
          <Spacer />
        ) : (
          <Flex
            gap={0}
            justify="center"
            align="center"
            onClick={() => navigate("/")}
            cursor="pointer"
          >
            {isMd ? (
              <Icon
                boxSize={12}
                as={Logo}
                color={colorMode === "light" ? "black" : "white"}
              />
            ) : (
              <HiTerminal size={36} />
            )}
            <Heading fontSize={26} fontFamily="Inter">
              {isMd
                ? "nurag"
                : `/home/anurag${location.pathname.split("/", 2).join("/")}`}
            </Heading>
          </Flex>
        )}
        <Flex gap={2} justify="center" align="center">
          {!!allButtons && (
            <Show above="sm">
              <Buttons buttons={buttons} />
            </Show>
          )}
          {!!colorModeSwitch && (
            <IconButton onClick={toggleColorMode} isRound>
              {colorMode === "light" ? <Moon /> : <Sun1 />}
            </IconButton>
          )}
          {!!allButtons && (
            <Hide above="sm">
              <IconButton onClick={ham.onToggle} isRound>
                {ham.isOpen ? <CloseCircle /> : <HambergerMenu />}
              </IconButton>
            </Hide>
          )}
        </Flex>
      </Flex>
      <Flex flexDir="column" pt={4}>
        <Show below="sm">
          <AnimatePresence>
            {ham.isOpen &&
              buttons.map((btn, index) => {
                return (
                  <motion.div
                    initial={{
                      y: 50,
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      height: "auto",
                    }}
                    transition={{
                      duration: 0.1,
                      delay: index * 0.05,
                    }}
                    key={index}
                    exit={{
                      y: -50,
                      opacity: 0,
                      transition: {
                        duration: 0.1,
                        delay: 0.05 * (5 - index),
                      },
                      height: 0,
                    }}
                    onClick={btn.onClick}
                  >
                    <Button borderRadius={0} w="100%">
                      {btn.title}
                    </Button>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </Show>
      </Flex>
    </>
  ) : (
    <></>
  );
}
