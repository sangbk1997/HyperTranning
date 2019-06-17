var JAutocomplete = (function (window, $) {
    var ins = {};
    //On change value
    ins.INVALID = 'invalid';
    ins.onFocusout = function (sourceName, nameId, valueId) {
        if (typeof(window[sourceName]) == $bean.TYPE_UNDEFINED) {
            setTimeout(function () {
                ins.onFocusout(sourceName, nameId, valueId);
            }, 100);
            return true;
        }
        if ($bean.isNotEmpty(nameId)) {
            var value_ = $("#" + nameId).val();
            var filtered = $(window[sourceName]).filter(function () {
                return this.label == value_;
            });
            if ($bean.isNotEmpty(valueId)) {
                if ($bean.isEmpty(value_)) {
                    $("#" + valueId).val("");
                    if ($bean.isNotEmpty($("#" + valueId).attr('fullPathPhoto'))) {
                        $("#" + valueId).attr('fullPathPhoto', "");
                    }
                } else if (filtered.length > 0) {
                    $("#" + valueId).val(filtered[0].hiddenName);
                    if (filtered[0].photoField) {
                        $("#" + valueId).attr('fullPathPhoto', filtered[0].photoField);
                    }
                } else {
                    $("#" + valueId).val("invalid");
                }
            }
        }
    }
    //On select value
    ins.onSelect = function (nameId, valueId, data, callback) {
        if ($bean.isNotEmpty(nameId)) {
            $("#" + nameId).val(data.item.labelValue);
            $("#" + nameId).change();
        }
        if ($bean.isNotEmpty(valueId)) {
            $("#" + valueId).val(data.item.hiddenName);
            if (data.item.photoField) {
                $("#" + valueId).attr('fullPathPhoto', data.item.photoField);
            } else {
                $("#" + valueId).attr('fullPathPhoto', '');
            }
            $("#" + valueId).change();
        }
        if (callback) {
            callback();
        }
        $("#" + nameId).blur();
        return false;
    }
    //Update value
    ins.updateValue = function (sourceName, nameId, valueId) {
        if (typeof(window[sourceName]) == $bean.TYPE_UNDEFINED) {
            $('#' + nameId).autocomplete('search', new Date().getTime().toString());
            setTimeout(function () {
                ins.updateValue(sourceName, nameId, valueId);
            }, 100);
            return true;
        }
        if ($bean.isNotEmpty(valueId)) {
            var value_ = $("#" + valueId).val();
            var filtered = $(window[sourceName]).filter(function () {
                return this.hiddenName == value_;
            });
            if (filtered.length > 0) {
                $("#" + nameId).val(filtered[0].label);
            }
        }
        return true;
    }
    ins.validateAutocomplete = function (theForm) {
        var ok = true;
        $(theForm).find('input[type="hidden"]').each(function () {
            if ($bean.isNotEmpty($(this).parent().find('.ui-autocomplete-input'))) {
                if ($(this).val() == JAutocomplete.INVALID) {
                    ok = false;
                    $(this).parent().find('.ui-autocomplete-input').parent().append('<div class="form-error"><span class="lbl-error">' + JCommonUtil.message('error.autocomplete.select.invalid', 'error') + '</span></div>');
                }
            }
        });
        return ok;
    }
    return ins;
})(window, jQuery);