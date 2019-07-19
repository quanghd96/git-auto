const fs = require("fs");
const gitDirectory = "/Volumes/DATA/test-git-auto";
const isExist = fs.existsSync(gitDirectory);
if (!isExist) fs.mkdirSync(gitDirectory);
const git = require("simple-git/promise")(gitDirectory);
git.checkIsRepo().then(isRepo => (isRepo ? pullRepo(git) : cloneRepo(git)));
const cloneRepo = git => {
  return git.clone("https://github.com/quanghd96/AndroidCalendar", ".");
};
const pullRepo = git => {
  return git.pull();
};
