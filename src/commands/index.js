const fs = require('fs');

function files() {
  let files = fs.readdirSync('./src/commands');
  files = files.filter(file => /^(?!index).+\.js$/i.test(file));
  files = files.map(file => file.slice(0, -3));
  return files;
}

export default class {
  constructor() {
    files().map(file => {
      const Klass = require(`./${file}`).default;
      this[file] = new Klass();
    });
  }
}
