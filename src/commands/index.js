import fs from 'fs';
import { readDir } from '../util/index';

export default class {
  static loadModules(bot) {
    let modules = readDir('./src/commands').map(file => {
      let klass = require(`./${file}`).default;
      return this[file] = new klass(bot);
    });

    return Promise.all(modules);
  }

  delegateMessage(message) {
    console.log(this);
  }
}
