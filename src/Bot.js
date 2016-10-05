import Discord from 'discord.js';
import env from 'dotenv';

env.config();

export default () => {
  const bot = new Discord.Client();
  const token = process.env.DISCORD_TOKEN;

  bot.on('ready', () => {
    console.log('Bot ready');
  });

  return bot.login(token).then(() => bot).catch(console.log);
};
