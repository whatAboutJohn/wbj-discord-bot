import Discord from 'discord.js';
import _ from 'lodash';
import request from 'request';
import yt from 'ytdl-core';
import Commands from './commands/index.js';

const commands = new Commands();

export default () => {
  const bot = new Discord.Client();
  const token = 'MjI3Mjk3OTQ4NTY2ODE0NzIx.CsJNLg.GZaM5wG4_-s5SM30oGey6iV74L8';

  bot.on('ready', () => {
    console.log('Loaded');
  });

  bot.on('message', message => {
    let isBot = message.mentions.users.filter(u => u.username === 'test-bot');

    if (!_.isEmpty(isBot)) {
      // commands.delegateMessage({ message });

      let ygoCommand = new RegExp('(Yugioh) (.+)');
      let cmd = message.content.match(ygoCommand)[1];
      let msg = message.content.match(ygoCommand)[2];
      console.log(`Command ${cmd}; Message ${msg}`);

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
      } else if (message.content.includes('What is the square root of 2 to the negative 9 plus 3 power?')) {
        message.channel.sendMessage('I\'m a bot, not a nerd, nerd.');
      } else if (message.content.includes('++play')) {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) {
          return message.reply(`Please be in a voice channel first!`);
        }
        voiceChannel.join()
          .then(connnection => {
            let stream = yt("https://www.youtube.com/watch?v=dQw4w9WgXcQ", {audioonly: true});
            const dispatcher = connnection.playStream(stream);
            dispatcher.on('end', () => {
              voiceChannel.leave();
            });
          });
      }
    }
  });

  bot.login(token);
};
