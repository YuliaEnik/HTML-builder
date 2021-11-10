const fs   = require('fs');
const path = require('path');
const prodectDist = path.join(__dirname, 'project-dist');
const html = path.join(__dirname, 'project-dist/index.html');
const css = path.join(__dirname, 'project-dist/style.css');
const components = path.join(__dirname, 'components');
const stylesFolder = path.join(__dirname, 'styles');
const assets = path.join(__dirname, 'assets');
const projectAssets = path.join(__dirname, 'project-dist/assets');
const template = path.join(__dirname, 'template.html');
  

// copy assets folder
const copyFiles = async (assets, prodectDist) => {
    await fs.mkdir(prodectDist, {recursive: true}, () => {});
    fs.readdir(assets, {withFileTypes: true}, (err, files) => {
      if (err) throw err; 
        for (let file of files)  {
        let assetsFile = path.join(assets, file.name);
        let projectAssetsFile = path.join(prodectDist, file.name);
        if(file.isDirectory()) {
          copyFiles(assetsFile, projectAssetsFile);
        } else {
          fs.copyFile(assetsFile, projectAssetsFile, () => {});
        }
      };
    });
  };
  
  const copyFolder = async (assets, prodectDist) => {
    await fs.mkdir(prodectDist, {recursive: true}, () => {});
    await copyFiles(assets, projectAssets );
  };
  
  copyFolder(assets, prodectDist);

  // CSS

  const buildCSS = ( folder, item, extension) => {
    fs.readdir(folder, { withFileTypes: true }, (err, files) => {
        if (err) throw err; 
        for (let file of files) {
          if((path.extname(`${file}`)).toString = extension){
            console.log(path.extname(`${file}`))
              fs.readFile(`${folder}/${file.name}`, "utf-8", (err, data) => {
                if (err) throw err;
                else {
                  fs.appendFile(item, data, (err) => {
                    if (err) throw err;
                  });
              }
          });
        }
      };
      });
    }
  
  const estensionCSS = ".css"
  buildCSS(stylesFolder, css, estensionCSS);

// HTML

const buildHtml = async () => {
    await fs.promises.copyFile(template, html);
    const files = await fs.promises.readdir(components);
    let template1 = await fs.promises.readFile(template, {encoding: 'utf-8'})
    await Promise.all(files.map(file => new Promise(async (res) => {
      const chunk = await fs.promises.readFile(path.join(__dirname, 'components', file), {encoding: 'utf-8'})
      template1 = template1.replace(`{{${file.split('.')[0]}}}`, chunk);
      res();
    })))
    await fs.promises.writeFile(html, template1, {flags: 'w'})
  }
  
  buildHtml()