var common = {
    /** 
     * 获取指定URL的参数值 
     * @param url  指定的URL地址 
     * @param name 参数名称 
     * @return 参数值 
     */
    getUrlParam: function(url, name) {
        var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
        var matcher = pattern.exec(url);
        var items = null;
        if (null != matcher) {
            try {
                items = decodeURIComponent(decodeURIComponent(matcher[1]));
            } catch (e) {
                try {
                    items = decodeURIComponent(matcher[1]);
                } catch (e) {
                    items = matcher[1];
                }
            }
        }
        return items;
    },

    //请求地址
    getHostUrl: function(){
        return "http://10.99.59.127";
    }
}