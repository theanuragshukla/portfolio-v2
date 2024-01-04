import { Button, Flex, Grid, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../data/managers/blog";
import BlogCard from "./BlogCard";

export default function Blogs() {
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [over, setOver] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (over) return;
    const getBlogs = async () => {
      setLoading(true);
      const key = `page${page}`;
      const cache = sessionStorage.getItem(key);
      if (!!cache) {
        const data = JSON.parse(cache);
        setBlogs((prev) => [...prev, ...data]);
        if (data.length < 20) {
          setOver(true);
        }
        setLoading(false);
        return;
      }
      const { status, data = [] } = await getAllBlogs(page);
      if (!!status) {
        setBlogs((prev) => [...prev, ...data]);
        sessionStorage.setItem(key, JSON.stringify(data));
        if (data.length < 20) {
          setOver(true);
        }
      }
      setLoading(false);
    };
    getBlogs();
  }, [page, over]);

  return (
    <Grid templateRows="1fr auto">
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
        gap={4}
      >
        {blogs.map((blog) => (
          <BlogCard {...blog} />
        ))}
      </Grid>

      <Flex
        justify="center"
        display={blogs.length > 0 ? "none" : "flex"}
        mt={8}
      >
        <Heading fontSize="lg">No blogs Available</Heading>
      </Flex>
      <Flex justify="center" display={over ? "none" : "flex"} mt={8}>
        <Button
          isLoading={loading}
          loadingText=""
          onClick={() => setPage((e) => e + 1)}
          colorScheme="whatsapp"
          variant="outline"
        >
          Load More
        </Button>
      </Flex>
    </Grid>
  );
}
