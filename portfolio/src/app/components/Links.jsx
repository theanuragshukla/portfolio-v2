import React from 'react';
import {
  Box,
  Flex,
  IconButton,
  Input,
  Textarea,
  Button,
  Link,
  Stack,
} from '@chakra-ui/react';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
} from 'react-icons/fa';

const socialMediaProfiles = [
  { title: 'GitHub', link: 'https://github.com/your-github', icon: FaGithub },
  { title: 'LinkedIn', link: 'https://linkedin.com/in/your-linkedin', icon: FaLinkedin },
  { title: 'Twitter', link: 'https://twitter.com/your-twitter', icon: FaTwitter },
  { title: 'Email', link: 'mailto:your-email@example.com', icon: FaEnvelope },
];

const ContactSection = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

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
            />
          ))}
        </Stack>
      </Flex>

      <Box maxW="md" mx="auto">
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={4}>
            <Input
              placeholder="Your Name"
              size="md"
              borderRadius="md"
            />
            <Input
              type="email"
              placeholder="Your Email"
              size="md"
              borderRadius="md"
            />
            <Textarea
              placeholder="Your Message"
              size="md"
              borderRadius="md"
            />

            <Button type="submit" colorScheme="green" size="md">
              Send Message
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default ContactSection;

