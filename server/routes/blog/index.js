const express = require("express");
const Blog = require("../../models/Blog");
const blogSchema = require("../../utils/validation/blogSchema");
const router = express.Router();
const validateBody = require("../../middlewares/validation");
const { generateUid, resolveToken } = require("../../utils/authHelpers");
const { filterJSON } = require("../../utils/filterJson");
const {filterBlogs} = require("../../helpers/blog");

router.get("/", async (req, res) => {
  try {
    let { page = 1 } = req.query;
    page = Math.max(1, page);
    const {data, status, hasNext} = await filterBlogs({page});
    return res.json({ status, data, hasNext });
  } catch (e) {
    res.json({ status: false, msg: e.message || "Unexpected server error" });
  }
});

router.get("/search", async (req, res) => {
  const { q:query, page = 1 } = req.query;
  const { status, data, hasNext } = await filterBlogs({ query, page });
  if (status) {
    res.json({ status: true, data, hasNext });
  } else {
    res.json({ status: false, msg: data.msg || "Unexpected server error" });
  }
});

router.get("/:uid", async (req, res) => {
  try {
    let { uid } = req.params;
    if (!!uid) {
      const blog = await Blog.findOne({ uid }).select("-_id -__v -uid -createdAt");
      if (!!blog) {
        res.json({ status: true, data: blog });
      } else {
        res.status(404).json({ status: false, msg: "Invalid blogId" });
      }
    } else throw new Error("blogId is required");
  } catch (e) {
    res.json({ status: false, msg: e.message || "Unexpected server error" });
  }
});

router.use(resolveToken);

router.put("/:uid", validateBody(blogSchema), async (req, res) => {
  try {
    const { title, desc, tags, img, body } = req.body;
    let { uid } = req.params;
    if (!!uid) {
      const blog = await Blog.findOne({ uid });
      if (!!blog) {
        blog.title = title;
        blog.desc = desc;
        blog.tags = tags;
        blog.body = body;
        blog.img = img;
        await blog.save();
        res.json({ status: true, msg: "blog updated" });
      } else {
        res.status(404).json({ status: false, msg: "Invalid blogId" });
      }
    } else throw new Error("blogId is required");
  } catch (e) {
    res.json({ status: false, msg: e.message || "Unexpected server error" });
  }
});

router.delete("/:uid", async (req, res) => {
  try {
    let { uid } = req.params;
    if (!!uid) {
      const blog = await Blog.deleteOne({ uid });
      if (!!blog) {
        res.json({ status: true, data: blog });
      } else {
        res.status(404).json({ status: false, msg: "Invalid blogId" });
      }
    } else throw new Error("blogId is required");
  } catch (e) {
    res.json({ status: false, msg: e.message || "Unexpected server error" });
  }
});

router.post("/", validateBody(blogSchema), async (req, res) => {
  try {
    const uid = generateUid(32);
    const { title, desc, tags, img, body } = req.body;
    const blog = new Blog({
      title,
      img,
      desc,
      body,
      uid,
      tags,
    });
    await blog.save();
    res.json({ status: true, msg: "blog saved" });
  } catch (e) {
    res.json({ status: false, msg: e.message || "Unexpected server error" });
  }
});

module.exports = router;
