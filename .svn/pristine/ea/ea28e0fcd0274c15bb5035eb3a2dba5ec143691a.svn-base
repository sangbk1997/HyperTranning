/*
 -------------------------------------------------------------------------
 JavaScript Form Validator (gen_validatorv31.js)
 Version 3.1.2
 Copyright (C) 2003-2008 JavaScript-Coder.com. All rights reserved.
 You can freely use this script in your Web pages.
 You may adapt this script for your own needs, provided these opening credit
 lines are kept intact.

 The Form validation script is distributed free from JavaScript-Coder.com
 For updates, please visit:
 http://www.javascript-coder.com/html-form/javascript-form-validation.phtml

 Questions & comments please send to form.val at javascript-coder.com
 -------------------------------------------------------------------------
 */

function Validator(frmname, formId) {
    if (formId) {
        this.formobj = document.getElementById(formId);
    } else {
        this.formobj = document.forms[frmname];
    }
    if (!this.formobj) {
        JCommonUtil.alert({
            messageType: JCommonUtil.MESSAGE_TYPE_ERROR,
            message: "Error: couldnot get Form object " + frmname
        });
        //alert("Error: couldnot get Form object " + frmname);
        return;
    }
    if (this.formobj.onsubmit) {
        this.formobj.old_onsubmit = this.formobj.onsubmit;
        this.formobj.onsubmit = null;
    }
    else {
        this.formobj.old_onsubmit = null;
    }
    this.theForm = this.formobj;
    form = this.formobj;
    this.formobj._sfm_form_name = this.formobj.name;
    this.formobj.onsubmit = form_submit_handler;
    this.addValidation = add_validation;
    this.addFunctionValidate = add_function_validate;
    this.setAddnlValidationFunction = set_addnl_vfunction;
    this.clearAllValidations = clear_all_validations;
    this.disable_validations = false;//new
    document.error_disp_handler = new sfm_ErrorDisplayHandler(this.theForm);
    this.EnableOnPageErrorDisplay = validator_enable_OPED;
    this.EnableOnPageErrorDisplaySingleBox = validator_enable_OPED_SB;
    this.show_errors_together = true;
    this.EnableMsgsTogether = sfm_enable_show_msgs_together;
    document.set_focus_onerror = !this.show_errors_together;
    this.EnableFocusOnError = sfm_validator_enable_focus;
}

function sfm_validator_enable_focus(enable) {
    document.set_focus_onerror = enable;
}

function set_addnl_vfunction(functionname) {
    this.formobj.addnlvalidation = functionname;
}

function sfm_set_focus(objInput) {
    if (document.set_focus_onerror) {
        objInput.focus();
    }
    //ThangTV -- 06/09/2010 -- Hiển thị tab có lỗi
//    if (!SELECTED_TAB) {
//        SELECTED_TAB = displayTab(objInput);
//    }
}

function sfm_enable_show_msgs_together() {
    this.show_errors_together = true;
    this.formobj.show_errors_together = true;
}

function clear_all_validations() {
    for (var itr = 0; itr < this.formobj.elements.length; itr++) {
        this.formobj.elements[itr].validationset = null;
    }
}

function form_submit_handler() {
    if ($("#error_head")) {
        $("#error_head").remove();
    }
    SELECTED_TAB = false;
    SUBMIT_FORM = true;
    var bRet = true;
    document.error_disp_handler.clear_msgs();
    for (var itr = 0; itr < this.elements.length; itr++) {
        if (this.elements[itr].validationset && !this.elements[itr].validationset.validate()) {
            bRet = false;
        }
        if (!bRet && !this.show_errors_together) {
            break;
        }
    }
    if (this.addnlvalidation) {
        str = " var ret = " + this.addnlvalidation + "()";
        eval(str);
        if (!ret) {
            bRet = false;
        }
    }
    if ($bean.isNotEmpty(this.functionValidateExtend)) {
        for (var i = 0; i < this.functionValidateExtend.length; i++) {
            if (!this.functionValidateExtend[i]()) {
                bRet = false;
            }
        }
    }
    if (!bRet) {
        document.error_disp_handler.FinalShowMsg();
        SUBMIT_FORM = false;
        return false;
    }
    return true;
}

function add_validation(itemname, descriptor, errstr) {
    var condition = null;
    if (arguments.length > 3) {
        condition = arguments[3];
    }
    if (!this.formobj) {
        //alert("Error: The form object is not set properly");
        return;
    }
    //if
    var itemobj = this.formobj[itemname];
    if (!itemobj) {
        //alert("Error: Couldnot get the input object named: "+itemname);
        return;
    }
    if (itemobj.length && isNaN(itemobj.selectedIndex))
    //for radio button; don't do for 'select' item
    {
        itemobj = itemobj[0];
    }

    if (!itemobj.validationset) {
        itemobj.validationset = new ValidationSet(this.theForm, itemobj, this.show_errors_together);
    }
    itemobj.validationset.add(descriptor, errstr, condition);
    itemobj.validatorobj = this;
}

