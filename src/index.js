#!/usr/bin/env node
// Run: babel-node .
'use strict';
import yt from 'ytdl-core';
import restify from 'restify';
import _ from 'lodash';
import Bot from './Bot';
import Commands from './commands/index.js';

Bot().then(bot => {
  console.log('Delegating bot to commands...');
  Commands.loadModules(bot).then(promise => {
    console.log('Modules loaded.');
    console.log(promise);

    bot.on('message', message => {
      let isBot = message.mentions.users.filter(u => u.username === 'test-bot');

      if (!_.isEmpty(isBot)) {

        let ygoCommand = new RegExp('(Yugioh) (.+)');

        // commands.delegateMessage({ message });
        // let cmd = message.content.match(ygoCommand)[1];
        // let msg = message.content.match(ygoCommand)[2];

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

    const guild = bot.guilds.find('id', '229798554544111617');
    const channel = guild.channels.find('id', '229798554544111617');

    const server = restify.createServer();

    server.pre(restify.pre.userAgentConnection());
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.bodyParser());

    server.get('/send_message', respond);

    function respond(req, res, next) {
      const { message } = req.params;

      if (message) {
        channel.sendMessage(decodeURI(message)).then(message => {
          console.log(`Sent message: ${message.content}`);
          next();
        }).catch(console.log);
      }
    }

    server.listen(8080, () => console.log('%s listening at %s', server.name, server.url));

  });
}).catch(console.log);
