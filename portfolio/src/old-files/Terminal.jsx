import { Box, Flex, propNames } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import Window from "./Window";

function Terminal({ info, wins, setWins }) {
  const getPrompt = () => {
    return pwd;
  };
  const [io, setIo] = useState([]);
  const pwd = "/home/anurag/portfolio";
  const Line = ({ color = "red", children, blank = false }) => {
    return (
      <Flex color={color} flexWrap="wrap">
        {!blank ? children : "‎ "}
      </Flex>
    );
  };
  const Prompt = ({ text, inp = "", readOnly = false }) => {
    const [cmd, setCmd] = useState("");

    const res = {
      help: "help",
    };

    const execute = async () => {
      return res[cmd];
    };

    const handleCommand = async (e) => {
      let opt = await execute();
      setIo((prev) => {
        return [...prev, { prompt: text, i: cmd, o: opt }];
      });
    };

    const handleEnter = (e) => {
      if (cmd.charAt(cmd.length - 1) !== "\\") {
        e.preventDefault();
        handleCommand(e);
      }
    };

    const handleInput = (e) => {
      e.target.style.height = "1px";
      e.target.style.height = e.target.scrollHeight + "px";
      setCmd(() => e.target.value.slice(2));
    };
    const handleKey = (e) => {
      if (e.key === "Enter") {
        handleEnter(e);
      } else if (e.ctrlKey) {
        e.preventDefault();
        if (e.key === "l") setIo([]);
      }
    };
    return (
      <Flex flexDir="column" border="1px solid red">
        <Box>{text}</Box>
        <Flex align="center">
          <textarea
            autoFocus
            onFocus={(e) => {
              e.target.setSelectionRange(1000, 1000);
            }}
            rows={1}
            readOnly={readOnly}
            onChange={handleInput}
            onKeyDown={handleKey}
            value={"> " + (inp ? inp : cmd)}
            className="promptInput"
            w="100%"
            spellCheck={false}
          ></textarea>
        </Flex>
      </Flex>
    );
  };
  return (
    <Window info={info} wins={wins} setWins={setWins}>
      {io.map((e) => {
        return (
          <Box>
            <Prompt text={e.prompt} inp={e.i} readOnly />
            {e.o ? <Line>{e.o}</Line> : null}
            <Line blank={true} />
          </Box>
        );
      })}
      <Prompt text={getPrompt()} />
    </Window>
  );
}

export default Terminal;