function validator_enable_OPED() {
    document.error_disp_handler.EnableOnPageDisplay(false);
}

function validator_enable_OPED_SB() {
    document.error_disp_handler.EnableOnPageDisplay(true);
}

function sfm_ErrorDisplayHandler(theForm) {
    this.theForm = theForm;
    this.msgdisplay = new AlertMsgDisplayer();
    this.EnableOnPageDisplay = edh_EnableOnPageDisplay;
    this.ShowMsg = edh_ShowMsg;
    this.FinalShowMsg = edh_FinalShowMsg;
    this.all_msgs = new Array();
    this.clear_msgs = edh_clear_msgs;
}

function edh_clear_msgs() {
    this.msgdisplay.clearmsg(this.all_msgs);
    this.all_msgs = new Array();
}
function add_function_validate(func) {
    if ($bean.isEmpty(this.formobj.functionValidateExtend)) {
        this.formobj.functionValidateExtend = [];
    }
    this.formobj.functionValidateExtend[this.formobj.functionValidateExtend.length] = func;
}
//ThangTV Edit 07/06/2013
function edh_FinalShowMsg() {
    this.msgdisplay.showmsg(this.all_msgs);
    if ('true' == JGlobal.labelEdit) {
        $('.lbl-error').tooltipster({
            trigger: 'click',
            icon: '/img/icon/edit.png',
            iconDesktop: true,
            iconTouch: true,
            interactive: true,
            lbl: 1,
            updateData: true
        });
    }
}

function edh_EnableOnPageDisplay(single_box) {
    if (true == single_box) {
        this.msgdisplay = new SingleBoxErrorDisplay();
    }
    else {
        this.msgdisplay = new DivMsgDisplayer(this.theForm);
    }
}

function edh_ShowMsg(msg, input_element) {
    var objmsg = new Array();
    // LongDT edit : check hidden input
    if ($(input_element).is('input') && $(input_element).attr('type') == 'hidden') {
        objmsg["input_element"] = $(input_element.parentNode).find('input, select').not(':hidden')[0];
    } else {
        objmsg["input_element"] = input_element;
    }
    //objmsg["input_element"] = input_element;
    objmsg["msg"] = msg;
    this.all_msgs.push(objmsg);
}

function AlertMsgDisplayer() {
    this.showmsg = alert_showmsg;
    this.clearmsg = alert_clearmsg;
}

function alert_clearmsg(msgs) {
}

function alert_showmsg(msgs) {
    var whole_msg = "";
    var first_elmnt = null;
    for (var m = 0; m < msgs.length; m++) {
        if (null == first_elmnt) {
            first_elmnt = msgs[m]["input_element"];
        }
        whole_msg += msgs[m]["msg"] + "\n";
    }
    alert(whole_msg);
    if (null != first_elmnt) {
        sfm_set_focus(first_elmnt);
    }
}

function sfm_show_error_msg(msg, input_elmt) {
    document.error_disp_handler.ShowMsg(msg, input_elmt);
}

function SingleBoxErrorDisplay() {
    this.showmsg = sb_div_showmsg;
    this.clearmsg = sb_div_clearmsg;
}

function sb_div_clearmsg(msgs) {
    var divname = form_error_div_name(msgs);
    show_div_msg(divname, "");
}

function sb_div_showmsg(msgs) {
    var whole_msg = "<ul>\n";
    for (var m = 0; m < msgs.length; m++) {
        whole_msg += "<li>" + msgs[m]["msg"] + "</li>\n";
    }
    whole_msg += "</ul>";
    var divname = form_error_div_name(msgs);
    show_div_msg(divname, whole_msg);
}

function form_error_div_name(msgs) {
    var input_element = null;
    for (var m in msgs) {
        input_element = msgs[m]["input_element"];
        if (input_element) {
            break;
        }
    }
    var divname = "";
    if (input_element) {
        divname = (input_element.form.id || input_element.form._sfm_form_name) + "_errorloc";
    }
    return divname;
}

function DivMsgDisplayer(theForm) {
    this.theForm = theForm;
    this.showmsg = div_showmsg;
    this.clearmsg = div_clearmsg;
}

function div_clearmsg(msgs) {
    for (var m in msgs) {
        var input_element = msgs[m]["input_element"];
        if (input_element) {
            divname = element_div_name(this.theForm, msgs[m]["input_element"]);
            show_div_msg(divname, "");
        }
        //        var divname = element_div_name(msgs[m]["input_element"]);
        //        show_div_msg(divname,"");
    }
}

