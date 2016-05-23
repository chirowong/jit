
// 检查condition，如果为false，输出message，并退出node
function assertTrue(condition, message) {
  if (condition) {
    return;
  }
  console.log(message);
  process.exit();
}

module.exports.assertTrue = assertTrue;
