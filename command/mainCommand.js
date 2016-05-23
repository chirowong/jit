var config = require('../config/config.js');
var util = require('../util/util.js');

// jit命令
function main() {
  var user = config.get('user');
  util.assertTrue(user, '请配置jira用户名');
  showUsage();
}

// 显示使用帮助
function showUsage() {
  console.log('usage: jit <command> [args]');
  console.log('create issue');
  console.log('    jit create [args]\n');
  console.log('list issue');
  console.log('    jit list [args]\n');
  console.log('git commit');
  console.log('    jit ci [args]\n');
  console.log('config jit');
  console.log('    jit config [args]\n');
  console.log('feeling lucky');
  console.log('    jit lucky');
}

module.exports.main = main;
