const express = require("express");blog
const Blog = require("../../models/Blog");
const blogSchema = require("../../utils/validation/blogSchema");
const router = express.Router();
const validateBody = require("../../middlewares/validation");
const { generateUid, resolveToken } = require("../../utils/authHelpers");
const { filterJSON } = require("../../utils/filterJson");

router.get("/", async (req, res) => {
  try {
    let { page = 1 } = req.query;
    page = Math.max(1, page);
    const size = 20;
    const blogs = await Blog.find()
      .skip(size * (page - 1))
      .limit(size);
    res.json({ status: true, data: filterJSON(blogs) });
  } catch (e) {
    res.json({ status: false, msg: e.message || "Unexpected server error" });
  }
});

router.get("/:uid", async (req, res) => {
  try {
    let { uid } = req.params;
    if (!!uid) {
      const blog = await Blog.findOne({ uid });
      if (!!blog) {
        res.json({ status: true, data: filterJSON([blog])[0] });
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
