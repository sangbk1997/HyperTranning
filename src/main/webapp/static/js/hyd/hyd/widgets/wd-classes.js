/**
 * Created by tronghh_vdi on 8/8/2016.
 */
var $widgets = {
    classes: {},
    newConfigs: function (widgetClass, configs) {
        var widgetConfigs = $bean.newInstance(widgetClass._default, configs);
        return widgetConfigs;
    },
    dependClass: function (widgetClass) {
        var i;
        for (i in widgetClass.depends) {
            $bean.extend(widgetClass._default, $widgets.classes[widgetClass.depends[i]]._default);
        }
    },
    initWidgetDepend: function (widgetClass, $scope, $element, attrs, widgetName) {
        var i;
        for (i in widgetClass.depends) {
            $widgets.classes[widgetClass.depends[i]].initClass($scope, $element, attrs, widgetName);
        }
    },
    genTemplate: function (widgetClass, element, attrs, template, widgetName) {
        var i;
        for (i in widgetClass.depends) {
            template = $widgets.classes[widgetClass.depends[i]].genTemplate(element, attrs, template, widgetName);
        }
        return template;
    },
    checkInitCalled: function (widgetClass, $scope) {
        if ($bean.isNil($scope.initClassDepends)) {
            $scope.initClassDepends = [];
        }
        if ($bean.valueIn(widgetClass.id, $scope.initClassDepends)) return true;
        $scope.initClassDepends.push(widgetClass.id);
        return false;
    },
    // ket noi voi data-driven-converter sau này
    $ddc: {
        compileTemplate: function (template) {
            return new TemplateBuilder(template);
        }
    }
};
function TemplateBuilder(template) {
    this.template = template;
    this.razors = [];
    this.razorValues = [];
    this.razorAssigns = [];
    this.razorValueDefaults = [];
    this.razorIndex = -1;
}
TemplateBuilder.prototype.assign = function (razor) {
    var valid = $bean.collectionAdd(this.razors, razor, true);
    if (valid) {
        this.lastRazor = razor;
        this.razorValues.push([]);
        this.razorAssigns.push([]);
        this.razorIndex++;
    }
    return this;
};
TemplateBuilder.prototype.as = function (value) {
    if ($bean.isNil(this.lastRazor) || $bean.isNil(value)) return this;
    this.razorValues[this.razorIndex].push(value);
    this.lastValue = value;
    return this;
};
TemplateBuilder.prototype.when = function (condition) {
    if ($bean.isNil(this.lastValue)) return this;
    this.razorAssigns[this.razorIndex].push(condition);
    return this;
};
TemplateBuilder.prototype.default = function (value) {
    if ($bean.isNil(this.lastValue)) return this;
    this.razorValueDefaults.push(value);
    return this
};
TemplateBuilder.prototype.compile = function () {
    var i, j, razor, value, valueAccept, condition, isReplace;
    for (i in this.razors) {
        razor = this.razors[i];
        valueAccept = this.razorValueDefaults[i] || '';
        for (j in this.razorValues[i]) {
            value = this.razorValues[i][j];
            if (this.razorAssigns[i][j]()) {
                valueAccept = value;
                break; // choose first when matched
            }
        }
        this.template = this.template.replace(razor, valueAccept);
    }
    return this.template;
};

// WidgetBase: class cha của tất cả các widget_
$widgets.classes.widgetBase = {
    id: 'widgetBase',
    _default: {
        restrict: 'E',
        replace: false,
        scope: {
            domId: '@',
            styleClass: '@',
            configs: '=?',
            params: '=?'
        }
    },
    initClass: function ($scope, $element, attrs, widgetName) {
        // no defined
    },
    genTemplate: function (element, attrs, template, widgetName) {
        template = $widgets.genTemplate($widgets.classes.widgetBase, element, attrs, template, widgetName);
        return template;
    }
};

