/*
 $template (DOM Template):
 - Là đối tượng Global có thể call ở mọi nơi
 - Chứa template của các Widget
 */
var $template = {
    directives: {
        // include from hyd-widget-template.js
    },
    includeDirectives: function (directives) {
        var i;
        for (i in directives) {
            $template.directives[i] = directives[i];
        }
    },
    dom: {},
    getTemplateDirective: function (key) {
        return $template.directives[key];
    },
    loadTemplate: function (templateConfigs, onSuccess) {
        var templateParser = $bean.parseTemplate(templateConfigs);
        var url = JCommonUtil.convertUrl('/uiTemplate?get') + '&templateKey=' + templateParser.templateKey;
        if ($bean.isNotNil(templateParser.templateModule)) {
            url += '&templateModule=' + templateParser.templateModule;
        }
        // TH1: Lay template tu server
        if (templateParser.templateType == 'server') {
            if ($bean.isEmpty($ng.$templateCache.get(templateParser.templateKey))) {
                $dbs.ajax({
                    method: 'GET',
                    url: url,
                    onSuccess: function (response) {
                        $ng.$templateCache.put(templateParser.templateKey, response.data);
                        onSuccess($ng.$templateCache.get(templateParser.templateKey));
                    }
                });
            } else {
                onSuccess($ng.$templateCache.get(templateParser.templateKey));
            }
        }else if (templateParser.templateType == 'serverNoCache') {
            $dbs.ajax({
                method: 'GET',
                url: JCommonUtil.getUrlAjax(url),
                onSuccess: function (response) {
                    /*trường họp server không cache*/
                    if ($bean.isNotEmpty($ng.$templateCache.get(templateParser.templateKey))){
                        $ng.$templateCache.remove(templateParser.templateKey);
                    }
                    $ng.$templateCache.put(templateParser.templateKey, response.data);
                    onSuccess($ng.$templateCache.get(templateParser.templateKey));
                }
            });
        } else if (templateParser.templateType == 'action') {// TH2: Lay dom tu server, thong qua actionUrl
            $dbs.ajax({
                method: 'GET',
                url: JCommonUtil.getUrlAjax(JCommonUtil.convertUrl(templateParser.templateKey)),
                onSuccess: function (response) {
                    onSuccess(response.data);
                }
            });
        } else if (templateParser.templateType == 'cache') {// TH3: Lay template tu cache client
            if (templateParser.cacheDir == 'widgets') {
                var template = $template.directives[templateParser.templateKey];
                onSuccess(template);
            }
        } else if (templateParser.templateType == 'dom') {// TH4: Lay template tu 1 thanh phan co tren dom, thong qua selector
            var domTemplate = angular.element(templateParser.templateKey);
            if ($bean.isNotEmpty(domTemplate)) {
                domTemplate.removeClass('hidden');
                $template.dom[templateConfigs] = domTemplate;
                $(templateParser.templateKey).remove();
            } else {
                domTemplate = $template.dom[templateConfigs];
            }
            if ($bean.isNotEmpty(domTemplate)) {
                onSuccess(domTemplate);
            }
        } else if (templateParser.templateType == 'html') {// TH5: Truyen thang template string
            onSuccess(templateParser.templateKey);
        }
    },
    setCompileTemplate: function ($target, scope, template, isCompiled) {
        $target.html(template);
        if (!isCompiled) {
            $target.addClass('hide');
            $ng.$compile($target.contents())(scope);
            $ng.$timeout(function () {
                $target.removeClass('hide');
            }, $bean.AVG_TIME_TEMPLATE_RENDER);
        }
    },
    loadTemplateTo: function ($scope, $event, $timeout) {
        $template.loadTemplateTo($scope.templateKey, $scope.appendTo, $scope, $event);
        $timeout(function () {
            $scope.onAppend($event);
        }, $bean.FAST_TIME_RENDER);
    },
    loadTemplateTo: function (templateKey, appendTo, $scope, $event) {
        var selector = appendTo;
        var $appendTo;
        if (selector.indexOf('@') == 0) {
            var $target = $($event.target);
            var separatorIndex = selector.indexOf('|');
            if (separatorIndex != -1) {
                var parent = selector.substring(1, separatorIndex);
                var child = selector.substring(separatorIndex + 1, selector.length);
                $appendTo = $target.closest(parent).find(child);
            } else {
                $appendTo = $target.closest(selector.substring(1, selector.length));
            }
        } else {
            $appendTo = angular.element(appendTo);
        }
        var render = $appendTo.find('.ui-template[include-template="' + templateKey + '"]').length > 0;
        if (!render) {
            var el = '<div class="ui-template" include-template="' + templateKey + '"></div>';
            $ng.$compile(el)($scope).appendTo($appendTo);
        }
    }
};