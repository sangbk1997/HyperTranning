widgetMod.directive('hdTextarea', function () {
    var baseClass = $widgets.classes.enterEditorClass;
    return $widgets.newConfigs(baseClass, {
        link: function (scope, element, attrs) {
            baseClass.initClass(scope, element, attrs, 'hdTextarea');
            $(element).find('textarea').growHeight();
        },
        template: function (element, attrs) {
            var template = $template.getTemplateDirective('hd-textarea');
            template = baseClass.genTemplate(element, attrs, template, 'hdTextarea');
            return template;
        }
    });
});