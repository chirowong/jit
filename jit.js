#!/usr/bin/env node

var command = require('./command/command.js');

var argv = require('yargs')
  .command('ci', 'commit', command.commit)
  .command('list', 'list issue', command.list)
  .command('config', 'config jit', command.config)
  .command('create', 'create issue', command.create)
  .command('lucky', "i'm feeling lucky", command.lucky)
  .boolean(['list'])
  .argv;

// 没有子命令
if (argv._.length == 0) {
  command.main();
}
