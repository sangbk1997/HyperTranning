var $roles = {
    'download-file': {
        events: {
            click: function (e, $target) {
                var resourceUri = $target.attr('resource-uri');
                var isConfirm = $target.attr('is-confirm');
                if (isConfirm == 'yes') {
                    JCommonUtil.confirm({isYes: function () {
                        $dbs.downloadFile(resourceUri, {});
                    }});
                } else {
                    $dbs.downloadFile(resourceUri, {});
                }
            }
        }
    },
    'cancel-click': {
        events: {
            click: function (e, $target) {
                e.stopPropagation();
                e.preventDefault();
            }
        }
    },
    'toggle-dialog': {
        events: {
            click: function (e, $target) {
                if ($target.hasClass('disabled')) {
                    return false;
                }
                var targetId = $target.attr('target-id');
                var $dialog, $targets;
                if (targetId) {
                    $dialog = $('*[script-role~="dialog"][target-id="' + targetId + '"]');
                    $targets = $('*[script-role~="toggle-dialog"][target-id="' + targetId + '"]');
                } else {
                    $dialog = $target.closest('*[script-role~="group"]').find('*[script-role~="dialog"]');
                    $targets = $target.closest('*[script-role~="group"]').find('*[script-role~="toggle-dialog"]');
                }
                var move = false;
                var scriptRoles = $targets.attr('script-role');
                if (!$target.hasClass('active') || scriptRoles.indexOf('move') != -1) {
                    $view.DIALOG.hideAllDialog($target);
                    if ($dialog.hasClass('pos-auto')) {
                        $dialog.css('visibility', 'hidden');
                        $dialog.removeClass('hide');
                        $dialog.addClass('active');
                        $target.addClass('active');
                        JCommonUtil.showPos($dialog, $dialog.closest('pos-parent'), $target.offset().left, $target.offset().top, $target.outerHeight(true) + JCommonUtil.COMMON_ELEMENT_PADDING, 0, 0);
                        $dialog.css('visibility', 'visible');
                    } else {
                        $dialog.addClass('active');
                        $dialog.removeClass('hide');
                    }
                    $targets.addClass('active');
                    $dialog.focus();
                    $dialog.find('.sub-menu:visible').hide();
                    $roles.functions.onShowContent($dialog);
                    $view.LAYOUT.afterShowLayout($dialog);
                } else {
                    var flag = ($(e.target).closest('.no-action-hide').length > 0)
                        || ($(e.target).parents('*[script-role="dialog-ctrl"]').length > 0);
                    if (!flag || $(e.target).hasClass('action')) {
                        $dialog.removeClass('active');
                        $targets.removeClass('active');
                        $dialog.addClass('hide');
                    }
                    $view.LAYOUT.afterHideLayout($dialog);
                }
            }
        }
    },
    'sub-dialog': {
        events: {
            click: function (e, $target) {
                if ($target.hasClass('disabled')) {
                    return false;
                }
                var current = $target.next();
                var grandparent = $target.parent().parent();
                grandparent.find(".sub-menu:visible").not(current).hide();
                current.toggle();
                e.stopPropagation();
            }
        }
    },
    'toggle-show-hide': {
        events: {
            click: function (e, $target) {
                if ($target.hasClass('disabled')) {
                    return false;
                }
                var targetId = $target.attr('target-id');
                var $div, $targets;
                if (targetId) {
                    $div = $('*[script-role~="show-hide"][target-id="' + targetId + '"]');
                    $targets = $target;
                } else {
                    $div = $target.closest('*[script-role~="group"]').find('*[script-role~="show-hide"]');
                    $targets = $target.closest('*[script-role~="group"]').find('*[script-role~="toggle-show-hide"]');
                }
                $targets.each(function () {
                    var show = $(this).hasClass('s-show');
                    var changeChevronShow = show;
                    if ($(this).hasClass('hyd-reverse')) {
                        changeChevronShow = !changeChevronShow;
                    }
                    if (changeChevronShow) {
                        $(this).find('.fa-chevron-right').toggleClass('fa-chevron-down').toggleClass('fa-chevron-right');
                        $(this).find('.fa-caret-down').toggleClass('fa-caret-right').toggleClass('fa-caret-down');
                    } else {
                        $(this).find('.fa-chevron-down').toggleClass('fa-chevron-down').toggleClass('fa-chevron-right');
                        $(this).find('.fa-caret-right').toggleClass('fa-caret-right').toggleClass('fa-caret-down');
                    }
                    $(this).toggleClass('s-show');
                    var showTitle = $(this).attr('show-title');
                    if (showTitle) {
                        var hideTitle = $(this).attr('hide-title');
                        var $text = $(this).find('.text');
                        if ($(this).hasClass('text')) {
                            $text.push(this);
                        }
                        if ($(this).hasClass('s-show')) {
                            $text.text(hideTitle);
                        } else {
                            $text.text(showTitle);
                        }
                    }
                });
                $div.each(function () {
                    var $item = $(this);
                    if ($item.hasClass('expand')) {
                        $item.toggleClass('in');
                    } else {
                        $item.toggleClass('hide');
                    }
                })
            }
        }
    },
    'f-remove': {
        events: {
            click: function (e, $target) {
                if ($target.hasClass('disabled')) {
                    return false;
                }
                var targetId = $target.attr('target-id');
                var $div;
                if (targetId) {
                    $div = $('*[script-role~="e-remove"][target-id="' + targetId + '"]');
                } else {
                    $div = $target.closest('*[script-role~="e-remove"]');
                }
                if ($div.hasClass('ac-confirm')) {
                    JCommonUtil.confirm({isYes: function () {
                        $div.remove();
                    }});
                } else {
                    $div.effect("fade", JCommonUtil.ANIMATE_SHOW_HIDE_TIME, function () {
                        $div.remove();
                    });
                }
            }
        }
    },
    'tab-switch': {
        events: {
            click: function (e, $target) {
                var tabindex = $target.attr('tab-index');
                var level = null;
                var $tabheads, $tabcontents;
                if ($target.hasClass('disabled') || $bean.isEmpty(tabindex)) {
                    return false;
                }
                if ($target.attr('tab-level') != null) {
                    level = $target.attr('tab-level');
                }
                if (level != null) {
                    $tabheads = $target.closest('[script-role~="tab"]').find('*[tab-index][script-role~="tab-switch"][tab-level~=' + level + ']');
                    $tabcontents = $target.closest('[script-role~="tab"]').find('*[tab-index][script-role~="tab-content"][tab-level~=' + level + ']');
                } else {
                    $tabheads = $target.closest('[script-role~="tab"]').find('*[tab-index][script-role~="tab-switch"]');
                    $tabcontents = $target.closest('[script-role~="tab"]').find('*[tab-index][script-role~="tab-content"]');
                }
                if (!$target.hasClass('active')) {
                    $tabheads.each(function () {
                        if ($(this).hasClass('itab-head')) {
                            $(this).removeClass('active');
                        }
                        else if ($(this).closest('.itab-head').length > 0) {
                            $(this).closest('.itab-head').removeClass('active');
                        }
                    });
                    if ($target.hasClass('itab-head')) {
                        $target.addClass('active');
                    } else if ($target.closest('.itab-head').length > 0) {
                        $target.closest('.itab-head').removeClass('active').addClass('active');
                    }
                }
                $tabcontents.each(function () {
                    if ($(this).attr('tab-index') == tabindex) {
                        $(this).removeClass('in').removeClass('active').removeClass('fade');
                        $(this).addClass('in').addClass('active').addClass('fade');
                    } else {
                        $(this).removeClass('in').removeClass('active').removeClass('fade');
                        $(this).addClass('fade');
                    }
                });
            }
        }
    },
    functions: {
        onShowContent: function ($content) {
            var $selectAll = $content.find('[on-show="select-all"]');
            $selectAll.focus();
            $selectAll.select();
        }
    }
};