$(document).ready(function () {
    $('a').each(function () {
        if (myClickHandler == "touchstart") {
            $(this).unbind(myClickHandler).bind(myClickHandler, function (e) {
                e.stopPropagation();
                $(this).click();
            });
        }
    });
});

// fix autocomplete: set width của autocomplete bằng với input
$.extend($.ui.autocomplete.prototype.options, {
    open: function (event, ui) {
        $(this).autocomplete("widget").css({
            "width": ($(this).outerWidth() + "px")
        });
    }
});

var JHomeUtil = (function (window, $) {
    var ins = {};
    ins.GETTING_STARTED_SLIDE = null;
    ins.STARTED = null;
    ins.removeAppPopup = function () {
        $('#app-popup').remove();
        $('body').removeClass('has-popup');
        $.ajax({
            url: JCommonUtil.getUrlAjax(JCommonUtil.convertUrl("/user?doClosePopup")),
            method: 'POST'
        });
    }
    var notifyLoad = {
        "notification": JCommonUtil.convertUrl('/notification?loadList'),
        "task": JCommonUtil.convertUrl('/task?loadList'),
        "goal": JCommonUtil.convertUrl('/goalTask?loadList')
    }
    var notifyView = {
        "notification": JCommonUtil.convertUrl('/notification?doView'),
        "task": JCommonUtil.convertUrl('/task?doView'),
        "goal": JCommonUtil.convertUrl('/goalTask?doView')
    }
    var notifyCount = {
        "notification": JCommonUtil.convertUrl('/notification?getCountUnview'),
        "task": JCommonUtil.convertUrl('/notification?getCountUnview&typeAction=task'),
        "goal": JCommonUtil.convertUrl('/notification?getCountUnview&typeAction=goal')
    }

    //Notification & Task
    ins.sortTable = function (elem, index) {
        var $table = $(elem).parents('table');
        $table.find('th').removeClass('sort-asc').removeClass('sort-desc');
        var isAsc = $(elem).attr('sorted') || 'false';
        var sorted = $table.find('tbody tr').sort(function (a, b) {
            var an = $($(a).find('td')[index]).text();
            var bn = $($(b).find('td')[index]).text();
            if (!isNaN(an) && !isNaN(bn)) {
                an = parseFloat(an);
                bn = parseFloat(bn);
                return isAsc == 'true' ? an - bn : bn - an;
            }
            return isAsc == 'true' ? an.localeCompare(bn) : an.localeCompare(bn) * -1;
        });
        $table.find('tbody tr').remove();
        $(elem).attr('sorted', isAsc == 'true' ? 'false' : 'true');
        $(elem).addClass(isAsc == 'true' ? 'sort-desc' : 'sort-asc');
        $(elem).removeClass(isAsc == 'true' ? 'sort-asc' : 'sort-desc');
        $table.find('tbody').append(sorted);
        JHomeUtil.updateTableIndex($table);
    }
    ins.loadNotify = function (type, view) {
        if (type == "quick") {
            ins.loadQuick(true);
        } else {
            var url = notifyLoad[type] + "&bean.flagView=" + view;
            if (view) {
                $('#nav-' + type + ' .fly-loading').removeClass('hide');
            }
            $.ajax({
                url: JCommonUtil.getUrlAjax(url),
                success: function (data) {
                    $('#nav-' + type + ' .fly-body').html(data);
                    if (view) {
                        if (!$('#nav-' + type + ' .fly-loading').hasClass('hide')) {
                            $('#nav-' + type + ' .fly-loading').addClass('hide');
                        }
                    }
                }
            });
        }
    }
    ins.doViewNotify = function (type) {
        var url = notifyView[type];
        $.ajax({
            type: "POST",
            url: JCommonUtil.getUrlAjax(url)
        });
    }

    ins.pollingNotify = function (type) {
        var url = notifyCount[type];
        if ($bean.isNotEmpty(url)) {
            $.ajax({
                url: JCommonUtil.getUrlAjax(url),
                success: function (data) {
                    if (parseInt(data) > 0) {
                        $('#nav-' + type + ' .nav-count').html(data);
                        if ($('#nav-' + type + ' .fly-container').hasClass('hide')) {
                            $('#nav-' + type + ' .nav-count').removeClass('hide');
                            ins.loadNotify(type, false);
                        }
                    }
                },
                complete: setTimeout(function () {
                    ins.pollingNotify(type);
                }, 600000),
                timeout: 600000
            });
        }
    }
    ins.loadQuick = function (show) {
        var url = JCommonUtil.convertUrl('/quicklink?loadMenuHome');
        if (show) {
            $('#nav-quick .fly-loading').removeClass('hide');
        }
        $.ajax({
            url: JCommonUtil.getUrlAjax(url),
            success: function (data) {
                $('#nav-quick .fly-body').html(data);
                if (show) {
                    $('#nav-quick .fly-loading').removeClass('hide').addClass('hide');
                }
            }
        });
    }

    ins.hideFly = function (flyId) {
        $('.fly').each(function () {
            if ($(this).attr('fly-id') != flyId) {
                $(this).removeClass('hide').addClass('hide');
            }
        });
    }
    ins.resizeFly = function () {
        $('.ly-header').find('.fly-container').each(function () {
            if (!$(this).hasClass('hide')) {
                ins.resizeFlyOne('#' + $(this).parent().attr('id'));
            }
        });
    }
    ins.resizeFlyOne = function (divId) {
        var maxHeight = $(window).height() - (44 + 34 * 2 + 30);
        $(divId + ' .fly-box .fly-body').css('max-height', maxHeight + 'px');
        ins.myscroll(divId + ' .fly-box .fly-body');

    }
    ins.updateTableIndex = function (table) {
        table = table || "table";

        //sửa màu dòng
        $(table).find('tbody tr:visible:even').each(function () {
            $(this).css('background-color', '#f9f9f9');
            $(this).hover(function () {
                $(this).css('background-color', '#ecf3f8');
            }, function () {
                $(this).css('background-color', '#f9f9f9');
            });
        });
        $(table).find('tbody tr:visible:odd').each(function () {
            $(this).css('background-color', '#fff');
            $(this).hover(function () {
                $(this).css('background-color', '#ecf3f8');
            }, function () {
                $(this).css('background-color', '#fff');
            });
        });

        //sửa index
        var k = 0;
        var updateIndex = false;
        if ($(table).find('thead tr th:first').hasClass('index') || $(table).find('thead tr th:first').hasClass('index-percent')) {
            updateIndex = true;
        }
        $(table).find('tbody tr').each(function () {
            $(this).removeClass('row0').removeClass('row1');
            if ($(this).css('display') != 'none') {
                $(this).addClass('row' + (k % 2));
                k++;
                if (updateIndex) {
                    $(this).find('td:first').html(k);
                }
            }

        });
    }

    ins.markTableIndex = function ($table, tdIndexClass, trNoIndexClass) {
        if ($bean.isEmpty($table)) {
            return;
        }
        var k = 1;
        $table.find('tbody tr:not(.row-detail)').each(function () {
            if ($(this).is(":visible")) {
                if ($bean.isNotEmpty(trNoIndexClass) && $(this).hasClass(trNoIndexClass)) {
                    return;
                }
                if ($bean.isNotEmpty(tdIndexClass)) {
                    $(this).find('.' + tdIndexClass).html(k);
                } else {
                    $(this).find('td:first-child').html(k);
                }
                k++;
            }

        });
    }
    ins.myscroll = function (obj, autohidemode, oneaxismousemode) {
        ins.myScrollObj($(obj), autohidemode, oneaxismousemode);
    }
    ins.myScrollObj = function ($obj, autohidemode, oneaxismousemode) {
        if ($obj.getNiceScroll().length > 0) {
            $obj.getNiceScroll().resize();
        } else {
            var autohide = autohidemode === undefined ? true : autohidemode;
            var oneaxismouse = autohidemode === undefined ? 'auto' : autohidemode;
            $obj.niceScroll({
                touchbehavior: true,
                cursorcolor: "#000000",
                cursoropacitymax: 1,
                cursorwidth: "6px",
                autohidemode: autohide,
                oneaxismousemode: oneaxismouse
            });
        }
    }
    ins.resizeMyStep = function (objStepContainer) {
        if ($(objStepContainer).length == 0) {
            return;
        }
        var countSteps = $(objStepContainer + ' .my-steps').find('.my-step').length;
        var widthStep = parseInt($(objStepContainer + ' .my-steps .my-step .step-item').css('min-width'));
        var widthDis = parseInt($(objStepContainer + ' .my-steps .my-step .step-item').css('margin-right'));
        var widthDisAll = widthDis * (countSteps - 1);
        var widthSteps = widthStep * countSteps + widthDisAll;
        var widthStepsMin = $(objStepContainer).width();
        if (widthSteps < widthStepsMin) {
            $(objStepContainer + ' .my-steps').css('width', widthStepsMin + 'px');
            var widthStepItem = JMath.floatToInt((widthStepsMin - widthDisAll) / countSteps);
            $(objStepContainer + ' .my-steps .my-step .step-item').css('width', widthStepItem + 'px');
            $(objStepContainer + ' .my-steps .my-step').find('.step-item').last().css('width', (widthStepsMin - widthStepItem * (countSteps - 1) - widthDisAll) + 'px');
        } else if (widthSteps > widthStepsMin) {
            $(objStepContainer + ' .my-steps').css('width', (widthSteps + 6) + 'px');
            $(objStepContainer + ' .my-steps .my-step .step-item').css('width', widthStep + 'px');
        }
        ins.myscroll(objStepContainer);
        ins.reposMyStep(objStepContainer);
    }
    ins.reposMyStep = function (objStepContainer) {
        if ($(objStepContainer).length == 0 || $(objStepContainer + ' .my-steps .is-active').length == 0) {
            return;
        }
        var widthStepsMin = $(objStepContainer).width() - parseInt($(objStepContainer).css('padding-left')) - parseInt($(objStepContainer).css('padding-right')) - 3;
        var scrollPos = $(objStepContainer + ' .my-steps .is-active').position().left + $('.my-steps .is-active').width() - widthStepsMin;
        if (scrollPos > 0) {
            $(objStepContainer).getNiceScroll().doScrollPos(scrollPos);
        }
    }
    ins.removeAlertTop = function (time, objScroll) {
        if (time == 0) {
            $('.ly-content-body .box-alert.box-top').remove();
            if (objScroll) {
                JHomeUtil.myscroll(objScroll);
            }
        } else {
            time = time || glTimeoutAlert;
            setTimeout(function () {
                $('.ly-content-body .box-alert.box-top').remove();
                if (objScroll) {
                    JHomeUtil.myscroll(objScroll);
                }
            }, time);
        }
    }
    ins.boxAlert = function (bg, msg) {
        return '<div class="box-alert bg-' + bg + '"><p>' + msg + '</p></div>';
    }
    ins.removeDouble = function (obj, target, isRemoveFirst) {
        if ($(obj).length > 0) {
            if ($(obj).find(target).length > 2) {
                if (isRemoveFirst) {
                    $(obj).find(target).first().remove();
                } else {
                    $(obj).find(target).last().remove();
                }
            }
        }
    }
    ins.swiper = function (obj) {
        if ($(window).height() < SCREEN_768) {
            $('.prettyPopin').css('width', '100%');
        } else {
            $('.prettyPopin').css('width', '90%');
        }
        var bottomHeight = $('.getting-started-container .horizontal').height();
        $('.getting-started-container .swiper-container').css('min-height', ($(window).outerHeight() - bottomHeight - $('.prettyPopin').offset().top) + 'px');
        $('.getting-started-container .swiper-container .content-slide').css('min-height', ($(window).outerHeight() - bottomHeight - $('.prettyPopin').offset().top) + 'px');
        ins.GETTING_STARTED_SLIDE = new Swiper(obj, {
//            pagination: '.slide-pagination',
            loop: false,
            grabCursor: true,
            autoHeight: true,
            paginationClickable: true,
            speed: 1000,
            autoplay: 999999,
            onSlideChangeStart: ins.onSlideChangeStart,
            onSlideChangeEnd: ins.onSlideChangeEnd
        });
        ins.onSlideChangeStart(ins.GETTING_STARTED_SLIDE);
        $(window).resize();
    }

    ins.onSlideChangeStart = function (swiper) {
        if (ins.STARTED != null) {
            $('.getting-started-container .swiper-container .content-slide').css('overflow-y', 'hidden');
        } else {
            ins.STARTED = 1;
        }
        var totalSlide = ins.GETTING_STARTED_SLIDE.slides.length;
        $('.getting-started-container .slide-progress.active').css('width', ((swiper.activeSlide) * 100 / (totalSlide)) + '%');
        $('.getting-started-container .swiper-pagination-switch').each(function (index) {
            if (index <= swiper.activeSlide) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
        if (swiper.activeSlide == 0) {
            $('.getting-started-container .previous').addClass('disabled');
        } else {
            $('.getting-started-container .previous').removeClass('disabled');
        }
        if (swiper.activeSlide == totalSlide - 1) {
            $('.getting-started-container .next').addClass('disabled');
        } else {
            $('.getting-started-container .next').removeClass('disabled');
        }
    }
    ins.onSlideChangeEnd = function (swiper) {
        $('.getting-started-container .swiper-container .content-slide').css('overflow-y', '');
    }

    ins.slideTo = function (index) {
        if (ins.GETTING_STARTED_SLIDE) {
            ins.GETTING_STARTED_SLIDE.swipeTo(index);
        }
    }
    ins.swiperNext = function (index) {
        if (ins.GETTING_STARTED_SLIDE) {
            ins.GETTING_STARTED_SLIDE.swipeNext();
        }
    }
    ins.swiperPrevious = function (index) {
        if (ins.GETTING_STARTED_SLIDE) {
            ins.GETTING_STARTED_SLIDE.swipePrev();
        }
    }
    ins.closeTerms = function (showAlert) {
        $('#agree').parent().find('.form-error').remove();
        if (!$('#agree').is(':checked')) {
            $('#agree').parent().append('<div class="form-error">' + JCommonUtil.message('error.terms.not.agree', 'error') + '</div>');
            return;
        }
        var url = JCommonUtil.convertUrl('user?doAgreeTerms');
        $.ajax({
            url: JCommonUtil.getUrlAjax(url),
            data: $('#form-terms-info').serialize(),
            success: function (data) {
                if (data) {
                    closePrettyPopin();
                    if (showAlert) {
                        JHomeUtil.getAlert();
                    }
                }
            }
        });
    }
    ins.getAlert = function () {
        var url = JCommonUtil.convertUrl('alertInfo?listByContext');
        $.ajax({
            url: JCommonUtil.getUrlAjax(url),
            success: function (data) {
                if (data.trim().length > 0) {
                    var dialog = $('<div class="hide"></div>');
                    dialog.html(data);
                    $(dialog).prettyPopin({contentInner: true, showClose: false});
                }
            }
        });
    }
    ins.closeAlert = function () {
        var url = JCommonUtil.convertUrl('alertInfo?doCloseAlert');
        $('.prettyPopin').prepend(lyLoading());
        $.ajax({
            url: JCommonUtil.getUrlAjax(url),
            data: $('#form-alert-info').serialize(),
            success: function (data) {
            }
        }).done(function () {
            closePrettyPopin();
        });
    }
    ins.logBtnTopShow = false;
    ins.logBtnTopHide = false;
    ins.showMainGoTop = function () {
        var btnGoTop = $('#main-go-top');
        if (window.pageYOffset > 150) {
            if (!ins.logBtnTopShow) {
                ins.logBtnTopShow = true;
                btnGoTop.fadeIn(function () {
                    ins.logBtnTopShow = false;
                });
            }
        } else {
            if (!ins.logBtnTopHide) {
                ins.logBtnTopHide = true;
                btnGoTop.fadeOut(function () {
                    ins.logBtnTopHide = false;
                });
            }
        }
    }

    /*JEvent extends*/
    ins.windowResize = function () {
        JCompany.resizeGoalChart();
        JAssessment.resizeAssessmentChart();
        JAssessment.resizeCompetencyTable();
        JQuerySteps.resizeJQuerySteps();
    }

    ins.windowScroll = function () {
        JAssessment.resizeAssess360TeamRate();
    }
    return ins;
})(window, jQuery);

(function ($) {
    function Notification(params) {
        this.params = {
            divId: '',
            type: ''
        }
    }

    $.extend(Notification.prototype, {
        setParams: function (params) {
            extendRemove(this.params, params || {});
            return this;
        },
        init: function () {
            var _this = this;
            if (_this.params.type == "user") {
                $('#' + _this.params.divId + ' .usr-info').unbind(myClickHandler).bind(myClickHandler, function (e) {
                    $('.is-on').removeClass('is-on');
                    JHomeUtil.hideFly(_this.params.type);
                    $('#' + _this.params.divId + ' .fly').toggleClass('hide');
                    e.stopPropagation();
                });
            } else {
                $('#' + _this.params.divId + ' .nav-item').unbind(myClickHandler).bind(myClickHandler, function (e) {
                    $('.is-on').removeClass('is-on');
                    if ($.trim($('#' + _this.params.divId + ' .nav-count').html()) != "") {
                        JHomeUtil.doViewNotify(_this.params.type);
                    }
                    JHomeUtil.hideFly(_this.params.type);
                    $('#' + _this.params.divId + ' .fly').toggleClass('hide');
                    if ($('#' + _this.params.divId + ' .fly').hasClass('hide')) {
                        $(this).removeClass('is-on');
                    } else {
                        $(this).removeClass('is-on').addClass('is-on');
                        JHomeUtil.resizeFlyOne('#' + _this.params.divId);
                    }
                    $('#' + _this.params.divId + ' .nav-count').html("");
                    $('#' + _this.params.divId + ' .nav-count').removeClass('hide').addClass('hide');
                    $('[script-role~="group"]').find('[script-role~="toggle-dialog"].active').removeClass('active');
                    $('[script-role~="group"]').find('[script-role~="dialog"].active').removeClass('active');
                    e.stopPropagation();
                });
                $(document).bind(myClickHandler, function (e) {
                    $('.is-on').removeClass('is-on');
                    $('.fly').removeClass('hide').addClass('hide');
                    if ($.trim($('#' + _this.params.divId + ' .nav-count').html()) != "") {
                        $('#' + _this.params.divId + ' .nav-count').removeClass('hide');
                    }
                });
                $('#' + _this.params.divId + ' .fly-refresh').unbind(myClickHandler).bind(myClickHandler, function (e) {
                    JHomeUtil.loadNotify(_this.params.type, true);
                    e.stopPropagation();
                });
                setTimeout(function () {
                    JHomeUtil.loadNotify(_this.params.type, false);
                    JHomeUtil.pollingNotify(_this.params.type);
                }, 1000);
            }
        }
    });
    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props) {
            if (props[name] == null) {
                target[name] = props[name];
            }
        }
        return target;
    }

    $.fn.notify = function (params) {
        return this.each(function () {
            if ($(this).is('.is')) {
                return;
            } else {
                $(this).addClass('is');
                var id = $(this).attr('id');
                if (id) {
                    var noti = new Notification(params);
                    noti.setParams({divId: id, type: id.substring("nav-".length)});
                    noti.init();
                    return noti;
                }
            }
        });
    };

})(jQuery);