// EditorClass: lớp tất cả các widget editable
$widgets.classes.editorClass = {
    id: 'editorClass',
    depends: ['widgetBase'],
    _default: {
        scope: {
            value: '=',
            required: '=?',
            disabled: '=?',
            emptyPlaceholder: '@',
            onChange: '&',
            onDelete: '&',
            deleteObject: '=?',
            unit: '@',
            iconPrepend: '@',
            label: '@'
        }
    },
    initClass: function ($scope, $element, attrs, widgetName) {
        if ($widgets.checkInitCalled($widgets.classes.editorClass, $scope)) return;
        // ui & model
        if ($bean.isNil($scope.required)) {
            $scope.required = false;
        }
        if (attrs.hydname) {
            $scope.hydname = attrs.hydname;
        }

        if (attrs.commandvalue) {
            $scope.commandvalue = attrs.commandvalue;
        }

        if ($scope.disabled) {
            $element.addClass('disabled');
        }
        // events
        $scope.linkOnDelete = function () {
            $scope.onDelete({deleteObj: $scope.deleteObject});
        }
        $scope.linkOnChange = function ($event) {
            $scope.onChange({value: $scope.value});
        }

        // watch models
        $scope.$watch('value', function (newVal, oldVal) {
            $scope.hasValue = $bean.isNotEmpty(newVal);
        });
    },
    genTemplate: function (element, attrs, template, widgetName) {
        template = $widgets.genTemplate($widgets.classes.editorClass, element, attrs, template, widgetName);
        template = $widgets.classes.editorClass.genIconPrepend(element, attrs, template, widgetName);
        template = $widgets.classes.editorClass.genUnitTitle(element, attrs, template, widgetName);
        return template;
    },
    genIconPrepend: function (element, attrs, template, widgetName) {
        return $widgets.$ddc.compileTemplate(template)
            .assign('{@icon-prepend}')
            .as(attrs['iconPrepend']).when(function () {
                return $bean.isNotEmpty(attrs['iconPrepend']);
            })
            .as('fa-list').when(function () {
                return widgetName == 'hdSelect';
            })
            .as('fa-search').when(function () {
                return widgetName == 'hdAutocomplete';
            })
            .as('fa-calendar').when(function () {
                return widgetName == 'hdDatepicker';
            })
            .default('fa-pencil')
            .compile();
    },
    genUnitTitle: function (element, attrs, template, widgetName) {
        if ($bean.isNotNil(attrs.unit)) {
            element.addClass('has-unit');
        }
        return $widgets.$ddc.compileTemplate(template)
            .assign('{@unit-title}')
            .as('<span class="sign">' + attrs.unit + '</span>')
            .when(function () {
                return $bean.isNotNil(attrs.unit);
            })
            .compile();
    },
    onClickOut: function (widgetName, $event) {
        var $target = $event.target;
        if ($bean.clickCheckInsideException($target)) return;
        var tagName = $bean.camelToPascal(widgetName);
        var $widgetItem = $($event.target).closest(tagName);
        $(tagName).each(function () {
            var $item = $(this);
            if (!$item.is($widgetItem)) {
                if ($item.hasClass('active')) {
                    $item.trigger('xEditorClass.hide');
                }
            } else {
                // do nothing
            }
        });
    }
};
$widgets.dependClass($widgets.classes.editorClass);

// EnterEditorClass: lớp các widget editable dạng nhập
$widgets.classes.enterEditorClass = {
    id: 'enterEditorClass',
    depends: ['editorClass'],
    _default: {
        scope: {
            onKeyPress: '&',
            onKeyup: '&'
        }
    },
    initClass: function ($scope, $element, attrs, widgetName) {
        if ($widgets.checkInitCalled($widgets.classes.enterEditorClass, $scope)) return;
        $widgets.initWidgetDepend($widgets.classes.enterEditorClass, $scope, $element, attrs, widgetName);

        // ui & model
        $scope.resetValue = function () {
            var oldVal = $scope.value;
            $scope.value = '';
            $element.find('input').focus();
            $element.find('textarea').focus();
            if ($scope.value !== oldVal) {
                $scope.linkOnChange();
            }
        }
        $scope.linkOnChange = function ($event) {
            $scope.onChange({value: $scope.value});
        }

        $scope.linkOnKeyup = function () {
            $scope.onKeyup({value: $scope.value});
        }

        // events

        // ui methods

        // watch models
    },
    genTemplate: function (element, attrs, template, widgetName) {
        template = $widgets.genTemplate($widgets.classes.enterEditorClass, element, attrs, template, widgetName);
        return template;
    }
};
$widgets.dependClass($widgets.classes.enterEditorClass);

