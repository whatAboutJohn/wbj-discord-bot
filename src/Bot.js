import Discord from 'discord.js';
import _ from 'lodash';
import request from 'request';

export default () => {
  const bot = new Discord.Client();
  const token = 'MjI3Mjk3OTQ4NTY2ODE0NzIx.CsJNLg.GZaM5wG4_-s5SM30oGey6iV74L8';

  bot.on('ready', () => {
    console.log('Loaded');
  });

  bot.on('message', message => {
    let isBot = message.mentions.users.filter(u => u.username === 'test-bot');

    if (!_.isEmpty(isBot)) {
      let ygoCommand = new RegExp('(ygo)(\\s{1}.+)');

      if (ygoCommand.test(message.content)) {
        let cardName = message.content.match(ygoCommand)[2].trim();
        let url = `http://yugiohprices.com/api/card_data/${cardName}`;

        request(url, function (error, response, body) {
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
  });

  bot.login(token);
};
