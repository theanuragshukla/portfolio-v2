import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Flex,
  Image,
  Tag,
  HStack,
  Divider,
  useColorModeValue,
  IconButton,
  Heading,
  InputRightElement,
} from "@chakra-ui/react";
import { HiSearch, HiX } from "react-icons/hi";
import Loader from '../common/Loader';
import { useState, useRef, useEffect, useCallback } from "react";
import { searchBlog } from "../data/managers/blog";
import { useNavigate } from "react-router-dom";
import { parseDate } from "../utils/utils";

const SearchResultItem = ({ title, image, description, updated, tags, onClick }) => {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  return (
    <Flex
      w="100%"
      p={3}
      borderRadius="md"
      border="1px solid"
      borderColor={borderColor}
      mb={2}
      _hover={{
        bg: hoverBg,
        cursor: "pointer",
      }}
      alignItems="center"
      onClick={onClick}
    >
      {image && (
        <Box mr={3} flexShrink={0}>
          <Image
            src={image}
            alt={title}
            boxSize="50px"
            objectFit="cover"
            borderRadius="md"
          />
        </Box>
      )}

      <Flex direction="column" flex="1" overflow="hidden">
        <Text fontWeight="bold" noOfLines={1}>
          {title}
        </Text>
        <Text fontSize="sm" color="gray.500" noOfLines={1} mb={1}>
          {description}
        </Text>

        <Flex justifyContent="space-between" alignItems="center">
          <HStack spacing={1}>
            {tags &&
              tags.map((tag, idx) => (
                <Tag key={idx} size="sm" variant="subtle" colorScheme="blue">
                  {tag}
                </Tag>
              ))}
          </HStack>

          <Text fontSize="xs" color="gray.500">
            {parseDate(updated)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const SearchPopup = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);
  const debounceTimerRef = useRef(null);
  const navigate = useNavigate();
  const bgColor = useColorModeValue("white", "gray.800");

  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsLoading(true);
      const { status, data } = await searchBlog(query);
      if (status) {
        setSearchResults(data);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useCallback((query) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      performSearch(query);
    }, 300);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
  };

  const handleResultClick = (result) => {
    onClose();
    clearSearch();
    navigate(`/blog/${result.uid}`);
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
    
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [isOpen]);

  return (
    <Modal
      onEsc={onClose}
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      motionPreset="slideInTop"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
      <ModalContent
        bg={bgColor}
        boxShadow="xl"
        borderRadius="lg"
        overflow="hidden"
      >
        <ModalHeader p={0}>
          <Heading textAlign="center" py={4} size="md">
            Search Blogs
          </Heading>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <HiSearch color="gray.400" />
            </InputLeftElement>
            <Input
              ref={inputRef}
              placeholder="Enter search term..."
              border="none"
              _focus={{ boxShadow: "none" }}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              pr="4rem"
            />
            <InputRightElement>
              <IconButton
                position="absolute"
                right={4}
                top="50%"
                transform="translateY(-50%)"
                size="sm"
                aria-label="Clear search"
                icon={<HiX />}
                variant="ghost"
                onClick={clearSearch}
                isDisabled={!searchQuery}
              />
            </InputRightElement>
          </InputGroup>
        </ModalHeader>
        <ModalCloseButton top="12px" />

        <Divider />

        <ModalBody maxH="500px" overflowY="auto" py={3}>
          {isLoading && (
            <Flex justifyContent="center" alignItems="center" py={4}>
              <Loader isLoading />
            </Flex>
          )}
          {!isLoading && searchResults.length === 0 && (
            <Flex justifyContent="center" alignItems="center" py={4}>
              <Text>No results found</Text>
            </Flex>
          )}
          {searchResults.map((result, index) => (
            <SearchResultItem
              key={index}
              title={result.title}
              image={result.img}
              description={result.desc}
              updated={result.updatedAt}
              tags={result.tags}
              onClick={() => handleResultClick(result)}
            />
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
