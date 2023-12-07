const crypto = require("crypto");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const generateUid = (len = 16) => {
  const uid = crypto.randomBytes(len).toString("hex").substring(0, 32);
  return uid;
};

const verifyToken = async (authToken) => {
  try {
    const payload = jwt.verify(authToken, secret);
    if (!!payload.status) {
      return { status: true };
    } else {
      return { status: true };
    }
  } catch (e) {
    return { status: false };
  }
};

const getToken = (req, res) => {
  try {
    const { password } = req.body;
    if (new String(password).valueOf() === new String(process.env.ADMIN_SECRET).valueOf()) {
      const token = jwt.sign({ status: true }, secret, {
        expiresIn: "1d",

      });
      res.cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json({ status: true });
    } else {
      res.json({ status: false });
    }
  } catch (e) {
    res.json({ status: false });
  }
  return
};

const resolveToken = async (req, res, next) => {
  const { token } = req.cookies;
  const authData = await verifyToken(token);
  if (!authData.status) {
    res.status(401).json({
      status: false,
      msg: "unauthorised access",
    });
  } else {
    next();
  }
};

module.exports = {
  generateUid,
  verifyToken,
  resolveToken,
  getToken
};
