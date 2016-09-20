const Discord = require('discord.js');
const request = require('request');
var _ = require('lodash');

const bot = new Discord.Client();
const token = 'MjI3Mjk3OTQ4NTY2ODE0NzIx.CsJNLg.GZaM5wG4_-s5SM30oGey6iV74L8';

bot.on('ready', () => {
  console.log('Loaded');
});

bot.on('message', message => {
  let ygoCommand = new RegExp('(^ygo)(\\s{1}.+)');

  if (ygoCommand.test(message.content)) {
    let cardName = message.content.match(ygoCommand)[2].trim();
    let sanitized = _.startCase(cardName.trim());
    let url = `http://yugiohprices.com/api/card_data/${sanitized}`;

    request(url, function (error, response, body) {
      let { data, status } = JSON.parse(body);

      if (status === 'success') {
        if (data.card_type === 'monster') {
          let header = `[${data.card_type}] ${data.name}\n`;
          let subHeader = `Level ${data.level} | ${_.capitalize(data.family)} | Type ${_.capitalize(data.type)}\n`;
          let body = data.text + '\n';
          let stats = `ATK ${data.atk} | DEF ${data.def}`;

          message.channel.sendMessage(header + subHeader + body + stats);
        } else {
          message.channel.sendMessage(data.name + '\n' + data.text);
        }
      } else {
        message.channel.sendMessage('Card not found.');
      }
    });
  }
});

bot.login(token);
