String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
};
String.prototype.trimInner = function () {
    return this.replace(/\s{2,}/g, ' ');
};
String.prototype.format = String.prototype.f = function () {
    var s = this,
        i = arguments.length;
    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
//Check jQuery object null
$.fn.presence = function () {
    return this && this.length !== 0;
}
$.fn.showError = function (key, bundle, args) {
    if ($bean.isEmpty(key)) {
        $(this).parent().find('.form-error').remove();
    } else {
        if ($(this).is('input') && $(this).attr('type') == 'hidden') {
            $(this).parent().find('input').not(':hidden').parent().append('<div class="form-error">' + JCommonUtil.message(key, bundle, args) + '</div>');
        } else {
            $(this).parent().append('<div class="form-error">' + JCommonUtil.message(key, bundle, args) + '</div>');
        }
    }
}

jQuery.fn.ForceNumericOnly = function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
            // home, end, period, dash and numpad decimal
            return (
                key == 8 ||
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 189 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
}

jQuery.fn.selectAllText = function () {
    var doc = document;
    var element = this[0];
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};