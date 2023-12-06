import { Divider, Flex, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

export default function NamePlate({ fullName, align = "flex-start" }) {
    return (
        <Flex flexDir="column" align={align} gap={0} as={motion.div}>
            <Heading fontWeight={200} fontSize={{ base: 28, md: 44 }}>
                Anurag S{fullName ? "hukla" : "."}
            </Heading>
            <Heading fontSize={{ base: 16, md: 22 }} as="h2" fontWeight={800}>
                Software engineer
            </Heading>
            <Divider borderTop="2px solid" />
        </Flex>
    );
}
