/**
 * Created by nhandh_vdi on 9/20/2016.
 */
var validation = angular.module('CustomValidation', []);
validation.directive('hydValidation', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs, ctrl) {
            var DOMForm = angular.element(element)[0];
            element.on('submit', function (event) {
                event.preventDefault();
                scope.$apply(function () {
                    var checks = validate();
                    if (checks.length == 0)
                        scope.$eval(DOMForm.attributes["hyd-submit"].value, {'$event': event});
                });
            });

            // get config validation
            var configs = scope[attrs.hydValidation];

            /**
             * validate only field
             * @param field
             * @param value
             * @returns {*}
             */
            function validate_Form(field, value, cmdValue) {
                var error = $validationService.validate_OneField(configs, field, value, cmdValue);
                if (error) {
                    return error;
                }
            };

            /**
             * find element of message error
             * @param element
             * @returns {*}
             */
            function isValidationMessagePresent(element) {
                var elementSiblings = angular.element(element).parent().children();
                for (var i = 0; i < elementSiblings.length; i++) {
                    if (angular.element(elementSiblings[i]).hasClass("validationMessage")) {
                        return angular.element(elementSiblings[i]);
                    }
                }
                return false;
            };

            /**
             * create template message error
             * @param msg
             * @returns {string}
             */
            function generateErrorMsg(msg) {
                if(msg.startsWith("error.")){
                    msg = JCommonUtil.message(msg, 'error');
                }
                var m = "<div class='form-error validationMessage' style='visibility: visible;'><span is-button='0' class='lbl-error'  bundle='error'>" + msg + "</span></div>";
                return m;
            };


            /**
             * function passed validation then return  array is Empty
             * else return not pass validate
             * @param ele
             */
            function validate() {
                var arrayError = [];
                // var data = scope[attrs.hydModel];
                var data = $bean.getProperty(scope, attrs.hydModel);
                angular.forEach($(element).find('input, textarea, select, a'), function (e, k) {
                    var name = e.attributes.hydname;
                    var cmdValue = e.attributes.commandvalue;
                    // ignore when attribute null
                    if (!name || (name && !name.nodeValue)) {
                        return;
                    }
                    var cmd = undefined;
                    if (cmdValue && cmdValue.nodeValue) {
                        cmd = $bean.getProperty(data, cmdValue.nodeValue);
                    }

                    var value = $bean.getProperty(data, name.nodeValue);
                    if (value === null) {
                        value = '';
                    }

                    var validationMessageElement = isValidationMessagePresent(e);
                    if (validationMessageElement) {
                        validationMessageElement.remove();
                    }
                    var error = validate_Form(name.nodeValue, value, cmd);
                    if (error) {
                        angular.element(e).after(generateErrorMsg(error));
                        arrayError.push(error);
                    }
                });
                return arrayError;
            }

        }
    }
}]);