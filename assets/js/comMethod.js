/**
 * comMethod.js
 * 
 * 通用方法类
 * 
 * @author 段勤学 <duan831@126.com>
 *
 */
var console = console || {log:function(){return false;}};

(function(w){ 

    COMMETHOD = {
        init: function(){
           this.baiduTongji();
        },

        getUrlArgs : function($urlParam){
            function getQueryStringArgs(){
                var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
                    args = {},
                    items = qs.length ? qs.split("&") : [],
                    item = null,
                    name = null,
                    value = null,
                    i = 0,
                    len = items.length;
                for (i=0; i < len; i++){
                    item = items[i].split("=");
                    name = decodeURIComponent(item[0]);
                    value = decodeURIComponent(item[1]);
                    if (name.length){
                        args[name] = value;
                    }
                }
                return args;
            }
            var args = getQueryStringArgs();
            return args[$urlParam];
        },
        /* 
         * 倒数秒（常用于发短信后的倒数）
         *
         * @param $second 秒数
         * @param $btn 点击获取验证码按钮
         * @param $btnAfter 倒数时的DOM元素
         * @param $btnSecond 读秒时的DOM元素
         * 
         */
        msgSecond : function($second,$btn,$btnAfter,$btnSecond){
            $($btn).hide();  //原按钮
            var $sec = $second;
            var InterValObj;
            InterValObj = window.setInterval(SetRemainTime, 1000); //间隔函数，1秒执行
            function SetRemainTime() {
                if ($sec > 0) {
                $sec = $sec - 1;
                var second = Math.floor($sec % 60);    
                $($btnAfter).show();  
                $($btnSecond).show().empty().html(second);
                }else{//剩余时间小于或等于0的时候，就停止间隔函数
                    window.clearInterval(InterValObj);
                    //这里可以添加倒计时时间为0后需要执行的事件
                    $($btn).show();   //原按钮
                    $($btnAfter).hide();  //提示的DOM
                   
                }
            }
        },

        /*
         * 正则验证 email 手机号 真实姓名 身份证号 网址
         * 
         * 此类不做为空判断 需要自己单独写 
         * 自动去掉首尾空格 
         * 所有此类用法都是一样 参照DEMO
         */
        emailCheck : function($mail){
            var v = $.trim( $($mail).val() )
            if ( (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/).test(v)  ){
                return true;
            }else{
                return false;
            }
        },
        phoneCheck : function($phone){
            var v = $.trim( $($phone).val() )
            if ( parseInt(v.length) === 11){
                return true;
            }else{
                return false;
            }
        },
        realnameCheck : function($realname){
            var v = $.trim( $($realname).val() )
            if ( (/[\u4E00-\u9FA5]/).test(v)  ){
                return true;
            }else{
                return false;
            }
        },
        idnumCheck : function($idnum){
            var v = $.trim( $($idnum).val() )
            if ( ( /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/ ).test(v)  ){
                return true;
            }else{
                return false;
            }
        },
        /*
         * 百度 点击次数统计
         * 
         */
        baiduTongji : function(){
            $(".J_baidutjBtn").click(function(){ 
                var paramBtn = $(this).attr('data-tongji');
                _hmt.push(['_trackEvent', "btn", paramBtn, "click", "send"]);
            });
        },
        /*
         * 字符窜截取
         */
        cutString : function(str, cutlength){
            if( parseInt(str.length) > parseInt(cutlength) ){
               str = str.substr(0, cutlength) + "...";
               return str;
            } else {
               return str;
            }
        }

    };
    
    COMMETHOD.init();    
    w.COMMETHOD = COMMETHOD; 
    $.COMMETHOD = COMMETHOD; 
})(window)
