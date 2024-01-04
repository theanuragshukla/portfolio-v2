import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Input,
  Textarea,
  Button,
  Stack,
  useToast,
  HStack,
  Heading,
  Checkbox,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { useFormik } from "formik";
import messageSchema from "../utils/schemas/messageSchema";
import { postMsg } from "../data/managers/blog";
import { CustomBar } from "./Navbar";
import { CiLinkedin, CiMail, CiTwitter } from "react-icons/ci";

const socialMediaProfiles = [
  {
    title: "GitHub",
    onClick: () => window.open("https://github.com/theanuragshukla", "_blank"),
    Icon: FaGithub,
  },
  {
    title: "LinkedIn",
    onClick: () =>
      window.open("https://linkedin.com/in/therealanuragshukla", "_blank"),
    Icon: CiLinkedin,
  },
  {
    title: "Twitter",
    onClick: () => window.open("https://twitter.com/itsanuragshukla", "_blank"),
    Icon: CiTwitter,
  },
  {
    title: "Email",
    onClick: () => window.open("mailto:www.anuragshukla@gmail.com", "_blank"),
    Icon: CiMail,
  },
];

const ContactSection = () => {
  const postMessage = async (values) => {
    const toPost = JSON.parse(JSON.stringify(values));
    try {
      const { status, msg } = await postMsg(toPost);
      if (status) {
        mFormik.handleReset();
        toast({
          title: msg,
          status: "success",
          isClosable: true,
        });
      } else {
        throw new Error(msg);
      }
    } catch (e) {
      toast({
        title: "Submission error",
        description:
          e.message || "Sorry, we couldn't reach the servers at the moment",
        status: "error",
        isClosable: true,
      });
    }
  };

  const toast = useToast();
  const mFormik = useFormik({
    initialValues: {
      email: "",
      name: "",
      msg: "",
    },
    onSubmit: postMessage,
    validationSchema: messageSchema,
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
  });

  const getOneError = (errors) =>
    Object.values(errors).filter((e) => e.length !== 0)[0];

  useEffect(() => {
    if (mFormik.errors.length === 0 || mFormik.isValidating) return;
    const err = getOneError(mFormik.errors);
    if (!!err)
      toast({
        title: "Validation error",
        description: err,
        duration: 3000,
        status: "error",
        isClosable: true,
      });
  }, [mFormik.isValidating, mFormik.errors, toast]);
  const [official, setOfficial] = useState(true);
  const messageRef = React.useRef(null);

  const handleOfficial = () => {
    setOfficial((prev) => {
      if (prev) {
        mFormik.setFieldValue("email", "unofficial@anurags.tech");
        mFormik.setFieldValue("name", "Stranger");
        messageRef.current.focus();
      } else {
        mFormik.setFieldValue("email", "");
        mFormik.setFieldValue("name", "");
      }
      return !prev;
    });
  };

  return (
    <Box p={8}>
      <Flex justify="center" align="center" mb={8}>
        <CustomBar buttons={socialMediaProfiles} />
      </Flex>
      <Box maxW="md" mx="auto">
        <Stack spacing={4}>
          <Heading textAlign="center" fontSize="2xl" fontWeight={400} mb={4}>
            Contact Me
          </Heading>
          <FormControl>
            <HStack spacing={4} justify="center" align="center">
              <Checkbox
                onChange={handleOfficial}
                isChecked={official}
                colorScheme="green"
                size="lg"
              />{" "}
              <Heading fontSize="md" fontWeight={400}>
                <FormLabel m={0}> Contact officially</FormLabel>
              </Heading>
            </HStack>
          </FormControl>
          <Input
            name="name"
            placeholder="Name"
            size="md"
            readOnly={!official}
            borderRadius="md"
            value={mFormik.values.name}
            onChange={mFormik.handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            size="md"
            borderRadius="md"
            readOnly={!official}
            value={mFormik.values.email}
            onChange={mFormik.handleChange}
          />
          <Textarea
            name="msg"
            placeholder={official ? "Message" : "What's up?"}
            size="md"
            borderRadius="md"
            value={mFormik.values.msg}
            onChange={mFormik.handleChange}
            ref={messageRef}
          />

          <Button onClick={mFormik.handleSubmit} colorScheme="green" size="md">
            Send Message
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ContactSection;
