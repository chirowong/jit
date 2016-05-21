#!/usr/bin/env node

var unirest = require('unirest');
var Table = require('cli-table2');

var jiraHost = 'http://jira.8win.com';
var jiraPath = '/rest/api/2/search';

// 请求jira服务器，获取开启和进行中的issue
unirest.post(jiraHost + jiraPath)
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
  .end(processResponse);

// 处理issue
function processResponse(response) {
  var resBody = response.body;
  //console.log(JSON.stringify(resBody, null, 4));

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
  listIssue(issueArr);
}

function Issue(projectKey, key, summary) {
  this.projectKey = projectKey;
  this.key = key;
  this.summary = summary;
  this.page = jiraHost + "/browse/" + this.key;
}

function listIssue(issueArr) {
  debugger;
  var table = new Table({
    head: ['num', 'project', 'issueKey', 'summary']
  });

  for (var i = 0, size = issueArr.length; i < size; i++) {
    var issue = issueArr[i];
    table.push([i + 1, issue.projectKey, issue.key, issue.summary]);
  }

  console.log(table.toString());
}
