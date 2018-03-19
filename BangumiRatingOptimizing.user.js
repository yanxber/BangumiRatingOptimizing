// ==UserScript==
// @name         评分显示优化
// @namespace    https://bgm.tv/user/yanber
// @version      1.3
// @description  在番剧详情页面显示评分的更多位小数和总体标准偏差
// @author       ruocaled , fifth , yanber
// @include      /^https?:\/\/(bangumi|bgm|chii)\.(tv|in)\/subject\/.*$/
// ==/UserScript==

let a = 0;
let total = $("#ChartWarpper > div > small > span").text();
if (total == 0) return;
let scores = $(".horizontalChart .count").text().replace(/\)|\(/g," ").trim().split(/\s+/).map(Number);
let mean = scores.reduce(function(b,d,c){a+=d;return b+d*(10-c);},0)/a||0;
let deviation = calculateSD(scores, mean, total).toFixed(4);
let dispute = "";
if(deviation<1){
    dispute = "<b style='color:Blue'>异口同声</b>";
}else if(deviation<1.15){
    dispute = "<b style='color:Aqua'>基本一致</b>";
}else if(deviation<1.3){
    dispute = "<b style='color:Green'>略有分歧</b>";
}else if(deviation<1.45){
    dispute = "<b style='color:Olive'>莫衷一是</b>";
}else if(deviation<1.6){
    dispute = "<b style='color:OrangeRed'>各执一词</b>";
}else if(deviation<1.75){
    dispute = "<b style='color:DarkRed'>你死我活</b>";
}else{
    dispute = "<b style='color:Red'>厨黑大战</b>";
}
$(".global_score .number").text(mean.toFixed(4));
$("#ChartWarpper").append("标准差： " + deviation + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 争议度： " + dispute);
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
