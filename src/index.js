#!/usr/bin/env node
// Run: babel-node .

'use strict';

import Commands from './commands';
import bot from './Bot';

const Module = {};

Commands.map(Klass => {
  Module[Klass.name] = new Klass();
});