function element_div_name(theForm, input_element) {
    var divname = (theForm.id || theForm._sfm_form_name) + "_" + input_element.name + "_errorloc";
    divname = divname.replace(/[\[\]]/gi, "");
    return divname;
}
//ThangTV
function div_showmsg(msgs) {
    var input_element = null;
    var divname = "";
    var first_elmnt = null;
    for (var m = 0; m < msgs.length; m++) {
        input_element = msgs[m]["input_element"];
        if (input_element) {
            if (null == first_elmnt) {
                first_elmnt = input_element;
            }
            divname = (input_element.form.id || input_element.form._sfm_form_name) + "_" + input_element.name + "_errorloc";
            var divError = document.createElement("div");
            divError.id = divname;
            divError.className = "form-error";
//            var items = document.forms[input_element.form._sfm_form_name][input_element.name];
            // DungNM
            var items = input_element;
            ///
            var oldDiv = document.getElementById(divname);
            if (oldDiv) {
                items.parentNode.removeChild(oldDiv);
            }
            var divErrorWidth = $(items.parentNode).width();
            divError.style.width = divErrorWidth + 'px';
            items.parentNode.appendChild(divError);
            show_div_msg(divname, msgs[m]["msg"]);
        }
    }
    if (null != first_elmnt) {
        sfm_set_focus(first_elmnt);
    }
}
/*
 function div_showmsg(msgs)
 {
 var whole_msg;
 var first_elmnt=null;
 for(var m in msgs)
 {
 if(null == first_elmnt)
 {
 first_elmnt = msgs[m]["input_element"];
 }
 var divname = element_div_name(msgs[m]["input_element"]);
 show_div_msg(divname,msgs[m]["msg"]);
 }
 if(null != first_elmnt)
 {
 sfm_set_focus(first_elmnt);
 }
 }
 */
//Editor by ThangTV - 09/05/2011
function show_div_msg(divname, msgstring) {
    var _msg = msgstring;
    var index = msgstring.indexOf("{");
    if (index > 0) {
        _msg = msgstring.substring(0, index);
        var msgId = msgstring.substring(index + 1, msgstring.length - 1);
        _msg = '<span is-button="0" class="lbl-error" msg-id="' + msgId + '" title="' + _msg + '" bundle="error">' + _msg + '</span>';
    }
    if (divname.length <= 0)
        return false;
    if (document.layers) {
        divlayer = document.layers[divname];
        if (!divlayer) {
            return;
        }
        divlayer.document.open();
        divlayer.document.write(_msg);
        divlayer.document.close();
    }
    else if (document.all) {
        divlayer = document.all[divname];
        if (!divlayer) {
            return;
        }
        divlayer.innerHTML = _msg;
    }
    else if (document.getElementById) {
        divlayer = document.getElementById(divname);
        if (!divlayer) {
            return;
        }
        divlayer.innerHTML = _msg;
    }
    divlayer.style.visibility = "visible";
}

function ValidationDesc(theForm, inputitem, desc, error, condition) {
    this.theForm = theForm;
    this.desc = desc;
    this.error = error;
    this.itemobj = inputitem;
    this.condition = condition;
    this.validate = vdesc_validate;
}

function vdesc_validate() {
    if (this.condition != null) {
        if (!eval(this.condition)) {
            return true;
        }
    }
    if (!validateInput(this.theForm, this.desc, this.itemobj, this.error, true)) {
        this.itemobj.validatorobj.disable_validations = true;
        sfm_set_focus(this.itemobj);
        return false;
    }
    return true;
}

function ValidationSet(theForm, inputitem, msgs_together) {
    this.theForm = theForm;
    this.vSet = new Array();
    this.add = add_validationdesc;
    this.validate = vset_validate;
    this.itemobj = inputitem;
    this.msgs_together = msgs_together;
    this.updateValidationSet = update_validation_set;
}

function update_validation_set(theForm, inputitem, msgs_together) {
    if ($bean.isNotEmpty(theForm)) {
        this.theForm = theForm;
    }
    if ($bean.isNotEmpty(inputitem)) {
        this.itemobj = inputitem;
        if ($bean.isNotEmpty(this.vSet)) {
            for (var i = 0; i < this.vSet.length; i++) {
                this.vSet[i].itemobj = inputitem;
            }
        }
    }
    if ($bean.isNotEmpty(msgs_together)) {
        this.msgs_together = msgs_together;
    }
}

function add_validationdesc(desc, error, condition) {
    this.vSet[this.vSet.length] = new ValidationDesc(this.theForm, this.itemobj, desc, error, condition);
}

function vset_validate() {
    var bRet = true;
    for (var itr = 0; itr < this.vSet.length; itr++) {
        bRet = bRet && this.vSet[itr].validate();
        if (!bRet && !this.msgs_together) {
            break;
        }
    }
    return bRet;
}

