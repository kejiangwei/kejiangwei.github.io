/**
 作者：kejiangwei@annetinfo.com
 时间：2018/6/6
 描述：task.js
 */

'use strict';
var task = (function () {
	function OnLoadPage(){
		console.log("××××××××××××进入任务界面×××××××××××××××××")
		
//		jquery操作
		//		tab切换
		$(".tabHeader>ul>li>span").on("click",function(){
			let dataHref = $(this).attr("data-href");
			$(this).addClass("active").parent().siblings().children().removeClass("active");
			$(".tabHeaderList ." +dataHref).slideDown().siblings().slideUp();
		})
		$(".seeTaskBoxInfoTab>ul>li").on("click",function(){
			let dataHref = $(this).attr("data-href");
			$(this).addClass("active").siblings().removeClass("active");
			$(".seeTaskBoxInfoTabCon ." +dataHref).slideDown().siblings().slideUp();
		})
		
		
//		发起任务
		$(".addTask").on("click",function(){
			$(".taskBox").slideUp()
			$(".footer").slideUp()
			$(".launchTaskBox").slideDown()
		})
		
		$("#launchTask_back_task").on("click",function(){
			$(".taskBox").slideDown()
			$(".footer").slideDown()
			$(".launchTaskBox").slideUp()
		})
		
		
		
//		查看任务
		$(".tackContainersList").on("click","li",function(){
			$(".taskBox").slideUp()
			$(".footer").slideUp()
			$(".seeTaskBox").slideDown()
		})
		$("#seeTask_back_task").on("click",function(){
			$(".taskBox").slideDown()
			$(".footer").slideDown()
			$(".seeTaskBox").slideUp()
		})
//		拨打电话
		$("#dialing").click(function(){
			window.href = "wtai://wp/mc;4000061500"
		})
		
		
		setTimeout(function(){
			$(".loader").hide();
		},1000)
		let height = $(".footer").height()
		sessionStorage.setItem("footHeight",height)
		console.log(height)
		
		
	}
	
	
	function pickerSelect(){
		
	}
	
    return{
        OnLoadPage: OnLoadPage,
        task: task
    }
})();

window.onload = function () {
    task.OnLoadPage()
}