/**
 作者：kejiangwei
 时间：2018/7/31
 描述：RelativesAndFriendsCard.js
 */
'use strict';
var RelativesAndFriendsCard = (function() {
	var hostUrl = 'https://leyouapp.fangte.com/v4/api/'; //请求地址
	var sign = '' //签名
	//	获取页面数据  api/YearCard/QueryRelativeWelfareVipCardShareInfoAsync
	function getPageData() {
		let data = {
			"sign": sign
		}
		console.log(data)
		$.ajax({
			"async": true,
			"url": hostUrl + "YearCard/H5QueryRelativeWelfareVipCardShareInfoAsync",
			"method": "POST",
			"headers": {
				"content-type": "application/json",
				"cache-control": "no-cache"
			},
			"data": JSON.stringify(data)
		}).done(function(response) {
			console.log(response)
			$("#name").text(response.data.shareUserName)
		}).fail(function(error) {
			console.log(error)
			//			mui.toast('网络错误');
		});
	}

	//判断是否在微信里面打开
	function is_weixn() {
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	}

	//	获取地址栏参数
	function getUrlParms(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null)
			return unescape(r[2]);
		return null;
	}

	//	初始化页面
	function OnLoadPage() {
		console.log("××××××××××××进入亲友卡界面×××××××××××××××××")
		sign = getUrlParms("sign"); //获取地址栏参数
		getPageData()

		//			根据安卓机和苹果机设置字体粗细
		console.log($(window).height())
		console.log($(window).width())
		console.log(window.devicePixelRatio) //获取到当前设备的dpr
		//			屏幕PC端自适应处理
		if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
			console.log("iPhone")
			$(".RelativesAndFriendsCardBox ul li.boxContent").css({"font-weight":"700","font-size":"15px"})
		} else if(navigator.userAgent.match(/android/i)) {
			console.log("android")
			$(".RelativesAndFriendsCardBox ul li.boxContent").css({"font-weight":"600","font-size":"15px"})
		}
		if($(window).width()>400){
			console.log("PC")
			$(".RelativesAndFriendsCardBox ul li.boxContent").css({"font-weight":"600","font-size":"0.76rem"})
		}
	}

	return {
		OnLoadPage: OnLoadPage
	}
})();

window.onload = function() {
	RelativesAndFriendsCard.OnLoadPage()
}
  
//	function seeUseMethod() {
//		console.log("查看使用")
//		//		判断是安卓机还是苹果机
//		let useEquipment = ''; //使用的设备
//		var ua = navigator.userAgent.toLowerCase();
//		if(/iphone|ipad|ipod/.test(ua)) {
//			console.log("iphone");
//			useEquipment = 'iphone';
//		} else if(/android/.test(ua)) {
//			console.log("android");
//			useEquipment = 'android';
//		}
//		let is_weixin_open = is_weixn();
//		console.log("是否在微信打开" + is_weixin_open)
//		if(useEquipment === "iphone") {
//			var ifr = document.createElement('iframe');
//	        ifr.src = 'com.baidu.tieba://';
//	        ifr.style.display = 'none';
//	        document.body.appendChild(ifr);
//	        window.setTimeout(function(){
//	            document.body.removeChild(ifr);
//	        },3000)
//
//			
////			var loadDateTime = new Date();
////			window.setTimeout(function() {
////					var timeOutDateTime = new Date();
////					if(timeOutDateTime - loadDateTime < 5000) {
////						window.location = "https://www.baidu.com/";
////					} else {
////						window.close();
////					}
////				},
////				25);
////			window.location = " apps custom url schemes ";
//
//
//		} else if(useEquipment === "android" && is_weixin_open == "false") {
//			var state = null;
//			try {
//				state = window.open("leyou://hytch", '_blank');
//			} catch(e) {}
//			if(state) {
//				window.close();
//			} else {
//				window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=gr eenjoy.golf.app&g_f=991653";
//			}
//			
//		} else if(useEquipment === "android" && is_weixin_open == "true") {
//			//Android
//			window.location.href = "app://city_golf";//安卓协议，由安卓同事提供
//			window.setTimeout(function() {
//				window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=gr eenjoy.golf.app&g_f=991653"
//			}, 2000)
//			return
//
//		}
//	}