function swapFavourite(id) {
    var url = JCommonUtil.convertUrl("/quicklink?doSwapFavourite") + "&bean.rightId=" + id;
    var oldSrc = $("img.img-fav-" + id).attr("src");
    $("img.img-fav-" + id).attr("src", JGlobal.contextRoot + "/img/icon/24x24/loader.gif");
    $.ajax({
        type: 'GET',
        url: JCommonUtil.getUrlAjax(url),
        success: function (t) {
            if (t.indexOf("@error:") != -1) {
                JCommonUtil.alert({
                    messageType: JCommonUtil.MESSAGE_TYPE_ERROR,
                    message: t.substring("@error:".length)
                });
                $("img.img-fav-" + id).attr("src", oldSrc);
            } else {
                JHomeUtil.loadQuick(false);
                $("img.img-fav-" + id).attr("src", JGlobal.contextRoot + "/img/icon/24x24/fav-" + t + ".png");
                $("img.img-fav-" + id).attr("title", JCommonUtil.message("ihcm.action.title.fav." + t, "ihcm"));
            }
        }
    });
}

function resizePortlet($this) {
    var pletId = $this.attr("data-id");
    var url = JCommonUtil.convertUrl("/portlet?doResize") + "&bean.id=" + pletId;
    $.ajax({
        type: 'GET',
        url: JCommonUtil.getUrlAjax(url),
        async: false,
        success: function (data) {
            if (data.indexOf("@error:") != -1) {
                JCommonUtil.alert({
                    messageType: JCommonUtil.MESSAGE_TYPE_ERROR,
                    message: data.substring("@error:".length)
                });
            } else {
                $('.plet-window[data-id=' + pletId + ']').attr('data-size', data);
                $this.children().attr("src", JGlobal.contextRoot + "/img/icon/16x16/resize-" + data + ".png");
                $this.attr("title", JCommonUtil.message('ihcm.plet.resize-' + data, 'ihcm'));
                JHomeUtil.resizePortletBox();
            }
        }
    });
}

