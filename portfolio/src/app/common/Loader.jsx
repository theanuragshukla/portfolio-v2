import { Progress } from "@chakra-ui/react";

const Loader = ({ isLoading } = {
  isLoading: true
}) => {
  return isLoading ? <Progress isIndeterminate h="2px" w="full" /> : null;
};

export default Loader;