function IsCheckSelected(objValue, chkValue) {
    var selected = false;
    var objcheck = objValue;
    if (objcheck.length) {
        var idxchk = -1;
        for (var c = 0; c < objcheck.length; c++) {
            if (objcheck[c].value == chkValue) {
                idxchk = c;
                break;
            }
            //if
        }
        //for
        if (idxchk >= 0) {
            if (objcheck[idxchk].checked == "1") {
                selected = true;
            }
        }
        //if
    }
    else {
        if (objValue.checked == "1") {
            selected = true;
        }
        //if
    }
    //else	
    return selected;
}

function TestDontSelectChk(objValue, chkValue) {
    return IsCheckSelected(objValue, chkValue) ? false : true;
}

function TestMustSelectChk(objValue, chkValue) {
    return IsCheckSelected(objValue, chkValue) ? true : false;
}

function TestRequiredInput(objValue) {
    if ($(objValue).is(':disabled')) {
        return true;
    }
    if (objValue.type == 'checkbox') {
        return !objValue.checked;
    }
    var val = objValue.value;
    //val = val.replace(/^\s+|\s+$/g, "");//trim
    return ($bean.isNotNil(val) && eval(val.length) != 0);
}

function TestMaxLen(objValue, strMaxLen) {
    if (!objValue.value) {
        return true;
    }
    return (eval(objValue.value.length) <= eval(strMaxLen));
}

function TestMinLen(objValue, strMinLen) {
    if (!objValue.value) {
        return true;
    }
    return (eval(objValue.value.length) >= eval(strMinLen));
}

function TestInputType(objValue, strRegExp) {
    if (!objValue.value) {
        return true;
    }
    return objValue.value.toString().search(strRegExp) >= 0 ? false : true;
}

function TestEmail(objValue, strRegExp) {
    if (!objValue.value) {
        return true;
    }
    return objValue.value.match(strRegExp);
}

function TestLessThan(objValue, strLessThan) {
    if (!objValue.value) {
        return true;
    }
    if (isNaN(objValue.value)) {
        return (objValue.value < strLessThan);
    }
    try {
        return (eval(objValue.value) < eval(strLessThan));
    } catch (e) {
        return (objValue.value < strLessThan);
    }
}

function TestLessEqual(objValue, strLessThan) {

    if (!objValue.value) {
        return true;
    }
    if (isNaN(objValue.value)) {
        return (objValue.value <= strLessThan);
    }
    try {
        return (eval(objValue.value) <= eval(strLessThan));
    } catch (e) {
        return (objValue.value <= strLessThan);
    }
}

function TestGreaterThan(objValue, strGreaterThan) {
    if (!objValue.value) {
        return true;
    }
    return !TestLessEqual(objValue, strGreaterThan);
}

function TestGreaterEqual(objValue, strGreaterEqual) {
    if (!objValue.value) {
        return true;
    }
    return !TestLessThan(objValue, strGreaterEqual);
}

function TestRegExp(objValue, strRegExp) {
    if (!objValue.value) {
        return true;
    }
    return (objValue.value.match(strRegExp));
}

function TestDontSelect(objValue, dont_sel_index) {
    if (objValue.selectedIndex == null) {
        return false;
    }
    return (objValue.selectedIndex != eval(dont_sel_index));
}

function TestSelectOneRadio(objValue) {
    var objradio = objValue;
    var one_selected = false;
    for (var r = 0; r < objradio.length; r++) {
        if (objradio[r].checked) {
            one_selected = true;
            break;
        }
    }
    return one_selected;
}

function TestEqual(objValue, strEqual) {
    if (!objValue.value) {
        return true;
    }
    if (isNaN(objValue.value)) {
        return (objValue.value == strEqual);
    }
    try {
        return (eval(objValue.value) == eval(strEqual));
    } catch (e) {
        return (objValue.value == strEqual);
    }
}

function TestEqualNotNull(objValue, strEqual) {
    if ($bean.isEmpty(strEqual) && $bean.isEmpty(objValue.value)) {
        return true;
    }
    if (isNaN(objValue.value) || $bean.isEmpty(objValue.value)) {
        return (objValue.value == strEqual);
    }
    try {
        return (eval(objValue.value) == eval(strEqual));
    } catch (e) {
        return (objValue.value == strEqual);
    }
}

function TestNotEqual(objValue, strNotEqual) {
    if (!objValue.value) {
        return true;
    }
    return !TestEqual(objValue, strNotEqual);
}

function TestDate(objValue) {
    if (!objValue.value) {
        return true;
    }
    if (!isDate(objValue.value) || objValue.value.length > 10) {
        return false;
    }
    return true;
}

function TestDateTime(objValue) {
    if (!objValue.value) {
        return true;
    }
    var index = objValue.value.indexOf(" ");
    var strDate = objValue.value.substring(0, index);
    var strTime = objValue.value.substring(index + 1);
    if (!isDate(strDate) || !isTime(strTime) || objValue.value.length > 19) {
        return false;
    }
    return true;
}
var dtCh = "/";
var minYear = 1900;
var maxYear = 2999;