function moveViewToCenterFrame(viewId, frameId) {
    var $frame = $('#' + frameId);
    var $view = $('#' + viewId);
    $view.css({top: ($frame.height() - $view.height()) / 2, left: ($frame.width() - $view.width()) / 2});
}

function scrollViewToCenterFrame(viewId, frameId) {
    var $frame = $('#' + frameId);
    var $view = $('#' + viewId);
    $frame.animate({
        scrollTop: ($view.height() - $frame.height()) / 2,
        scrollLeft: ($view.width() - $frame.width()) / 2
    }, 0);
}

function setViewToCenterFrame(viewId, frameId) {
    if (JDevice.isMobile()) {
        JEmployee.orgChartNiceScroll(frameId);
        scrollViewToCenterFrame(viewId, frameId);
    } else {
        moveViewToCenterFrame(viewId, frameId);
    }
}

//Resize Quick Link
function resizeQuickLink() {
    if ($(".sl-quicklink-show").length > 0) {
        var padding0 = 6;
        var margin0 = 6;
        var width0 = 100;
        var hwidth = $(".sl-quicklink-show").width() - (padding0 * 2);
        var widthExtend = hwidth % (width0 + margin0 * 2);
        $("#h-grid").css("padding-left", padding0 + parseInt(widthExtend / 2) + "px");
    }
}

