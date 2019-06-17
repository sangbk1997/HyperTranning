widgetMod.directive('hdSelect', function () {
    var baseClass = $widgets.classes.selectEditorClass;
    return $widgets.newConfigs(baseClass, {
        link: function (scope, element, attrs) {
            scope.multiValue = false;
            baseClass.initClass(scope, element, attrs, 'hdSelect');
        },
        template: function (element, attrs) {
            var template;
            if ($bean.isNil(attrs.noPrefix)) {
                template = $template.getTemplateDirective('hd-select');
            } else {
                template = $template.getTemplateDirective('hd-select-no-prefix');
            }
            template = baseClass.genTemplate(element, attrs, template, 'hdSelect');
            return template;
        }
    });
});