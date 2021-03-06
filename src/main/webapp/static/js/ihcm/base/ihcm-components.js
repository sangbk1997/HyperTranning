// tất cả các thành phần của thư viện hyd
// các thành phần như: dbs, bean, widget... đã được tách ra các file riêng để dễ quản lý
var $domWatcher = {
    _default: {
        targets: {}
    },
    targets: {},
    init: function (configs) {
        $bean.extend($domWatcher, configs);
    },
    watchAttr: function (scope, element, attrs, attrName, onChange) {
        scope.$watch(
            function () {
                // domWatcher: Attribute
                return element.attr(attrName);
            },
            function (newValue, oldValue) {
                onChange(scope, element, attrs, newValue, oldValue);
            }
        );
    },
    watchCSSClass: function (scope, element, attrs, onChange) {
        scope.$watch(
            function () {
                // domWatcher: Attribute
                return element.attr('class');
            },
            function (newValue, oldValue) {
                onChange(scope, element, attrs, newValue, oldValue);
            }
        );
    },
    watchVal: function (scope, element, attrs, onChange) {
        scope.$watch(
            function () {
                return $(element).val();
            },
            function (newValue, oldValue) {
                onChange(scope, element, attrs, oldValue);
            }
        );
    },
    watchText: function (scope, element, attrs, onChange) {
        scope.$watch(
            function () {
                return $(element).text();
            },
            function (newValue, oldValue) {
                onChange(scope, element, attrs, oldValue);
            }
        );
    },
    watchHtml: function (scope, element, attrs, onChange) {
        scope.$watch(
            function () {
                return $(element).html();
            },
            function (newValue, oldValue) {
                onChange(scope, element, attrs, newValue, oldValue);
            }
        );
    },
    watchPlaceholder: function (scope, element, attrs, onChange) {
        scope.$watch(
            function () {
                return $(element).attr('placeholder');
            },
            function (newValue, oldValue) {
                onChange(scope, element, attrs, newValue, oldValue);
            }
        );
    }
};
//
// $domWatcher.init({
//     targets: $ihcmAppConfigs.domWatcher
// });

var $locale = {
    objMapKey: {
        'ihcm.audit': 'audit'
    },
    _typeDateDefault: ['fromDate', 'toDate', 'startDate', 'dueDate', 'completeDate', 'createdDate', 'modifiedDate'],
    labels: {},
    getFieldLabels: function (entityFullPath, fieldName) {
        var key = '', index = 0;
        if ($bean.isEmpty(entityFullPath)) {
            key = 'ihcm.' + $locale.objMapKey[entityFullPath] + '.' + fieldName;
        } else {
            key = 'ihcm.' + fieldName;
            if (fieldName.indexOf('GoalWorking.') != -1) {
                index = fieldName.split('.').length - 1;
                key = 'ihcm.goal.working.' + fieldName.split('.')[index];
            }
            if (fieldName.indexOf('Goal.') != -1) {
                index = fieldName.split('.').length - 1;
                var prop = fieldName.split('.')[index];
                if (prop == 'published') {
                    key = 'ihcm.goal.audit.' + prop;
                } else {
                    key = 'ihcm.goal.' + prop;
                }
            }
            if (fieldName.indexOf('GoalTracking.') != -1) {
                index = fieldName.split('.').length - 1;
                key = 'ihcm.goal.tracking.' + fieldName.split('.')[index];
            }
            if (fieldName.indexOf('GoalAttachment.') != -1) {
                index = fieldName.split('.').length - 1;
                key = 'ihcm.goal.attachment.' + fieldName.split('.')[index];
            }
        }
        if ($bean.isEmpty($locale[key])) {
            $locale[key] = JCommonUtil.message(key, 'ihcm');
        }
        return $locale[key];
    },
    filterTypes: function (obj, params) {
        var options = $bean.extend(params, {date: $locale._typeDateDefault});
        var prop, date;
        if ($bean.isPlainObject(obj)) {
            for (prop in obj) {
                if (options.date.indexOf(prop) != -1) {
                    date = new Date(obj[prop]);
                    obj[prop + '_l'] = date.getTime();
                    obj[prop + '_s'] = JDateUtil.toString(date);
                }
            }
        }
    }
};

var $garbage = {
    optimalDataSize: 10 * 1024 * 1024
};

var $functions = {
    eval: function (func) {
        if ($bean.isFunction(func)) {
            return func();
        }
    }
};

var $process = {
    _defaultIntervalProcess: 150,
    _quickProcess: 100,
    _slowProcess: 500,
    setInterval: function (processId, time) {
        $process[processId].$interval = setInterval(function () {
            $process[processId].status = 1;
        }, time || $process._defaultIntervalProcess);
    },
    clearAllInterval: function () {
        clearInterval($process.process01.$interval);
        clearInterval($process.process02.$interval);
        clearInterval($process.process03.$interval);
        clearInterval($process.process04.$interval);
        clearInterval($process.process05.$interval);
        clearInterval($process.process06.$interval);
    },
    thrustProcess: function (func, processId) {
        processId = processId || 'process0';
        if ($process[processId].status == 1) {
            $functions.eval(func);
            $process[processId].status = 0;
        }
    },
    process0: {status: 0, $interval: undefined, time: 150},
    process01: {status: 0, $interval: undefined},
    process02: {status: 0, $interval: undefined},
    process03: {status: 0, $interval: undefined},
    process04: {status: 0, $interval: undefined},
    process05: {status: 0, $interval: undefined},
    process06: {status: 0, $interval: undefined}
};

var $logs = {
    clickId: null,
    setClickId: function (clickId) {
        if ($bean.isEmpty(clickId)) {
            return;
        }
        $logs.clickId = clickId;
    }, flushClickId: function () {
        var clickId = $logs.clickId;
        if ($bean.isEmpty(clickId)) {
            return '';
        }
        $logs.clickId = null;
        return clickId;
    }
};

var $modules = {};

var JInit = (function (window, $) {
    var ins = {};
    ins.registerRoles = function () {
        var role;
        for (role in $roles) {
            ins.registerRole(role);
        }
    }
    ins.registerRole = function (role) {
        $(document).on('click', '*[script-role~="' + role + '"]', function (e) {
            $functions.eval($roles[role].events.click(e, $(this)));
        });
    }
    return ins;
})(window, jQuery);

