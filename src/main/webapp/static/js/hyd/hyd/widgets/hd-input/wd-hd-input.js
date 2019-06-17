widgetMod.directive('hdInput', function () {
    var baseClass = $widgets.classes.enterEditorClass;
    return $widgets.newConfigs(baseClass, {
        link: function (scope, element, attrs) {
            baseClass.initClass(scope, element, attrs, 'hdInput');
        },
        template: function (element, attrs) {
            var template = $template.getTemplateDirective('hd-input');
            template = baseClass.genTemplate(element, attrs, template, 'hdInput');
            return template;
        }
    });
});