// SelectEditorClass: lớp tất cả các widget editable dạng select (hd-autocomplete, hd-select, hd-taggit)
$widgets.classes.selectEditorClass = {
    id: 'selectEditorClass',
    depends: ['editorClass'],
    _default: {
        scope: {
            emptyValue: '=?',
            dSource: '=?',
            dAdapter: '=?',
            advanceSearchConfig: '=?',
            dAdapterParams: '=?',
            fieldValue: '@',
            fieldTitle: '@',
            fieldTip: '@',
            separatorTitle: '@',
            addTitle: '@',
            itemTemplate: '@',
            clearSearch: '=?',
            customStyle: '@',
            valueTitle: '=?'
        }
    },
    initClass: function ($scope, $element, attrs, widgetName) {
        if ($widgets.checkInitCalled($widgets.classes.selectEditorClass, $scope)) return;
        $widgets.initWidgetDepend($widgets.classes.selectEditorClass, $scope, $element, attrs, widgetName);
        // ui & model
        var $input = $element.find('input.hd-value-input');
        var $search = $element.find('input.hd-value-search');
        $scope.selectText = true;
        $bean.setDefaultValues($scope, {
            fieldValue: 'value',
            fieldTitle: 'title',
            fieldTip: 'tip',
            emptyValue: undefined,
            customStyle: '',
            emptyPlaceholder: JCommonUtil.message('common.select', 'common'),
            separatorTitle: JCommonUtil.message('common.or', 'common'),
            addTitle: JCommonUtil.message('common.add', 'common')
        });
        $scope.hasEmptyValue = $scope.emptyValue !== undefined;
        $scope.triggerSuggest = false;
        if ($bean.isNil($scope.multiValue)) {
            $scope.multiValue = false;
        }
        if ($bean.isNil($scope.showSuggestOnPosition)) {
            $scope.showSuggestOnPosition = false;
        }
        if ($bean.isNil($scope.clearSearch)) {
            $scope.clearSearch = false;
        }
        $scope.searchText = '';

        // methods
        $scope.chooseItemValue = function (valueItem, bySuggest) {
            if ($scope.multiValue) {
                $bean.arrayAdd($scope.value, valueItem[$scope.fieldValue]);
            } else {
                $scope.value = valueItem[$scope.fieldValue];
            }
            $scope._afterChangeValue(true);
            if (bySuggest) {
                $scope.toggleSuggest(false);
            }
        }
        $scope.removeItemValue = function (valueItem) {
            if ($scope.multiValue) {
                $bean.collectionRemove($scope.value, valueItem[$scope.fieldValue]);
            }
            $scope._afterChangeValue(true);
        }
        $scope.toggleItemValue = function (valueItem) {
            if ($scope.multiValue) {
                $scope.value = $bean.arrayPushRemove($scope.value, valueItem[$scope.fieldValue]);
            }
            $scope._afterChangeValue(true, true);
            $search.val('');
            $search.focus();
        }
        $scope.resetValue = function (resetSearchText) {
            $scope.value = null;
            $scope._afterChangeValue(true, resetSearchText);
            $scope.selectText = false;
            $input.focus();
            $search.focus();
        }
        $scope._afterChangeValue = function (callOnChange, resetSearchText) {
            var _searchText = null;
            if ($scope.multiValue) {
                $scope._setItemListSelectedByValue();
                if (callOnChange) {
                    $scope.linkOnChange();
                }
                _searchText = '';
                if ($bean.isNotEmpty($scope.itemListSelected)) {
                    var listTitle = $bean.list($scope.itemListSelected, $scope.fieldTitle);
                    $scope.itemListSelectedTitle = $bean.joinString(listTitle);
                } else {
                    $scope.itemListSelectedTitle = null;
                }
            } else {
                $scope._setItemSelectedByValue();
                if ($bean.isNotNil($scope.itemSelected)) {
                    $scope.itemSelectedTitle = $scope.itemSelected[$scope.fieldTitle];
                    _searchText = $scope.itemSelectedTitle;
                } else {
                    $scope.itemSelectedTitle = $scope.valueTitle || null;
                    _searchText = '';
                }
                if (callOnChange) {
                    $scope.linkOnChange();
                }
            }
            if (resetSearchText || $bean.isNotEmpty(_searchText)) {
                if ($scope.clearSearch) {
                    _searchText = '';
                }
                $scope.searchText = _searchText;
                $scope.processSearchComplete();
            }
            $scope.showIconRemove = $bean.isNotEmpty($scope.searchText);
            $ng.$timeout(function () {
                $scope.calPositionSuggest();
            });
        }
        $scope._setItemListSelectedByValue = function () {
            $scope.itemListSelected = [];
            $bean.for($scope.value, function (value) {
                var _itemFind = {};
                _itemFind[$scope.fieldValue] = value;
                _itemFind = $bean.getObjFromCollection($scope.dSource, _itemFind);
                if (_itemFind != null) {
                    $scope.itemListSelected.push(_itemFind);
                }
            });
        }
        $scope._setItemSelectedByValue = function () {
            var _itemSelected = {};
            _itemSelected[$scope.fieldValue] = $scope.value;
            $scope.itemSelected = $bean.getObjFromCollection($scope.dSource, _itemSelected);
        }
        $scope._loadDataCalled = false;
        $scope.loadData = function () {
            if ($scope._loadDataCalled) {
                return;
            }
            if ($bean.isNotNil($scope.dAdapter)) {
                $scope.dAdapter.execute({
                    params: $scope.dAdapterParams,
                    onEndDataApply: function () {
                        $scope._afterChangeValue();
                        $scope.processSearchComplete();
                        $scope._loadDataCalled = true;
                    }
                });
            } else {
                $scope._afterChangeValue();
                $scope.processSearchComplete();
            }
        }
        $scope.processSearchComplete = function () {
            $scope.dSourceClone = [];
            if ($scope.searchText == window.getSelection().toString() || $scope.searchText == $scope.selectedText) {
                $scope.dSourceClone = $scope.dSource;
            } else {
                var i, obj;
                for (i in $scope.dSource) {
                    obj = $scope.dSource[i];
                    if ($bean.isNotEmpty(obj[$scope.fieldTitle])) {
                        if ($bean.textContains(obj[$scope.fieldTitle], $scope.searchText, true)) {
                            $scope.dSourceClone.push(obj);
                        }
                    }
                }
            }
        }
        $scope.toggleSuggest = function (status) {
            $scope.triggerSuggest = status;
            // show suggest tai vi tri con tro (trong input)
            var $hdSuggest = $element.find('.hd-suggest');
            var $hDialog = $element.find('.h-dialog');
            $scope.calPositionSuggest();
            if ($scope.triggerSuggest) {
                $hdSuggest.addClass('active');
                $hDialog.addClass('active');
            } else {
                $hdSuggest.removeClass('active');
                $hDialog.removeClass('active');
            }
        }
        $scope.calPositionSuggest = function () {
            if (!$scope.showSuggestOnPosition) return;
            // hien thi dialog goi y ngay tai vi tri label them moi
            var $hdSuggest = $element.find('.hd-suggest');
            var left = $search.position().left;
            var suggestWidth = $hdSuggest.outerWidth(true);
            var elementWidth = $element.width();
            if (left + suggestWidth > elementWidth) {
                left = elementWidth - suggestWidth;
            }
            var $textBox = $element.find('.hd-value-search');
            if ($scope.triggerSuggest) {
                $hdSuggest.css('left', left);
                $hdSuggest.css('top', $search.position().top + $search.outerHeight(true) + JCommonUtil.COMMON_ELEMENT_PADDING);
                $hdSuggest.css('width', '300px');
            }
        }
        $scope.isItemValueSelected = function (valueItem) {
            return $bean.valueIn(valueItem[$scope.fieldValue], $scope.value);
        }
        $scope._initData = function () {
            $scope.processSearchComplete();
            // lấy value title khi chỉ có value(id)
            if ($scope.isXEditorClass) {
                if ($bean.isNotEmpty($scope.value) && $bean.isEmpty($scope.valueTitle)) {
                    $scope.loadData();
                }
            } else {
                $scope.loadData();
            }
        }
        $scope._initData();

        // events
        $scope.linkOnChange = function () {
            if ($scope.multiValue) {
                $scope.onChange({itemListSelected: $scope.itemListSelected});
            } else {
                $scope.onChange({itemSelected: $scope.itemSelected});
            }
        }
        $scope.linkOnSave = function () {
            $scope._afterChangeValue(true);
        }
        $scope.showAdvance = function (advanceSearchConfig, $event) {
            $scope.toggleSuggest(false);
            $scope.showAdvanceSearchEmp(advanceSearchConfig, $event)
        }
        $element.on('selectEditorClass.show', function ($event) {
            if ($event.target !== this) return;
            $scope.toggleSuggest(true);
            $scope.$apply();
        });
        $element.on('selectEditorClass.hide', function ($event) {
            if ($event.target !== this) return;
            $scope.toggleSuggest(false);
            $scope.$apply();
        });
        $input.on('focus', function (e) {
            if ($scope.selectText) {
                if ($bean.isNotEmpty($(this).val())) {
                    $(this).select();
                    $scope.selectedText = $(this).val();
                }
            } else {
                $scope.selectText = true;
            }
            $scope.loadData();
            $scope.processSearchComplete();
            $ng.$timeout(function () {
                $scope.toggleSuggest(true);
            });
        });
        $search.on('focus', function (e) {
            $scope.loadData();
            $scope.toggleSuggest(true);
        });
        $scope.indexFocus = -1;
        $input.on('keydown', function (e) {
            if (e.keyCode == $bean.KEY_CODE_UP) {
                if ($bean.isEmpty($scope.dSourceClone)) {
                    return;
                }
                $scope.indexFocus--;
                if ($scope.indexFocus < 0) {
                    $scope.indexFocus = $scope.dSourceClone.length - 1;
                }
                var _item = $scope.dSourceClone[$scope.indexFocus];
                if (_item) {
                    $scope.searchText = _item[$scope.fieldTitle];
                }
                $bean.scrollToElem($($element.find('.hd-suggest-item')[$scope.indexFocus]), $element.find('.hd-suggest'));
                $scope.$apply();
            } else if (e.keyCode == $bean.KEY_CODE_DOWN) {
                if ($bean.isEmpty($scope.dSourceClone)) {
                    return;
                }
                $scope.indexFocus++;
                if ($scope.indexFocus == $scope.dSourceClone.length) {
                    $scope.indexFocus = 0;
                }
                var _item = $scope.dSourceClone[$scope.indexFocus];
                if (_item) {
                    $scope.searchText = _item[$scope.fieldTitle];
                }
                $bean.scrollToElem($($element.find('.hd-suggest-item')[$scope.indexFocus]), $element.find('.hd-suggest'));
                $scope.$apply();
            } else if (e.keyCode == $bean.KEY_CODE_ENTER) {
                e.stopPropagation();
                e.preventDefault();
                var _itemSelected = {};
                _itemSelected[$scope.fieldTitle] = $scope.searchText;
                _itemSelected = $bean.getObjFromCollection($scope.dSource, _itemSelected);
                if ($bean.isNotNil(_itemSelected)) {
                    $scope.indexFocus = -1;
                    $scope.chooseItemValue(_itemSelected, true);
                }
                $scope.$apply();
            }
        });
        $input.on('keyup', function (e) {
            if (e.keyCode != $bean.KEY_CODE_UP && e.keyCode != $bean.KEY_CODE_DOWN && e.keyCode != $bean.KEY_CODE_ENTER) {
                $scope.indexFocus = -1;
                $scope.processSearchComplete();
                var _itemSelected = {};
                _itemSelected[$scope.fieldTitle] = $scope.searchText;
                _itemSelected = $bean.getObjFromCollection($scope.dSource, _itemSelected);
                if ($bean.isNil(_itemSelected) && $bean.isNotNil($scope.value)) {
                    $scope.resetValue(false);
                    if ($bean.isNotEmpty($scope.dSourceClone)) {
                        $scope.toggleSuggest(true);
                    }
                    $scope.skipWatch = true;
                    $scope.showIconRemove = false;
                }
                $scope.$apply();
            }
        });
        $input.on('blur', function (e) {
            if ($bean.isNil($scope.value)) {
                var _itemSelected = {};
                _itemSelected[$scope.fieldTitle] = $scope.searchText;
                _itemSelected = $bean.getObjFromCollection($scope.dSource, _itemSelected);
                if ($bean.isNotNil(_itemSelected)) {
                    $scope.indexFocus = -1;
                    $scope.chooseItemValue(_itemSelected, true);
                }
                $scope.$apply();
            }
        });
        $search.on('keydown', function (e) {
            var _itemSelected = {};
            _itemSelected[$scope.fieldTitle] = $scope.searchText;
            _itemSelected = $bean.getObjFromCollection($scope.dSource, _itemSelected);
            $scope.processSearchComplete();
            $scope.$apply();
        });

        // ui methods
        $scope.printInputPlaceholder = function () {
            if ($bean.isEmpty($scope.value)) {
                return $scope.emptyPlaceholder;
            } else {
                return $scope.addTitle;
            }
        }

        // $watch value
        $scope.$watch('value', function (newVal, oldVal) {
            if (!$scope.skipWatch) {
                $scope._afterChangeValue(false, ($bean.isNil(newVal) && oldVal != newVal));
            } else {
                $scope.skipWatch = false;
            }
        });
        $scope.$watch('valueTitle', function (newVal, oldVal) {
            $scope._afterChangeValue(false, false);
        });
        $scope.$watch('dSource', function (newVal, oldVal) {
            $scope._afterChangeValue(false, false);
        });
    },
    genTemplate: function (element, attrs, template, widgetName) {
        template = $widgets.genTemplate($widgets.classes.selectEditorClass, element, attrs, template, widgetName);
        if (attrs.itemTemplate == 'emp-box-info') {
            var empBoxInfo = $template.getTemplateDirective('emp-box-info');
            empBoxInfo = empBoxInfo.replaceAll('empInfo.', 'item.');
            empBoxInfo = empBoxInfo.replace('{{styleClass}}', '');
            template = template.replaceAll('{@suggest-item-template}', empBoxInfo);
        } else if (attrs.itemTemplate == 'com-box-info') {
            var comBoxInfo = $template.getTemplateDirective('com-box-info');
            comBoxInfo = comBoxInfo.replaceAll('comInfo.', 'item.');
            comBoxInfo = comBoxInfo.replace('{{styleClass}}', '');
            template = template.replaceAll('{@suggest-item-template}', comBoxInfo);
        } else if ($bean.isNotEmpty(attrs.itemTemplate)) {
            var boxInfo = $template.getTemplateDirective(attrs.itemTemplate);
            template = template.replaceAll('{@suggest-item-template}', boxInfo);
        } else {
            template = template.replaceAll('{@suggest-item-template}', '<span class="hd-suggest-item-title">{{item[fieldTitle]}}</span>');
        }

        return template;
    },
    onClickOut: function (widgetName, $event) {
        var $target = $event.target;
        if ($bean.clickCheckInsideException($target)) return;
        var tagName = $bean.camelToPascal(widgetName);
        var $widgetItem = $($event.target).closest(tagName);
        $(tagName).each(function () {
            var $item = $(this);
            if (!$item.is($widgetItem)) {
                $item.trigger('selectEditorClass.hide');
            } else {
                // do nothing
            }
        });
    }
};
$widgets.dependClass($widgets.classes.selectEditorClass);

