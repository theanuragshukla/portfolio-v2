const express = require("express");
const port = 5000;
const app = express();
const http = require("http").Server(app);
const exec = require("child_process").exec;
const cors = require("cors");
const blogRouter = require("./routes/blog");
const contactRouter = require("./routes/contactRouter");
const { getToken } = require("./utils/authHelpers");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());
require("./utils/database.js");

const allowedOrigins = [
  "http://localhost:3000",
  "https://theanuragshukla.github.io",
  "https://anurags.tech",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
function execute(command, callback) {
  exec(command, function (error, stdout, stderr) {
    callback(stdout);
  });
}

const repoCount = (lang, cb) => {
  execute(`bash ./repoCount.sh ${lang}`, (e) => {
    const x = e.toString().replaceAll("\n", "");
    if (Number(x) !== NaN) {
      cb(x);
    }
  });
};

app.post("/getToken", getToken);

app.get("/lang-in-repo/:lang", (req, res) => {
  try {
    const { lang } = req.params;
    repoCount(lang, (count) => {
      res.json({ status: true, data: { lang, count } });
      return;
    });
  } catch (e) {
    res.json({
      status: false,
    });
  }
});

app.use("/blog", blogRouter);
app.use("/contact", contactRouter);

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
