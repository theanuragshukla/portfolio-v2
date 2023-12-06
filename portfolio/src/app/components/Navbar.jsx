import React, { useEffect } from "react";

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
} from "@chakra-ui/react";
import { HiTerminal } from "react-icons/hi";
import {
    Book,
    Box1,
    CloseCircle,
    HambergerMenu,
    Link1,
    Moon,
    ProfileCircle,
    Sun1,
} from "iconsax-react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { AnimatePresence, motion } from "framer-motion";
import { GiBrain } from "react-icons/gi";
import "../../styles/nav.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Buttons from "../common/Buttons";

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const [isMd] = useMediaQuery("(max-width: 768px)");
    const ham = useDisclosure();
    const navigate = useNavigate();
    const buttons = [
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
            title: "Links",
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
    ];

    useEffect(()=>{
        window.addEventListener("scroll", (e)=>{

        })
        return ()=>window.removeEventListener("scroll")
    }, [])

    const location = useLocation();
    return (
        <>
            <Flex
                h="60px"
                align="center"
                className="nav"
                justify="space-between"
                gap={{ base: 2, sm: 0 }}
                pos="relative"
            >
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
                    <Heading fontSize={26}>
                        {isMd ? "nurag" : `/home/anurag${location.pathname}`}
                    </Heading>
                </Flex>
                <Flex gap={2} justify="center" align="center">
                    <Show above="sm">
                        <Buttons buttons={buttons}/>
                    </Show>
                    <IconButton onClick={toggleColorMode} isRound>
                        {colorMode === "light" ? <Moon /> : <Sun1 />}
                    </IconButton>
                    <Hide above="sm">
                        <IconButton onClick={ham.onToggle} isRound>
                            {ham.isOpen ? <CloseCircle /> : <HambergerMenu />}
                        </IconButton>
                    </Hide>
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
    );
}
