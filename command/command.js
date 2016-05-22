var listCommand = require('./listCommand.js');
var commitCommand = require('./commitCommand.js');
var configCommand = require('./configCommand.js');
var createCommand = require('./createCommand.js');

module.exports.list = listCommand.list;
module.exports.config = configCommand.config;
module.exports.commit = commitCommand.commit;
module.exports.create = createCommand.create;