//  Tabs
// MOVE TO JEmployee.renderTab

//Quick Message
(function ($, undefined) {
    function QuickMessage() {
        var _this = this;
        this.defaults = {
            msg: false,
            warningMsg: false,
            error: false,
            objId: ''
        }
        this.params = {
            msg: false,
            warningMsg: false,
            error: false,
            objId: ''
        }
        /*
         * @objId: Id đối tượng để append dữ liệu
         * @appendType: Kiểu append dữ liệu, giá trị [prepend | after | before], mặc định là prepend
         * */
        this.showMsg = function (objId, appendType) {
            if (!objId) {
                objId = _this.params.objId;
            }
            if (!objId) {
                return;
            }
            var msg = _this.params.msg;
            var warningMsg = _this.params.warningMsg;
            var error = _this.params.error;
            var objShow = "";
            if (msg && $bean.isNotEmpty(msg)) {
                objShow = '<div class="box-alert bg-success"><p>' + msg + '</p><div class="b-delete" onclick="deleteBoxAlert(this)"></div></div>';
            } else if (warningMsg && $bean.isNotEmpty(warningMsg)) {
                objShow = '<div class="box-alert bg-warning"><p>' + warningMsg + '</p><div class="b-delete" onclick="deleteBoxAlert(this)"></div>';
            } else if (error && $bean.isNotEmpty(error)) {
                objShow = '<div class="box-alert bg-error"><p>' + error + '</p><div class="b-delete" onclick="deleteBoxAlert(this)"></div>';
            }
            if ($bean.isNotEmpty(objShow)) {//Hiển thị sau 5s tự động remove
                $(".box-alert").remove();
                if ($bean.isNotEmpty(appendType)) {
                    if ("before" == appendType) {
                        $("#" + objId).before(objShow);
                    } else if ("after" == appendType) {
                        $("#" + objId).after(objShow);
                    } else {
                        $("#" + objId).prepend(objShow);
                    }
                } else {
                    $("#" + objId).prepend(objShow);
                }
                setTimeout(function () {
                    $('.box-alert').fadeOut("slow", function () {
                        $(this).remove();
                    });
                }, 5000);
                $.extend(this.params, this.defaults);
            }
        }

    }

    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props) {
            if (props[name] == null) {
                target[name] = props[name];
            }
        }
        return target;
    }

    $.extend(QuickMessage.prototype, {
        setParams: function (settings) {
            extendRemove(this.params, settings || {});
            return this;
        },
        show: function (objId, appendType) {
            this.showMsg(objId, appendType);
        }
    });

    $.quickMsg = new QuickMessage();
})(jQuery);

