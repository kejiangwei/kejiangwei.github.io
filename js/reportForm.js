/**
 作者：kejiangwei@annetinfo.com
 时间：2018/6/6
 描述：reportForm.js
 */

'use strict';
var reportForm = (function() {

	//产生随机数 据
	function randomData() {
		var first = (Math.random() * 1000 + 1000).toFixed(2);
		var second = (Math.random() * 1000 + 1000).toFixed(2);
		var chartId = ["implementationRate","harvestRatio"];
		var pieName = ['本期结案数', '本期新收数'];
		var pieValue = new Array();
		pieValue.push(first);
		pieValue.push(second);
		
		for(let x in chartId){
			buildChart(pieName, pieValue, chartId[x]);
		}
		
	}

	//生成圆环图  
	function buildChart(pieName, pieValue, chartId) {
		
		var myChart = echarts.init(document.getElementById(chartId));
        // 指定图表的配置项和数据
        var option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}: {c} ({d}%)"
		    },
		    color: ["#FCAC0B","#29AB91"],
		    legend: {
		    	show: false,
		        orient: 'vertical',
		        x: 'left',
		        data:['直达','邮件营销'],
		        itemWidth:20,
		        itemHeight:20,
		    },
		    series: [
		        {
		            name:'访问来源',
		            type:'pie',
		            radius: ['15%', '35%'],
		
		            data:[
		                {value:600, name:'本期新收款'+" "+parseInt(600/(400+600)*100)+"%"},
		                {value:400, name:'本期结案数'+" "+parseInt(400/(400+600)*100)+"%"},
		            ]
		        }
		    ]
		};
//      var option = {
//          tooltip : { //提示框组件
//              trigger: 'item', //触发类型(饼状图片就是用这个)
//              formatter: "{a} <br/>{b} : {c} ({d}%)" //提示框浮层内容格式器
//          },
//          color:['#48cda6','#fd87ab','#11abff','#ffdf33','#968ade'],  //手动设置每个图例的颜色
//          legend: {  //图例组件
//              //right:100,  //图例组件离右边的距离
//              orient : 'horizontal',  //布局  纵向布局 图例标记居文字的左边 vertical则反之
//              width:40,      //图行例组件的宽度,默认自适应
//              x : 'right',   //图例显示在右边
//              y: 'center',   //图例在垂直方向上面显示居中
//              itemWidth:10,  //图例标记的图形宽度
//              itemHeight:10, //图例标记的图形高度
//              data:['直达','邮件营销'],
//              textStyle:{    //图例文字的样式
//                  color:'#333',  //文字颜色
//                  fontSize:12    //文字大小
//              }
//          },
//          series : [ //系列列表
//              {
//                  name:'随访次数',  //系列名称
//                  type:'pie',   //类型 pie表示饼图
//                  center:['30%','50%'], //设置饼的原心坐标 不设置就会默认在中心的位置
//                  radius : ['50%', '70%'],  //饼图的半径,第一项是内半径,第二项是外半径,内半径为0就是真的饼,不是环形
//                  itemStyle : {  //图形样式
//                      normal : { //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
//                          label : {  //饼图图形上的文本标签
//                              show : false  //平常不显示
//                          },
//                          labelLine : {     //标签的视觉引导线样式
//                              show : true  //平常不显示
//                          }
//                      },
//                      emphasis : {   //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
//                          label : {  //饼图图形上的文本标签
//                              show : true,
//                              position : 'center',
//                              textStyle : {
//                                  fontSize : '10',
//                                  fontWeight : 'bold'
//                              }
//                          }
//                      }
//                  },
//                  data:[
//		                {value:335, name:'直达'},
//		                {value:310, name:'邮件营销'},
//		            ]
//              }
//          ]
//      }
        myChart.setOption(option);
		
	}

	function OnLoadPage() {
		console.log("××××××××××××进入报表界面×××××××××××××××××")
		//		jquery操作
		//		打开发送报表按钮
		$(".openSendReport").on("click", function() {
			$(".sendReportForm").toggle()
		})
		//		发送报表
		$(".sendReportForm").on("click", function() {
			$(".reportFormBox").slideUp()
			$(".footer").slideUp()
			$(".sendReportFormBox").slideDown()
		})
		$("#sendReportForm_back_reportForm").on("click", function() {
			$(".reportFormBox").slideDown()
			$(".footer").slideDown()
			$(".sendReportFormBox").slideUp()
			$(".sendReportForm").hide()
		})

		//		地区排行
		$(".openRankings span,.openRankings img").on("click", function() {
			$(".rankingsBox").toggle()
		})
		
		$(".rankingsBox>ul>li").on("click", function() {
			console.log($(this).find("span").text())
			$(".openRankings>span").text($(this).find("span").text());
			$(".rankingsBox").slideUp();
		})
		

				
//		生成环形图
		randomData()
		setTimeout(function(){
			$(".loader").hide();
		},1000)
		
		let height = localStorage.getItem("footHeight")+"px"||"51px";
		console.log(height)
		$(".footer").css("height",height);
		
	}
	return {
		OnLoadPage: OnLoadPage,
		reportForm: reportForm
	}
})();

window.onload = function() {
	reportForm.OnLoadPage()
}