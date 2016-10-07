import env from '../environments';
import request from 'request';
import _ from 'lodash';

export default class Yugioh {
  constructor(bot) {
    this.bot = bot;
    this.bot.on('message', message => this._handleMessage(message));
  }

  _handleMessage(message, self = this) {
    let isBot = message.mentions.users.filter(u => u.username === env.BOT_NAME);

    if (!_.isEmpty(isBot) && !_.isEmpty(message.content)) {
      let compose = self._compose(message.content);
      this._delegate(compose, message);
    }
  }

  _compose(message) {
    let regex = new RegExp('(yugioh)\\s{1}(\\S+)\\s{1}(.+)');
    let [,id, cmd, msg] = message.match(regex);
    return { id, cmd, msg };
  }

  _delegate(compose, message) {
    this[`command:${compose.cmd}`](compose, message);
  }

  ['command:info'](compose, message) {
    let cardName = compose.msg;
    let url = `http://yugiohprices.com/api/card_data/${cardName}`;

    request(url, (error, response, body) => {
      let { data, status } = JSON.parse(body);

      if (status === 'success') {
        if (data.card_type === 'monster') {
          let header = `[${_.capitalize(data.card_type)}] ${data.name}\n`;
          let subHeader = `Level ${data.level} | ${_.capitalize(data.family)} | Type ${_.capitalize(data.type)}\n`;
          let body = data.text + '\n';
          let stats = `ATK ${data.atk} | DEF ${data.def}`;

          message.channel.sendMessage(header + subHeader + body + stats);
        } else {
          let header = `[${_.capitalize(data.card_type)}] ${data.name}\n`;
          let subHeader = `${data.property}\n`;
          message.channel.sendMessage(header + subHeader + data.text);
        }
      } else {
        message.channel.sendMessage('Card not found.');
      }
    });
  }
}
