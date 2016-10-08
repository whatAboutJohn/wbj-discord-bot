import Discord from 'discord.js';
import env from './environments';

export default {
  login() {
    const bot = new Discord.Client();

    bot.on('ready', () => {
      console.log('Bot ready');
    });

    return bot.login(env.DISCORD_TOKEN).then(() => bot);
  }
};
