var jira = require('../jira/jira.js');
var unirest = require('unirest');
var _ = require('lodash');
var Table = require('cli-table2');

// 幸运子命令
function lucky(yargs) {
  unirest.get('http://www.8win.com/buy/add/matchList')
    .end(callback);
}

// 响应处理回调
function callback(response) {
  var matchList = getMatchList(response.body);
  if (matchList) {
    var bestMatch,
      max = 0,
      matchAndPlay = '';

    for (var i = 0, size = matchList.length; i < size; i++) {
      var match = matchList[i];
      var retObj = getTopPrizeOfMatch(match);
  		if (retObj && retObj.topPrize > max) {
  			max = retObj.topPrize;
  			matchAndPlay = retObj.matchAndPlay;
  		}
    }

    if (matchAndPlay) {
      var arr = matchAndPlay.split('_');
      var againstNo = arr[0];
      var play = arr[1];
      betsMatch = _.chain(matchList)
        .filter(function (ele) {
          return ele.againstNo == againstNo;
        })
        .first()
        .value();

      showBestMatch(betsMatch, play, max);
    }

    //console.log('全场最高场次:' + matchAndPlay + "--返奖率:" + fmtPer(max));
  }
}

function showBestMatch(match, play, max) {
  //console.log(JSON.stringify(match, null, 4));
  var home = match.hcn;
  var away = match.acn;
  var league = match.lcn;
  var letBall = play == 'had' ? '' : match.let;
  var num = match.num;
  var spArr = [];
  var plusArr = [];
  if (play == 'had') {
    spArr = match.had.split(',');
    plusArr = match.had_p.split(',');
  }
  else {
    spArr = match.hhad.split(',').slice(1);
    plusArr = match.hhad_p.split(',');
  }

  var table = new Table({
    head: ['num', 'league', 'vs', 'home', 'draw', 'away', 'let', 'payRate']
  });

  var vs = [home, away].join(':');
  var showHome = getShowSp(spArr[0], plusArr[0]);
  var showDraw = getShowSp(spArr[1], plusArr[1]);
  var showAway = getShowSp(spArr[2], plusArr[2]);
  table.push([num, league, vs, showHome, showDraw, showAway, letBall, fmtPer(max)]);
  console.log(table.toString());

}

function getShowSp(spVal, plusVal) {
  return String(spVal) + ' + ' + fmtPer(plusVal);
}

// 解析8win响应
function getMatchList(matchListStr) {
  var matchList = JSON.parse(matchListStr);

  if (matchList.matchs && matchList.matchs.length > 0) {
    var matchMap = matchList.matchs[0];
    return _.values(matchMap);
  }
}

// 查找最高返奖率场次
function getTopPrizeOfMatch(match) {
	var retObj = {};
	retObj.matchAndPlay = match.againstNo;

	var hadPrize = 0;
	if (match.had_s_valid == '1') {
		hadPrize = calcPrize(match.had, match.had_p_s, false);
	}

	var hhadPrize = 0;
	if (match.hhad_s_valid == '1') {
		hhadPrize = calcPrize(match.hhad, match.hhad_p_s, true);
	}

	if (hadPrize > 0 && hadPrize > hhadPrize) {
		retObj.topPrize = hadPrize;
		retObj.matchAndPlay = retObj.matchAndPlay + '_had';
		//console.log(retObj.matchAndPlay + ':' + retObj.topPrize);
	}
	if (hhadPrize > 0 && hhadPrize > hadPrize) {
		retObj.topPrize = hhadPrize;
		retObj.matchAndPlay = retObj.matchAndPlay + '_hhad';
		//console.log(retObj.matchAndPlay + ':' + retObj.topPrize);
	}
	return retObj;
}

// 计算返奖率
function calcPrize(baseSpStr, plusStr, isLet) {
	var baseSpArr = baseSpStr.split(',');
	var plusArr = plusStr.split(',');

	if (isLet) {
		baseSpArr = baseSpArr.slice(1);
	}

	var sum = 0;
	for (var i = 0; i < 3; i++) {
		var spVal = Number(baseSpArr[i]);
		var plusVal = Number(plusArr[i]);
		var finalVal = spVal * (1 + plusVal);
		finalVal = 1 / finalVal;
		sum = sum + finalVal;
	}

	return 1 / sum;
}

// 格式化百分比
function fmtPer(num) {
	num = num * 10000;
	num = Number(num.toFixed()) / 100;
	return num + '%';
}

module.exports.lucky = lucky;
