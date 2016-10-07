import Discord from 'discord.js';
import env from './environments';

export default {
  login() {
    const bot = new Discord.Client();
    const token = process.env.DISCORD_TOKEN;

    bot.on('ready', () => {
      console.log('Bot ready');
    });

    return bot.login(token).then(_token => bot);
  }
};
