var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var config_file_path = path.join(process.env.HOME, '.jitconfig');

// 读取一条配置
function readConfigItem(itemName, lineArr) {
  if (!lineArr) {
    var content = readConfigFile();
    if (content) {
      lineArr = content.split(/\r?\n/);
    }
  }

  if (lineArr) {
    for (var i = 0, size = lineArr.length; i < size; i++) {
      var item = lineArr[i];
      var kvArr = item.split('=');
      if (kvArr[0] == itemName && kvArr.length == 2) {
        return kvArr[1];
      }
    }
  }
}

// 显示配置
function listConfigItem() {
  var configText = readConfigFile();
  if (configText) {
    configText.split(/\r?\n/).forEach(function (line) {
      console.log(line);
    })
  }
}

// 读取配置文件
function readConfigFile() {
  if (fs.existsSync(config_file_path)) {
    return fs.readFileSync(config_file_path, 'utf8');
  }
}

// 设置一条配置
function writeItem(k, v) {
  var configText = k + '=' + v;
  if (!fs.existsSync(config_file_path)) {
    fs.writeFileSync(config_file_path, configText);
  }
  else {
    var content = readConfigFile();
    var arr = _.trim(content).split(/\r?\n/);

    var find = false;
    for (var i = 0, size = arr.length; i < size; i++) {
      var item = arr[i];
      var kvArr = item.split('=');
      if (kvArr[0] == k) {
        find = true;
        if (kvArr.length == 2 && kvArr[1] == v) {
          // 配置相同
          return;
        }
        else {
          arr[i] = configText;
        }
      }
    }

    if (!find) {
      arr.push(configText);
    }
    fs.writeFileSync(config_file_path, arr.join('\n'));
  }
}

module.exports.get = readConfigItem;
module.exports.set = writeItem;
module.exports.list = listConfigItem;
