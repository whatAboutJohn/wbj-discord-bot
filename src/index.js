#!/usr/bin/env node
'use strict';
import Bot from './Bot';
import Commands from './commands/index.js';

Bot.login().then(bot => {
  console.log('Delegating bot to commands...');

  const C = new Commands(bot).then(promise => {
    console.log('Modules loaded.');
  });
}).catch(console.log);
