var $view = {
    LAYOUT: {
        startZIndex: 50, layoutZIndex: 50,
        afterShowLayout: function ($layout) {
            $view.LAYOUT.layoutZIndex++;
            if ($bean.isNotEmpty($layout)) {
                $layout.css('z-index', $view.LAYOUT.layoutZIndex);
            }
            return $view.LAYOUT.layoutZIndex;
        },
        afterHideLayout: function ($layout) {
            $view.LAYOUT.layoutZIndex--;
            if ($view.LAYOUT.layoutZIndex < $view.LAYOUT.startZIndex) {
                $view.LAYOUT.layoutZIndex = $view.LAYOUT.startZIndex;
            }
            if ($bean.isNotEmpty($layout)) {
                $layout.css('z-index', '');
            }
            return $view.LAYOUT.layoutZIndex;
        }
    }, DIALOG: {
        hideAllDialog: function ($target) {
            if ($bean.isNotEmpty($target)) {
                if (!$bean.checkElementInsideDom($target)) return;
                var $modal = $target.closest('.hyd-dialog');
                var $dialog = $target.parents('[script-role~="dialog"]');
                var $toggleHideDialog = $target.closest('*[toggle-hide-dialog]')
                if ($bean.isNotEmpty($toggleHideDialog)) {
                    $dialog = [];
                }
                var flag = ($target.closest('[script-role~="dialog-ctrl"]').length > 0)
                    || ( $bean.isNotEmpty($target.attr('script-role')) && $target.attr('script-role').indexOf('dialog-ctrl') != -1);
                if($modal && $modal.length > 0){
                    $modal.find('.active[script-role~="dialog"]').removeClass('active');
                    if(!flag){
                        $modal.find('.active[script-role~="toggle-dialog"]').removeClass('active');
                    }
                }else{
                    $('.active[script-role~="dialog"]').removeClass('active');
                    if(!flag){
                        $('.active[script-role~="toggle-dialog"]').removeClass('active');
                    }
                }
                var targetId;
                while ($dialog.length > 0) {
                    if ($dialog.hasClass('no-action-hide') || flag) {
                        $dialog.addClass('active');
                        $dialog.find('[script-role~="toggle-dialog"]').addClass('active');
                        targetId = $dialog.attr('target-id');
                        if ($bean.isNotEmpty(targetId)) {
                            $('*[script-role~="toggle-dialog"][target-id="' + targetId + '"]').addClass('active');
                        }
                    }
                    $dialog = $dialog.parents('[script-role~="dialog"]');
                }

            }
        },

        hideDialog: function (dialogId) {
            setTimeout(function () { // wait for other event finished
                $('*[script-role~="toggle-dialog"][dialog-id="' + dialogId + '"]').removeClass('active');
                $('*[script-role~="dialog"][dialog-id="' + dialogId + '"]').removeClass('active');
            });
        }
    }, cancelClick: false, appendLyLoadingDefault: function ($target) {
        $target.css('position', 'relative');
        if ($target.find('.ly-loading-overlay').length == 0) {
            $target.append(lyLoading());
        }
    }, removeLyLoadingDefault: function ($target, removePositionRelative) {
        var $lyLoading = $target.find('.ly-loading-overlay');
        if ($lyLoading.length > 0) {
            if (removePositionRelative) {
                $target.css('position', 'static');
            }
            $lyLoading.remove();
        }
    }};