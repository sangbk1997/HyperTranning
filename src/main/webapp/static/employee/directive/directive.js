myApp.directive('datePicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',

        link: function (scope, element, attr, ctrl) {

            // Format date on load
            ctrl.$formatters.unshift(function (value) {
                if (value && moment(value).isValid()) {
                    return moment(new Date(value)).format("YYYY-MM-DD");
                }
                return value;
            });

            //Disable Calendar
            scope.$watch(attr.ngDisabled, function (newVal) {
                if (newVal === true)
                    $(element).datepicker("disable");
                else
                    $(element).datepicker("enable");
            });

            // Datepicker Settings
            $(element).datepicker({
                autoSize: true,
                changeYear: true,
                changeMonth: true,
                dateFormat: attr["dateformat"] || 'mm/dd/yy',
                showOn: 'button',
                buttonText: ' ',
                buttonImage: "/static/employee/img/calendar.gif",
                onSelect: function (valu) {
                    scope.$apply(function () {
                        ctrl.$setViewValue(valu);
                    });
                    $(element).focus();
                },

                beforeShow: function () {
                    debugger;
                    if (attr["minDate"] != null)
                        $(element).datepicker('option', 'minDate', attr["minDate"]);

                    if (attr["maxDate"] != null)
                        $(element).datepicker('option', 'maxDate', attr["maxDate"]);
                },

            });
        }
    }
});

myApp.directive("hydCheckbox", function () {
    return {
        scope: {
            value: "=",
            ngChange: "&",
            disabled: '=?'
        },
        link: function (scope, element, attrs) {

        },
        template: "<label class=\"checkbox\">" +
            "<input type=\"checkbox\" ng-model=\"value\"" +
            "ng-class=\"{'disabled' : disabled}\" ng-disabled=\"disabled\">" +
            "<i></i>" +
            "</label>"
    }
});
myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);