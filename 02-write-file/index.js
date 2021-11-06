const fs   = require('fs');
const path = require('path');
const link = path.join(__dirname, 'text.txt')

const readline = require('readline');
const { 
    stdin: input, 
    stdout: output, 
    stdout
      } = require('process');

const rl = readline.createInterface({ input, output });

const message = `${"Please, write your text"}`;

console.log(message);

fs.open(link, "a+", (err) => {
    if(err) throw err;
});

rl.on("line", (input) => {
    input.trim();
    if (input == "exit") {
        console.log("session is over");
        process.exit();
    }
    fs.appendFile(link, `${input}\n`, (err) => {
        if (err) {
          throw err;
        }
      });
})

rl.on("close", () => {
    console.log("session is over");
    process.exit();
  });
