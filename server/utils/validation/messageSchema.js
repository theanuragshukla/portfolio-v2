const yup = require("yup");

const messageSchema = yup.object({
  name: yup
    .string()
    .min(1, "Name should be at least 1 characters")
    .max(50, "Name should be at most 50 characters")
    .required("Name is required"),
  msg: yup
    .string("Invalid Message")
    .min(1, "Message should be at least 20 characters")
    .max(300, "Message should be at most 300 characters")
    .required("Message is not provided"),
  email: yup
    .string("Invalid Emaill")
    .email("Invalid Email")
    .max(150, "Email too long")
    .required("Email is required"),
});

module.exports = messageSchema;
