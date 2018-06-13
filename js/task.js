/**
 作者：kejiangwei@annetinfo.com
 时间：2018/6/6
 描述：task.js
 */

'use strict';
var task = (function() {
	var userId = JSON.parse(localStorage.getItem("userInfo")).userid;
	var hostUrl = localStorage.getItem("hostUrl");

	//	发起任务对象
	var launchTask = {
		"bzxr": '',
		"ajbh": '',
		"lasj": '',
		"rwsqr": '',
		"xbId": '',
		"dz": '',
		"dzLatlang": '',
		"sfzh": '',
		"lxdh": '',
		"ayId": '',
		"je": '',
		"zffzrid": '',
		"xzfzrid": ''
	}

	function OnLoadPage() {
		console.log("××××××××××××进入任务界面×××××××××××××××××")

		setTimeout(function() {
			$(".loader").hide();
		}, 1000)
		//		jquery操作
		//		tab切换
		$(".tabHeader>ul>li>span").on("click", function() {
			let dataHref = $(this).attr("data-href");
			$(this).addClass("active").parent().siblings().children().removeClass("active");
			$(".tabHeaderList ." + dataHref).slideDown().siblings().slideUp();
		})
		$(".seeTaskBoxInfoTab>ul>li").on("click", function() {
			let dataHref = $(this).attr("data-href");
			$(this).addClass("active").siblings().removeClass("active");
			$(".seeTaskBoxInfoTabCon ." + dataHref).slideDown().siblings().slideUp();
		})

		//		发起任务
		$(".addTask").on("click", function() {
			$(".taskBox").slideUp()
			$(".footer").slideUp()
			$(".launchTaskBox").slideDown()
		})

		$("#launchTask_back_task").on("click", function() {
			$(".taskBox").slideDown()
			$(".footer").slideDown()
			$(".launchTaskBox").slideUp()
		})

		//		查看任务
		$(".tackContainersList").on("click", "li", function() {
			$(".taskBox").slideUp()
			$(".footer").slideUp()
			$(".seeTaskBox").slideDown()
		})
		$("#seeTask_back_task").on("click", function() {
			$(".taskBox").slideDown()
			$(".footer").slideDown()
			$(".seeTaskBox").slideUp()
		})
		//		拨打电话
		$("#dialing").click(function() {
			window.href = "wtai://wp/mc;4000061500"
		})
		swjg_findallswjg()
		WorkingGroup()
		TownshipSupervisor()
	}

	//	如果当前用户为法院用户，则查找所有乡镇机关的已结案件数和未结案件数
	function swjg_findallswjg() {
		$.ajax({
			"async": true,
			"url": "http://" + hostUrl + "/fyproject/swjg/findflbyuserid",
			"method": "POST",
			"data": {
				"userid": userId
			}
		}).done(function(response) {
			console.log(response)
			for(let i in response.swjgPojoList) {
				let obj = response.swjgPojoList[i]
				swjgPojoList.push({
					"value": obj.swjgid,
					"text": obj.swjgmc,
				})
			}
		}).fail(function(error) {
			console.log(error)
			let dataError = {
				value: "1",
				text: "网络错误"
			}
			return dataError
			mui.toast('网络错误');
		});
	}

	//	获取工作组负责人
	function WorkingGroup() {
		$.ajax({
			"async": true,
			"url": "http://" + hostUrl + "/fyproject/swjg/findallfyuser",
			"method": "POST",
		}).done(function(response) {
			console.log(response)
			for(let i in response.swjgWithUserPojos[0].userList) {
				let obj = response.swjgWithUserPojos[0].userList[i]
				WorkingGroupData.push({
					"value": obj.userid,
					"text": obj.xm,
				})
			}
			console.log(WorkingGroupData)
		}).fail(function(error) {
			console.log(error)
			let dataError = {
				value: "1",
				text: "网络错误"
			}
			return dataError
			mui.toast('网络错误');
		});
	}

	//	乡镇督办负责人
	function TownshipSupervisor() {
		$.ajax({
			"async": true,
			"url": "http://" + hostUrl + "/fyproject/swjg/findalluserandxzswjg",
			"method": "POST",
			"data": {
				"userid": userId
			}
		}).done(function(response) {
			console.log(response)
			for(let i in response.swjgWithUserPojos) {
				let obj = response.swjgWithUserPojos[i]
				TownshipSupervisorData.push({
					"value": obj.swjgPojo.swjgid,
					"text": obj.swjgPojo.swjgmc,
				})
				let children = []
				for(let m in obj.userList) {
					let obj02 = obj.userList[m]
					children.push({
						"value": obj02.userid,
						"text": obj02.xm,
					})
				}
				TownshipSupervisorData[i].children = children;
			}
		}).fail(function(error) {
			console.log(error)
			let dataError = {
				value: "1",
				text: "网络错误"
			}
			return dataError
			mui.toast('网络错误');
		});
	}

	//	发起任务入口-数据处理
	function registerSumbit() {
		console.log("*****************************发起任务")
		launchTask.bzxr = $('#bzxr').val();
		launchTask.ajbh = $('#ajbh').val();
		launchTask.lasj = $('#lasj').attr("data-name");
		launchTask.rwsqr = $('#rwsqr').val();
		launchTask.xbId = $('#xbId').attr("data-name");
		launchTask.dz = $('#dz').val();
		launchTask.dzLatlang = $('#dz').attr("data-name");
		launchTask.sfzh = $('#sfzh').val();
		launchTask.lxdh = $('#lxdh').val();
		launchTask.ayId = $('#ayId').attr("data-name");
		launchTask.je = $('#je').val();
		launchTask.zffzrid = $('#zffzrid').attr("data-name");
		launchTask.xzfzrid = $('#xzfzrid').attr("data-name");
		
		console.log(launchTask)
		
		//		判断是否有空的值
		for(var Key in launchTask) {
			if('' === launchTask[Key]) {
				console.log(Key)
				if(Key === "dzLatlang" || Key === "dz" || Key === "sfzh" || Key === "lxdh"){
					console.log("有空的非必填项")
					
				}else{
					mui.toast('请完整填写数据')
					console.log(launchTask)
					return false
				}
				
			}
			
		}
		registerSumbitByInternet(launchTask)
		
		
	}
	//	发起任务入口-数据接口
	function registerSumbitByInternet(launchTask) {
		$.ajax({
			"async": true,
			"url": "http://" + hostUrl + "/fyproject/task/newtask?bzxr="+launchTask.bzxr,
			"method": "POST",
			"data": launchTask
		}).done(function(response) {
			console.log(response)
			mui.toast('发布任务成功');
			$(".taskBox").slideDown()
			$(".footer").slideDown()
			$(".launchTaskBox").slideUp()
		}).fail(function(error) {
			console.log(error)
			mui.toast('发布任务失败');
		});
	}

	function pickerSelect() {

	}

	return {
		OnLoadPage: OnLoadPage,
		registerSumbit: registerSumbit
	}
})();

window.onload = function() {
	task.OnLoadPage()
}

