var listCommand = require('./listCommand.js');
var commitCommand = require('./commitCommand.js');
var configCommand = require('./configCommand.js');
var createCommand = require('./createCommand.js');
var luckyCommand = require('./luckyCommand.js');
var mainCommand = require('./mainCommand.js');

module.exports.list = listCommand.list;
module.exports.config = configCommand.config;
module.exports.commit = commitCommand.commit;
module.exports.create = createCommand.create;
module.exports.lucky = luckyCommand.lucky;

module.exports.main = mainCommand.main;
