#!/usr/bin/env node
// Run: babel-node .
'use strict';
import yt from 'ytdl-core';
import restify from 'restify';
import _ from 'lodash';
import Bot from './Bot';
import Commands from './commands/index.js';

Bot().then(bot => {
  console.log('Delegating bot to commands...');
  Commands.loadModules(bot).then(promise => {
    console.log('Modules loaded.');
    console.log(promise);
  });
}).catch(console.log);
