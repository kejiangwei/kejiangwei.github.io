/**
 作者：kejiangwei@annetinfo.com
 时间：2018/6/6
 描述：personal.js
 */

'use strict';
var personal = (function() {

	//	清除缓存
	function scavengingCaching() {
		mui.toast('清理成功');
	}

	function OnLoadPage() {
		console.log("××××××××××××进入我的界面×××××××××××××××××")
		//		jquery操作
		//		提交反馈意见
		$(".feedback").on("click", function() {
			$(".personalBox").slideUp()
			$(".footer").slideUp()
			$(".feedbackBox").slideDown()
		})

		$("#feedback_back_personal").on("click", function() {
			$(".personalBox").slideDown()
			$(".footer").slideDown()
			$(".feedbackBox").slideUp()
		})

		//		查看浏览记录
		$(".browseRecords").on("click", function() {
			$(".personalBox").slideUp()
			$(".footer").slideUp()
			$(".browseRecordsBox").slideDown()
		})
		$("#browseRecords_back_personal").on("click", function() {
			$(".personalBox").slideDown()
			$(".footer").slideDown()
			$(".browseRecordsBox").slideUp()
		})

		//		开启关闭消息推送

		mui('.personal .mui-switch').each(function() {
			//循环所有toggle
			//toggle.classList.contains('mui-active') 可识别该toggle的开关状态
			//				this.parentNode.querySelector('span').innerText = '状态：' + (this.classList.contains('mui-active') ? 'true' : 'false');
			/**
			 * toggle 事件监听
			 */
			//				this.addEventListener('toggle', function(event) {
			//event.detail.isActive 可直接获取当前状态
			//					this.parentNode.querySelector('span').innerText = '状态：' + (event.detail.isActive ? 'true' : 'false');

			//				});
			console.log(this.classList.contains('mui-active'))
			this.addEventListener('toggle', function(event) {
				console.log(event.detail.isActive)
				if(event.detail.isActive) mui.toast('推送已开启');
				else mui.toast('推送已关闭');
			});
		});
		
//		编辑资料
		$("#userSet").on("click",function(){
			mui('#picture').popover('toggle');
		})
		
//		修改密码	
		$("#modify").on("click", function() {
			mui('#picture').popover('toggle');
			$(".personalBox").slideUp()
			$(".footer").slideUp()
			$(".modifyBox").slideDown()
			
		})
		$("#modify_back_personal").on("click", function() {
			$(".personalBox").slideDown()
			$(".footer").slideDown()
			$(".modifyBox").slideUp()
		})
		
		setTimeout(function(){
			$(".loader").hide();
		},1000)
		

	}
	return {
		OnLoadPage: OnLoadPage,
		personal: personal,
		scavengingCaching: scavengingCaching
	}
})();

window.onload = function() {
	personal.OnLoadPage()
}