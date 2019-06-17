widgetMod.directive('hdCheckboxOne', function () {
    var baseClass = $widgets.classes.editorClass;
    return $widgets.newConfigs(baseClass, {
        scope: {
            label: '@',
            trueValue: '=',
            falseValue: '='
        },
        link: function (scope, element, attrs) {
            baseClass.initClass(scope, element, attrs, 'hdCheckboxOne');
        },
        template: function (element, attrs) {
            var template = $template.getTemplateDirective('hd-checkbox-one');
            template = template.replace('{@true-value}', $bean.isNotNil(attrs.trueValue) ? 'ng-true-value="' + attrs.trueValue + '"' : '');
            template = template.replace('{@false-value}', $bean.isNotNil(attrs.falseValue) ? 'ng-false-value="' + attrs.falseValue + '"' : '');
            return template;
        }
    });
});