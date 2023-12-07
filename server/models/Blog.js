const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
    required: true,
    minlength: [32, "UID should be 32 characters"],
    maxlength: [32, "UID should be 32 characters"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [1, "Title should be at least 1 character"],
    maxlength: [50, "Title should be at most 50 characters"],
  },
  desc: {
    type: String,
    required: [true, "Description is required"],
    minlength: [20, "Description should be at least 20 characters"],
    maxlength: [300, "Description should be at most 300 characters"],
  },
  img: {
    type: String,
    required: [true, "Image URL is required"],
    validate: {
      validator: function (value) {
        return /^https?:\/\/\S+$/i.test(value);
      },
      message: "Invalid Image URL",
    },
    maxlength: [150, "Image URL is too long"],
  },
  body: {
    type: String,
    required: [true, "Blog body cannot be empty"],
  },
  tags: {
    type: [String],
    validate: {
      validator: function (value) {
        return value.length <= 5;
      },
      message: "Maximum 5 tags allowed",
    },
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
