/**
 作者：kejiangwei@annetinfo.com
 时间：2018/6/6
 描述：login.js
 */

'use strict';
var login = (function() {
	var hostUrl = '120.79.170.30:8080'; //请求地址
	var aliyunUrl = 'http://annetinfo1.oss-cn-shenzhen.aliyuncs.com/'; //阿里云地址
	var strUserName = ''; //用户名
	var strUserPwdMd5 = ''; //加密后的密码
	//	注册用户的对象数据
	var registerInfo = {
		"name": '',
		"swjgid": '',
		"tel": '',
		"pass": ''
	}
	//	机关列表
	var swjgPojoList = []

	//	登录入口
	function login() {
		var userName = $('#loginName').val(); //获取用户名
		strUserName = userName;
		var userPwd = $('#loginPwd').val(); //获取用户密码
		var md5Pwd = hex_md5(userPwd).toUpperCase();
		strUserPwdMd5 = md5Pwd;
		var dataJson = {
			"tel": userName,
			"pass": userPwd
		};
		loginByInternet(dataJson);

	}
	//	登录接口
	function loginByInternet(dataJson) {
		$.ajax({
			"async": true,
			"url": "http://" + hostUrl + "/fyproject/user/login",
			"method": "POST",
			"data": dataJson
		}).done(function(response) {
			console.log(response)
			if(response === '') {
				mui.toast('账号密码错误');
				return false
			}else {
				let userInfo = response;
				console.log(userInfo);
				localStorage.setItem("userInfo", JSON.stringify(userInfo));
				localStorage.setItem("hostUrl",hostUrl)
				location.href = 'task.html';
			}
		}).fail(function(error) {
			console.log(error)
			mui.toast('网络错误');
		});
	}

	//	注册入口
	function register() {
		registerInfo.name = $('#registerName').val();
		registerInfo.swjgid = $('#registerSwjgid').attr("data-name");
		registerInfo.tel = $('#registerTel').val();
		registerInfo.pass = $('#registerPwd').val();
		if(registerInfo.pass != $('#sureRegisterPwd').val()) {
			mui.toast('两次密码不一致');
			return false
		}
		//		判断是否有空的值
		for(var Key in registerInfo) {
			if('' === registerInfo[Key]) {
				mui.toast('请完整填写数据')
				console.log(registerInfo)
				return false
			}
		}
		registerInfo.userid = ''
		console.log("******************注册信息")
		console.log(registerInfo)
		registerByInternet(registerInfo)
	}

	//	注册接口
	function registerByInternet(dataJson) {
		$.ajax({
			"async": true,
			"url": "http://" + hostUrl + "/fyproject/user/newuser",
			"method": "POST",
			"data": dataJson
		}).done(function(response) {
			console.log(response)
			mui.toast('注册成功');
			$(".loginBox").slideDown()
			$(".registerBox").slideUp()
			$('#loginName').val(dataJson.tel)
			$('#loginPwd').val(dataJson.pass)
		}).fail(function(error) {
			console.log(error)
			mui.toast('注册失败');
		});
	}

	//	案件标识码登录
	function code() {

		location.href = 'task.html';
	}

	//	查找所有机关列表
	function swjg_findallswjg() {
		$.ajax({
			"async": true,
			"url": "http://" + hostUrl + "/fyproject/swjg/findallswjg",
			"method": "POST",
			"headers": {
				"content-type": "application/json",
				"cache-control": "no-cache"
			},
			"processData": false,
		}).done(function(response) {
			console.log(response)
			for(let i in response.swjgPojoList) {
				let obj = response.swjgPojoList[i]
				swjgPojoList.push({
					"value": obj.swjgid,
					"text": obj.swjgmc,
				})
			}
			console.log(swjgPojoList)
			window.localStorage.setItem("swjgPojoList", JSON.stringify(swjgPojoList));
			//			var crFilter = window.localStorage.getItem(getLocalKey("stMobileCrList"));  
			//			crFilter = JSON.parse(crFilter);  

		}).fail(function(error) {
			console.log(error)
			mui.toast('网络错误');
		});
	}

	function OnLoadPage() {
		console.log("××××××××××××进入登陆界面×××××××××××××××××")

		setTimeout(function() {
			$(".loader").hide();
		}, 1000)
		//		清空缓存
		sessionStorage.clear();
		localStorage.clear();
		//		jqueryDom操作
		//	打开注册界面
		$(".registerAccount").click(function() {
			$(".loginBox").slideUp()
			$(".registerBox").slideDown()
		})
		$("#register_back_login").click(function() {
			$(".loginBox").slideDown()
			$(".registerBox").slideUp()
		})

		//  打开案件标识码界面
		$(".codeLogin").click(function() {
			$(".loginBox").slideUp()
			$(".codeBox").slideDown()
		})
		$("#code_back_login").click(function() {
			$(".loginBox").slideDown()
			$(".codeBox").slideUp()
		})

		//		注册选择机构
		$("#selectMechanism").on("click", function() {
			var picker = new mui.PopPicker();
			picker.setData(swjgPojoList)
//			picker.pickers[0].setSelectedValue('fourth', 2000);
			picker.show(function(SelectedItem) {
				console.log(SelectedItem);
				$("#registerSwjgid").text(SelectedItem[0].text).attr("data-name",SelectedItem[0].value)
			})
		})

		//		加载所有机关列表
		swjg_findallswjg()

	}

	return {
		OnLoadPage: OnLoadPage,
		login: login,
		register: register,
		code: code
	}
})();

window.onload = function() {
	login.OnLoadPage()
}