// XEditorClass: lớp các widget editable dạng hiển thị, click vào mới trigger update
$widgets.classes.xEditorClass = {
    id: 'xEditorClass',
    depends: ['editorClass'],
    _default: {
        scope: {
            display: '@',
            popupTitle: '@',
            required: '=?',
            triggerUpdate: '=?'
        }
    },
    initClass: function ($scope, $element, attrs, widgetName) {
        if ($widgets.checkInitCalled($widgets.classes.xEditorClass, $scope)) return;
        $scope.isXEditorClass = true;
        // ui & model
        var $input = $element.find('input.hd-value-input');
        var $textarea = $element.find('textarea');
        $widgets.initWidgetDepend($widgets.classes.xEditorClass, $scope, $element, attrs, widgetName);
        $scope.display = $scope.display || 'popup';
        if ($scope.display == 'popup' && $bean.isNil($scope.popupTitle)) {
            $scope.popupTitle = JCommonUtil.message('common.update', 'common');
        }
        if ($bean.isNil($scope.emptyPlaceholder)) {
            $scope.emptyPlaceholder = JCommonUtil.message('ihcm.click.add', 'ihcm');
        }
        $element.addClass('display-' + $scope.display);
        if ($bean.isNil($scope.triggerUpdate)) {
            $scope.triggerUpdate = false;
        }
        $scope.triggerSuggest = false;
        $scope.saveTitle = JCommonUtil.message('common.save', 'common');
        $scope.cancelTitle = JCommonUtil.message('common.close', 'common');
        $scope.deleteTitle = JCommonUtil.message('common.delete', 'common');

        // events
        $scope.linkOnSave = function () {
            $scope.onChange({value: $scope.value});
        }
        $scope.onSave = function () {
        };
        $scope.doSave = function () {
            if (($scope.valueClone == $scope.value)
                || ($scope.required && $bean.isEmpty($scope.valueClone))) {
                $scope.doCancel();
                return;
            }
            $scope.doApplyValue();
            $scope.setTriggerUpdate(false);
            $scope.onSave();
        }
        $scope.doCancel = function () {
            $scope.valueClone = $bean.clone($scope.value);
            $scope.setTriggerUpdate(false);
        }
        $scope.setTriggerUpdate = function (status) {
            $scope.triggerSuggest = status;
            $scope.triggerUpdate = status;
            var $hdSuggest = $element.find('.hd-suggest');
            var $hDialog = $element.find('.h-dialog');
            if (status) {
                $element.addClass('active');
                $hdSuggest.addClass('active');
                $bean.showPos($($element), $hDialog, true, true);
                $hDialog.addClass('active');
                $ng.$timeout(function () {
                    $element.find('input').focus();
                    $element.find('textarea').focus();
                });
            } else {
                $element.removeClass('active');
                $hdSuggest.removeClass('active');
                $hDialog.removeClass('active');
            }
        }
        $scope.doApplyValue = function () {
            $scope.value = $bean.clone($scope.valueClone);
            $scope.linkOnSave();
        }

        // events
        $element.on('xEditorClass.show', function ($event) {
            if ($event.target !== this) return;
            $scope.setTriggerUpdate(true);
            $scope.$apply();
        });
        $element.on('xEditorClass.hide', function ($event) {
            if ($event.target !== this) return;
            $scope.doCancel();
            $scope.$apply();
        });
        $element.find('.hd-save').unbind(myClickHandler).bind(myClickHandler, function () {
            $scope.doSave();
        });
        $element.find('.hd-cancel').unbind(myClickHandler).bind(myClickHandler, function () {
            $scope.doCancel();
        });
        $input.on('keyup', function (e) {
            if (e.keyCode == $bean.KEY_CODE_ESC) {
                $scope.doCancel();
                $scope.$apply();
            }
        });
        $textarea.on('keyup', function (e) {
            if (e.keyCode == $bean.KEY_CODE_ESC) {
                $scope.doCancel();
                $scope.$apply();
            }
        });

        // ui methods
        $scope.printLabel = function (label) {
            if ($bean.isNotEmpty(label)) {
                return label;
            } else if ($bean.isNotEmpty($scope.value)) {
                return $scope.value;
            } else {
                return $scope.emptyPlaceholder;
            }
        }

        // watch models
        $scope.$watch('value', function (newVal, oldVal) {
            $scope.valueClone = $bean.clone($scope.value);
        });
    },
    genTemplate: function (element, attrs, template, widgetName) {
        template = $widgets.genTemplate($widgets.classes.xEditorClass, element, attrs, template, widgetName);
        return template;
    },
    onClickOut: function (widgetName, $event) {
        var $target = $event.target;
        if ($bean.clickCheckInsideException($target)) return;
        var tagName = $bean.camelToPascal(widgetName);
        var $widgetItem = $($event.target).closest(tagName);
        $(tagName).each(function () {
            var $item = $(this);
            if (!$item.is($widgetItem)) {
                if ($item.hasClass('active')) {
                    $item.trigger('xEditorClass.hide');
                }
            } else {
                // do nothing
            }
        });
    }
};
$widgets.dependClass($widgets.classes.xEditorClass);

