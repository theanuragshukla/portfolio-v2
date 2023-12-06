const express = require("express");
const port = 5000;
const app = express();
const http = require("http").Server(app);
const exec = require("child_process").exec;
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded());

app.use(cors({
    origin:"*"
}))
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

app.get("/lang-in-repo/:lang", (req, res) => {
    try {
        const { lang } = req.params;
        repoCount(lang, (count) => {
          console.log(lang, count)
            res.json({ status: true, data: { lang, count } });
            return;
        });
    } catch (e) {
        res.json({
            status: false,
        });
    }
});

http.listen(port, () => {
    console.log(`listening on port ${port}`);
});
