/**
 * User: thangtv
 * Date: 11/4/13
 * Time: 10:34 PM
 */
var JGlobal = (function (window, $, undefined) {
    var ins = {};

    ins.VERSION_FREE = 1 << 0;
    ins.VERSION_STANDARD = 1 << 1;
    ins.VERSION_ENTERPRISE = 1 << 2;

    ins.DEFAULT_PAGE_SIZE = 30;
    /* Feature*/
    ins.CODE_ATTACHMENT_EXTEND = "ATTACHMENT.EXTEND";

    ins.module = null;
    ins.featureList = null;
    ins.isRoot = false;
    ins.proxyProtocol = null;
    ins.domainSuffix = null;
    ins.fullUrl = null;
    ins.contextRoot = null;
    ins.actionPattern = null;
    ins.actionMethod = null;
    ins.language = 'vi'; //Ngôn ngữ hiện tại
    ins.localeDateTimeFormat = null;
    ins.labelEdit = null; //Có quyền sửa label hay không
    ins.quicklinkShow = null;
    ins.myteamShow = null;
    ins.myteamControl = null;
    /*Orgchart*/
    ins.orgChartScroll = null;
    ins.orgChart = null;
    ins.orgChartMini = null;
    ins.orgChartMiniUrlRedirect = null;
    /*Comchart*/
    ins.comChart = null;
    ins.comChartMini = null;
    ins.comChartMiniUrlRefirect = null;
    /*GoalChart*/
    ins.goalChart;
    ins.isMobile = false;
    ins.attachmentRoot = null;
    ins.attachmentPath = null;
    ins.messageAlertInstallApp = null;
    ins.demand = null;

    /*Dialog*/
    ins.DIALOG_SIZE_1 = 300;
    ins.DIALOG_SIZE_2 = 576;
    ins.DIALOG_SIZE_3 = 1000;

    ins.regFloat = null;

    ins.loginEmp = null;
    ins.originDataForms = {};
    ins.serverTime = new Date().getTime();
    ins.serverTimeInterval_j = null;
    ins.serverTimeInterval_t = 100;
    ins.setServerTime = function (serverTime) {
        clearInterval(ins.serverTimeInterval_j);
        ins.serverTime = serverTime;
        ins.serverTimeInterval_j = setInterval(function () {
            ins.serverTime += ins.serverTimeInterval_t;
        }, ins.serverTimeInterval_t);
    }
    ins.getServerDay = function () {
        var today = new Date(JGlobal.serverTime);
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        return today;
    }
//    ins.reportGoalWorkingColors =[[COLOR_STATUS_ONTRACK, COLOR_STATUS_OVERDUE, COLOR_STATUS_COMPLETED,COLOR_STATUS_COMPLETED_OVERDUE]];
    ins.actionLogReportColors = {1: "#0071bc", 2: "#e11b22", 4: "#99BC5B", 8: "#27ae60", 16: "#6e3671", 32: "#ffc40d"};
    ins.reportGoalWorkingColors = ["#27ae60", "#e11b22", "#0072bc", "#f7921e"];
    ins.reportGoalWorkingStatusCompletedColors = ["#abc8dc", "#0072bc"];
    ins.reportGoalWorkingStatusColors = ["#abc8dc", "#27ae60", "#0072bc"];
    ins.reportStatisticEmailColors = ["#27ae60", "#abc8dc"];
    ins.reportDemoTrialcolors = ['#4bb2c5', '#27ae60'];
    ins.reportContactStatusLoginColors = ["#abc8dc", "#27ae60"];
    ins.reportChartInfoCompleteColors = ["#abc8dc", "#27ae60"];
    ins.contactDashboardColors = ["#27ae60", "#c9cccf", "#abc8dc", "#27ae60", "#0072bc", "#AA1829", "#f7921e", "#e11b22"];
    ins.reportOrgGoalWorkingColors = ["#0072bc", "#27ae60", "#e11b22", "#f7921e", "#c9cccf"];
    ins.customerDashboardGoalWorkingColors = ["#0072bc", "#f7921e"];
    ins.reportOrgUserColors = ["#0072bc", "#f7921e"];
    ins.reportRequestAprovalStatusColors = ["#27ae60", "#0072bc", "#abc8dc"];
    ins.reportEmp = null;
    ins.reportKpiPeriodTrendColors = ["#0071bb", "#f7931d", "#ed1c24", "#bde5f8"];

    ins.ONE_DAY_IN_MILLIS = 24 * 60 * 60 * 1000;
    ins.ONE_WEEK_IN_MILLIS = 7 * ins.ONE_DAY_IN_MILLIS;

    return ins;
})(window, jQuery);
var AJAX_CODE_ERROR_AUTHEN = 901;
var AJAX_CODE_ERROR_EXPIRED = 902;
var AJAX_CODE_ERROR_INVALID = 903;
var AJAX_CODE_ERROR_BAD_GATEWAY = 502;
var AJAX_CODE_ERROR_DISCONNECTED = -1;
var AJAX_CODE_ERROR_COMMON = 111;

