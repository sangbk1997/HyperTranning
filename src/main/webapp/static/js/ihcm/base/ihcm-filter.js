/**
 * Created by tronghh_vdi on 8/3/2016.
 */
var commonMod = angular.module('commonMod', []);
commonMod.filter('highlight', function ($sce) {
    return function (text, phrase) {
        if (phrase) {
            text = text.replace(new RegExp('(' + phrase + ')', 'gi'), '<span class="txt-hl">$1</span>');
        }
        return $sce.trustAsHtml(text);
    }
});
commonMod.filter('printDate', function () {
    return function (value) {
        if ($bean.isEmpty(value)) {
            return '';
        }
        return JDateUtil.toString(new Date(value));
    }
})
commonMod.filter('printDateTime', function () {
    return function (value) {;
        if ($bean.isEmpty(value)) {
            return '';
        }
        return JDateUtil.toDateMinuteString(new Date(value), JDateUtil.FORMAT_DATE_MINUTE_LOCALE[JGlobal.language]);
    }
});
commonMod.filter('printTime', function () {
    return function (value) {
        if ($bean.isEmpty(value)) {
            return '';
        }
        return JDateUtil.toDateTimeString(new Date(value), JDateUtil.FORMAT_DATE_TIME_LOCALE[JGlobal.language]);
    }
});
commonMod.filter('printMillisecond', function () {
    return function (value) {
        if ($bean.isEmpty(value)) {
            return '';
        }
        return new Date(value).getTime();
    }
});
commonMod.filter('printNumber', function () {
    return function (value) {
        if ($bean.isEmpty(value)) {
            return '';
        }
        return Math.floor(value);
    }
});
commonMod.filter('printFloatLocale', function () {
    return function (value) {
        if ($bean.isEmpty(value)) {
            return '';
        }
        return parseFloat((value + '').replace(',', '.')).toFixed(2).replace('.00', '').replace('.', ',');
    }
});
commonMod.filter('printMarkText', function () {
    return function (value) {
        if ($bean.isEmpty(value)) {
            return '---';
        }
        var re = '\\d(?=(\\d{3})+\\D)';
        var num = value.toFixed(2);
        return num.replace('.', ',').replace(new RegExp(re, 'g'), '$&.').replace(',00', '');
    }
});
commonMod.filter('printPercent', function () {
    return function (value) {
        if ($bean.isEmpty(value)) {
            return '';
        }
        return parseFloat((value + '').replace(',', '.')).toFixed(2).replace('.00', '').replace('.', ',') + '%';
    }
});
commonMod.filter('printFloat' +
    '', function () {
    return function (value) {
        if ($bean.isEmpty(value)) {
            return '';
        }
        return parseFloat((value + '').replace(',', '.')).toFixed(2).replace('.00', '').replace('.', ',');
    }
});
commonMod.filter('printFbTime', function () {
    return function (date) {
        if ($bean.isEmpty(date)) {
            return '';
        }
        return $bean.getFbTime(new Date(date).getTime(), JGlobal.serverTime);
    }
});
commonMod.filter('printFullPath', function () {
    return function (path) {
        if ($bean.isEmpty(path)) {
            return '';
        }
        return JGlobal.contextRoot + path;
    }
});
commonMod.filter('printEmpTags', function () {
    return function (empTags) {
        if ($bean.isEmpty(empTags)) {
            return '';
        }
        var count = $bean.countCollection(empTags);
        if (count == 0) {
            return '';
        }
        if (count == 1) {
            return empTags[0].fullName;
        }
        if (count > 1) {
            return empTags[0].fullName + ' ' + JCommonUtil.message('common.and', 'common') + ' ' + (count - 1) + ' ' + JCommonUtil.message('common.emp.another', 'common');
        }

        return JGlobal.contextRoot + path;
    }
});
commonMod.filter('convertUrl', function () {
    return function (hyperRightUrl) {
        return JCommonUtil.convertUrl(hyperRightUrl);
    }
});
commonMod.filter('printMsg', function () {
    return function (msgKey) {
        if ($bean.isEmpty(msgKey)) {
            return msgKey;
        }
        var key, bundle;
        bundle = msgKey.substring(0, msgKey.indexOf($bean.STR_DOT));
        if (!$bean.valueIn(bundle, $bean.MSG_BUNDLES)) {
            return msgKey;
        }
        if (msgKey.indexOf($bean.STR_COMMA) != -1) {
            var pair = $bean.split(msgKey);
            key = pair[0];
            bundle = pair[1];
        } else {
            key = msgKey;
            bundle = msgKey.substring(0, msgKey.indexOf($bean.STR_DOT));
        }
        return JCommonUtil.message(key, bundle);
    }
});
commonMod.filter('workingStatus', function () {
    return function (value) {
        return workingConfigs.workingStatuses[value].name;
    }
});
commonMod.filter('goalStatus', function () {
    return function (value) {
        return goalConfigs.goalStatus.fields[value].name;
    }
});
