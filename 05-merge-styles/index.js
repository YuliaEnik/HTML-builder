const fs   = require('fs');
const path = require('path');
const bundleCss = path.join(__dirname, 'project-dist/bundle.css');
const cssFiles = path.join(__dirname, 'styles');


fs.writeFile(bundleCss, "", (err) => {
    if (err) throw err;
  });

  fs.readdir(cssFiles, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    for (let file of files) {
      if (path.extname(`${file.name}`) === ".css") {
        fs.readFile(`${cssFiles}/${file.name}`, "utf-8", (err, data) => {
          if (err) throw err;
          else {
            fs.appendFile(bundleCss, data, (err) => {
              if (err) throw err;
            });
        }
    });
}
};
}); 


