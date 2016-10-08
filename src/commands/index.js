import { readDir } from '../util/index';
import env from '../environments';
import _ from 'lodash';

export default class {
  constructor(bot) {
    let self = this;
    this.bot = bot;

    let modules = readDir('./src/commands').map(file => {
      let klass = require(`./${file}`).default;
      return this[file] = new klass(bot);
    });

    return Promise.all(modules).then(() => {
      this.registerEvents;
      return self;
    });
  }

  get registerEvents() {
    this.bot.on('message', message => this.handleMessage(message));
  }

  handleMessage(message) {
    let { users } = message.mentions;
    if (!_.isEmpty(this.isBot(users)) && !_.isEmpty(message.content)) {
      let compose = this.compose(message.content);
      this.delegate(compose, message);
    }
  }

  isBot(users) {
    return users.filter(u => u.username === env.BOT_NAME);
  }

  compose(message) {
    let regex = new RegExp(/(\S+)\s{1}(\S+)\s{1}(\S+)\s{1}(.+)/);
    let [,, id, cmd, msg] = message.match(regex);
    return { id, cmd, msg };
  }

  delegate(compose, message) {
    this[_.capitalize(compose.id)][`command:${compose.cmd}`](compose, message);
  }
}