// XEnterEditorClass: lớp các widget editable dạng nhập contentediable
$widgets.classes.xEnterEditorClass = {
    id: 'xEnterEditorClass',
    depends: ['xEditorClass', 'enterEditorClass'],
    _default: {
        scope: {
            multiLine: '=?'
        }
    },
    initClass: function ($scope, $element, attrs, widgetName) {
        if ($widgets.checkInitCalled($widgets.classes.xEnterEditorClass, $scope)) return;
        $widgets.initWidgetDepend($widgets.classes.xEnterEditorClass, $scope, $element, attrs, widgetName);

        // ui & model
        if ($bean.isNil($scope.multiLine)) {
            $scope.multiLine = false;
        }

        // events
        $scope.linkOnSave = function () {
            $scope.linkOnChange();
        }

        // ui methods

        // watch models
    },
    genTemplate: function (element, attrs, template, widgetName) {
        template = $widgets.genTemplate($widgets.classes.xEnterEditorClass, element, attrs, template, widgetName);
        return template;
    }
};
$widgets.dependClass($widgets.classes.xEnterEditorClass);

// XSelectEditorClass: lớp các widget dạng hiển thị, click vào để ch�?n từ một danh sách dữ liệu
$widgets.classes.xSelectEditorClass = {
    id: 'xSelectEditorClass',
    depends: ['xEditorClass', 'selectEditorClass'],
    _default: {
        scope: {
            multiLine: '=?'
        }
    },
    initClass: function ($scope, $element, attrs, widgetName) {
        if ($widgets.checkInitCalled($widgets.classes.xSelectEditorClass, $scope)) return;
        $widgets.initWidgetDepend($widgets.classes.xSelectEditorClass, $scope, $element, attrs, widgetName);

        // ui & model

        // events

        // ui methods

        // watch models
    },
    genTemplate: function (element, attrs, template, widgetName) {
        template = $widgets.genTemplate($widgets.classes.xSelectEditorClass, element, attrs, template, widgetName);
        return template;
    }
};
$widgets.dependClass($widgets.classes.xSelectEditorClass);

