import React, { useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  Input,
  Textarea,
  Button,
  Link,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { useFormik } from "formik";
import messageSchema from "../utils/schemas/messageSchema";
import { postMsg } from "../data/managers/blog";

const socialMediaProfiles = [
  {
    title: "GitHub",
    link: "https://github.com/theanuragshukla",
    icon: FaGithub,
  },
  {
    title: "LinkedIn",
    link: "https://linkedin.com/in/therealanuragshukla",
    icon: FaLinkedin,
  },
  {
    title: "Twitter",
    link: "https://twitter.com/itsanuragshukla",
    icon: FaTwitter,
  },
  {
    title: "Email",
    link: "mailto:www.anuragshukla@gmail.com",
    icon: FaEnvelope,
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
  }, [mFormik.isValidating]);

  return (
    <Box p={8}>
      <Flex justifyContent="center" mb={8}>
        <Stack direction="row" spacing={4}>
          {socialMediaProfiles.map((profile) => (
            <IconButton
              key={profile.name}
              as={Link}
              href={profile.link}
              aria-label={profile.name}
              icon={<profile.icon />}
              isRound
              size="lg"
              target="_blank"
            />
          ))}
        </Stack>
      </Flex>

      <Box maxW="md" mx="auto">
        <Stack spacing={4}>
          <Input
            name="name"
            placeholder="Your Name"
            size="md"
            borderRadius="md"
            value={mFormik.values.name}
            onChange={mFormik.handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            size="md"
            borderRadius="md"
            value={mFormik.values.email}
            onChange={mFormik.handleChange}
          />
          <Textarea
            name="msg"
            placeholder="Your Message"
            size="md"
            borderRadius="md"
            value={mFormik.values.msg}
            onChange={mFormik.handleChange}
          />

          <Button
            onClick={mFormik.handleSubmit}
            colorScheme="green"
            size="md"
          >
            Send Message
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ContactSection;
