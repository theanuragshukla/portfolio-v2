const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
    required: true,
    minlength: [32, "UID should be 32 characters"],
    maxlength: [32, "UID should be 32 characters"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [1, "Name should be at least 1 character"],
    maxlength: [50, "Name should be at most 50 characters"],
  },
  msg: {
    type: String,
    required: [true, "Message is required"],
    minlength: [1, "Message should be at least 20 characters"],
    maxlength: [300, "Message should be at most 300 characters"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    minlength: [5, "Email should be at least 20 characters"],
    maxlength: [150, "Email should be at most 300 characters"],
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
