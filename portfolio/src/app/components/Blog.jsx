import { Box} from "@chakra-ui/react";
import { useState } from "react";
import renderBlog from "../common/RenderBlog";

export default function Blog() {
  const [data, setData] = useState(
    "#b# #f32# #eh2# #{textDecoration(underline)}# Artifical Intelliegence #e# #!b#  #f16# Artificial intelligence is the simulation of human intelligence processes by machines, especially computer systems. Specific applications of AI include expert systems, natural language processing, speech recognition and machine vision. ;;; ;;; #eimg# #{src(https://picsum.photos/200);;m(auto);;h(300px);;backgroundSize(cover)}# #e# ;;; #b500# #f24# #eh3# How does AI Work ? #e# #!b# #f16# In general, AI systems work by ingesting large amounts of labeled training data, analyzing the data for correlations and patterns, and using these patterns to make predictions about future states. In this way, a #b# chatbot #!b# that is fed examples of text can learn to generate lifelike exchanges with people, or an image recognition  tool can learn to identify and describe objects in images by reviewing millions of examples. New, rapidly improving #ea# #{href(https://google.com);;bg(red.100);;px(1);;textDecoration(underline)}# generative AI #e#  techniques can create realistic text, images, music and other media."
  );

  return <Box>{renderBlog(data)}</Box>;
}
