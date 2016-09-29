#!/usr/bin/env node
// Run: babel-node .

import bot from './Bot';
import Commands from './commands/index';

const commands = new Commands();

bot();
