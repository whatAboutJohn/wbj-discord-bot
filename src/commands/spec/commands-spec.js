import { test } from '../../spec-helper';
import { Client } from 'discord.js';
import Commands from '../index';
import _ from 'lodash';

const bot = new Client();

test('Load bot', function(t) {
  t.true(bot instanceof Client);
  t.end();
});

new Commands(bot).then(c => {
  test('Should return { id, cmd, msg }.', (t) => {
    let compose = c.compose('<@bot-id> yugioh commandName cardName');
    t.ok(_.has(compose, 'id', 'cmd', 'msg'));
    t.end();
  });
});
