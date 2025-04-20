const express = require('express');
const Message = require('../models/message');
const validateBody = require('../middlewares/validation');
const messageSchema = require('../utils/validation/messageSchema');
const {generateUid} = require('../utils/authHelpers')

const router = express.Router()

router.post('/', validateBody(messageSchema),  async (req, res)=>{
  try {
    const uid = generateUid(32);
    const { name, email, msg } = req.body;
    const message = new Message({
      uid,
      name, email, msg
    });
    await message.save();
    res.json({ status: true, msg: "Thank you for reaching out!" });
  } catch (e) {
    console.error(e);
    res.json({ status: false, msg: e.message || "Unexpected server error" });
  }
})

module.exports = router