function stripCharsInBag(s, bag) {
    var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1)
            returnString += c;
    }
    return returnString;
}

function daysInFebruary(year) {
    // February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
}

function DaysArray(n) {
    for (var i = 1; i <= n; i++) {
        this[i] = 31;
        if (i == 4 || i == 6 || i == 9 || i == 11) {
            this[i] = 30;
        }
        if (i == 2) {
            this[i] = 29;
        }
    }
    return this
}

function isDate(dtStr) {
    var daysInMonth = DaysArray(12);
    var pos1 = dtStr.indexOf(dtCh);
    var pos2 = dtStr.indexOf(dtCh, pos1 + 1);
    var strDay = dtStr.substring(0, pos1);
    var strMonth = dtStr.substring(pos1 + 1, pos2);
    var strYear = dtStr.substring(pos2 + 1);
    strYr = strYear;
    if (strDay.charAt(0) == "0" && strDay.length > 1)
        strDay = strDay.substring(1);
    if (strMonth.charAt(0) == "0" && strMonth.length > 1)
        strMonth = strMonth.substring(1);
    for (var i = 1; i <= 3; i++) {
        if (strYr.charAt(0) == "0" && strYr.length > 1)
            strYr = strYr.substring(1);
    }
    month = parseInt(strMonth);
    day = parseInt(strDay);
    year = parseInt(strYr);
    if (pos1 == -1 || pos2 == -1) {
        //alert("The date format should be : dd/mm/yyyy");
        return false;
    }
    if (strMonth.length < 1 || month < 1 || month > 12) {
        //alert("Please enter a valid month");
        return false;
    }
    if (strDay.length < 1 || day < 1 || day > 31 || (month == 2 && day > daysInFebruary(year)) || day > daysInMonth[month]) {
        //alert("Please enter a valid day");
        return false;
    }
    if (strYear.length != 4 || year == 0 || year < minYear || year > maxYear) {
        //alert("Please enter a valid 4 digit year between " + minYear + " and " + maxYear);
        return false;
    }
    if (dtStr.indexOf(dtCh, pos2 + 1) != -1 || JCommonUtil.isInteger(stripCharsInBag(dtStr, dtCh)) == false) {
        //alert("Please enter a valid date");
        return false;
    }
    return true;
}
function isTime(strTime) {
    var regFull = /^(2[0-3])|[01][0-9]:[0-5][0-9]:[0-5][0-9]$/;
    var regMinute = /^(2[0-3])|[01][0-9]:[0-5][0-9]$/;
    if (strTime.match(regFull) || strTime.match(regMinute)) {
        return true;
    }
    return false;
}

function TestDateLessThan(objValue, strLessThan) {
    if ((!objValue.value) || (!strLessThan)) {
        return true;
    }
    return (Date.parse(formatDate(objValue.value)) < Date.parse(strLessThan));
}
function TestDateLessEqual(objValue, strLessEqual) {
    if ((!objValue.value) || (!strLessEqual)) {
        return true;
    }
    return (Date.parse(formatDate(objValue.value)) <= Date.parse(strLessEqual));
}
function TestDateEqual(objValue, strLessEqual) {
    if ((!objValue.value) || (!strLessEqual)) {
        return true;
    }
    return (Date.parse(formatDate(objValue.value)) == Date.parse(strLessEqual));
}
function formatDate(string) {
    if (!string) {
        return null;
    }
    var ss = string.split('/');
    return ss[1] + '/' + ss[0] + '/' + ss[2];
}
//Date.prototype.parseVn = function(string) {
//    var ss = string.split('/');
//    formatDate(ss[1]+'/'+ss[0]+'/'+ss[2]);
//}
function TestDateGreaterThan(objValue, strGreaterThan) {
    if ((!objValue.value) || (!strGreaterThan)) {
        return true;
    }
    return (Date.parse(formatDate(objValue.value)) > Date.parse(strGreaterThan));
}

function TestDateGreaterEqual(objValue, strGreaterEqual) {
    if ((!objValue.value) || (!strGreaterEqual)) {
        return true;
    }
    return (Date.parse(formatDate(objValue.value)) >= Date.parse(strGreaterEqual));
}

