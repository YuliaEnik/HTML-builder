const fs = require('fs');
const path = require('path');
const link = path.join(__dirname, 'text.txt')



fs.readFile(link, 'utf8', (err, data) => {
    if(err) throw err;
    console.log(data);
});

