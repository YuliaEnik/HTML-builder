const fs   = require('fs');
const path = require('path');
const link = path.join(__dirname, 'text.txt');
const readline = require('readline');
const { 
    stdin: input, 
    stdout: output, 
      } = require('process');
const messageOpen = "Please, write your text";
const messageClose = "Session is over";

const rl = readline.createInterface({ input, output });

console.log(messageOpen);

fs.open(link, "a+", (err) => {
    if(err) throw err;
});

rl.on("line", (input) => {
    input.trim();
    if (input == "exit") {
        console.log(messageClose);
        process.exit();
    }
    fs.appendFile(link, `${input}\n`, (err) => {
        if (err) {
          throw err;
        }
      });
})

rl.on("close", () => {
    console.log(messageClose);
    process.exit();
  });
