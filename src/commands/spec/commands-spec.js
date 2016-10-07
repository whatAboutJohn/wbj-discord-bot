import { test } from '../../spec-helper';
import { Client } from 'discord.js';
import Commands from '../index';

const bot = new Client();

test('Load bot', function(t) {
  t.true(bot instanceof Client);
  t.end();
});

test('Should load all command modules', (t) => {
  t.equal(typeof Commands.loadModules(bot), 'object', 'Returns array of modules.');
  t.end();
});
