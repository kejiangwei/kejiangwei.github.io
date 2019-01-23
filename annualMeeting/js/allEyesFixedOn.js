var allEyesFixedOn = (function() {
    var type = 1;
    var hostUrl = common.getHostUrl();
    var token = '';
    // 获取最佳女神和最佳男神  /Api/AnnualMeeting/GetSelectedPersonNames
    function getGoddessAndMale(type) {
        $.ajax({
            "async": true,
            "url": "http://localhost:9999/PictureWinnerHandler.ashx?type=" + type,
            "method": "GET",
            "crossDomain": true,
            beforeSend: function(request) {
                request.setRequestHeader("Token", token);
            },
            "processData": false,
            success: function(response) {
                var data = JSON.parse(response).WinnerList;
                console.log(data);
                var html = '';
                for (var i in data) {
                    html += '<li><i>' + (parseInt(i) + 1) + '</i><div class="title-box"><img src="../' + data[i].ImgUrl + '" alt=""><div><span>' + data[i].GradeCode + '</span><span>' + data[i].Name + '</span></div></div></li>'
                }
                $("#title02Box").html(html);
            },
            error: function () {
                alert("失败");
            }
        })
    }

    // 获取新星秀场  /Api/AnnualMeeting/GetSelectedPersonNames
    function getShowGround() {
            $.ajax({
                "async": true,
                "url": hostUrl+"/Api/AnnualMeeting/GetShowRank",
                "method": "GET",
                "crossDomain": true,
                "processData": false,
                success: function (response) {
                    console.log(response)
                    if (response.Success) {
                        var data = response.Data;
                        console.log(data);
                        var html = '';
                        for (var i in data) {
                            if (i > 4) continue;
                            html += '<li><i>' + (parseInt(i) + 1) + '</i><div class="title-box"><img class="red" src="' + data[i].Photo1 + '" alt="" alt=""><div class="red"><span>' + data[i].GradeCode1 + '</span><span>' + data[i].Name1 + '</span></div></div>' +
                             '<div class="title-box"><img class="blue" src="' + data[i].Photo2 + '" alt=""><div class="blue"><span>' + data[i].GradeCode2 + '</span><span>' + data[i].Name2 + '</span></div></div><p>票数：' + data[i].Votes + '</p></li>'
                        }
                        $("#title01Box").html(html);
                    }
                   
                },
                error: function () {
                    alert("失败");
                }
            })
        }


    function OnLoadPage() {
        console.log("进入万众瞩目");
        // 获取地址栏参数
        // type 1.新星秀场 4.最佳女神 3.最佳男神；type=3 是男生，4是女生
        type = common.getUrlParam(window.location.href, "type");

        if (type == 1) {
            $("#titleImg").attr("src", "img/allEyesFixedOn/title01.png");
            $("#titleImg").attr("alt", "新星秀场");
            $(".title01").show().next('.title02').hide();
            getShowGround()
        } else if (type == 4) {
            $("#titleImg").attr("src", "img/allEyesFixedOn/title02.png");
            $("#titleImg").attr("alt", "万众瞩目排行-最佳女神");
            $(".title02").show().prev('.title01').hide();
            $(".title02>ul").addClass("red").removeClass("blue");
            getGoddessAndMale(type)
        } else if (type == 3) {
            $("#titleImg").attr("src", "img/allEyesFixedOn/title03.png");
            $("#titleImg").attr("alt", "万众瞩目排行-最佳男神");
            $(".title02").show().prev('.title01').hide();
            $(".title02>ul").addClass("blue").removeClass("red");
            getGoddessAndMale(type)
        }
    }

    return {
        OnLoadPage: OnLoadPage,
    }
})()

window.onload = function() {
    allEyesFixedOn.OnLoadPage()
}