var JHtmlComponent = (function (window, $) {
    var ins = {};
    ins.DATA_TOGGLE = 'data-toggle';
    ins.DATA_TOGGLE_ID = 'data-toggle-id';
    ins.TOGGLE_ID = 'toggle-id';
    ins.SHOW_FLOAT = 'show-float';
    ins.TOGGLE_CLASS = 'toggle-class';
    ins.FLY_CLASS = 'i-fly';
    ins.FLY_ACTION_CLASS = 'i-fly-action';
    ins.I_BUTTON_GROUP = 'i-btn-group';
    ins.DROP_DOWN = 'i-dropdown';
    ins.DROP_DOWN_TOGGLE = '[data-toggle="i-dropdown"]';
    ins.COLOR_PICK = 'i-color-pick';
    ins.COLOR_PICK_TOGGLE = '[data-toggle="i-color-pick"]';
    ins.COLOR_PICK_MENU_CLASS = 'i-color-pick-menu';
    ins.COLOR_PICK_SWATCH_CLASS = 'i-color-pick-swatch';
    ins.COLOR_PICK_SWATCH_WRAPPER_CLASS = 'i-color-pick-swatch-wrapper';
    ins.COLOR_PICK_VAL_CLASS = 'i-color-pick-val';
    ins.COLOR_PICK_VAL_ATTR = 'color-val';
    ins.COLOR_PICK_SELECT_CLASS = 'i-color-pick-select';
    ins.COLOR_PICK_SWATCH_SELECT_CLASS = 'i-color-pick-swatch-select';
    ins.IG_DROP_DOWN_TOGGLE = '[input-toggle="i-dropdown"]';
    ins.IG_INPUT_GROUP_CLASS = 'i-input-group';
    ins.IG_NO_ACTION_INPUT_GROUP_CLASS = 'no-action-input-group';
    ins.IG_INPUT_VAL_CLASS = 'i-input-val';
    ins.IG_RESULT_VAL_CLASS = 'i-result-val';
    ins.IG_INPUT_GROUP_BTN_CLASS = 'i-input-group-btn';
    ins.IG_INPUT_GROUP_HIDDEN_CLASS = 'i-input-group-hidden';
    ins.IG_INPUT_GROUP_LABEL_CLASS = 'i-input-group-label';
    ins.IG_INPUT_DROPDOWN_CLASS = 'i-input-dropdown';
    ins.IG_INPUT_DROPDOWN_ITEM_CLASS = 'i-input-dropdown-item';
    ins.IG_MUL_CODE_CLASS = 'i-mul-code';
    ins.IG_MUL_NAME_CLASS = 'i-mul-name';
    ins.IG_MUL_VALUE_CLASS = 'i-mul-value';
    ins.IG_BLOCK_CLOSE_CLASS = 'i-fly-no-close';
    ins.IG_BLOCK_SHOW_CLASS = 'i-fly-no-auto-hide';
    ins.DISABLE = 'disable';
    ins.ACTIVE = 'active';
    ins.OPEN = 'open';
    ins.CLOSE = 'close';
    ins.HYP_TAB_CONTAINER_CLASS = 'hyp-tab-container';
    ins.HYP_TABS_CLASS = 'hyp-tabs';
    ins.HYP_TAB_CLASS = 'hyp-tab';
    ins.HYP_TAB_CONTENTS_CLASS = 'hyp-tab-contents';
    ins.HYP_TAB_CONTENT_CLASS = 'hyp-tab-content';
    ins.ATTR_VIEW_SIZE = 'view-size';
    ins.MAX_WIDTH = 'maxWidth';
    ins.MIN_WIDTH = 'minWidth';
    ins.STYLE_CLASS = 'styleClass';
    ins.DIALOG_SIZE_1 = 1;
    ins.DIALOG_SIZE_2 = 2;
    ins.DIALOG_SIZE_LARGEST = 0;
    ins.RESIZE_DIALOG_WIDTH_1 = 640;
    ins.RESIZE_DIALOG_WIDTH_2 = 750;
    ins.RESIZE_DIALOG_PADDING = 32;
    ins.CATEGORY_UNIT = null;
    ins.SCRIPT_ROLE_GROUP = '[script-role~="group"]';
    ins.SCRIPT_ROLE_TOGGLE_SHOW_HIDE = '[script-role~="toggle-show-hide"]';
    ins.SCRIPT_ROLE_BTN_TOGGLE_SHOW_HIDE = '[script-role~="btn-toggle-show-hide"]';
//    ins.snapper = null;
    ins.registerAlert = function () {
        $(document).on('mouseenter', '.ui-dialog', function (e) {
            var $dialog = $(this);
            if ($dialog.hasClass('auto-hide')) {
                ins.holdAlert = true;
            }
        });
        $(document).on('mouseleave', '.ui-dialog', function (e) {
            var $dialog = $(this);
            if ($dialog.hasClass('auto-hide')) {
                ins.holdAlert = false;
                ins.delayRemoveAlert($dialog);
            }
        });
    }
    ins.holdAlert = false;
    ins.registerExtendConfirm = function () {
        jQuery.extend({
            confirm: function (message, title, yesTitle, noTitle) {
                message = message || JCommonUtil.message('msg.question');
                title = title || JCommonUtil.message('common.confirm');
                var d = jQuery.Deferred();
                jQuery("<div></div>").dialog({
                    modal: true,
                    draggable: false,
                    dialogClass: 'pos-fixed fixed-top message-confirm',
                    position: ['center', 'top'],
                    closeOnEscape: false,
                    open: function (event, ui) {
                        if ($('.prettyPopin').length > 0) {
                            $('.ui-dialog').css('z-index', 12002);
                            $('.ui-widget-overlay').css('z-index', 12001);
                        }
                    },
                    close: function (event, ui) {
                        $(this).parents('.ui-dialog').remove();
                    },
                    buttons: [
                        {
                            text: yesTitle || JCommonUtil.message("common.yes", "common"),
                            class: 'btn',
                            click: function () {
                                jQuery(this).dialog("close");
                                d.resolve(true);
                                return true;
                            }
                        },
                        {
                            text: noTitle || JCommonUtil.message("common.none", "common"),
                            class: 'btn btn-secondary',
                            click: function () {
                                jQuery(this).dialog("close");
                                d.resolve(false);
                                return false;
                            }
                        }
                    ],
                    resizable: false,
                    title: title,
                    modal: true
                }).html(message);
                return d.promise();
            }, alert: function (message, title, messageType, autoHide, messageOnly) {
                var messageClass = ' message-alert';
                var timeOut = 3000;
                if ($bean.isNotEmpty(messageType)) {
                    if (messageType == JCommonUtil.MESSAGE_TYPE_ERROR) {
                        title = title || JCommonUtil.message('common.mesage.warning.title', 'common');
                        message = message || JCommonUtil.message('error.undefined', 'error');
                        timeOut = 5000;
                    } else if (messageType == JCommonUtil.MESSAGE_TYPE_INFO) {
                        title = title || JCommonUtil.message('common.info', 'common');
                    } else if (messageType == JCommonUtil.MESSAGE_TYPE_WARNING) {
                        title = title || JCommonUtil.message('common.mesage.warning.title', 'common');
                    } else if (messageType == JCommonUtil.MESSAGE_TYPE_SUCCESS) {
                        title = title || JCommonUtil.message('common.mesage.success.title', 'common');
                        message = message || JCommonUtil.message('common.mesage.success.title', 'common');
                    } else if (messageType == JCommonUtil.MESSAGE_TYPE_PUSH) {
                        //
                        timeOut = 5000;
                    }
                    if (messageType == JCommonUtil.MESSAGE_TYPE_PUSH) {
                        messageClass += ' pos-fixed fixed-bottom-left';
                    } else {
                        messageClass += ' pos-fixed fixed-top';
                    }
                    messageClass += ' message-' + messageType;
                } else {
                    message = message || JCommonUtil.message('msg.question');
                }
                if (autoHide) {
                    messageClass += ' auto-hide';
                }
                title = title || JCommonUtil.message('common.alert', 'common');
                if (messageOnly) {
                    messageClass += ' toastr';
                    title = message;
                }
                var d = jQuery.Deferred();
                jQuery("<div></div>").dialog({
                    modal: true,
                    draggable: false,
                    dialogClass: messageClass,
                    position: ['center', 'top'],
                    closeOnEscape: false,
                    show: 'fadeIn',
                    open: function (event, ui) {
                        $('.ui-widget-overlay').remove();
                        JEvent.windowResize();
                        setTimeout(function () {
                            JEvent.windowResize();
                        }, 100);
                        if (autoHide) {
                            var $dialog = $(this).parents('.ui-dialog');
                            $dialog.attr('time-out', timeOut);
                            ins.delayRemoveAlert($dialog);
                        }
                        if ($('.prettyPopin').length > 0) {
                            $('.ui-dialog').css('z-index', 13502);
                            $('.ui-widget-overlay').css('z-index', 13501);
                        }
                    },
                    close: function (event, ui) {
                        $(this).parents('.ui-dialog').remove();
                    },
                    buttons: [
                        {
                            text: JCommonUtil.message("common.close", "common"), click: function () {
                            jQuery(this).dialog("close");
                            d.resolve(true);
                            return true;
                        }
                        }
                    ],
                    resizable: false,
                    title: title,
                    modal: true
                }).text(message);
                return d.promise();
            }
        });
    }
    ins.delayRemoveAlert = function ($dialog) {
        setTimeout(function () {
            if (!ins.holdAlert) {
                $dialog.fadeOut(300, function () {
                    $dialog.remove();
                });
            }
        }, parseInt($dialog.attr('time-out')));
    }
    ins.registerFlyComponents = function () {
        $(document).click(function (event) {
            var $targetClick = $(event.target);
            if ($bean.isNotEmpty($targetClick.closest('.' + ins.IG_BLOCK_CLOSE_CLASS))) {
                return;
            }
            if ($bean.clickCheckInsideException($targetClick)) {
                return;
            }
            if ($targetClick.closest('.ui-dialog.message-alert').length == 0) {
                var $dialogMessageAlert = $('.ui-dialog.message-alert');
                if ($dialogMessageAlert.length > 0) {
                    var triggerFocus = false;
                    $dialogMessageAlert.each(function () {
                        if ($(this).is(':visible') && $(this).css('opacity') != 0) {
                            $(this).remove();
                            triggerFocus = true;
                        }
                    });
                    if (triggerFocus && $targetClick.is('input')) {
                        $targetClick.focus();
                    }
                }
            }
            ins.resetFlyComponents();
        });
    }
    ins.resetFlyComponents = function (resetPos) {
        $('.' + ins.FLY_CLASS + ':visible').hide();
        $('.i-box-hide-toggle').hide();
        $('.i-fly').removeClass('i-fly-dialog');
        if (resetPos) {
            $('.' + ins.FLY_CLASS).each(function () {
                var showFloat = $(this).attr(ins.SHOW_FLOAT);
                if ($bean.isEmpty(showFloat)) {
                    $(this).css('top', 'auto');
                    $(this).css('right', 'auto');
                    $(this).css('bottom', 'auto');
                    $(this).css('left', 'auto');
                }
            });
        }
        $('.' + ins.I_BUTTON_GROUP + '.goal-actions').parent().css('z-index', 3);
    }
    ins.registerDropDown = function () {
        var $dropDownMenu, $dropDownTarget, isShow;
        $(document).on('click', '.i-btn-hide-toggle' + ins.DROP_DOWN_TOGGLE, function (e) {
            e.stopPropagation();
            $dropDownMenu = $(this).parents('.' + ins.I_BUTTON_GROUP).find('.i-box-hide-toggle');
            isShow = $dropDownMenu.is(':visible');
            ins.resetFlyComponents();
            if (!isShow) {
                $dropDownMenu.show();
            }
        });
        $(document).on('click', '.' + ins.I_BUTTON_GROUP + '[data-component="multi-select"] .multi-select-item', function (e) {
            var $btnGroup = $(this).parents('.' + ins.I_BUTTON_GROUP);
            $btnGroup.find('.multi-select-result').text(JCommonUtil.message('ihcm.drop.down.multi.select.result', 'ihcm', $btnGroup.find('.multi-select-item:checked').length + ''));
        });
        $('.' + ins.I_BUTTON_GROUP).each(function () {
            if ($(this).attr('data-component') == 'multi-select') {
                $(this).find('.multi-select-result').text(JCommonUtil.message('ihcm.drop.down.multi.select.result', 'ihcm', $(this).find('.multi-select-item:checked').length + ''));
            }
        });
    }
    ins.registerColorPick = function () {
        var $colorPick, color, isShow;
        $(document).on('click', '.' + ins.FLY_ACTION_CLASS + ins.COLOR_PICK_TOGGLE, function (e) {
            e.stopPropagation();
            $colorPick = $(this).parent().find('.' + ins.COLOR_PICK_MENU_CLASS);
            isShow = $colorPick.is(':visible');
            $('.' + ins.FLY_CLASS).hide();
            if (!isShow) {
                $colorPick.show();
            }
        });
        $(document).on('click', '.' + ins.COLOR_PICK_SWATCH_WRAPPER_CLASS, function () {
            color = $(this).find('.' + ins.COLOR_PICK_SWATCH_CLASS).attr(ins.COLOR_PICK_VAL_ATTR);
            $(this).parent().parent().find('.' + ins.COLOR_PICK_VAL_CLASS).val(color);
            $(this).parent().parent().find('.' + ins.COLOR_PICK_SELECT_CLASS).attr(ins.COLOR_PICK_VAL_ATTR, color);
            $(this).parent().parent().find('.' + ins.COLOR_PICK_SWATCH_SELECT_CLASS).css('background-color', color);
            $(this).parent().find('.' + ins.COLOR_PICK_SWATCH_WRAPPER_CLASS).removeClass('selected');
            $(this).addClass('selected');
        });
    }
    ins.registerInputGroupDropDown = function () {
        var $inputGroup, $inputVal, $resultVal, $inputGroupBtn, $inputGroupHidden, $btnToggle, $inputGroupLabel, $droupDownMenu, $inputSelectItem, isShow, $mulCode, $mulName, $mulValue;
        $('.' + ins.IG_INPUT_GROUP_BTN_CLASS).each(function () {
            $inputGroupBtn = $(this);
            $inputGroupLabel = $inputGroupBtn.find('.' + ins.IG_INPUT_GROUP_LABEL_CLASS);
            $mulValue = $inputGroupBtn.find('.' + ins.IG_MUL_VALUE_CLASS);
            $mulValue.val($inputGroupLabel.attr('value'));
        });
        $(document).on('click', '.' + ins.IG_INPUT_GROUP_CLASS + ' .' + ins.FLY_ACTION_CLASS + ins.IG_DROP_DOWN_TOGGLE + ':not(.' + ins.DISABLE + ')', function (e) {
            e.stopPropagation();
            $droupDownMenu = $(this).parent().find('.' + ins.IG_INPUT_DROPDOWN_CLASS);
            isShow = $droupDownMenu.is(':visible');
            ins.resetFlyComponents();
            if (!isShow) {
                if ($droupDownMenu.attr(ins.SHOW_FLOAT) == 'left') {
                    $droupDownMenu.css('left', 0);
                    $droupDownMenu.css('right', 'auto');
                } else if ($droupDownMenu.attr(ins.SHOW_FLOAT) == 'right') {
                    $droupDownMenu.css('right', 0);
                    $droupDownMenu.css('left', 'auto');
                } else {
                    $droupDownMenu.css('left', 0);
                    $droupDownMenu.css('right', 'auto');
                }
                $droupDownMenu.show();
            }
        });
        var oldSelectedVal, val;
        $(document).on('click', '.' + ins.IG_INPUT_GROUP_CLASS + ' .' + ins.IG_INPUT_DROPDOWN_CLASS + ' li .' + ins.IG_INPUT_DROPDOWN_ITEM_CLASS, function (e) {
            $inputSelectItem = $(this);
            $inputSelectItem.parent().parent().find('.' + ins.IG_INPUT_DROPDOWN_ITEM_CLASS + '.selected').removeClass('selected');
            $inputSelectItem.addClass('selected');
            $inputGroupLabel = $inputSelectItem.parent().parent().parent().find('.' + ins.IG_INPUT_GROUP_LABEL_CLASS);
            oldSelectedVal = parseFloat($inputGroupLabel.attr('value'));
            $inputGroupLabel.attr('value', $inputSelectItem.attr('value'));
            $inputGroupLabel.text($inputSelectItem.text());
            $mulCode = $inputSelectItem.parent().parent().parent().find('.' + ins.IG_MUL_CODE_CLASS);
            $mulCode.val($inputSelectItem.attr('code'));
            $mulName = $inputSelectItem.parent().parent().parent().find('.' + ins.IG_MUL_NAME_CLASS);
            $mulName.val($inputSelectItem.text());
            $mulValue = $inputSelectItem.parent().parent().parent().find('.' + ins.IG_MUL_VALUE_CLASS);
            $mulValue.val($inputSelectItem.attr('value'));
            $inputVal = $inputSelectItem.parent().parent().parent().parent().find('.' + ins.IG_INPUT_VAL_CLASS);
            $resultVal = $inputSelectItem.parent().parent().parent().parent().find('.' + ins.IG_RESULT_VAL_CLASS);
            if ($inputVal.val() && $inputGroupLabel.attr('value')) {
                val = JMath.parseFloatLocale($inputVal.val()) * parseFloat($inputGroupLabel.attr('value'));
                if ($bean.isNotEmpty(val) || !isNaN(val)) {
                    $resultVal.val(val);
                }
            } else {
                $resultVal.val('');
            }
        });
        $(document).on('keydown', '.' + ins.IG_INPUT_GROUP_CLASS + ' .' + ins.IG_INPUT_VAL_CLASS, function (e) {
            if (e.keyCode == JCommonUtil.KEY_CODE_DOT && JGlobal.language == LOCALE_VI) {
                return false;
            } else if (e.keyCode == JCommonUtil.KEY_CODE_COMMA && JGlobal.language != LOCALE_VI) {
                return false;
            }
        });
        $(document).on('keydown', '.' + ins.IG_NO_ACTION_INPUT_GROUP_CLASS + ' .' + ins.IG_INPUT_VAL_CLASS, function (e) {
            if (e.keyCode == JCommonUtil.KEY_CODE_DOT && JGlobal.language == LOCALE_VI) {
                return false;
            } else if (e.keyCode == JCommonUtil.KEY_CODE_COMMA && JGlobal.language != LOCALE_VI) {
                return false;
            }
        });
        $(document).on('keyup', '.' + ins.IG_INPUT_GROUP_CLASS + ' .' + ins.IG_INPUT_VAL_CLASS, function (e) {
            if (e.keyCode == JCommonUtil.KEY_CODE_COMMA && JGlobal.language == LOCALE_VI) {
                return true;
            } else if (e.keyCode == JCommonUtil.KEY_CODE_DOT && JGlobal.language == LOCALE_VI) {
                return false;
            } else if (e.keyCode == JCommonUtil.KEY_CODE_COMMA && JGlobal.language != LOCALE_VI) {
                return false;
            } else if (e.keyCode == JCommonUtil.KEY_CODE_DOT && JGlobal.language != LOCALE_VI) {
                return true;
            }
            $inputVal = $(this);
            $inputGroupLabel = $inputVal.parent().find('.' + ins.IG_INPUT_GROUP_LABEL_CLASS);
            $resultVal = $inputVal.parent().find('.' + ins.IG_RESULT_VAL_CLASS);
            if ($inputVal.val() && $inputGroupLabel.attr('value')) {
                $resultVal.val(JMath.parseFloatLocale($inputVal.val()) * parseFloat($inputGroupLabel.attr('value')));
            } else {
                $resultVal.val('');
            }
        });
    }
    ins.generateCategoryUnit = function (target) {
        if ($bean.isEmpty(ins.CATEGORY_UNIT)) {
            ins.CATEGORY_UNIT = {};
            ins.CATEGORY_UNIT["currency"] = {};
            ins.CATEGORY_UNIT["currency"]["metric-prefix-list"] = [];
            ins.CATEGORY_UNIT["currency"]["metric-prefix-list"].push({"name": "", "code": "none", "value": 1});
            ins.CATEGORY_UNIT["currency"]["metric-prefix-list"].push({
                "name": JCommonUtil.message('common.metric.prefix.kilo', 'common'),
                "code": "kilo",
                "value": 1000
            });
            ins.CATEGORY_UNIT["currency"]["metric-prefix-list"].push({
                "name": JCommonUtil.message('common.metric.prefix.mega', 'common'),
                "code": "mega",
                "value": 1000000
            });
            ins.CATEGORY_UNIT["currency"]["metric-prefix-list"].push({
                "name": JCommonUtil.message('common.metric.prefix.giga', 'common'),
                "code": "giga",
                "value": 1.0E9
            });
        }
        var $target = $(target);
        if ($bean.isEmpty($target)) {
            $target = $('.' + ins.IG_INPUT_DROPDOWN_CLASS);
        }
        var $targetItem, categoryUnit, categoryUnitTemp, i, html, selectedVal, selectedCode, selectedName, unitName;
        $target.each(function () {
            $targetItem = $(this);
            categoryUnit = $targetItem.attr('category-unit');
            categoryUnitTemp = ins.CATEGORY_UNIT[categoryUnit]['metric-prefix-list'];
            selectedVal = $targetItem.parent().find('.' + ins.IG_INPUT_GROUP_LABEL_CLASS).attr('value');
            if ($bean.isEmpty(selectedVal)) {
                selectedVal = 1;
                $targetItem.parent().find('.' + ins.IG_INPUT_GROUP_LABEL_CLASS).attr('value', selectedVal);
                $targetItem.parent().find('.' + ins.IG_MUL_VALUE_CLASS).val(selectedVal);
            }
            unitName = $targetItem.parent().find('.' + ins.IG_INPUT_GROUP_LABEL_CLASS).attr('unit-name');
            if ($bean.isNotEmpty(categoryUnitTemp)) {
                html = '';
                for (i in categoryUnitTemp) {
                    if (categoryUnitTemp[i]["value"] == selectedVal) {
                        html += '<li><span class="' + ins.IG_INPUT_DROPDOWN_ITEM_CLASS + ' selected" value="' + categoryUnitTemp[i]["value"] + '" code="' + categoryUnitTemp[i]["code"] + '">' + categoryUnitTemp[i]["name"] + ' ' + unitName + '</span></li>';
                        selectedName = unitName;
                        if ($bean.isNotEmpty(categoryUnitTemp[i]["name"])) {
                            selectedName = categoryUnitTemp[i]["name"] + ' ' + selectedName;
                        }
                        selectedCode = categoryUnitTemp[i]["code"];
                    } else {
                        html += '<li><span class="' + ins.IG_INPUT_DROPDOWN_ITEM_CLASS + '" value="' + categoryUnitTemp[i]["value"] + '" code="' + categoryUnitTemp[i]["code"] + '">' + categoryUnitTemp[i]["name"] + ' ' + unitName + '</span></li>';
                    }
                }
                $targetItem.html(html);
                $targetItem.parent().find('.' + ins.IG_INPUT_GROUP_LABEL_CLASS).text(selectedName);
                $targetItem.parent().find('.' + ins.IG_MUL_CODE_CLASS).val(selectedCode);
                $targetItem.parent().find('.' + ins.IG_MUL_NAME_CLASS).val(selectedName);
            }
        });
    }
    ins.registerCommonComponents = function () {
        $(document).on('mouseover', '.tooltip-content, .jqplot-xaxis-tick', function (e) {
            var $target = $(this);
            $target.tooltipster({content: $target.html()});
        });
        $(document).on('click', 'a[data-rel="prettyPopin"]:not(.poped)', function (e) {
            e.preventDefault();
            $(this).prettyPopin();
            $(this).click();
        });
        $(document).on('change', '.i-select-auto', function (e) {
            var $select = $(this);
            var $optionSelect = $select.find('option:selected');
            if ($optionSelect.length > 0) {
                var $selectValue = $select.parents('.' + ins.IG_INPUT_GROUP_CLASS).find('.' + $select.attr('select-value'));
                var $selectName = $select.parents('.' + ins.IG_INPUT_GROUP_CLASS).find('.' + $select.attr('select-name'));
                $selectValue.val($optionSelect.val());
                $selectName.val($optionSelect.text());
            }
        });
        $(document).on('click', '*' + ins.SCRIPT_ROLE_BTN_TOGGLE_SHOW_HIDE, function (e) {
            var $toggle = $(this).closest('*' + ins.SCRIPT_ROLE_GROUP);
            var toggleId = $(this).attr(ins.TOGGLE_ID);
            var $toggleShow;
            if ($bean.isNotEmpty(toggleId)) {
                $toggleShow = $toggle.find('*' + ins.SCRIPT_ROLE_TOGGLE_SHOW_HIDE + '[' + ins.TOGGLE_ID + '="' + toggleId + '"]');
            } else {
                $toggleShow = $toggle.find('*' + ins.SCRIPT_ROLE_TOGGLE_SHOW_HIDE);
            }
            if ($(this).hasClass(ins.CLOSE)) {
                $toggleShow.show(JCommonUtil.ANIMATE_SHOW_HIDE_TIME);
            } else {
                $toggleShow.hide(JCommonUtil.ANIMATE_SHOW_HIDE_TIME);
            }
            $(this).toggleClass(ins.CLOSE).toggleClass(ins.OPEN);
        });
    }
    ins.registerTableFixed1 = function () {
        $('.table-fix1').find('.row-header').find('.scroll-wrapper').scroll(function () {
            $('.table-fix1').find('.row-content').find('.scroll-wrapper').scrollLeft($('.table-fix1').find('.row-header').find('.scroll-wrapper').scrollLeft());
        });
        $('.table-fix1').find('.btn-scroll').on('click', function () {
            var d = 1;
            if ($(this).hasClass('left')) {
                d = -1;
            }
            var $scrollWrapper = $('.table-fix1').find('.row-header').find('.scroll-wrapper');
            $scrollWrapper.animate({scrollLeft: $('.table-fix1').find('.row-header').find('.col-item').width() * d + $scrollWrapper.scrollLeft()}, 600);
        });
    }
    ins.resizeCommonComponents = function () {
        ins.resizeJQueryDialog();
        ins.resizeViewClass();
        ins.resizeMyScroll();
        ins.resizeFlexStart();
        ins.resizeLayout();
        JHtmlComponent.resetFlyComponents(true);
    }
    ins.resizeViewClass = function () {
        $('*[view-size]').each(function () {
            var viewSizes = JSON.parse($(this).attr(ins.ATTR_VIEW_SIZE));
            var i, isClass;
            for (i in viewSizes) {
                isClass = true;
                if ($bean.isNotEmpty(viewSizes[i][ins.MIN_WIDTH])) {
                    if ($(this).outerWidth(true) < parseInt(viewSizes[i][ins.MIN_WIDTH])) {
                        isClass = false;
                    }
                }
                if ($bean.isNotEmpty(viewSizes[i][ins.MAX_WIDTH])) {
                    if ($(this).outerWidth(true) > parseInt(viewSizes[i][ins.MAX_WIDTH])) {
                        isClass = false;
                    }
                }
                if (isClass) {
                    $(this).addClass(viewSizes[i][ins.STYLE_CLASS]);
                } else {
                    $(this).removeClass(viewSizes[i][ins.STYLE_CLASS]);
                }
            }
        });
    }
    ins.resizeJQueryDialog = function () {
        $('.ui-dialog').each(function () {
            var width;
            var size;
            if ($(this).hasClass('size-' + ins.DIALOG_SIZE_1)) {
                width = ins.jQueryDialogWidth(ins.DIALOG_SIZE_1);
                size = ins.DIALOG_SIZE_1;
            } else if ($(this).hasClass('size-' + ins.DIALOG_SIZE_2)) {
                width = ins.jQueryDialogWidth(ins.DIALOG_SIZE_2);
                size = ins.DIALOG_SIZE_2;
            } else if ($(this).hasClass('size-' + ins.DIALOG_SIZE_LARGEST)) {
                width = ins.jQueryDialogWidth(ins.DIALOG_SIZE_LARGEST);
                size = ins.DIALOG_SIZE_LARGEST;
            }
            $(this).width(width);
            ins.fitDialogHeight($(this), size);
            if ($(this).hasClass('fixed-top')) {
                $(this).offset({top: $(window).scrollTop(), left: ($(window).width() - $(this).width()) / 2});
            }
            if ($(this).hasClass('fixed-bottom-left')) {
                $(this).offset({
                    top: $(window).scrollTop() + $(window).height() - $(this).height() - JCommonUtil.COMMON_BOX_PADDING,
                    left: JCommonUtil.COMMON_BOX_PADDING
                });
            }
        });
    }
    ins.resizeFlexStart = function ($div) {
        var $targets;
        if ($div) {
            $targets = $div.find('*[view-role="flex-start"]');
        } else {
            $targets = $('*[view-role="flex-start"]');
        }
        $targets.each(function () {
            var $target = $(this);
            var maxColWith = $target.width();
            var currentColWidth = 0;
            var colIndex;
            var hideCol = false;
            $target.find('*[view-role="flex-item"]').each(function (i) {
                colIndex = i;
                currentColWidth += $(this).outerWidth(true);
                if (currentColWidth > maxColWith) {
                    hideCol = true;
                    return false;
                }
            });
            $target.find('*[view-role="flex-item"].hide').removeClass('hide');
            if (hideCol) {
                if (colIndex != 0) {
                    colIndex--;
                }
                $target.find('*[view-role="flex-item"]:gt(' + colIndex + ')').addClass('hide');
            }
        });
    }
    ins.resizeLayout = function ($layout) {
        var $layouts;
        if ($bean.isNotEmpty($layout)) {
            $layouts = $layout;
        } else {
            $layouts = $('.h-layout');
        }
        $layouts.each(function () {
            var viewRoles = $(this).attr('view-role');
            if ($bean.isNotEmpty(viewRoles) && viewRoles.indexOf('vh-fix') != -1) {
                $(this).offset({top: $(window).scrollTop(), left: 0});
            }
        });
    }
    ins.jQueryDialogWidth = function (size) {
        var width;
        var fullScreen = false;
        if (size == ins.DIALOG_SIZE_1) {
            if ($(window).width() < ins.RESIZE_DIALOG_WIDTH_1 + 2 * ins.RESIZE_DIALOG_PADDING) {
                fullScreen = true;
            } else {
                width = ins.RESIZE_DIALOG_WIDTH_1;
            }
        } else if (size == ins.DIALOG_SIZE_2) {
            if ($(window).width() < ins.RESIZE_DIALOG_WIDTH_2 + 2 * ins.RESIZE_DIALOG_PADDING) {
                fullScreen = true;
            } else {
                width = ins.RESIZE_DIALOG_WIDTH_2;
            }
        } else if (size == ins.DIALOG_SIZE_LARGEST) {
            fullScreen = true;
        }
        if (fullScreen) {
            width = $(window).width() - 2 * ins.RESIZE_DIALOG_PADDING;
        }
        return width;
    }
    ins.fitDialogHeight = function ($dialog, size) {
        var titleBarHeight = $dialog.find('.ui-dialog-titlebar').outerHeight(true);
        var dialogContentHeight = $dialog.find('.ui-dialog-content').outerHeight(true);
        var buttonsHeight = $dialog.find('.ui-dialog-buttonset').outerHeight(true) + 10;
        var height = titleBarHeight + dialogContentHeight + buttonsHeight;
        var fullHeight = false;
        if (size == ins.DIALOG_SIZE_LARGEST || height > $(window).height() - ins.RESIZE_DIALOG_PADDING) {
            fullHeight = true;
        }
        if (fullHeight) {
            var skipPadding = $dialog.find('.ui-dialog-content').outerHeight(true) - $dialog.find('.ui-dialog-content').height();
            $dialog.find('.ui-dialog-content').height($(window).height() - ins.RESIZE_DIALOG_PADDING - titleBarHeight - buttonsHeight - skipPadding);
        } else {
            $dialog.find('.ui-dialog-content').css('height', 'auto');
        }
    }
    ins.resizeMyScroll = function () {
        $('.myscroll:not(.show-scrollbar)').each(function () {
            JHomeUtil.myscroll(this);
        });
        $('.myscroll.show-scrollbar').each(function () {
            JHomeUtil.myscroll(this, false);
        });
        $('.myscroll.show-scrollbar').each(function () {
            JHomeUtil.myscroll(this, false);
        });
    }
    ins.scrollFixed = function () {
        $('.fixed-scroll-top').each(function () {
            if (!$(this).hasClass('fixed') && $(this).offset().top < $(window).scrollTop()) {
                $(this).addClass('fixed');
                $(this).attr('ofs-top', $(this).offset().top);
            }
            if ($(this).hasClass('fixed')) {
                if (parseInt($(this).attr('ofs-top')) > $(window).scrollTop()) {
                    $(this).removeClass('fixed');
                    $(this).css('top', '');
                    $(this).removeAttr('ofs-top');
                } else {
                    $(this).offset({top: $(window).scrollTop()});
                }
            }
        });
    }
    ins.scrollPanel = function () {
        $('*[view-role="panel-full-screen"]').each(function () {
            var top, height;
            if ($(window).scrollTop() < 44) {
                top = 44 - $(window).scrollTop();
                height = $(window).height() - top;
            } else {
                top = $(window).scrollTop();
                height = $(window).height();
            }
            $(this).offset({top: top, left: 44});
            $(this).width($(window).width() - 44);
            $(this).css('min-height', height);
        });
    }
    ins.scrollCommonComponents = function () {
        $('.table-fix1 .row-header .scroll-wrapper').each(function () {
            JHomeUtil.myscroll(this);
        });
    }
    ins.registerTagitDropdown = function (dropdownWrap, tagit, checkboxClass) {
        $(tagit).tagit({
            afterTagAdded: function (event, ui) {
                var tagLabel = $(tagit).tagit('tagLabel', ui.tag);
                var $target = $(dropdownWrap + ' .' + checkboxClass + '[value="' + tagLabel + '"]');
                if (!$target.is(":checked")) {
                    $target.attr('checked', 'checked');
                }
            }, afterTagRemoved: function (event, ui) {
                var tagLabel = $(tagit).tagit('tagLabel', ui.tag);
                var $target = $(dropdownWrap + ' .' + checkboxClass + '[value="' + tagLabel + '"]');
                if ($target.is(":checked")) {
                    $target.removeAttr('checked');
                }
            }
        });
        $(dropdownWrap + ' .' + checkboxClass).change(function () {
            var _this = this;
            if ($(_this).is(':checked')) {
                $(tagit).tagit('createTag', $(_this).attr('data-name'));
            } else {
                $(tagit).tagit('removeTagByLabel', $(_this).attr('data-name'));
            }
        });
    }
    ins.registerCommonEvents = function () {
        $(document).on('click', function (e) {
            var $target = $(e.target);
            if ($target.closest('*[script-role~="toggle-dialog"]').length == 0
                && $target.closest('*[toggle-hide-dialog]').length == 0
                && $bean.notClickCheckInsideException($target)) {
                $view.DIALOG.hideAllDialog($target);
            }
        });
    }
    ins.closePrettyPopin = function () {
        $('.b_close[data-rel="pretty-close"]').trigger('click');
    }
    ins.registerClickPrettyOverlay = function () {
        $('#overlay').bind('click', function () {
            ins.closePrettyPopin();
        });
    }
//    ins.snap = function () {
//        if (ins.snapper == null) {
//            $('.chart-content,#orgchart-content,#working-calendar,.swiper-container,.hyd-board-content').attr('data-snap-ignore', 'true');
//            ins.snapper = new Snap({element: document.getElementsByClassName('ly-wrap')[0], dragger: null, disable: 'right', addBodyClasses: true, hyperextensible: true, resistance: 0.5, flickThreshold: 50, transitionSpeed: 0.3, easing: 'ease', maxPosition: 290, minPosition: -290, tapToClose: true, touchToDrag: true, slideIntent: 40, minDragDistance: 5});
//            ins.initSidebarMobile();
//            ins.snapper.on('start', function () {
//                $('.nicescroll-rails').addClass('hide');
//                $('.sidebar-mobile').removeClass('hide');
//            });
//            ins.snapper.on('end', function () {
//                if ($bean.isEmpty($('.ly-wrap').attr('style'))) {
//                    $('.body-wrapper').css({'overflow': '', 'max-height': '', 'min-height': ''});
//                    $('.nicescroll-rails').removeClass('hide');
//                    $('.sidebar-mobile').addClass('hide');
//                }
//                else {
//                    $('.body-wrapper').css({'overflow': 'hidden', 'max-height': '100vh', 'min-height': '100vh'});
//                    $('.nicescroll-rails').addClass('hide');
//                    $('.sidebar-mobile').removeClass('hide');
//                }
//            });
//            ins.snapper.on('animated', function () {
//                if ($bean.isEmpty($('.ly-wrap').attr('style'))) {
//                    $('.body-wrapper').css({'overflow': '', 'max-height': '', 'min-height': ''});
//                    $('.nicescroll-rails').removeClass('hide');
//                    $('.sidebar-mobile').addClass('hide');
//                }
//                else {
//                    $('.body-wrapper').css({'overflow': 'hidden', 'max-height': '100vh', 'min-height': '100vh'});
//                    $('.nicescroll-rails').addClass('hide');
//                    $('.sidebar-mobile').removeClass('hide');
//                }
//            });
//        }
//    }
//    ins.initSidebarMobile = function () {
//        var $sidebar = $('.ly-sidebar');
//        var $sidebarMobile = $('.sidebar-mobile');
//        var ul = $('<ul></ul>');
//        $sidebar.find('.mod-item-container').each(function () {
//            var li = $('<li></li>');
//            li.html($(this).html());
//            var moduleId = $(this).attr('module-id');
//            if ($bean.isNotEmpty(moduleId)) {
//                li.attr('module-id', moduleId);
//                var itemList = $('<ul id="list-' + moduleId + '"></ul>');
//                $('#list-' + moduleId + '>a').each(function () {
//                    var item = $('<li></li>');
//                    item.append($(this).clone());
//                    itemList.append(item);
//                });
//                $('#list-' + moduleId + '>.mod-group').each(function () {
//                    var item = $('<li></li>');
//                    item.append($(this).clone());
//                    itemList.append(item);
//                });
//                li.append(itemList);
//            }
//            ul.append(li);
//        });
//        $sidebarMobile.html(ul);
//        $sidebarMobile.find('>ul>li:has(ul),.mod-group').unbind('click').bind('click', function (e) {
//            e.stopPropagation();
//            $(this).toggleClass('active');
//        });
//        $sidebarMobile.find('a').click('click', function (e) {
//            e.stopPropagation();
//            return true;
//        });
//        $sidebarMobile.find('>ul>li[module-id="mod-note"]').remove();
//        $sidebarMobile.find('>ul>li:last').remove();
//        $sidebarMobile.removeClass('hide');
//        $('a[data-rel = "prettyPopin"]').prettyPopin();
//    }
//    ins.openSlideMobile = function () {
//        if (ins.snapper != null) {
//            if (ins.snapper.state().state == 'closed') {
//                ins.snapper.open('left');
//            } else {
//                ins.snapper.close();
//            }
//        }
//    }
//    ins.snapperResize = function () {
//        var width = $(window).width();
//        if (width > SCREEN_639) {
//            if (ins.snapper != null) {
//                ins.snapper.close();
//                ins.snapper.disable();
//                $('.body-wrapper').css({'overflow': '', 'position': '', 'max-height': '', 'min-height': ''});
//                $('.nicescroll-rails').removeClass('hide');
//            }
//        } else {
//            if (ins.snapper != null) {
//                ins.snapper.enable();
//            }
//        }
//    }
    return ins;
})(window, jQuery);

