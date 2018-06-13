var swjgPojoList = [] //查找所有乡镇机关的已结案件数和未结案件数
var WorkingGroupData = [] //工作组负责人
var TownshipSupervisorData = [] //所有乡镇和乡镇用户

//		立案时间
$('.setUpCaseTime').on("click", function() {
	var date = new Date();
	var year = date.getFullYear()
	var month = date.getMonth() + 1;
	month = (month<10 ? "0"+month:month); 
	var day = date.getDate();
	console.log(year+","+month+","+day)
	var dtpicker = new mui.DtPicker({
		type: "date", //设置日历初始视图模式 
		beginDate: new Date(2015, 04, 25), //设置开始日期 
		endDate: new Date(year+","+month+","+day), //设置结束日期 
	})
//	dtpicker.dtpicker[0].setSelectedValue('2018', 2000);
	dtpicker.show(function(e) {
		console.log(e);
		$('.setUpCaseTime>span').text(e.text).attr("data-name",e.text)
	})
})

//		全部机关   
$(".allCases,.allOrgans").on("click", function() {
	var picker = new mui.PopPicker();
	picker.setData(swjgPojoList)
	//picker.pickers[0].setSelectedValue('fourth', 2000);
	picker.show(function(SelectedItem) {
		console.log(SelectedItem);
	})
})
//		所有案件
$(".allCases").on("click", function() {
	let data = [{
		value: "first",
		text: "全部案件"
	}, {
		value: "second",
		text: "进行中"
	}, {
		value: "third",
		text: "已结束"
	}]

	var picker = new mui.PopPicker();
	picker.setData(data)
	picker.show(function(SelectedItem) {
		console.log(SelectedItem);
	})
})

//		性别选择
$(".selectSex").on("click", function() {
	let data = [{
		value: "0",
		text: "男"
	}, {
		value: "1",
		text: "女"
	}]
	var picker = new mui.PopPicker();
	picker.setData(data)
	picker.show(function(SelectedItem) {
		console.log(SelectedItem);
		$(".selectSex span").text(SelectedItem[0].text).attr("data-name",SelectedItem[0].value)
	})

})

//		案由
$(".CaseReason").on("click", function() {
	let data = [{
		value: "1",
		text: "婚姻家庭、继承"
	}, {
		value: "2",
		text: "民间借贷纠纷"
	}, {
		value: "3",
		text: "机动车交通事故责任纠纷"
	}]

	var picker = new mui.PopPicker();
	picker.setData(data)
	picker.show(function(SelectedItem) {
		console.log(SelectedItem);
		$(".CaseReason span").text(SelectedItem[0].text).attr("data-name",SelectedItem[0].value)
	})
})

//		工作组负责人
$(".WorkingGroup").on("click", function() {
	var picker = new mui.PopPicker();
	picker.setData(WorkingGroupData)
	picker.show(function(SelectedItem) {
		console.log(SelectedItem);
		$(".WorkingGroup span").text(SelectedItem[0].text).attr("data-name",SelectedItem[0].value)
	})
})

//		乡镇组督办人
$(".TownshipSupervisor").on("click", function() {
	var picker = new mui.PopPicker({
		layer: 2
	});
	picker.setData(TownshipSupervisorData)
	picker.pickers[0].setSelectedIndex(1);
	picker.pickers[1].setSelectedIndex(1);
	picker.show(function(SelectedItem) {
		$(".TownshipSupervisor span").text(SelectedItem[0].text+"-"+SelectedItem[1].text).attr("data-name",SelectedItem[1].value);
	})
})