function validateInput(theForm, strValidateInput, objValue, strError, showError) {
    var strValidate = strValidateInput;
    var command = "";
    var commandValue = "";
    var indexQuestion = strValidateInput.indexOf("?");
    if (indexQuestion >= 0) {
        strValidate = strValidateInput.substring(0, indexQuestion);
        var strDepend = strValidateInput.substring(indexQuestion + 1);

        var indexColon = strDepend.indexOf(":");
        if (indexColon < 0) {
            return true;
        }
        var objDepend = theForm[strDepend.substring(0, indexColon)];
        if (!objDepend) {
            return true;
        }
        strDepend = strDepend.substring(indexColon + 1);
        if (!validateInput(theForm, strDepend, objDepend, strError, false)) {
            return true;
        }
    }

    var indexEqual = strValidate.indexOf("=");
    if (strError == "null") {
        strError = null;
    }
    if (indexEqual >= 0) {
        command = strValidate.substring(0, indexEqual);
        commandValue = strValidate.substr(indexEqual + 1);
    }
    else {
        command = strValidate;
    }
    if (typeof objValue.length == 'number' && !objValue.type) {
        if (command == EQUAL_VALUE) {
            command = MUST_SELECT_CHK;
        } else if (command == NOT_EQUAL_VALUE) {
            command = DONT_SELECT_CHK;
        }
    }
    if (objValue.value) {
        strError = strError.replace("{0}", objValue.value);

    }
    // command.endsWith("Depend") -> command.match(/Depend$/)
    if (command.match(/Depend$/) && theForm[commandValue].value) {
        strError = strError.replace("{1}", theForm[commandValue].value);
    }

    if (!validateTest(theForm, objValue, command, commandValue)) {
        if (showError) {
            sfm_show_error_msg(strError, objValue);
        }
        return false;
    }
    return true;
}

/**
 *
 * @param objValue
 * @param command
 * @param commandValue
 * @param errMsg
 * @returns {*}
 */
function validateTestNotForm(objValue, command, commandValue, errMsg) {
    if (validateTest(null, objValue, command, commandValue)) {
        return;
    } else {
        return errMsg;
    }
}