var COLOR_COMMON_00 = "#ffffff";
var COLOR_COMMON_01 = "#0072bc";
var COLOR_COMMON_02 = "#f7921e";
var COLOR_COMMON_03 = '#c9cccf';
var COLOR_COMMON_RED = '#ff0000';
var COLOR_COMMON_LIGHT_RED = '#ff2200';

//Status Tracking
var COLOR_STATUS_ONTRACK = "#27ae60";
var COLOR_STATUS_OVERDUE = "#e11b22";
var COLOR_STATUS_COMPLETED = "#0072bc";
var COLOR_STATUS_COMPLETED_OVERDUE = "#f7921e";

var ERROR_PREFIX = "@error:";
var SUCCESS_PREFIX = "@success:";
var SUBMIT_FORM = false;

//Screen
/*
 *  <= 320: iPhone – 320 x 480Samsung, HTC, LG – 320 x 480
 *  > 320: iPhone – 320 x 480HTC, LG, Samsung, Motorola – 320 x 480HTC, LG, Samsung, Motorola, Nokia Lumia - 480 x 800
 * */
var SCREEN_320 = 320;
var SCREEN_480 = 480;// > 480 HTC – 540 x 960HTC, Motorola, Samsung – 720 x 1280
var SCREEN_639 = 639;// >
var SCREEN_768 = 768;// > 768 Tablet browsersHTC, LG, Samsung, Motorola, Nokia – 480 x 800iPad, iPad mini – 768 x 1024Samsung Galaxy Note – 800 x 1280
var SCREEN_1024 = 1024;// > 768 Tablet browsersHTC, LG, Samsung, Motorola, Nokia – 480 x 800iPad, iPad mini – 768 x 1024Samsung Galaxy Note – 800 x 1280
var SCREEN_960 = 960;// >= 960 Desktop computersHigh resolution devicesiPad, iPad mini – 768 x 1024Samsung Galaxy Note – 800 x 1280

LOCALE_VI = 'vi';

var myClickHandler = ('ontap' in document.documentElement ? "tap" : "click");
//var myClickHandler = "click";

var glTimeoutAlert = 15000;

