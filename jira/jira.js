var unirest = require('unirest');


// 获取jira issue list
function queryJiraIssue(callback) {
  // 请求jira服务器，获取开启和进行中的issue
  unirest.post('http://jira.8win.com/rest/api/2/search')
    .headers({
      "Content-Type": "application/json"
    })
    .send({
      "jql": 'assignee = caoliding and status in (open, "in progress")'
    })
    .auth({
      user: 'caoliding',
      pass: 'caoliding'
    })
    .end(callback);
}

// 解析issue list响应
function parseIssueResponse(response) {
  var resBody = response.body;
  console.log(JSON.stringify(resBody, null, 4));

  var total = resBody.total;
  if (total == 0) {
    console.log('没有开启或进行中的issue, git commit前必须新建个issue哦~');
    return;
  }

  var issueArr = [];
  for (var i = 0; i < total; i++) {
    var issue = resBody.issues[i];
    var key = issue.key;
    var fields = issue.fields;
    var summary = fields.summary;
    var projectKey = fields.project.key;
    issueArr.push(new Issue(projectKey, key, summary));
  }
  return issueArr;
}

// Issue类
function Issue(projectKey, key, summary) {
  this.projectKey = projectKey;
  this.key = key;
  this.summary = summary;
}

module.exports.queryJiraIssue = queryJiraIssue;
module.exports.parseIssueResponse = parseIssueResponse;
