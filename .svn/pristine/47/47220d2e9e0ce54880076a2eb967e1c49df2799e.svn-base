widgetMod.directive('hdRadio', function () {
    var baseClass = $widgets.classes.selectEditorClass;
    return $widgets.newConfigs(baseClass, {
        link: function (scope, element, attrs) {
            scope.multiValue = false;
            baseClass.initClass(scope, element, attrs, 'hdRadio');
            scope.groupName = $bean.genRandomID();
        },
        template: function (element, attrs) {
            return $template.getTemplateDirective('hd-radio');
        }
    });
});