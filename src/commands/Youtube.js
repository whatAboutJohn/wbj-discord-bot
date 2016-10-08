import yt from 'ytdl-core';

export default class Youtube {
  constructor(bot) {
    this.bot = bot;
  }

  ['command:play'](compose, message) {
    const voiceChannel = message.member.voiceChannel;

    if (!voiceChannel) return message.reply(`Please be in a voice channel first!`);

    voiceChannel.join().then(connnection => {
      let stream = yt(compose.msg, { audioonly: true });
      const dispatcher = connnection.playStream(stream);

      dispatcher.on('end', () => voiceChannel.leave());
    });
  }
}
