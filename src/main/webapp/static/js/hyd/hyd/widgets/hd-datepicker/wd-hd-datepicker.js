widgetMod.directive('hdDatepicker', function () {
    var baseClass = $widgets.classes.dateEditorClass;
    return $widgets.newConfigs(baseClass, {
        link: function (scope, element, attrs) {
            baseClass.initClass(scope, element, attrs, 'hdDatepicker');
        },
        template: function (element, attrs) {
            var templateKey = attrs.showDiv == 'true' ? 'hd-datepicker-div' : 'hd-datepicker';
            var template = $template.getTemplateDirective(templateKey);
            template = baseClass.genTemplate(element, attrs, template, 'hdDatepicker');
            return template;
        }
    });
});