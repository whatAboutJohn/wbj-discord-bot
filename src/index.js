#!/usr/bin/env node
'use strict';
import yt from 'ytdl-core';
import Bot from './Bot';
import Commands from './commands/index.js';

Bot.login().then(bot => {
  console.log('Delegating bot to commands...');
  Commands.loadModules(bot).then(promise => {
    console.log('Modules loaded.');
    console.log(promise);
  });
}).catch(console.log);