var JEvent = (function (window, $) {
    var ins = {};
    var popinShowDone = {};
    ins.registerPopinDone = function (key, func, continous) {
        popinShowDone[key] = {func: func, continous: continous};
    }
    ins.firePopinDone = function () {
        setTimeout(function () {
            for (var i in popinShowDone) {
                popinShowDone[i].func();
                if ($bean.isEmpty(popinShowDone[i].continous) || !popinShowDone[i].continous) {
                    delete popinShowDone[i];
                }
            }
        }, 50);
    }
    ins.documentReady = function () {
        JInit.registerRoles();
        JHtmlComponent.registerAlert();
        JHtmlComponent.registerExtendConfirm();
        JHtmlComponent.registerFlyComponents();
        JHtmlComponent.registerDropDown();
        JHtmlComponent.registerColorPick();
        JHtmlComponent.registerInputGroupDropDown();
        JHtmlComponent.registerCommonComponents();
        JHtmlComponent.registerCommonEvents();
        $(document).on('keyup', function (event) {
            if (event.keyCode == $bean.KEY_CODE_ESC) {
                JHtmlComponent.closePrettyPopin();
            }
        })
    }
    ins.tuningTable = function () {
        if ($bean.isNotEmpty('table')) {
            $('table').each(function () {
                var trExample = $(this).find('tbody tr:first-child');
                var columnMatch = [];
                var columnIgnore = [];
                if ($bean.isNotEmpty(trExample)) {
                    $(trExample).find('td').each(function (index) {
                        var txtLength = $bean.isNotEmpty($(this).text()) ? $(this).text().trim().length : 0;
                        var htmlLength = $bean.isNotEmpty($(this).html()) ? $(this).html().trim().length : 0;
                        if (txtLength > 0 && txtLength == htmlLength) {
                            columnMatch.push(index);
                        } else if (txtLength <= 0 && htmlLength <= 0) {
                            columnIgnore.push(index);
                        }
                    });
                }
                $(this).find('tbody tr').each(function (indexTr) {
                    var remIgnore = [];
                    for (var i = 0; i < columnIgnore.length; i++) {
                        var index = columnIgnore[i] * 1;
                        var $td = $(this).find('td:nth-child(' + (index + 1) + ')');
                        var txtLength = $bean.isNotEmpty($td.text()) ? $td.text().trim().length : 0;
                        var htmlLength = $bean.isNotEmpty($td.html()) ? $td.html().trim().length : 0;
                        if (txtLength > 0 && txtLength == htmlLength) {
                            columnMatch.push(index);
                            remIgnore.push(i)
                        }
                    }
                    if (remIgnore.length > 0) {
                        for (var i = 0; i < remIgnore.length; i++) {
                            var index = remIgnore[i] * 1;
                            for (var j = 0; j < (indexTr * 1 + 1); j++) {
                                $(this).parents('table').find('tr:nth-child(' + (j + 1) + ')').find('td:nth-child(' + (columnIgnore[index] * 1 + 1) + ')').css('overflow', 'hidden');
                            }
                        }
                        for (var i = 0; i < remIgnore.length; i++) {
                            var index = remIgnore[i] * 1;
                            columnIgnore.splice(index, 1);
                        }
                    }
                    for (var i = 0; i < columnMatch.length; i++) {
                        var index = columnMatch[i] * 1;
                        var $td = $(this).find('td:nth-child(' + (index + 1) + ')');
                        $td.css('overflow', 'hidden');
                    }
                });
            });
        }
    }
    ins.windowResize = function () {
        JGeneral.resizeDropBox();
        JHtmlComponent.resizeCommonComponents();
        JHtmlComponent.scrollPanel();
        if (JGlobal.module == 'ihcm') {
            JHomeUtil.windowResize();
        }
    }
    ins.windowScroll = function () {
        JHomeUtil.showMainGoTop();
        JHtmlComponent.scrollFixed();
        JHtmlComponent.scrollPanel();
        JHtmlComponent.scrollCommonComponents();
        if (JGlobal.module == 'ihcm') {
            JHomeUtil.windowScroll();
        }
    }
    return ins;
})(window, jQuery);
var storageVersion = 3.4;
var JConfigs = (function (window, $) {
    var ins = {};
    ins.MIGRATE_COOKIE = [];
    ins.MIGRATE_LOCALSTORAGE = [];
    ins.resetChangeVersion = function () {
        var version = JCookies.get(JCookies.IHCM_STORAGE_VERSION);
        if (storageVersion != version) {
            ins.resetAllCookies();
            ins.resetAllLocalStorage();
            JCookies.set(JCookies.IHCM_STORAGE_VERSION, storageVersion);
        }
    }
    ins.resetAllCookies = function test() {
        var key, allCookies = $.cookie();
        for (key in allCookies) {
            if (key == 'JSESSIONID') {
                continue;
            }
            if (ins.MIGRATE_COOKIE.indexOf(key) != -1) {
                ins.migCookie(key);
                continue;
            }
            $.removeCookie(key);
        }
    }
    ins.resetAllLocalStorage = function () {
        var key;
        for (key in localStorage) {
            if (ins.MIGRATE_LOCALSTORAGE.indexOf(key) != -1) {
                ins.migLocalStorage(key);
                continue;
            }
            localStorage.removeItem(key);
        }
    }
    ins.migCookie = function (key) {
    }
    ins.migLocalStorage = function (key) {
    }
    return ins;
})(window, jQuery);