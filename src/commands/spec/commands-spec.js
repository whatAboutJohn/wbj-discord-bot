import { test } from '../../spec-helper';
import { Client } from 'discord.js';
import C from '../index';

const bot = new Client();

test('Load bot', function(t) {
  t.true(bot instanceof Client);
  t.end();
});

test('Should load all command modules', (t) => {
  t.equal(typeof C.loadModules(bot), 'object', 'Returns array of modules.');
  t.end();
});

test('Should return { id, cmd, msg }.', (t) => {
  let compose = C.compose('yugioh commandName cardName');
  t.ok(_.has(compose, 'id', 'cmd', 'msg'));
  t.end();
});
