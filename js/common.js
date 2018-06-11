var viewHeight = window.innerHeight; //获取可视区域高度
$("input").focus(function() {
	$(".wrap").css("height", viewHeight);
}).blur(function() {
	$(".wrap").css("height", "100%");
});

var oHeight = $(document).height(); //浏览器当前的高度

$(window).resize(function() {

	if($(document).height() < oHeight) {
		$(".codeLogin").css("position", "static");
	} else {

		$(".codeLogin").css("position", "absolute");
	}
});

var u = navigator.userAgent;
var goBack = document.getElementById("goBack");
//针对ios原生浏览器处理
if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && /(Safari)/i.test(u)) {
	goBack.setAttribute("onclick", "javascript:window.location=document.referrer;");
}