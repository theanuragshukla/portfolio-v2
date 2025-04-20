import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
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
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Refresh2 } from "iconsax-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import renderBlog from "../common/RenderBlog";
import { getOneBlog, publishBlog, updateBlog } from "../data/managers/blog";
import blogSchema from "../utils/schemas/blogSchema";

export const ConfirmDialog = ({ title, desc, isOpen, onClose, onConfirm }) => {
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

const EditorWindow = ({ formik }) => {
  return (
    <Box boxShadow="md" border="1px solid green" rounded="md" h="100%">
      <Textarea
        name="body"
        border="none"
        w="100%"
        height="100%"
        resize="vertical"
        placeholder="Start Writing..."
        fontSize={18}
        onChange={formik.handleChange}
        value={formik.values.body}
      />
    </Box>
  );
};

const AddBlog = ({ edit }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(
    "#eh1# #f32# #b1000# Hello World! #e# #b# #f#"
  );
  const clear = useDisclosure();
  const save = useDisclosure();
  const restore = useDisclosure();
  const post = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    title: "",
    desc: "",
    img: "",
    tags: "",
    body: "#eh1# #f32# #b1000# Hello World! #e# #b# #f#",
  });

  const clearBlog = () => {
    mFormik.setFieldValue("body", "");
    setBlog("");
    clear.onClose();
  };

  const saveToBuffer = () => {
    localStorage.setItem("blog-buffer", JSON.stringify(mFormik.values));
    save.onClose();
  };

  const restoreBuffer = () => {
    const buffer = localStorage.getItem("blog-buffer");
    if (!!buffer){
      setInitialValues((o) => ({ ...o, ...JSON.parse(buffer) }));
      mFormik.setValues({
        ...mFormik.values,
        ...JSON.parse(buffer)
      })
    }
    restore.onClose();
  };

  const postBlog = async (values) => {
    const toPost = JSON.parse(JSON.stringify(values));
    toPost.tags = values.tags.length > 0 ? values.tags.split(",") : [];
    try {
      const { status, msg } = await (edit
        ? updateBlog(id, toPost)
        : publishBlog(toPost));
      if (status) {
        sessionStorage.clear();
        toast({
          title: "Published successfully",
          status: "success",
          isClosable: true,
        });
        navigate(edit ? `/blog/${id}` : "/blog");
      } else {
        throw new Error(msg);
      }
    } catch (e) {
      toast({
        title: "Submission error",
        description: e.message || "Unexpected parse error",
        status: "error",
        isClosable: true,
      });
    } finally {
      post.onClose();
    }
  };

  const mFormik = useFormik({
    initialValues,
    onSubmit: postBlog,
    validationSchema: blogSchema,
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
  });

  const btns = [
    {
      title: "Are you sure ?",
      desc: "This action will erase everything you've wrote. This action is irreversible.",
      disclosure: clear,
      onConfirm: clearBlog,
      label: "Clear",
      color: "red",
    },
    {
      title: "Are you sure ?",
      desc: "This action will overwrite current content with previously saved buffer . This action is irreversible.",
      disclosure: restore,
      onConfirm: restoreBuffer,
      label: <Refresh2 />,
      color: "blue",
    },
    {
      title: "Are you sure ?",
      desc: "This action will overrite the previously saved buffer. This action is irreversible.",
      disclosure: save,
      onConfirm: saveToBuffer,
      label: "Save",
      color: "green",
    },
    {
      title: "Are you sure ?",
      desc: "This action will post the blog and make it publically visible. This action is irreversible.",
      disclosure: post,
      onConfirm: mFormik.handleSubmit,
      label: "Post",
      color: "green",
    },
  ];

  useEffect(() => {
    setBlog(() => mFormik.values.body);
  }, [mFormik.values.body]);

  const getOneError = (errors) =>
    Object.values(errors).filter((e) => e.length !== 0)[0];

  useEffect(() => {
    if (mFormik.errors.length === 0 || mFormik.isValidating) return;
    const err = getOneError(mFormik.errors);
    if (!!err){
      toast({
        title: "Validation error",
        description: err,
        duration: 3000,
        status: "error",
        isClosable: true,
      });
    }
  }, [mFormik.isValidating, mFormik.errors, toast, post]);

  useEffect(() => {
    const x = async () => {
      if (!!edit) {
        if (!!id) {
          const { status, data } = await getOneBlog(id);
          if (status) {
            setInitialValues((o) => ({
              ...o,
              ...data,
              tags: data.tags.join(),
            }));
          } else {
            navigate("/blog");
          }
        } else {
          navigate("/blog");
        }
      }
    };
    x();
  }, [edit, id, navigate]);

  return (
    <Grid templateRows="auto 1fr">
      <GridItem>
        <Flex gap={4} mb={4} flexDir="column">
          <Flex flexDir="row" w="100%" gap={2} justify="space-between">
            <Input
              placeholder="Title"
              maxW="800px"
              name="title"
              onChange={mFormik.handleChange}
              value={mFormik.values.title}
            />
            <Flex gap={1}>
              {btns.map((obj) => (
                <>
                  <ConfirmDialog
                    title={obj.title}
                    desc={obj.desc}
                    onClose={obj.disclosure.onClose}
                    isOpen={obj.disclosure.isOpen}
                    onConfirm={obj.onConfirm}
                  />
                  <Button
                    colorScheme={obj.color}
                    onClick={obj.disclosure.onOpen}
                  >
                    {obj.label}
                  </Button>
                </>
              ))}
            </Flex>
          </Flex>
          <Flex flexDir="column" gap={2}>
            <Input
              placeholder="Image URL"
              name="img"
              onChange={mFormik.handleChange}
              value={mFormik.values.img}
            />
            <Input
              placeholder="Tags"
              name="tags"
              onChange={mFormik.handleChange}
              value={mFormik.values.tags}
            />
            <Textarea
              placeholder="Description"
              name="desc"
              onChange={mFormik.handleChange}
              value={mFormik.values.desc}
            />
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
                <EditorWindow formik={mFormik} />
              </TabPanel>
              <TabPanel>
                <PreviewWindow blog={blog} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Show>
        <Show above="md">
          <Grid templateColumns="1fr auto 1fr" columnGap={1} h="100%">
            <EditorWindow formik={mFormik} />
            <Divider rounded="full" orientation="vertical" />
            <PreviewWindow blog={blog} />
          </Grid>
        </Show>
      </GridItem>
    </Grid>
  );
};

export default AddBlog;
