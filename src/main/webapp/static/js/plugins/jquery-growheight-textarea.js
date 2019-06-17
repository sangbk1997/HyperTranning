/*
 * http://www.jscripts.info/jtextarea.php
 *
 * Copyright 2011, Gianrocco Giaquinta
 * http://www.jscripts.info/
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 $().ready(function() {
 $('#yourtextarea').jtextarea();
 })
 // to get textarea content in plain text
 $('#yourtextarea').val();
 *
 */

(function ($) {
    var lastval = "", lexe = false;
    var tags = "";
    var methods = {
        resize: function (char, ctl) {
            var re_nl = null;
            var ch = String.fromCharCode(char);
            var st = ctl.val();
            lastval = st;
            st = st.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
            var text = escape(st);
            if (text.indexOf('%0D%0A') > -1) {
                re_nl = /%0D%0A/g;
            } else if (text.indexOf('%0A') > -1) {
                re_nl = /%0A/g;
            } else if (text.indexOf('%0D') > -1) {
                re_nl = /%0D/g;
            }
            if (re_nl) st = unescape(text.replace(re_nl, '<br />&#00;'));
            if (char == 13) st += "<br />&#00;";
            jt_obj.html(st + ch);
            var h = parseInt(jt_obj.height()) + 8;//Cộng 8 do padding-bottom và padding-top bằng 4
            ctl.css({ height: h + "px" });
            setTimeout(function () {
                methods.ctrltag(ctl);
            }, 0);
        },
        ctrltag: function (ctl) {
            if (!tags) return;
            var st = ctl.val();
            var ct = st.match(/<[^\/](.*?)>/ig);
            for (var i in ct) {
                var tag = "<" + /\w+/.exec(ct[i]) + ">";
                if ((tags[0] == "!" && tags.indexOf(tag) != -1) || (tags[0] != "!" && tags.indexOf(tag) == -1)) {
                    alert(tag + " not permitted. ");
                    ctl.val(st.replace(ct[i], ""));
                    methods.resize(null, ctl);
                    break;
                }
            }
        }
    }

    $.fn.growHeight = function (opt, minHeight) {
        if($bean.isNotEmpty($(this).parents('.prettyPopin'))){
            var _this = this;
            (function (height) {
                JEvent.registerPopinDone('growHeight', function () {
                    $(_this).growHeight(opt, height);
                },true);
            })($(_this).height());
        }

        var hmin = 0;
        var settings = {
            tags: ""
        };
        if (opt) $.extend(settings, opt);
        jt_obj = $('<div id="jt_clone_area"></div>').css({display: 'none'}).appendTo('body')
        this.each(function () {
            $(this).css({overflow: "hidden", resize: "none" });
            hmin = $bean.isNotEmpty(minHeight) ? minHeight : $(this).height();

            $(this)
                .keypress(function (e) {
                    lexe = true;
                    methods.resize(e.keyCode, $(this));
                })
                .keyup(function (e) {
                    if (!lexe) {
                        if (lastval != $(this).val()) {
                            jt_obj.css({"min-height": hmin + 'px'});
                            methods.resize(null, $(this));
                        }
                    }
                    lexe = false;
                });

            $(this).bind("paste", function (e) {
                lexe = false;
                var ctl = $(this);
                setTimeout(function () {
                    methods.resize(null, ctl);
                }, 0);
            });

            $(this).bind("cut", function (e) {
                lexe = false;
                jt_obj.css({"min-height": hmin + 'px'});
                var ctl = $(this);
                setTimeout(function () {
                    methods.resize(null, ctl);
                }, 0);
            });

            $(this).focus(function (e) {
                e.preventDefault();
                tags = settings.tags;
                var w = $(this).width();
                var st = [];
                var styles = null;
                if (window.getComputedStyle) {
                    styles = window.getComputedStyle(this, null);
                    for (var i in styles) {
                        if (/:/i.test(styles[i])) {
                            st = styles[i].match(/font[^;]+/ig);
                            var le = styles[i].match(/line-height[^;]+/ig);
                            if (le) st.push(le[0]);
                            break;
                        }
                        ;
                    }
                    ;
                } else {
                    styles = this.currentStyle;
                    for (var i in styles) {
                        if (i.substr(0, 4) == "font")
                            st.push(i + ": " + styles[i]);
                        if (i == "lineHeight") st.push(i + ": " + styles[i]);
                    }
                    ;
                }
                if (st) {
                    for (var i in st) {
                        var na = st[i].split(":");
                        jt_obj.css(na[0], na[1]);
                    }
                }
                jt_obj.css({width: w + 'px', "min-height": hmin + "px"});
                methods.resize(null, $(this));

            });
            var w = $(this).width();
            var st = [];
            var styles = null;
            if (window.getComputedStyle) {
                styles = window.getComputedStyle(this, null);
                for (var i in styles) {
                    if (/:/i.test(styles[i])) {
                        st = styles[i].match(/font[^;]+/ig);
                        var le = styles[i].match(/line-height[^;]+/ig);
                        if (le) st.push(le[0]);
                        break;
                    }
                    ;
                }
                ;
            } else {
                styles = this.currentStyle;
                for (var i in styles) {
                    if (i.substr(0, 4) == "font")
                        st.push(i + ": " + styles[i]);
                    if (i == "lineHeight") st.push(i + ": " + styles[i]);
                }
                ;
            }
            if (st) {
                for (var i in st) {
                    var na = st[i].split(":");
                    jt_obj.css(na[0], na[1]);
                }
            }
            jt_obj.css({width: w + 'px', "min-height": hmin + "px"});
            methods.resize(null, $(this));
        });
    }
})(jQuery);