const fs = require("fs");
const gitDirectory = "/Volumes/DATA/test-git-auto";
const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());
const port = 3000;

app.get("/update", async (req, res) => {
  try {
    const isExist = fs.existsSync(gitDirectory);
    if (!isExist) fs.mkdirSync(gitDirectory);
    const git = require("simple-git/promise")(gitDirectory);
    const isRepo = await git.checkIsRepo();
    isRepo ? pullRepo(git) : cloneRepo(git);
    res.send();
  } catch (error) {
    console.error(error);
  }
});

const cloneRepo = git => {
  return git.clone("https://github.com/quanghd96/AndroidCalendar", ".");
};
const pullRepo = git => {
  return git.pull();
};

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
