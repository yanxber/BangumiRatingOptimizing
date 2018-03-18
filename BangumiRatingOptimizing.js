// ==UserScript==
// @name        评分显示优化
// @namespace   https://bgm.tv/user/yanber
// @version     1.2
// @description 在番剧详情页面显示评分的更多位小数以及总体标准偏差
// @author      ruocaled , fifth , yanber
// @include     /^https?:\/\/(bangumi|bgm|chii)\.(tv|in)\/subject\/.*$/
// ==/UserScript==
let a=0;
let total = $("#ChartWarpper > div > small > span").text();
if (total == 0) return;
let scores = $(".horizontalChart .count").text().replace(/\)|\(/g," ").trim().split(/\s+/).map(Number);
let mean = scores.reduce(function(b,d,c){a+=d;return b+d*(10-c);},0)/a||0;
let deviation = calculateSD(scores, mean, total).toFixed(4);
let dispute = "";
if(deviation<1.2){
    dispute = "全员一致";
}else if(deviation<1.4){
    dispute = "略有分歧";
}else if(deviation<1.6){
    dispute = "褒贬不一";
}else if(deviation<1.8){
    dispute = "你死我活";
}else{
    dispute = "厨黑大战";
}
(function(){
$(".global_score .number").text(mean.toFixed(4));
$("#ChartWarpper").append("标准差： " + deviation + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 争议度： "+ dispute);
})();
function calculateSD(scores, mean, n) {
    let sd = 0;
    scores.forEach(function (elem, index) {
        if (elem === 0) {
            return;
        }
        sd += ((10-index) - mean) * ((10-index) - mean) * elem;
    });
    return Math.sqrt(sd / n);
}
