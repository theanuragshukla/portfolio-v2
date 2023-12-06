import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Box, Flex } from "@chakra-ui/react";

const Buttons = ({ buttons }) => {
  return (
    <AnimatePresence>
      {buttons.map((btn, index) => {
        return (
          <motion.div
            initial={{
              x: 50,
              opacity: 0,
              height: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
              height: "auto",
            }}
            transition={{
              duration: 0.1,
              delay: index * 0.05,
            }}
            key={index}
            exit={{
              x: -50,
              opacity: 0,
              transition: {
                duration: 0.1,
                delay: 0.05 * (5 - index),
              },
              height: 0,
            }}
            onClick={btn.onClick}
          >
            <Button
              p={0}
              _hover={{ padding: 4 }}
              borderRadius="200vmax"
              w="100%"
            >
              <Flex justify="flex-start" align="center">
                {<btn.Icon size={24} />}
                <Box className="label">{btn.title}</Box>
              </Flex>
            </Button>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};
export default Buttons;