// TemplateClassBase: class cha của các widget template
$widgets.classes.templateClassBase = {
    id: 'templateClassBase',
    depends: ['widgetBase'],
    _default: {
        scope: {
            templateKey: '@',
            template: '@',
            appendTo: '@',
            onAppend: '@'
        }
    },
    initClass: function ($scope, $element, attrs, widgetName) {
        if ($widgets.checkInitCalled($widgets.classes.templateClassBase, $scope)) return;
        $widgets.initWidgetDepend($widgets.classes.templateClassBase, $scope, $element, attrs, widgetName);

        // ui & model

        // events

        // ui methods

        // watch models
    },
    genTemplate: function (element, attrs, template, widgetName) {
        template = $widgets.genTemplate($widgets.classes.templateClassBase, element, attrs, template, widgetName);
        return template;
    }
};
$widgets.dependClass($widgets.classes.templateClassBase);

// DatePickerClass: lớp tất cả các widget hiển thị và ch�?n ngày
$widgets.classes.dateEditorClass = {
    id: 'dateEditorClass',
    depends: ['editorClass'],
    _default: {
        scope: {
            minDate: '=?',
            maxDate: '=?',
            showTime: '=?',
            format: '=?',
            showDiv: '=?',
            lessThan: '=?',
            greaterThan: '=?'
        }
    },
    initClass: function ($scope, $element, attrs, widgetName) {
        if ($widgets.checkInitCalled($widgets.classes.dateEditorClass, $scope)) return;
        $widgets.initWidgetDepend($widgets.classes.dateEditorClass, $scope, $element, attrs, widgetName);
        $scope._showTime = $scope.showTime || false;
        if ($bean.isNil($scope.showDiv)) {
            $scope.showDiv = false;
        }
        $scope.changeDate = function () {
            var reApply = false;
            if ($scope._showTime) {
                if ($bean.isNotNil($scope.lessThan)) {
                    if ($scope.value > $scope.lessThan) {
                        var value = new Date($scope.value);
                        var lessThan = new Date($scope.lessThan);
                        JDateUtil.copyDayMonthYear(value, lessThan);
                        $scope.lessThan = JDateUtil.toString(lessThan, JDateUtil.FORMAT_DATE_TIME_JSON);
                        reApply = true;
                    }
                }
                if ($bean.isNotNil($scope.greaterThan)) {
                    if ($scope.value < $scope.greaterThan) {
                        var value = new Date($scope.value);
                        var greaterThan = new Date($scope.greaterThan);
                        JDateUtil.copyDayMonthYear(value, greaterThan);
                        $scope.greaterThan = JDateUtil.toString(greaterThan, JDateUtil.FORMAT_DATE_TIME_JSON);
                        reApply = true;
                    }
                }
            } else {
                if ($bean.isNotNil($scope.lessThan)) {
                    if ($scope.value > $scope.lessThan) {
                        var value = new Date($scope.value);
                        var lessThan = new Date($scope.lessThan);
                        JDateUtil.copyDayMonthYear(value, lessThan);
                        $scope.lessThan = JDateUtil.toString(lessThan, JDateUtil.FORMAT_DATE_JSON);
                        reApply = true;
                    }
                }
                if ($bean.isNotNil($scope.greaterThan)) {
                    if ($scope.value < $scope.greaterThan) {
                        var value = new Date($scope.value);
                        var greaterThan = new Date($scope.greaterThan);
                        JDateUtil.copyDayMonthYear(value, greaterThan);
                        $scope.greaterThan = JDateUtil.toString(greaterThan, JDateUtil.FORMAT_DATE_JSON);
                        reApply = true;
                    }
                }
            }
            if (reApply) {
                $scope.$apply();
            }
        }

        $scope.onkeyPress = function (e) {
            if (attrs.readonly && JSON.parse(attrs.readonly) == true && e.keyCode != $bean.KEY_CODE_BACKSPACE && e.keyCode != $bean.KEY_CODE_DELETE) {
                e.preventDefault();
                return false;
            } else {
                return true;
            }
        }

        registerDatePicker($scope, $element);
        $scope.$watch('value', function (newVal, oldVal) {
            if ($bean.isNotEmpty(newVal)) {
                registerDatePicker($scope, $element);
            }
        });
        $scope.$watch('minDate', function (newVal, oldVal) {
            if (newVal != oldVal) {
                registerDatePicker($scope, $element);
            }
        });
        $scope.$watch('maxDate', function (newVal, oldVal) {
            if (newVal != oldVal) {
                registerDatePicker($scope, $element);
            }
        });
        $scope.$watch('disabled', function (newVal, oldVal) {
            if (newVal != oldVal) {
                registerDatePicker($scope, $element);
            }
        });
        $scope.$watch('format', function (newVal, oldVal) {
            if (newVal != oldVal) {
                registerDatePicker($scope, $element);
            }
        });

        function registerDatePicker($scope, element) {
            var $target = $(element).find('.hdd-picker');
            $target.html('');
            var minDate_locale, maxDate_locale;
            $scope._format = $scope.format;
            if ($bean.isEmpty($scope._format)) {
                $scope._format = JDateUtil.FORMAT_DATE_TIME_JSON;
            }
            if ($scope._showTime) {
                $scope.minDate_locale = $bean.isEmpty($scope.minDate) ? null : JDateUtil.toDateMinuteLocalFormat($scope.minDate, $scope._format);
                $scope.maxDate_locale = $bean.isEmpty($scope.maxDate) ? null : JDateUtil.toDateMinuteLocalFormat($scope.maxDate, $scope._format);
                $scope.value_locale = $bean.isEmpty($scope.value) ? null : JDateUtil.toDateMinuteLocalFormat($scope.value, $scope._format);
            } else {
                $scope.minDate_locale = JDateUtil.toDateLocalFormat($scope.minDate, $scope._format);
                $scope.maxDate_locale = JDateUtil.toDateLocalFormat($scope.maxDate, $scope._format);
                $scope.value_locale = JDateUtil.toDateLocalFormat($scope.value, $scope._format);
            }
            var configs = {
                minDate: $scope.minDate_locale,
                maxDate: $scope.maxDate_locale,
                onSelect: function (dateText, inst) {
                    $scope.$apply(function () {
                        var date;
                        if ($scope._showTime) {
                            date = JDateUtil.getDateFormat(dateText, JDateUtil.dateMinuteFormat());
                        } else {
                            date = JDateUtil.getDateFormat(dateText);
                        }
                        $scope.value = JDateUtil.toString(date, JDateUtil.FORMAT_DATE_TIME_JSON);
                    });
                    $scope.changeDate();
                    $scope.onChange({value: dateText});
                }
            };
            if ($scope._showTime) {
                if ($scope.value_locale == null) {
                    $target.removeClass('hasDatepicker').datetimeminutepicker(configs).datetimeminutepicker('option', 'disabled', $scope.disabled);
                } else {
                    $target.removeClass('hasDatepicker').datetimeminutepicker(configs).datetimeminutepicker('setDate', $scope.value_locale)
                        .datetimeminutepicker('option', 'disabled', $scope.disabled);
                }
            } else {
                $target.removeClass('hasDatepicker').mydatepicker(configs).mydatepicker('setDate',
                    $scope.value_locale)
                    .mydatepicker('option', 'disabled', $scope.disabled);
            }
        }
    },
    genTemplate: function (element, attrs, template, widgetName) {
        template = $widgets.genTemplate($widgets.classes.dateEditorClass, element, attrs, template, widgetName);
        return template;
    }
};
$widgets.dependClass($widgets.classes.dateEditorClass);

