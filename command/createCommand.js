var unirest = require('unirest');
var util = require('../util/util.js');
var config = require('../config/config.js');

// 创建issue
function create(yargs) {
  var argv = yargs.argv;
  var projectKey = argv.p; // 项目key
  util.assertTrue(projectKey, '必须指定项目名');

  var summary = argv.s; // issue标题
  util.assertTrue(summary, '必须指定标题');

  var description = argv.d; // issue描述
  var issueType = argv.t || 'Task'; // issue类型
  var assignee = argv.a; // 指派给谁

  var form = {};
  form.project = {
    key: projectKey
  };

  form.summary = summary;
  form.description = description;
  form.issuetype = {
    name: issueType
  };

  form.assignee = {
    name: 'caoliding'
  }

  var param = {
    fields: form
  }

  var user = config.get('user');
  var pass = config.get('pass') || user;
  var jiraHost = config.get('jiraHost') || 'http://jira.8win.com';
  util.assertTrue(user, '需要配置jira用户名');
  util.assertTrue(pass, '需要配置密码');
  var issueUrl = jiraHost + '/rest/api/2/issue';

  unirest.post(issueUrl)
    .type('json')
    .send(param)
    .auth({
      user: user,
      pass: pass
    })
    .end(showCreateResult);
}

// 处理创建issue响应
function showCreateResult(response) {
  if (response.body && response.body.key) {
    console.log('创建成功,issue:', response.body.key);
  }
  else {
    console.log('创建失败:', JSON.stringify(response, null, 4));
  }
}

module.exports.create = create;
