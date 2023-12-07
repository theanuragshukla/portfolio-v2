import { Flex, Input, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthorized } from "../data/managers/blog";

export default function Admin() {
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const login = async () => {
    try {
      const { status } = await getAuthorized({ password: pass });
      if (!!status) {
        toast({
          status: "success",
          title: "Authorised!",
          duration: 2000,
          isClosable: true,
        });
        localStorage.setItem("isAdmin", JSON.stringify({ status: true }));
      } else {
        throw new Error("LOL");
      }
    } catch (e) {
      toast({
        status: "error",
        title: e.message,
        duration: 2000,
        isClosable: true,
      });
    } finally {
      navigate(-1);
    }
  };
  return (
    <Flex direction="column">
      <VStack gap={2}>
        <Input
          width="min(100%, 400px)"
          onChange={(e) => {
            setPass(() => e.target.value);
          }}
          value={pass}
          placeholder="Enter Admin Secret"
          textAlign="center"
          type="password"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              login();
            }
          }}
        />
      </VStack>
    </Flex>
  );
}