function validateTest(theForm, objValue, command, commandValue) {
    if (command.charAt(0) == '!') {
        return !validateTest(theForm, objValue, command.substring(1), commandValue);
    }
    var value = "";
    switch (command) {
        case REQUIRED: {
            return TestRequiredInput(objValue);
        }
        case NOT_REQUIRED: {
            return !TestRequiredInput(objValue);
        }
        //case required 
        case MAX_LENGTH: {
            return TestMaxLen(objValue, commandValue);
        }
        //case maxlen 
        case MIN_LENGTH: {
            return TestMinLen(objValue, commandValue);
        }
        //case minlen 
        case ALPHANUMERIC: {
            return TestInputType(objValue, REG_ALPHANUMERIC);
        }
        case ALPHANUMERIC_EXTEND: {
            return TestInputType(objValue, REG_ALPHANUMERIC_EXTEND);
        }
        case ALPHANUMERIC_EXTEND2: {
            return TestInputType(objValue, REG_ALPHANUMERIC_EXTEND) || isEmail(objValue);
        }
        case ALPHANUMERIC_SPACE: {
            return TestInputType(objValue, REG_ALPHANUMERIC_SPACE);
        }
        case NUMERIC: {
            return TestInputType(objValue, REG_NUMERIC);
        }
        case DECIMAL: {
            return TestInputType(objValue, REG_DECIMAL);
        }
        case DECIMAL_PERCENT: {
            var result = TestInputType(objValue, REG_DECIMAL);
            if (result) {
                var text = (objValue.value + '').split(/[\.,]+/);
                if(text.length > 2 || (text.length == 2 && text[1].length > 2)){
                    return false;
                }
                var _text = $bean.toFloatData(objValue.value);
                if (parseFloat(_text) < 0 || parseFloat(_text) > 100) {
                    return false;
                }
            }
            return result;
        }
        case COMMA: {
            return TestInputType(objValue, REG_COMMA);
        }
        case FLOAT: {
            if (!TestInputType(objValue, REG_NUMERIC)) {
                var decimalSymbol = JCommonUtil.message('common.decimal.symbol', 'common');
                var regFloat = "^[0-9]*\\" + decimalSymbol + "[0-9]*$";
                return !TestInputType(objValue, regFloat);
            }
            return true;
        }
        case EMAIL: {
            return isEmail(objValue);
        }
        case LESS_THAN_VALUE: {
            return TestLessThan(objValue, commandValue);
        }
        case LESS_EQUAL_VALUE: {
            return TestLessEqual(objValue, commandValue);
        }
        case GREATER_THAN_VALUE: {
            return TestGreaterThan(objValue, commandValue);
        }
        case GREATER_EQUAL_VALUE: {
            return TestGreaterEqual(objValue, commandValue);
        }
        case EQUAL_VALUE: {
            return TestEqual(objValue, commandValue);
        }
        case NOT_NULL: {
            return $bean.isNotEmpty(objValue.value);
        }
        case NOT_EQUAL_VALUE: {
            return TestNotEqual(objValue, commandValue);
        }
        case LESS_THAN_DEPEND: {
            value = theForm[commandValue].value;
            return TestLessThan(objValue, value);
        }
        case LESS_EQUAL_DEPEND: {
            value = theForm[commandValue].value;
            return TestLessEqual(objValue, value);
        }
        case GREATER_THAN_DEPEND: {
            value = theForm[commandValue].value;
            return TestGreaterThan(objValue, value);
        }
        case GREATER_EQUAL_DEPEND: {
            value = theForm[commandValue].value;
            return TestGreaterEqual(objValue, value);
        }
        case EQUAL_DEPEND: {
            value = theForm[commandValue].value;
            return TestEqual(objValue, value);
        }
        case EQUAL_NOT_NULL_DEPEND: {
            value = theForm[commandValue].value;
            return TestEqualNotNull(objValue, value);
        }
        case NOT_EQUAL_DEPEND: {
            value = theForm[commandValue].value;
            return TestNotEqual(objValue, value);
        }
        case REGEXP: {
            var strReg = commandValue.replaceAll("\\\\", "\\");
            if (!objValue.value) {
                return true;
            }
            return TestRegExp(objValue, strReg);
        }
        case REGEXP_REVERSE: {
            var strReg = commandValue.replaceAll("\\\\", "\\");
            if (!objValue.value) {
                return true;
            }
            return !TestRegExp(objValue, strReg);
        }
        case DONT_SELECT: {
            return TestDontSelect(objValue, commandValue)
        }
        case DONT_SELECT_CHK: {
            return TestDontSelectChk(objValue, commandValue)
        }
        case MUST_SELECT_CHK: {
            return TestMustSelectChk(objValue, commandValue)
        }
        case SELECT_ONE_RADIO: {
            return TestSelectOneRadio(objValue);
        }
        case DATE: {
            return TestDate(objValue);
        }
        case DATETIME: {
            return TestDateTime(objValue);
        }
        case DATE_LESS_THAN_VALUE: {
            if ("now" == commandValue) {
                value = new Date();
            } else {
                value = commandValue;
            }
            return TestDateLessThan(objValue, value);
        }
        case DATE_GREATER_THAN_VALUE: {
            if ("now" == commandValue) {
                value = new Date();
            } else {
                value = commandValue;
            }
            return TestDateGreaterThan(objValue, value);
        }
        case DATE_LESS_EQUAL_VALUE: {
            if ("now" == commandValue) {
                value = new Date();
            } else {
                value = commandValue;
            }
            return TestDateLessEqual(objValue, value);
        }
        case DATE_GREATER_EQUAL_VALUE: {
            if ("now" == commandValue) {
                value = new Date();
            } else {
                value = commandValue;
            }
            return TestDateGreaterEqual(objValue, value);
        }
        case DATE_LESS_THAN_DEPEND: {
            return TestDateLessThan(objValue, formatDate(theForm[commandValue].value));
        }
        case DATE_GREATER_THAN_DEPEND: {
            return TestDateGreaterThan(objValue, formatDate(theForm[commandValue].value));
        }
        case DATE_LESS_EQUAL_DEPEND: {
            return TestDateLessEqual(objValue, formatDate(theForm[commandValue].value));
        }
        case DATE_GREATER_EQUAL_DEPEND: {
            return TestDateGreaterEqual(objValue, formatDate(theForm[commandValue].value));
        }
        case DATE_EQUAL_DEPEND: {
            return TestDateEqual(objValue, formatDate(theForm[commandValue].value));
        }
        case TEL: {
            var ok = TestInputType(objValue, REG_NUMERIC);
            if (ok) {
                ok = TestMaxLen(objValue, 15) && TestMinLen(objValue, 7);
            }
            return ok;
        }
        case HTML: {
            if (!objValue.value) {
                return true;
            }
            return !TestRegExp(objValue, REG_HTML);
        }
        case LONG: {
            return TestRegExp(objValue, REG_LONG);
        }
        case DOMAIN_LABEL: {
            return isDomainLabel(objValue.value);
        }
        case DOMAIN: {
            return isDomainName(objValue.value);
        }
        case TEL_VN: {
            return TestRegExp(objValue, REG_TEL_VN);
        }
        case TEL_INTERNATIONAL: {
            return TestRegExp(objValue, REG_TEL_INTERNATIONAL);
        }
        case IPV4: {
            return TestRegExp(objValue, REG_IPV4);
        }
        case IPV6: {
            return TestRegExp(objValue, REG_IPV6);
        }
        case BANKEY_LABEL: {
            return TestRegExp(objValue, REG_BANKEY_LABEL);
        }
        case TAX_CODE: {
            var ok = TestRegExp(objValue, REG_TAX_CODE);
            if (ok) {
                var str = objValue.value.substring(2, 10);
                if (str == "00000000") {
                    return false;
                }
                str = objValue.value.substring(10);
                if (str == "000") {
                    return false;
                }
            }
        }
        case FILE_EXTN: {
            return TestFileExtension(objValue, commandValue);
        }
        case IN_VALUE: {
            if ($bean.isNotNil(objValue.value)) {
                objValue.value = objValue.value.toString();
            }
            return commandValue.split(",").indexOf(objValue.value) != -1;
        }
        case PERCENT: {
            if ($bean.isNotNil(objValue.value)) {
                objValue.value = objValue.value.toString();
            }
            return TestRegExp(objValue, REG_PERCENT);
        }
        case PERCENT_EXTEND: {
            if ($bean.isNotNil(objValue.value)) {
                objValue.value = objValue.value.toString();
            }
            return TestRegExp(objValue, REG_PERCENT_EXTEND);
        }
        case INTEGER: {
            if ($bean.isNotNil(objValue.value)) {
                objValue.value = objValue.value.toString();
            }
            return TestRegExp(objValue, REG_INTEGER);
        }
        case PASSWORD: {
            if ($bean.isNotNil(objValue.value)) {
                objValue.value = objValue.value.toString();
            }
            return TestRegExp(objValue, REG_PASSWORD);
        }
        case COUPON_CODE: {
            if ($bean.isNotNil(objValue.value)) {
                objValue.value = objValue.value.toString();
            }
            return TestRegExp(objValue, REG_COUPON_CODE);
        }
        case USERNAME: {
            if ($bean.isNotNil(objValue.value)) {
                objValue.value = objValue.value.toString();
            }
            return TestRegExp(objValue, REG_USERNAME);
        }
    }
    return true;
}

