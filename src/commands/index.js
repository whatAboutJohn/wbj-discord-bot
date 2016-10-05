const fs = require('fs');

function files() {
  let files = fs.readdirSync('./src/commands')
    .filter(file => /^(?!index).+\.js$/i.test(file))
    .map(file => file.slice(0, -3));

  return files;
}

export default class {
  static loadModules(bot) {
    console.log(typeof bot);

    let modules = files().map(file => {
      let klass = require(`./${file}`).default;
      return this[file] = new klass(bot);
    });

    return Promise.all(modules);
  }

  delegateMessage(message) {
    console.log(this);
  }
}