/*Validation - hyper_validatorv31.js*/
var form;
var REQUIRED = "required";
var NOT_REQUIRED = "notRequired";
var REQUIRED_DEPEND = "requiredDepend";
var MAX_LENGTH = "maxlengthValue";
var MIN_LENGTH = "minlengthValue";
var ALPHANUMERIC = "alphanumeric"; //[^A-Za-z0-9]
var REG_ALPHANUMERIC = "[^A-Za-z0-9-_]";
var ALPHANUMERIC_SPACE = "alphanumericSpace"; //[^A-Za-z0-9\s]
var REG_ALPHANUMERIC_SPACE = "[^A-Za-z0-9\s]";
var ALPHANUMERIC_EXTEND = "alphanumericExtend"; //[^A-Za-z0-9\s]
var REG_ALPHANUMERIC_EXTEND = "[^A-Za-z0-9-_\.]";
var ALPHANUMERIC_EXTEND2 = "alphanumericExtend2";
var NUMERIC = "numeric"; //[^0-9]
var REG_NUMERIC = "[^0-9]";
var REG_FLOAT_VI = /^\d+,?\d*$/;
var REG_FLOAT_IN = /^\d+.?\d*$/;
var DATE_TIME_FORMAT_VI = 'dd/MM/yyyy HH:mm:ss';
var DATE_TIME_FORMAT_IN = 'yyyy-MM-dd HH:mm:ss';
var DECIMAL = "decimal"; //[^0-9\.]
var DECIMAL_PERCENT = "decimalPercent"; //[^0-9\.]
var COMMA = "comma";
var REG_DECIMAL = "[^\-?\+?0-9\.\,]";
var REG_COMMA = "[^0-9\,]";
var FLOAT = "float";
var ALPHABETIC = "alphabetic"; //[^A-Za-z]
var REG_ALPHABETIC = "[^A-Za-z]";
var ALPHABETIC_SPACE = "alphabeticSpace"; //[^A-Za-z\s]
var REG_ALPHABETIC_SPACE = "[^A-Za-z\s]";
var EMAIL = "email";
var REG_EMAIL = /^[A-Za-z0-9]+([_\.-][A-Za-z0-9]+)*@[A-Za-z0-9]+([_-][A-Za-z0-9]+)*(\.[A-Za-z0-9]+([_-][A-Za-z0-9]+)*){0,3}\.([A-Za-z]){2,4}$/i;
var NOT_NULL = "notNull";
var EQUAL_VALUE = "equalValue";
var NOT_EQUAL_VALUE = "notEqualValue";
var LESS_THAN_VALUE = "lessThanValue";
var LESS_EQUAL_VALUE = "lessEqualValue";
var GREATER_THAN_VALUE = "greaterThanValue";
var GREATER_EQUAL_VALUE = "greaterEqualValue";
var EQUAL_DEPEND = "equalDepend";
var EQUAL_NOT_NULL_DEPEND = "equalNotNullDepend";
var NOT_EQUAL_DEPEND = "notEqualDepend";
var LESS_THAN_DEPEND = "lessThanDepend";
var LESS_EQUAL_DEPEND = "lessEqualDepend";
var GREATER_THAN_DEPEND = "greaterThanDepend";
var GREATER_EQUAL_DEPEND = "greaterEqualDepend";
var REGEXP = "regexpValue";
var REGEXP_REVERSE = "regexpReverseValue";
var DONT_SELECT = "dontSelect";
var DONT_SELECT_CHK = "dontSelectChk";
var MUST_SELECT_CHK = "mustSelectChk";
var SELECT_ONE_RADIO = "selectOneRadio";
var DATE = "date";
var DATETIME = "datetime";
var DATE_LESS_THAN_VALUE = "dateLessThanValue";
var DATE_LESS_EQUAL_VALUE = "dateLessEqualValue";
var DATE_GREATER_THAN_VALUE = "dateGreaterThanValue";
var DATE_GREATER_EQUAL_VALUE = "dateGreaterEqualValue";
var DATE_LESS_THAN_DEPEND = "dateLessThanDepend";
var DATE_LESS_EQUAL_DEPEND = "dateLessEqualDepend";
var DATE_GREATER_THAN_DEPEND = "dateGreaterThanDepend";
var DATE_GREATER_EQUAL_DEPEND = "dateGreaterEqualDepend";
var DATE_EQUAL_DEPEND = "dateEqualDepend";
var TEL = "tel";
//var REG_TEL = "[^0-9]{7,15}";
var HTML = "html";
var REG_HTML = /.*(\<).*(\>).*/i;
var LONG = "long";
var REG_LONG = /^(\-){0,1}([1-9]){1,}([0-9])*$/;
var DOMAIN_LABEL = "domainLabel";
var REG_DOMAIN_LABEL = /^([A-Za-z0-9\-]){1,}$/;
var DOMAIN = "domain";
var TEL_VN = "telVn";//Số điện thoại Việt Nam
var REG_TEL_VN = /^(\+)([0-9]){1,3}((\-([0-9]){1,3}\-([0-9]){7,9})|(\-([0-9]){7,12}))$/;
var TEL_INTERNATIONAL = "telInt";//Số điện thoại quốc tế hoặc việt nam
var REG_TEL_INTERNATIONAL = /^(\+)([0-9]){1,3}\-([0-9]){7,12}$/;
var IPV4 = "ipv4";
var REG_IPV4 = /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[0-9][0-9]|[01]?[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$/;
var IPV6 = "ipv6";
var REG_IPV6 = "^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$";
var BANKEY_LABEL = "banKeyLabel";
var REG_BANKEY_LABEL = /^(\*){0,1}([A-Za-z0-9]){1,}([A-Za-z0-9\-])*([A-Za-z0-9])*(\*){0,1}$/;
var TAX_CODE = "taxCode";
var REG_TAX_CODE = "^[0-9]{10}([0-9]{3})*$";
var SELECTED_TAB = false;
var FILE_EXTN = "fileExtn";
var IN_VALUE = "inValue";
var PERCENT = "percent";
var REG_PERCENT = "^(([0-9]{1})|([1-9]{1}[0-9]{1})|100)$";
var PERCENT_EXTEND = "percentExtend";
var REG_PERCENT_EXTEND = "^(([0-9]{1})|([1-9]{1}[0-9]{1,2}))$";
var INTEGER = "integer";
var REG_INTEGER = /^0*\d{1,4}$/;
var REG_FLOAT = /^0*\d{1,4},?\d{0,4}$/;
var PASSWORD = "password";
var REG_PASSWORD = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
var COUPON_CODE = "couponCode";
var REG_COUPON_CODE = /^[A-Z0-9]{6}$/;
var USERNAME = "username";
var REG_USERNAME = /^[-@A-Za-z_.0-9]{1,32}$/
//var REG_INTEGER = "^(([0-9]{1})|([1-9]{1}[0-9]{1,3}))$";
/**/
