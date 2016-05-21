var config = require('../config/config.js');

// 查看配置子命令
function config(yargs) {
  if (yargs.argv.list) {
    config.list();
    return;
  }

  var paramArr = yargs.argv._;
  if (paramArr && paramArr.lenth >= 1) {
    var configItem = paramArr[1];
    var kvArr = configItem.split('=');
    if (kvArr.length == 2) {
      config.set(kvArr[0], kvArr[1]);
    }
    else {
      console.log('配置命令格式: jit config [key]=[value]');
    }
  }
}

module.exports.config = config;
