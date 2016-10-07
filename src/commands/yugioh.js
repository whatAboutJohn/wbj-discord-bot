import request from 'request';
import _ from 'lodash';

export default class Yugioh {
  constructor(bot) {
    this.bot = bot;
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