function isEmail(objValue) {
    var ok = TestEmail(objValue, REG_EMAIL);
    if (ok && objValue.value) {
        value = objValue.value;
        var index = value.indexOf("@");
        var name = value.substring(0, index);
        if (name.length > 64) {
            return false;
        }
        name = value.substring(index + 1);
        var labels = name.split(/\./g);
        if (labels == -1) {
            return false;
        }
        for (var i = 0; i < labels.length; i++) {
            if (!isDomainLabel(labels[i])) {
                return false;
            }
        }
    }
    return ok;
}

function VWZ_IsListItemSelected(listname, value) {
    for (var i = 0; i < listname.options.length; i++) {
        if (listname.options[i].selected == true && listname.options[i].value == value) {
            return true;
        }
    }
    return false;
}

function VWZ_IsChecked(objcheck, value) {
    if (objcheck.length) {
        for (var c = 0; c < objcheck.length; c++) {
            if (objcheck[c].checked == "1" && objcheck[c].value == value) {
                return true;
            }
        }
    }
    else {
        if (objcheck.checked == "1") {
            return true;
        }
    }
    return false;
}

function isDomainLabel(name) {
    if (name.length > 64) {
        return false;
    }
    if ((name.charAt(0) == '-') || (name.charAt(name.length - 1) == '-')) {
        return false;
    }
    var index = name.indexOf("--");
    if (index > -1) {
        return false;
    }
    index = name.indexOf(".");
    if (index > -1) {
        return false;
    }
    return name.match(REG_DOMAIN_LABEL);
}
function isDomainName(name) {
    if (name.length > 255) {
        return false;
    }
    if (name.length == 1) {
        return false;
    }
    if (name.charAt(0) == '.' | name.charAt(0) == '-' ||
        name.charAt(name.length - 1) == '.' | name.charAt(name.length - 1) == '-') {
        return false;
    }
    var index = name.indexOf("..");
    if (index > -1) {
        return false;
    }
    var count = 0;
    for (var i = 0; i < name.length; i++) {
        if (name.charAt(i) == '.') {
            count++;
        }
    }
    if (count == 0 || count > 4) {
        return false;
    }
    var domainLabel;
    var tmp = name;
    while (true) {
        if (tmp.length == 0)
            break;
        index = tmp.indexOf(".");
        if (index < 0) {
            domainLabel = tmp;
            if (!isDomainLabel(domainLabel)) {
                return false;
            }
            break;
        }
        domainLabel = tmp.substring(0, index);
        if (!isDomainLabel(domainLabel)) {
            return false;
        }
        var len = tmp.length;
        tmp = tmp.substring(index + 1, len);
    }
    return true;
}

function TestFileExtension(objValue, cmdvalue) {
    var ret = false;
    var found = false;

    if (objValue.value.length <= 0) { //The 'required' validation is not done here
        return true;
    }

    var extns = cmdvalue.split(";");
    for (var i = 0; i < extns.length; i++) {
        ext = objValue.value.substr(objValue.value.length - extns[i].length, extns[i].length);
        ext = ext.toLowerCase();
        if (ext == extns[i]) {
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
/*
 Copyright (C) 2003-2009 JavaScript-Coder.com . All rights reserved.
 */