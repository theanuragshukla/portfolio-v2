import * as yup from 'yup'

const blogSchema = yup.object({
  title: yup
    .string()
    .min(1, "Title should be at least 1 characters")
    .max(50, "Title should be at most 50 characters")
    .required("Title is required"),
  desc: yup
    .string("Invalid Description")
    .min(20, "Description should be at least 20 characters")
    .max(300, "Description should be at most 300 characters")
    .required("Description is not provided"),
  img: yup
    .string("Invalid image url")
    .url("Invalid Url")
    .max(150, "Image url too long")
    .required("Image Url is required is required"),
  body: yup.string().required("Blog body cannot be empty"),
  tags: yup.string(),
});

export default blogSchema