function lyLoading() {
    var temp = $template.getTemplateDirective('ly-loading-normal');
    if ($bean.isEmpty(temp)) {
        temp = '<div class="ly-loading-overlay"><div class="ly-loading"><div class="loading-bar"></div><div class="loading-bar"></div><div class="loading-bar"></div><div class="loading-bar"></div></div></div>';
    }
    return temp;
}
function removeLyLoading(obj) {
    removeLyLoadingObj($(obj));
}
function removeLyLoadingObj($obj) {
    if ($obj) {
        $('.ly-loading-overlay').remove();
    } else {
        $obj.find('.ly-loading-overlay').remove();
    }
}
function removeDirectChildrenLoading(obj) {
    if (!obj) {
        $('.ly-loading-overlay').remove();
    } else {
        $(obj).children('.ly-loading-overlay').remove();
    }
}
//Delete Box Alert
function deleteBoxAlert(obj) {
    $(obj).parent().remove();
}

//Validate upload image
function checkFileExtension(fileType, fileExtn) {
    if ($bean.isEmpty(fileType)) {
        return false;
    }
    var ret = false;
    var found = false;
    var extns = fileExtn.split(";");
    for (var i = 0; i < extns.length; i++) {
        if (fileType == extns[i]) {
            found = true;
            break;
        }
    }
    if (!found) {
        ret = false;
    }
    else {
        ret = true;
    }
    return ret;
}

function validateUploadImg(img) {
    if (!checkFileExtension(img.type, 'image/gif;image/jpeg;image/pjpeg;image/png')) {
        JCommonUtil.alert({
            messageType: JCommonUtil.MESSAGE_TYPE_WARNING,
            message: JCommonUtil.message('error.upload.photo.type.invalid')
        });
        return false;
    }
    if (img.size > 1048576) {
        JCommonUtil.alert({
            messageType: JCommonUtil.MESSAGE_TYPE_WARNING,
            message: JCommonUtil.message('error.upload.photo.size.invalid', 'error', '1 MB')
        });
        return false;
    }
    return true;
}

function selectHtmlType(value, objListId) {
    if ($bean.isNotEmpty(value) && value == "list") {
        $("#" + objListId).show();
    } else {
        $("#" + objListId).hide();
    }
}

//var DeviceDetect = function () {
//    // Khai bao field
//    this.deviceName = "NotDetected";
//    this.browserName = "NotDetected";
//    this.browserVersion = "NotDetected";
//    this.osName = "NotDetected";
//    this.osVersion = "NotDetected";
//
//    // Khai bao method
//    this.isMobile = isMobile;
//    this.isIos = isIos;
//    this.isAndroid = isAndroid;
//    this.isWindowsPhone = isWindowsPhone;
//
//    // Lay user agent
//    var userAgent = navigator.userAgent;
//    userAgent = userAgent.toLowerCase();
//
//    // detect browser name
//    if (userAgent.indexOf("firefox") != -1) {
//        this.browserName = "firefox";
//    }
//    if (userAgent.indexOf("chrome") != -1) {
//        this.browserName = "chrome";
//    }
//    if (userAgent.indexOf("msie") != -1) {
//        this.browserName = "msie";
//    }
//    if (userAgent.indexOf("opera") != -1) {
//        this.browserName = "opera";
//    }
//    /////////////////////
//
//    // detect os name
//    if (userAgent.indexOf("windows nt") != -1) {
//        this.osName = "windows nt";
//    }
//    if (userAgent.indexOf("linux") != -1 && userAgent.indexOf("android") == -1) {
//        this.osName = "linux";
//    }
//    if (userAgent.indexOf("android") != -1 && userAgent.indexOf("linux") != -1) {
//        this.osName = "android";
//    }
//    if (userAgent.indexOf("iphone") != -1) {
//        this.osName = "ios";
//    }
//    if (userAgent.indexOf("ipad") != -1) {
//        this.osName = "ios";
//    }
//    if (userAgent.indexOf("windows phone") != -1) {
//        this.osName = "windows phone os";
//    }
//
//    function isMobile() {
//        if (userAgent.indexOf("mobile") != -1) {
//            return true;
//        }
//        return false;
//    }
//
//    function isIos() {
//        if (this.osName == "ios") {
//            return true;
//        }
//        return false;
//    }
//
//    function isAndroid() {
//        if (this.osName == "android") {
//            return true;
//        }
//        return false;
//    }
//
//    function isWindowsPhone() {
//        if (this.osName == "windows phone os") {
//            return true;
//        }
//        return false;
//    }
//};