// XDateEditorClass: lớp các widget ch�?n ngày dạng Editor inside|dialog
$widgets.classes.xDateEditorClass = {
    id: 'xDateEditorClass',
    depends: ['xEditorClass', 'dateEditorClass'],
    _default: {
        scope: {}
    },
    initClass: function ($scope, $element, attrs, widgetName) {
        if ($widgets.checkInitCalled($widgets.classes.xDateEditorClass, $scope)) return;
        $widgets.initWidgetDepend($widgets.classes.xDateEditorClass, $scope, $element, attrs, widgetName);

        // ui & model

        // events

        // ui methods

        // watch models
    },
    genTemplate: function (element, attrs, template, widgetName) {
        template = $widgets.genTemplate($widgets.classes.xDateEditorClass, element, attrs, template, widgetName);
        return template;
    }
};
$widgets.dependClass($widgets.classes.xDateEditorClass);

// layoutClass: lớp tất cả các widget hiển thị nội dung ngoài "onPage" (như: Dialog, Dropdown, Alert...)
$widgets.classes.layoutClass = {
    id: 'layoutClass',
    depends: ['widgetBase'],
    _default: {
        scope: {
            layoutId: '@'
        }
    },
    initClass: function ($scope, $element, attrs, widgetName) {
        if ($widgets.checkInitCalled($widgets.classes.layoutClass, $scope)) return;
        $widgets.initWidgetDepend($widgets.classes.layoutClass, $scope, $element, attrs, widgetName);

        // ui & model

        // events

        // ui methods

        // watch models
    },
    genTemplate: function (element, attrs, template, widgetName) {
        template = $widgets.genTemplate($widgets.classes.layoutClass, element, attrs, template, widgetName);
        return template;
    }
};
$widgets.dependClass($widgets.classes.layoutClass);