import Discord from 'discord.js';

export default () => {
  const bot = new Discord.Client();
  const token = 'MjI3Mjk3OTQ4NTY2ODE0NzIx.CsJNLg.GZaM5wG4_-s5SM30oGey6iV74L8';

  bot.on('ready', () => {
    console.log('Bot ready');
  });

  return bot.login(token).then(() => bot).catch(console.log);
};