//Box Items

(function ($) {
    function BoxItems(params) {
        this.itemDataClass = "item-data";
        this.params = {
            divId: '',
            urlLoadBody: '',
            isLoad: false,
            afterOpen: undefined
        }
        this.params = $.extend(this.params, params || {});

    }

    $.extend(BoxItems.prototype, {
        setParams: function (params) {
            extendRemove(this.params, params || {});
            return this;
        },
        loadBody: function () {
            if (this.params.urlLoadBody && $('#' + this.params.divId + ' .' + this.itemDataClass).length == 0) {
                var _this = this;
                $('#' + _this.params.divId + ' .box-body:first').prepend(lyLoading());
                var url = _this.params.urlLoadBody;
                $.ajax({
                    type: 'GET',
                    evalScripts: true,
                    url: JCommonUtil.getUrlAjax(url),
                    success: function (data) {
                        $('#' + _this.params.divId + ' .box-body .box-content').html(data || '');
                        removeLyLoading('#' + _this.params.divId);
                        if ($bean.isFunction(_this.params.callback)) {
                            _this.params.callback();
                        }
                    }
                });
            }
        },
        init: function () {
            var _this = this;
            $('#' + _this.params.divId + ' .icon').click(function () {
                toggleOpen(_this, this);
            });
            $('#' + _this.params.divId + ' .toggle-open').click(function () {
                $(this).parent().find('.icon').click();
            });
            if (_this.params.isLoad) {
                _this.loadBody();
            }
        }
    });

    function toggleOpen(_boxItem, target) {
        $(target).toggleClass('open');
        $('#' + _boxItem.params.divId).toggleClass('open', 0, function () {
            if ($bean.isFunction(_boxItem.params.afterOpen)) {
                _boxItem.params.afterOpen();
            }
        });
        if ($('#' + _boxItem.params.divId).is('.open') && $('#' + _boxItem.params.divId + ' .' + target.itemDataClass).length == 0) {
            _boxItem.loadBody();
        }
    }

    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props) {
            if (props[name] == null) {
                target[name] = props[name];
            }
        }
        return target;
    }

    $.fn.boxItem = function (params) {
        return this.each(function () {
            if ($(this).is('.is')) {
                return;
            } else {
                $(this).addClass('is');
                var id = $(this).attr('id');
                var box = new BoxItems(params);
                box.setParams({divId: id});
                box.init();
                return box;
            }
        });
    };

})(jQuery);

function doUpdatePriorityBoxItem(itemId) {
    if (JFormUtil.checkValidPriority(document.getElementById("form-" + itemId))) {
        doUpdateNumber(itemId);
    }
}

function doUpdateNumber(itemId) {
    var $theForm = $('#form-' + itemId);
    $('#box-body-' + itemId).prepend(lyLoading());
    var url = $theForm.attr('action');
    $.ajax({
        url: JCommonUtil.getUrlAjax(url),
        type: 'GET',
        data: $theForm.serialize(),
        success: function (data) {
            $('#box-content-' + itemId).html(data || '');
            removeLyLoading('#box-body-' + itemId);
            $('#box-content-' + itemId).find('table.table-toggle').toggleTable();
        },
        error: function (jqXHR, status, error) {
            if (jqXHR.status == AJAX_CODE_ERROR_COMMON) {
                $.quickMsg.setParams({
                    error: jqXHR.responseText
                });
                $.quickMsg.show("box-body-" + itemId);
            }
            removeLyLoading('#box-body-' + itemId);
        }
    });
}

function doUpdateRatingMark(itemId) {
    if (JFormUtil.checkValidMark(document.getElementById("form-" + itemId))) {
        doUpdateNumber(itemId);
    }
}

