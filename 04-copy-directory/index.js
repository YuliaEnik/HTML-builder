const fs = require("fs");
const path = require("path");
const filesFolder = path.join(__dirname, "files");
const filesFolderCopy = path.join(__dirname, "files-copy");
const {rm } = require('fs/promises');

rm(filesFolderCopy, { force: true, recursive: true }).then(() => {
  copyDir(filesFolderCopy, filesFolderCopy)
})

async function copyDir() {
 fs.readdir(filesFolder, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  fs.mkdir(filesFolderCopy, { recursive: true }, (err) => {
    if (err) throw err;
  });
  
  for ( let file of files) {
    fs.copyFile(`${filesFolder}/${file.name}`, `${filesFolderCopy}/${file.name}`, (err) => {
      if(err) throw err
   })
  };
});
}