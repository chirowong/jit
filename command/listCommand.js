var jira = require('../jira/jira.js');
var Table = require('cli-table2');

// 显示所有issue
function list(yargs) {
  // 在console显示issue列表
  jira.queryJiraIssue(showIssueList);
}

// 在console显示issue列表
function showIssueList(response) {
  var issueArr = jira.parseIssueResponse(response);
  if (issueArr) {
    logIssueTable(issueArr);
  }
}

// 输出issue table
function logIssueTable(issueArr) {
  var table = new Table({
    head: ['num', 'project', 'issueKey', 'summary']
  });

  for (var i = 0, size = issueArr.length; i < size; i++) {
    var issue = issueArr[i];
    table.push([i + 1, issue.projectKey, issue.key, issue.summary]);
  }

  console.log(table.toString());
}

module.exports.list = list;
