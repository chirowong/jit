var jira = require('../jira/jira.js');
var shell = require('shelljs');

// 提交子命令
function commit(yargs) {
  var paramArr = yargs.argv._;
  if (paramArr.length < 3) {
    console.log('错误: jit commit参数不完整');
    console.log('格式: jit ci [issue line num] [commit message]');
    console.log('示例: jit ci 2 \'增加获取jira issue功能\'');
    return;
  }

  var issueNum = paramArr[1];
  var commitMessage = paramArr[2];
  jira.queryJiraIssue(commitIssue);

  // 提交issue
  function commitIssue(response) {
    var issueArr = jira.parseIssueResponse(response);
    if (!issueArr) {
      console.log('没有可用issue');
      return;
    }

    var issue = issueArr[issueNum - 1];
    var issueKey = issue.key;
    var commantStr = 'git commit -m "' + issueKey + ' #comment ' + commitMessage + '"';
    console.log(commantStr);
    shell.exec(commantStr);
  }
}

module.exports.commit = commit;
