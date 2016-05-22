#!/usr/bin/env node

var command = require('./command/command.js');
var fs = require('fs');
var path = require('path');

var argv = require('yargs')
  .command('ci', 'commit', command.commit)
  .command('list', 'list issue', command.list)
  .command('config', 'config jit', command.config)
  .command('create', 'create issue', command.create)
  .boolean(['list'])
  .argv;
