var gameLink = (function() {

    var game = 0,
        type = 0,
        team = 0,
        func = 0,
        ChoseTopic = 0,
        count = 0;
    var hostUrl = common.getHostUrl();
    var token = '';


    // 获取中奖人员  /Api/AnnualMeeting/GetSelectedPersonNames
    function getSignNum(team, count) {
        $.ajax({
            "async": true,
            "url": hostUrl + "/Api/AnnualMeeting/GetSelectedPersonNames?team=" + team + "&count=" + count,
            "method": "GET",
            "crossDomain": true,
            beforeSend: function(request) {
                request.setRequestHeader("Token", token);
            },
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache"
            },
            "processData": false,
            success: function(response) {
                if (response.Success) {
                    console.log(response.Data)
                    if (team == 1) {
                        $("#answer").attr("src", "img/gameLink/redAnswer.png")
                    } else if (team == 2) {
                        $("#answer").attr("src", "img/gameLink/blueAnswer.png")
                    }
                    var html = '';
                    for (var i in response.Data) {
                        html += '<li><img src="../' + response.Data[i].PhotoUrl + '" alt=""><p class="company">' + response.Data[i].CompanyName + '</p><p class="name">' + response.Data[i].Name + '</p></li>'
                    }
                    $("#conList").html(html);

                    $("#logoAnimate,#titleImg").hide();
                    $("#con").slideDown();
                }
            },
            error: function() {
                alert("失败");
            }
        })
    }

    function OnLoadPage() {
        console.log("进入游戏环节");
        // 获取地址栏参数
        // game 1.千里传意 2.劲歌金曲； type 1预备，2开始，3停； team 1红队，2蓝队； count 人数,func 1.抽选人员 2.选题,ChoseTopic  选题结果
        game = common.getUrlParam(window.location.href, "Game");
        type = common.getUrlParam(window.location.href, "Type");
        team = common.getUrlParam(window.location.href, "Team");
        count = common.getUrlParam(window.location.href, "Count");
        func = common.getUrlParam(window.location.href, "Func");
        ChoseTopic = common.getUrlParam(window.location.href, "ChoseTopic");
        // 不输入设置默认值
        if (game == null) game = 1
        if (type == null) type = 1
        if (team == null) team = 1
        if (count == null) count = 1
        if (func == null) func = 1
        if (ChoseTopic == null) ChoseTopic = 1

        console.log('game:' + game + 'type:' + type + 'team:' + team + 'count:' + count + 'func:' + func + 'ChoseTopic:' + ChoseTopic);
        console.log("当前状态:" + (game == 1 ? '千里传音' : '劲歌金曲') + "****" + (type == 1 ? '预备' : (type == 2 ? '开始' : '停')) + "****" + (team == 1 ? '红队' : '蓝队') + "****" + ("抽选人数" + count) + "****" + ("游戏环节" + func == 1 ? '抽选人员' : '选题'));

        // 抽选人员
        if (func == 1) {
            // 游戏状态  0预备，1开始，2停
            if (type == 0) {
                $("#gameLinkDiv").removeClass("gameLinkDiv01").addClass("gameLinkDiv");
                // 游戏主题
                if (game == 1) {
                    $("#titleImg").attr("src", "img/gameLink/title_qian.png");
                } else if (game = 2) {
                    $("#titleImg").attr("src", "img/gameLink/title_jing.png");
                }
                $("#logoAnimate,#con").hide();
                $("#titleImg").slideDown();
                $("#titleName").css("padding-top", "200px");
            } else if (type == 1) {
                $("#con,#titleImg01").hide();
                $("#logoAnimate").slideDown();
                
                //$("#gameLinkDiv").addClass("gameLinkDiv01");
                //// 游戏主题
                //if (game == 1) {
                //    $("#titleImg01").attr("src", "img/gameLink/title02.png");
                //} else if (game = 2) {
                //    $("#titleImg01").attr("src", "img/gameLink/title02.png");
                //}
                //$("#titleImg01").slideDown();
                //$("#titleName img").attr("src", "img/gameLink/title_qian.png");   //更换成选题进行中
                
                $("#clickVideo").trigger("click");
            } else if (type == 2) {
                $("#gameLinkDiv").addClass("gameLinkDiv01");
                getSignNum(team, count);
            }
        } else if (func == 2) {
            // 选题

        }
    }
    return {
        OnLoadPage: OnLoadPage,
    }
})()

window.onload = function () {
    gameLink.OnLoadPage();
}


//$(document).ready(function(){
//    window.onload = xieyi;
//})

//function xieyi() {
//    gameLink.OnLoadPage();
//    setTimeout(function () {
//        $("#clickVideo").trigger("click");
//    },500)
//}

