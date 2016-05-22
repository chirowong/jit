var config = require('../config/config.js');

// 查看配置子命令
function configFun(yargs) {
  var argv = yargs.argv;
  if (argv.list) {
    console.log('do config --list');
    config.list();
    return;
  }

  var kvArr = argv._;
  for (var i = 0, size = kvArr.length; i < size; i++) {
    var kvItem = kvArr[i];
    if (kvItem == 'config') {
      continue;
    }

    var arr = kvItem.split('=');
    if (arr && arr.length == 2) {
      var key = arr[0];
      var val = arr[1];
      config.set(key, val);
    }
    else {
      console.log('配置命令格式: jit config [key]=[value]');
    }
  }
}

module.exports.config = configFun;
