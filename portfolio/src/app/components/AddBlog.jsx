import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Show,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { Refresh2 } from "iconsax-react";
import { useState } from "react";
import renderBlog from "../common/RenderBlog";

const ConfirmDialog = ({ title, desc, isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{desc}</ModalBody>
        <ModalFooter>
          <Flex gap={4} justify="flex-end">
            <Button colorScheme="red" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={onConfirm}>
              Confirm
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const PreviewWindow = ({ blog }) => {
  return (
    <Box boxShadow="md" p={4} border="1px solid green" rounded="md" h="100%">
      {renderBlog(blog)}
    </Box>
  );
};

const EditorWindow = ({ setBlog, blog }) => {
  return (
    <Box boxShadow="md" border="1px solid green" rounded="md" h="100%">
      <Textarea
        border="none"
        minH="500px"
        w="100%"
        placeholder="Start Writing..."
        fontSize={18}
        onChange={(e) => setBlog(() => e.target.value)}
        value={blog}
      />
    </Box>
  );
};

const AddBlog = () => {
  const [blog, setBlog] = useState(
    "#eh1# #f32# #b1000# Hello World! #e# #b# #f#"
  );
  const clear = useDisclosure();
  const save = useDisclosure();
  const restore = useDisclosure();
  const post = useDisclosure();
  return (
    <Grid templateRows="auto 1fr">
      <ConfirmDialog
        title="Are you sure ?"
        desc="This action will erase everything you've wrote. This action is irreversible."
        onClose={clear.onClose}
        isOpen={clear.isOpen}
        onConfirm={() => {
          setBlog("");
          clear.onClose();
        }}
      />
      <ConfirmDialog
        title="Are you sure ?"
        desc="This action will overrite the previously saved buffer. This action is irreversible."
        onClose={save.onClose}
        isOpen={save.isOpen}
        onConfirm={() => {
          localStorage.setItem("blog-buffer", blog);
          save.onClose();
        }}
      />
      <ConfirmDialog
        title="Are you sure ?"
        desc="This action will overwrite current content with previously saved buffer . This action is irreversible."
        onClose={restore.onClose}
        isOpen={restore.isOpen}
        onConfirm={() => {
          const buffer = localStorage.getItem("blog-buffer");
          if (!!buffer) setBlog(buffer);
          restore.onClose();
        }}
      />
      <ConfirmDialog
        title="Are you sure ?"
        desc="This action will post the blog and make it publically visible. This action is irreversible."
        onClose={post.onClose}
        isOpen={post.isOpen}
        onConfirm={() => {
          post.onClose();
        }}
      />
      <GridItem>
        <Flex gap={4} mb={4} flexDir="column">
          <Flex flexDir="row" w="100%" gap={2} justify="space-between">
            <Input placeholder="Title" maxW="800px" />
            <Flex gap={1}>
              <Button colorScheme="red" onClick={clear.onOpen}>
                Clear
              </Button>
              <Button colorScheme="blue" onClick={restore.onOpen}>
                <Refresh2 />
              </Button>
              <Button colorScheme="green" onClick={save.onOpen}>
                Save
              </Button>
              <Button colorScheme="blue" onClick={post.onOpen}>
                Post
              </Button>
            </Flex>
          </Flex>
          <Flex flexDir="column" gap={2}>
            <Input placeholder="Image URL" />
            <Input placeholder="Tags" />
            <Textarea placeholder="Description" />
          </Flex>
        </Flex>
      </GridItem>
      <GridItem>
        <Show below="md">
          <Tabs isFitted variant="solid-rounded">
            <TabList mb="1em">
              <Tab>Edit</Tab>
              <Tab>Preview</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <EditorWindow setBlog={setBlog} blog={blog} />
              </TabPanel>
              <TabPanel>
                <PreviewWindow blog={blog} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Show>
        <Show above="md">
          <Grid templateColumns="1fr auto 1fr" columnGap={1} h="100%">
            <EditorWindow setBlog={setBlog} blog={blog} />
            <Divider rounded="full" orientation="vertical" />
            <PreviewWindow blog={blog} />
          </Grid>
        </Show>
      </GridItem>
    </Grid>
  );
};

export default AddBlog;
