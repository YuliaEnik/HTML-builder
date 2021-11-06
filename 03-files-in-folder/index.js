const fs   = require('fs');
const path = require('path');
const link = path.join(__dirname, 'secret-folder');


fs.readdir(link, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        let fileLink = path.join(__dirname, 'secret-folder', `${file}`);
        fs.stat(fileLink, (err, stats) => {
          if (err) throw err;
          if (stats.isFile() == true )
              console.log(`${path.parse(fileLink).name} - ${path.extname(fileLink).slice(1)} - ${stats.size/1000}kb`);  
        })  
    });
  });