(function ($) {
    function CheckItems(params) {
        this.params = {
            divId: '',
            itemList: null,
            fieldName: '',
            disable: false,
            multicheck: false,
            size: 2,
            callback: function () {
            }
        }
        this.params = $.extend(this.params, params || {});

    }

    $.extend(CheckItems.prototype, {
        setParams: function (params) {
            extendRemove(this.params, params || {});
            return this;
        },
        init: function () {
            var _this = this;
            var itemList = null;
            if (_this.params.itemList) {
                itemList = jQuery.parseJSON(_this.params.itemList);
            } else {
                itemList = jQuery.parseJSON($.trim($('#' + _this.params.divId).html()));
            }
            var shtml = "";
            var item = null;
            if (itemList) {
                shtml += "<div class='check-item-container'>";
                var size = parseInt(_this.params.size);
                var current = 0;
                for (var i = 0; i < itemList.length; i++) {
                    if (current == 0 || current > size) {
                        shtml += "<div class='check-item-group'>";
                        current = 1;
                    }
                    item = itemList[i];
                    shtml += "<div class='check-item'>";
                    var checkType = "radio";
                    if (_this.params.multicheck) {
                        checkType = "checkbox";
                    }
                    var checked = ""
                    if (item["current"]) {
                        checked = "checked='checked'";
                    }
                    shtml += "<input class='check-input' type='" + checkType + "' name='" + _this.params.fieldName + "' value='" + item["value"] + "' " + checked + (_this.params.disable ? "disabled" : "");
                    if (item["id"]) {
                        shtml += ' id="' + item["id"] + '"';
                    }
                    shtml += "/>";
                    if (item["icon"]) {
                        shtml += "<div class='check-icon'><img" + (_this.params.disable ? " style='cursor: default !important;'" : " onclick='JCommonUtil.checkItem(&quot;#" + item["id"] + "&quot;)'") + " src='" + JGlobal.contextRoot + "/img/icon/" + item["icon"] + "'/></div>";
                    }
                    shtml += "<div class='check-content'><div" + (_this.params.disable ? " style='cursor: default !important;'" : " style='cursor: pointer!important;' onclick='JCommonUtil.checkItem(&quot;#" + item["id"] + "&quot;)'") + " class='check-name'>" + item["name"] + "</div>";
                    if (item["description"]) {
                        shtml += "<div class='check-description'>" + item["description"] + "</div>";
                    }
                    shtml += "</div>";
                    if (item["tip"]) {
                        shtml += "<div class='check-icon-tip'><span class='tooltip tooltip-icon' data-title='" + item["tip"] + "'></span></div>";
//                        shtml = shtml.replace("{tip}", "<div class='check-icon-tip'><span class='tooltip tooltip-icon' data-title='" + item["tip"] + "'></span></div>");
                    } else {
//                        shtml = shtml.replace("{tip}", "");
                    }
                    shtml += "</div>";
                    current++;
                    if (current > size) {
                        shtml += "</div>";
                    }
                }
                if (current != size) {
                    shtml += "</div>";
                }
            }
            $('#' + _this.params.divId).html(shtml);
            $('#' + _this.params.divId).removeClass("hide");
            if (_this.params.size == 1) {
                $('#' + _this.params.divId + ' .check-item').css('width', '100%');
            } else {
                $('#' + _this.params.divId + ' .check-item').css('width', JMath.roundFloat(100 / _this.params.size) + '%');
                var width = '220px';
//                if (itemList.length > 2) {
                if ($(window).width() > 1195) {
                    width = '335px';
                } else {
                    width = '355px';
                }
//                }
                $('#' + _this.params.divId + ' .check-item').css('min-width', width);
            }
            _this.markSelected($('#' + _this.params.divId));
            $('#' + _this.params.divId + ' .check-input').click(function () {
                _this.params.callback();
                _this.markSelected($('#' + _this.params.divId));
            });
            setTimeout(function () {
                _this.adjustWidth($('#' + _this.params.divId));
                _this.balanceHeight($('#' + _this.params.divId));
            }, 300);
            $(window).resize(function () {
                _this.adjustWidth($('#' + _this.params.divId));
                _this.balanceHeight($('#' + _this.params.divId));
            });
        },
        markSelected: function (container) {
            var $container = $(container);
            $container.find('.check-item').removeClass('radio-selected');
            $container.find('.check-input:checked').parents('.check-item').addClass('radio-selected');
        },
        balanceHeight: function (container) {
            var $container = $(container);
            var maxHeight = 30;
            $container.find('.check-item').each(function () {
                $(this).css('min-height', '');
                if ($(this).outerHeight() > maxHeight) {
                    maxHeight = $(this).outerHeight();
                }
            });
            $container.find('.check-item').css('min-height', maxHeight);
        },
        adjustWidth: function (container) {
            var $container = $(container);
            $container.find('.check-item').each(function () {
                var $item = $(this);
                //$item.find('.check-content').css('max-width','');
                var itemW = $item.width(),
                    radioW = $item.find('input').outerWidth() + 5,
                    imgW = $item.find('.check-icon').outerWidth() + 10,
                    textW = $item.find('.check-content').outerWidth(),
                    tipW = 25,
                    wRequired = radioW + imgW + textW + tipW + 10;
                if (itemW < (wRequired)) {
                    //
                }
            });
        }

    });

    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props) {
            if (props[name] == null) {
                target[name] = props[name];
            }
        }
        return target;
    }

    $.fn.checkItem = function (params) {
        return this.each(function () {
            if ($(this).is('.is')) {
                return;
            } else {
                $(this).addClass('is');
                var id = $(this).attr('id');
                var item = new CheckItems(params);
                item.setParams({divId: id});
                item.init();
                return item;
            }
        });
    };

})(jQuery);
var JGeneral = (function (window, $) {
    var ins = {};
    ins.doUpdateBasicInfo = function (idContainer, url, theForm) {
        if (theForm.onsubmit()) {
            var url = JCommonUtil.convertUrl(url);
            $('#' + idContainer).prepend(lyLoading());
            $.ajax({
                type: 'POST',
                url: JCommonUtil.getUrlAjax(url),
                evalScripts: true,
                data: $(theForm).serialize(),
                success: function (data) {
                    if (data) {
                        if (data.indexOf('@error:') == 0) {
                            $.quickMsg.setParams({
                                error: data.substring("@error:".length)
                            });
                        } else {
                            $('#' + idContainer).html(data);
                        }
                    }
                    removeLyLoading('#' + idContainer);
                }
            }).done(function () {
                $.quickMsg.show('msg-box');
            });
        }
    }
    ins.updateBasicInfo = function (idContainer, url, objId) {
        if ($bean.isNotEmpty(objId)) {
            var url = JCommonUtil.convertUrl(url) + "&bean.id=" + objId;
            $('#' + idContainer).prepend(lyLoading());
            $.ajax({
                url: JCommonUtil.getUrlAjax(url),
                success: function (data) {
                    if (data) {
                        if (data.indexOf('@error:') == 0) {
                            $.quickMsg.setParams({
                                error: data.substring("@error:".length)
                            });
                        } else {
                            $('#' + idContainer).html(data);
                        }
                    }
                    $.quickMsg.show('msg-box');
                    removeLyLoading('#' + idContainer);
                }
            });
        }
    }
    ins.loadBasicInfo = function (idContainer, url, objId) {
        if ($bean.isNotEmpty(objId)) {
            var url = JCommonUtil.convertUrl(url) + "&bean.id=" + objId;
            $('#' + idContainer).prepend(lyLoading());
            $.ajax({
                url: JCommonUtil.getUrlAjax(url),
                success: function (data) {
                    if (data) {
                        if (data.indexOf('@error:') == 0) {
                            $.quickMsg.setParams({
                                error: data.substring("@error:".length)
                            });
                        } else {
                            $('#' + idContainer).html(data);
                        }
                    }
                    $.quickMsg.show('msg-box');
                    removeLyLoading('#' + idContainer);
                }
            });
        }
    }

    ins.doSubmitFormClick = function (e, _thisButton, idContainer, actionUrl, idForm) {
        e.preventDefault();
        var form = null;
        if ($bean.isEmpty(idForm)) {
            form = $(_thisButton).parents('form')[0];
        } else {
            form = $('#' + idForm)[0];
        }
        if ($bean.isEmpty(form.onsubmit) || form.onsubmit()) {
            var url = form.action;
            if ($bean.isNotEmpty(actionUrl)) {
                url = JCommonUtil.convertUrl(actionUrl);
            }
            $('#' + idContainer).prepend(lyLoading());
            $.ajax({
                type: 'POST',
                url: JCommonUtil.getUrlAjax(url),
                evalScripts: true,
                data: $(form).serialize(),
                success: function (data) {
                    if (data) {
                        if (data.indexOf('@error:') == 0) {
                            $.quickMsg.setParams({
                                error: data.substring("@error:".length)
                            });
                        } else {
                            $('#' + idContainer).html(data);
                        }
                    }
                    removeLyLoading('#' + idContainer);
                }
            }).done(function () {
//                $.quickMsg.show('msg-box');
                $.quickMsg.show(idContainer);
            });
        }
    }
    ins.loadAjax = function (url, idContainer) {
        $('#' + idContainer).prepend(lyLoading());
        $.ajax({
            type: 'POST',
            url: JCommonUtil.getUrlAjax(url),
            data: $(form).serialize(),
            success: function (data) {
                if (data) {
                    if (data.indexOf('@error:') == 0) {
                        $.quickMsg.setParams({
                            error: data.substring("@error:".length)
                        });
                    } else {
                        $('#' + idContainer).html(data);
                    }
                }
            }
        }).done(function () {
            removeDirectChildrenLoading('#' + idContainer);
            $.quickMsg.show('msg-box');
        });
    }

    ins.performFocusBox = function (idTarget) {
        if (!$('#' + idTarget).find('.icon').hasClass("open")) {
            $('#' + idTarget).find('.icon').click();
        }
    }

    ins.doSubmitFormClickCheck = function (e, _thisButton, idContainer, actionUrl, idForm, checkFunc) {
        e.preventDefault();
        if ($.isFunction(checkFunc)) {
            if (!checkFunc()) {
                return false;
            }
        }
        ins.doSubmitFormClick(e, _thisButton, idContainer, actionUrl, idForm);
    }
    // init drop select list
    ins.initDropSelectList = function (option) {
        var container = option.dropBox;
        if (container.length > 0) {
            //build dropbox
            var containerWidth = container.width();
            var name = container.attr('data-drop-name');
            if ($bean.isNotEmpty(name)) {
                var a = '<a>' + name + '<span class="h-arrow-down"></span></a>'
                container.append(a);
                container.addClass('h-drop-box');
            }
            //build drop menu
            if (!isNaN(container.attr('data-drop-end')) && !isNaN(container.attr('data-drop-start'))) {
                var start = parseInt(container.attr('data-drop-start'));
                var end = parseInt(container.attr('data-drop-end'));
                var dropmenu = '<div class="h-drop-menu user-select-none">';
                $(dropmenu).width(containerWidth);
                var step = container.attr('data-drop-step');
                var order = start > end ? 'DESC' : "ASC";
                step = JCommonUtil.isDigit(step) ? (order == 'DESC' && step > 0 ? 0 - parseInt(step) : parseInt(step)) : (order == 'DESC' ? -1 : 1);
                var item = $bean.isNotEmpty(container.attr('data-drop-type')) ? container.attr('data-drop-type') : 'span';
                for (var i = start; order.toUpperCase() == 'DESC' ? i >= end : i <= end; i = i + step) {
                    dropmenu += '<' + item + ' class="h-drop-item" onclick="JGeneral.showChecked(this)">' + i
                    + '<span class="h-drop-item-checked"></span>'
                    + '<input type="checkbox" class="h-drop-checkbox" '
                    + 'id="' + i + '"/>'
                    + '</' + item + '>';
                }
                dropmenu += '</div>';
                container.append($(dropmenu));
                option.containerItem = container.find('.h-drop-menu');
            }
            JGeneral.initDropMenu(option);
        }
    }
    ins.initDropMenu = function (option) {
        var dropBox = option.dropBox;
        var containerItem = option.containerItem;
        if ($bean.isNotEmpty(containerItem)) {
            dropBox.bind(myClickHandler, function () {
                if (containerItem.is(':visible')) {
                    containerItem.hide();
                    if (option.clickItem) {
                        containerItem.find('input[class="h-drop-checkbox"]').each(function (index) {
                            option.clickItem(this);
                        });
                    }
                } else {
                    containerItem.show();
                }
                return false;
            });
            containerItem.bind(myClickHandler, function () {
                return false
            });
            $(window).bind(myClickHandler, function () {
                if (containerItem.is(':visible')) {
                    containerItem.hide();
                    if (option.clickItem) {
                        containerItem.find('input[class="h-drop-checkbox"]').each(function () {
                            option.clickItem(this);
                        });
                    }
//                    containerItem.find('input[class="h-drop-checkbox"]').each(function () {
//                        JAssessment.showEmployeeAssessment(this);
//                    });
                }
            });
            if (option.selectAll == true) {
                containerItem.find('.h-drop-item').each(function () {
                    $(this).click();
                    option.clickItem($(this).find('input'));
                });
            }
        }
    }
    ins.showChecked = function (element) {
        var checked = $(element).find('.h-drop-item-checked');
        var input = $(element).find('input[type="checkbox"]');
        if (checked.is(':visible')) {
            $(input).val(false);
            checked.hide();
        } else {
            $(input).val(true);
            checked.show();
        }
    }
    ins.resizeDropBox = function () {
        var dropmenu = $('.h-drop-menu');
        var dropBox = $('.h-drop-box');
        if ($bean.isNotEmpty(dropmenu) && $bean.isNotEmpty(dropBox)) {
            dropmenu.width(dropBox.width() + 4);
        }
    }
    return ins;
})(window, jQuery);