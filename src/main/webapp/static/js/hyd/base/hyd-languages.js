(function ($) {
    var langDefault = "vi";

    function LanguageResource(resources) {
        this._defaults = {
            vi: {
            },
            en: {
            }
        };
        this.res = {
            vi: '',
            en: ''
        };
        $.extend(true, this.res, this._defaults); //true --> đệ quy vào vi->msg.question
        $.extend(true, this.res, resources || {});
    }

    $.extend(LanguageResource.prototype, {
        setMessage: function (resources) {
            $.extend(true, this.res, resources || {});
            return this;
        },

        getMessage: function (key, args) {
            // get cookie by name
            var cookie = $.cookie("org.apache.struts.action.LOCALE");
            // check cookie is undefined or null
            if (cookie != null) {
                langDefault = cookie;
            }

            var message = this.res[langDefault][key] || "";
            if (args != null) {
                if (Array.isArray(args)) {
                    for (var i = 0; i < args.length; i++) {
                        message = message.replace('{' + i + '}', args[i]);
                    }
                } else {
                    message = message.replace('{0}', args);
                }
            }
            return message.trimInner();
        }
    });

    $.fn.language = function (options) {
        return $.language.setMessage(options);
    }
    $.language = new LanguageResource();
})(jQuery);


var JMessageUtil = (function (window, $) {
    var ins = {};
    ins.showMsgEdit = function (id) {
        var $parent;
        var msgId;
        if (id.constructor.toString().indexOf('Array()') != -1) {
            for (var i = 0; i < id.length; i++) {
                $parent = $("#" + id[i]).parent();
                if ($parent) {
                    msgId = $parent.attr("msg-id");
                    if (msgId) {
                        $('.tooltipster-icon').each(function () {
                            if ($(this).attr('msg-id-edit') == msgId) {
                                $(this).show();
                            }
                        });
                    }
                    $parent.show();
                }
            }
        } else if ($("#" + id).parent()) {
            $parent = $("#" + id).parent();
            msgId = $parent.attr("msg-id");
            if (msgId) {
                $('.tooltipster-icon').each(function () {
                    if ($(this).attr('msg-id-edit') == msgId) {
                        $(this).show();
                    }
                });
            }
            $parent.show();
        }

    }
    ins.hideMsgEdit = function (id) {
        var $parent;
        var msgId;
        if (id.constructor.toString().indexOf('Array()') != -1) {
            for (var i = 0; i < id.length; i++) {
                $parent = $("#" + id[i]).parent();
                if ($parent) {
                    msgId = $parent.attr("msg-id");
                    if (msgId) {
                        $('.tooltipster-icon').each(function () {
                            if ($(this).attr('msg-id-edit') == msgId) {
                                $(this).hide();
                            }
                        });
                    }
                    $parent.hide();
                }
            }
        } else if ($("#" + id)) {
            $parent = $("#" + id).parent();
            msgId = $parent.attr("msg-id");
            if (msgId) {
                $('.tooltipster-icon').each(function () {
                    if ($(this).attr('msg-id-edit') == msgId) {
                        $(this).hide();
                    }
                });
            }
            $parent.hide();
        }
    }
    return ins;
})(window, jQuery);
var JTrackingUtil = (function (window, $) {
    var ins = {};

//    ins.preTracking = function(codes){
//        if(codes == null || codes == undefined){
//            return;
//        }
//        $('*[tracking]').each(function(){
//            if(codes.indexOf($(this).attr('tracking')) == -1){
//                $(this).removeAttr('tracking');
//            }
//        });
//    }
    ins.submitTracking = function(){
        if($bean.isNotEmpty(ipq)){
            var data = ipq;
            ipq = [];
            $.ajax({
                type: 'POST',
                url: JCommonUtil.getUrlAjax(JCommonUtil.convertUrl('/clientTracking?track')),
                data: {'bean.d': JSON.stringify(data)},
                success: function (data) {
                }
            });
        }
        return;
    }
    ins.initTracking = function(){
        var f5Key = 116;
        var rKey = 82;
        var modCode = [17, 91, 93];
        window.addEventListener('beforeunload', JTrackingUtil.submitTracking);
        window.addEventListener('keydown', function(e){
            var keyCode = e.keyCode || e.which;
            if(keyCode == f5Key || (keyCode == rKey && (e.ctrlKey || e.metaKey))){
                JTrackingUtil.submitTracking();
            }
        });
    }

    return ins;
})(window, jQuery);