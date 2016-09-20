'use strict';

var Discord = require('discord.js');
var request = require('request');

var bot = new Discord.Client();
var token = 'MjI3Mjk3OTQ4NTY2ODE0NzIx.CsJNLg.GZaM5wG4_-s5SM30oGey6iV74L8';

bot.on('ready', function () {
  console.log('Loaded');
});

bot.on('message', function (message) {
  var ygoCommand = new RegExp('(^ygo)(\\s{1}.+)');

  if (message.content === ygoCommand.test(message)) {
    var cardName = message.match(ygoCommand)[2];
    var url = 'http://yugiohprices.com/api/card_data/' + cardName;

    message.channel.sendMessage('Fetching...');
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        message.channel.sendMessage(body);
      }
    });
  }
});

// log our bot in
bot.login(token);
