widgetMod.directive('hdCheckbox', function () {
    var baseClass = $widgets.classes.selectEditorClass;
    return $widgets.newConfigs(baseClass, {
        scope: {
            checkAllLabel: '@'
        },
        link: function (scope, element, attrs) {
            scope.multiValue = true;
            baseClass.initClass(scope, element, attrs, 'hdCheckbox');
            scope.checkAll = function () {
                if (scope.value != null && scope.value.length == scope.dSource.length) {
                    scope.value = null;
                } else {
                    scope.value = $bean.list(scope.dSource, scope.fieldValue);
                }
            }
        },
        template: function (element, attrs) {
            return $template.getTemplateDirective('hd-checkbox');
        }
    });
});