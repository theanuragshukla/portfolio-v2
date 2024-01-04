import {
  Box,
  Flex,
  IconButton,
  Progress,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import renderBlog from "../common/RenderBlog";
import { deleteOneBlog, getOneBlog } from "../data/managers/blog";
import { MdDelete } from "react-icons/md";
import {  Edit } from "iconsax-react";
import { ConfirmDialog } from "./AddBlog";

export default function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const navigate = useNavigate();
  const del = useDisclosure();
  const toast = useToast();
  const { isAdmin } = useOutletContext();

  useEffect(() => {
    const getBlog = async () => {
      const { status, data = {} } = await getOneBlog(id);
      if (!!status) {
        setBlog((prev) => ({ ...prev, ...data }));
      } else {
        toast({
          status: "error",
          title: "Invalid Blog id",
        });
        navigate("/blog");
      }
    };
    getBlog();
  }, [id, navigate, toast]);

  const deletePost = async () => {
    try {
      const { status, msg } = await deleteOneBlog(id);
      if (status) {
        toast({
          title: "Deleted successfully",
          status: "success",
          isClosable: true,
        });
        sessionStorage.clear();
        navigate("/blog", { replace: true });
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
      del.onClose();
    }
  };

  const leftControls = [];

  const rightControls = [
    { name: "Delete", icon: MdDelete, onClick: del.onOpen },
    {
      name: "Edit",
      icon: Edit,
      onClick: () => {
        navigate(`/blog/edit/${id}`);
      },
    },
  ];

  return (
    <Box>
      <ConfirmDialog
        desc="Are you sure you want to delete ?"
        title="Delete ?"
        isOpen={del.isOpen}
        onClose={del.onClose}
        onConfirm={deletePost}
      />

      {!!blog && !!blog.body ? (
        renderBlog(blog.body)
      ) : (
        <Progress isIndeterminate h={1} />
      )}
      {!!isAdmin && (
        <Flex justifyContent="space-between" mb={8}>
          <Stack direction="row" spacing={4}>
            {leftControls.map((ctrl) => (
              <IconButton
                onClick={ctrl.onClick}
                key={ctrl.name}
                aria-label={ctrl.name}
                icon={<ctrl.icon />}
                isRound
                size="lg"
              />
            ))}
          </Stack>

          <Stack direction="row" spacing={4}>
            {rightControls.map((ctrl) => (
              <IconButton
                onClick={ctrl.onClick}
                key={ctrl.name}
                aria-label={ctrl.name}
                icon={<ctrl.icon />}
                isRound
                size="lg"
              />
            ))}
          </Stack>
        </Flex>
      )}
    </Box>
  );
}
