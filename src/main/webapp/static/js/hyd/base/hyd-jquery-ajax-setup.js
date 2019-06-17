//Extend Ajax Setup
$.xhrPool = []; // array of uncompleted requests
$.xhrPool.abortAll = function () { // our abort function
    $(this).each(function (idx, jqXHR) {
        jqXHR.abort();
    });
    $.xhrPool = [];
};

$.ajaxSetup({
    cache: false,
    type: "GET",
    evalScripts: true,
    beforeSend: function (jqXHR) { // before jQuery send the request we will push it to our array
        $.xhrPool.push(jqXHR);
    },
    error: function (jqXHR, status, error) {
        if (jqXHR.status == AJAX_CODE_ERROR_AUTHEN) {
            window.location.href = JCommonUtil.convertUrl("/login?");
        }
    },
    complete: function (jqXHR) { // when some of the requests completed it will splice from the array
        var index = $.xhrPool.indexOf(jqXHR);
        if (index > -1) {
            $.xhrPool.splice(index, 1);
        }
        JCommonUtil.addEventTooltip();
    }
});