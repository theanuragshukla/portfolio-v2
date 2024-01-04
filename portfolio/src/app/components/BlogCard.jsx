import React from 'react';
import { Box, Text, Badge,  Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const BlogCard = ({ title, desc, tags, img, uid }) => {
  return (
    <Box
    w="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      shadow="md"
      _hover={{ shadow: 'lg' }}
    >
    <Box h="180px" bg={`url(${img})`} bgPos="center" bgSize="cover" mb={4}/>

      <Text fontSize="xl" fontWeight="semibold" mb={2} noOfLines={2}>
        {title}
      </Text>

      <Text mb={4} noOfLines={4}>{desc}</Text>

      <Stack direction="row" spacing={2} mb={4} wrap="wrap">
        {tags.map((tag, index) => (
          <Badge key={index} borderRadius="full" px="2" colorScheme="teal">
            {tag}
          </Badge>
        ))}
      </Stack>
      <Link to={`/blog/${uid}`} color="teal.500">
        Read More
      </Link>
    </Box>
  );
};

export default BlogCard;

