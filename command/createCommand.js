var jira = require('../jira/jira.js');
var Table = require('cli-table2');
var unirest = require('unirest');

// 显示所有issue
function create(yargs) {
  var argv = yargs.argv;
  var projectKey = argv.p; // 项目key
  if (!projectKey) {
    console.log('必须指定项目名');
    return;
  }

  var summary = argv.s; // issue标题
  if (!summary) {
    console.log('必须指定标题');
    return;
  }

  var description = argv.d; // issue描述
  var issueType = argv.t; // issue类型

  var form = {};
  form.project = {
    key: projectKey
  };

  form.summary = summary;
  form.description = description;
  form.issueType = {
    name: issueType
  };

  unirest.post('http://jira.8win.com/rest/api/2/issue')
    .headers({
      "Content-Type": "application/json"
    })
    .send(JSON.stringify(form))
    .auth({
      user: 'caoliding',
      pass: 'caoliding'
    })
    .end(showCreateResult);

  console.log(JSON.stringify(argv, null, 4));
}

function showCreateResult(response) {
  if (response.body && response.body.key) {
    console.log('创建成功,issue:', response.body.key);
  }
  else {
    console.log('创建失败:', JSON.stringify(response, null, 4));
  }
}

module.exports.create = create;
