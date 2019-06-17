var JTableModel = (function (window, $) {
    var ins = {};
    ins.TABLE_MODEL = null;
    ins.TABLE_COLUMN = null;
    ins.TABLE_ROW = null;
    ins.COLUMNS_SELECT = [];
    ins.userPrefsContactColumnsFilter = {
        contact: 'CCF-CONTACT',
        lead: 'CCF-LEAD',
        account: 'CCF-ACCOUNT',
        contactActivity: 'CCF-CONTACT-ACTIVITY',
        contactTask: 'CCF-CONTACT-TASK',
        partner: 'CCF-PARTNER',
    }
    ins.userPrefsRapColumnsFilter = {
        rapFormInfoProcess: 'RCF-PROCESS',
        rapFormInfoManagement: 'RCF-MANAGEMENT',
    }
    ins.initLoadModel = function (table) {
        ins.TABLE_COLUMN = $(table).find('thead th').length;
        ins.TABLE_ROW = $(table).find('tbody tr').length;
        var model = new Array(ins.TABLE_ROW);
        for (var i = 0; i < ins.TABLE_ROW; i++) {
            model[i] = new Array(ins.TABLE_COLUMN);
        }
        $(table).find('tbody tr').each(function (row) {
            $(this).find('td').each(function (index) {
                if ($bean.isNotEmpty($(this).attr('data-role'))) {
                    return;
                }
                var saveIndex = null;
                if ($bean.isEmpty(model[row][index])) {
                    model[row][index] = this;
                    saveIndex = index;
                } else {
                    var temp = index;
                    while ($bean.isNotEmpty(model[row][temp])) {
                        temp++;
                    }
                    model[row][temp] = this;
                    saveIndex = temp;
                }
                //luôn luôn chạy lặp với giá trị 0
                var colspan = 1;
                var rowspan = 1;
                if ($bean.isNotEmpty($(this).attr('colspan'))) {
                    colspan = $(this).attr('colspan') * 1;
                }
                if ($bean.isNotEmpty($(this).attr('rowspan'))) {
                    rowspan = $(this).attr('rowspan') * 1;
                }
                for (var j = 0; j < rowspan; j++) {
                    for (var i = 0; i < colspan; i++) {
                        model[row + j][saveIndex + i] = this;
                    }
                }
            });
        });
        ins.TABLE_MODEL = model;
    }
    ins.hideShowColumn = function (table, index, isShow) {
//        for (var i = 0; i < ins.TABLE_ROW; i++) {
//            var $cell = $(ins.TABLE_MODEL[i][index]);
//            if (isShow) {
//                if ($cell.is(":hidden")) {
//                    $cell.show();
//                } else {
//                    $cell.attr('colspan', $cell.attr('colspan') * 1 + 1);
//                }
//            } else {
//                if ($cell.is(":not(:hidden)") && ($cell.attr('colspan') * 1) > 1) {
//                    $cell.attr('colspan', $cell.attr('colspan') * 1 - 1);
//                } else {
//                    $cell.hide();
//                }
//            }
//        }
    }
    ins.displayTitle = function () {
        $('td.display-title').each(function () {
            $(this).attr('title', $(this).text());
        });
    }
    ins.getItemSelected = function (index) {
        var isChecked = $('.list-columns [data-index="' + index + '"]').is(':checked');
        var tablehHeader = $('table.table-column-selected thead tr th');
        var tableBody = $('table.table-column-selected tbody tr');
        for (var i = 0; i < ins.COLUMNS_SELECT.length; i++) {
            var column = ins.COLUMNS_SELECT[i];
            if(column.disable) continue;
            if (column.index == index) {
                column.isShow = isChecked;
                if (isChecked) {
                    tablehHeader.eq(index).show();
                    tableBody.each(function (rowIndex, row) {
                        $(this).find('td').eq(index).show();
                    });
                } else {
                    tablehHeader.eq(index).hide();
                    tableBody.each(function (rowIndex, row) {
                        $(this).find('td').eq(index).hide();
                    });
                }
                break;
            }
        }
        this.changeStyle();
    }
    ins.changeStyle = function () {
        var colspan = 0;
        for (var i = 0; i < this.COLUMNS_SELECT.length; i++) {
            var column = this.COLUMNS_SELECT[i];
            var isChecked = $('.list-columns [data-index="' + i + '"]').is(':checked');
            if (isChecked) {
                colspan++;
            }
        }
        $(".modify-colspan").attr("colspan", colspan);
        if (colspan > 6){
            $(".modify-width").attr("width", "200px") ;
        } else {
            $(".modify-width").removeAttr("width");
        }
    }
    ins.loadColumnHeader = function (columnList) {
        ins.COLUMNS_SELECT = [];
        if ($bean.isNotEmpty(columnList) && columnList.length >= $('table.table-column-selected thead tr th').length) {
            ins.COLUMNS_SELECT = columnList;
        } else {
            $('table.table-column-selected thead tr th').each(function (index) {
                var column = {};
                column['index'] = index;
                column['text'] = $(this).text();
                column['code'] = $(this).attr('id');
                column['isNotHide'] = $(this).hasClass('not-hide');
                column['isShow'] = $(this).hasClass('show-default') || column['isNotHide'];
                ins.COLUMNS_SELECT.push(column);
            });
        }
        for (var i in ins.COLUMNS_SELECT) {
            var column = ins.COLUMNS_SELECT[i];
            if(column.disable) continue;
            var html = '<li class="lst-co-row color-text-normal"><div class="inline-group single-line"><label class="checkbox">';
            html += '<input data-index="' + column.index + '" type="checkbox"';
            if (column.isShow) {
                html += ' checked';
            }
            if (column.isNotHide) {
                html += ' disabled';
            } else {
                html += ' onchange="JTableModel.getItemSelected(' + column.index + ')"';
            }
            html += '><i></i><span>' + column.text + '</span></label></div></li>';
            $('ul.list-columns').append(html);
        }
        return ins.COLUMNS_SELECT;
    }
    ins.reLoadTable = function () {
        if (ins.COLUMNS_SELECT.length == 0) {
            return;
        }
        var tableHeader = $('table.table-column-selected thead th');
        tableHeader.each(function (columnIndex) {
            if (ins.COLUMNS_SELECT[columnIndex].isShow) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        var tableBody = $('table.table-column-selected tbody tr');
        tableBody.each(function (rowIndex, row) {
            $(this).find('td').each(function (columnIndex) {
                if (ins.COLUMNS_SELECT[columnIndex].isShow) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            })
        });
        $('table.table-column-selected').removeClass('hide');
        this.changeStyle();
    }

    return ins;
})(window, jQuery);

(function (window, $, undefined) {
    window.toggleTable = {
        options: {
            delay: 100,
            breakpoints: {
                //extra small,small, medium
                xs: 540,
                sm: 790,
                md: 1024,
                lg: 1170,
                sp: 1700// super: luôn luôn ẩn
            },
            parsers: {
                alpha: function (cell) {
                    return $(cell).data('value') || $.trim($(cell).text());
                }
            },
            calculateWidthAndHeightOverride: null,
            toggleSelector: ' > tbody > tr:not(.row-detail)',
            columnDataSelector: '> thead > tr:last-child > th, > thead > tr:last-child > td',
            createDetail: function (element, data) {
                var groups = {'_none': {'name': null, 'data': []}};
                for (var i = 0; i < data.length; i++) {
                    var groupid = data[i].group;
                    if (groupid != null) {
                        if (!(groupid in groups)) {
                            groups[groupid] = {'name': data[i].groupName, 'data': []};
                        }
                        groups[groupid].data.push(data[i]);
                    } else {
                        groups._none.data.push(data[i]);
                    }
                }
                for (var group in groups) {
                    if (groups[group].data.length == 0) continue;
                    if (group != '_none') {
                        element.append('<h4>' + groups[group].name + '</h4>');
                    }
                    for (var j = 0; j < groups[group].data.length; j++) {
                        var separator = (groups[group].data[j].name) ? ':' : '';
                        var content = "";
                        var ischeckaction = false;
                        if ((groups[group].data[j].display.indexOf('check-action') > -1) && (groups[group].data[j].display.indexOf('checkbox') > -1)) {
                            if (!ischeckaction) {
                                ischeckaction = true;
                            }
                        }
                        if (ischeckaction) {
                            content = '<div><label>' + groups[group].data[j].display + ' ' + '<strong>' + groups[group].data[j].name + '</strong>' + '</label></div>';
                        } else {
                            content = '<div><strong style="vertical-align: top">' + groups[group].data[j].name + separator + '</strong>' + ' ' + groups[group].data[j].display + '</div>';
                        }
                        element.append(content);
                    }
                }
            },
            debug: false,
            onStartResponsive: null,
            onEndResponsive: null
        }

    };

    var instanceCount = 0;
    $.fn.toggleTable = function (options) {
        options = options || {};
        var option = $.extend(true, {}, window.toggleTable.options, options);
        return this.each(function () {
            instanceCount++;
            this.toggleTable = new ToggleTable(this, option, instanceCount);
        });
    };

    //helper for using timeouts
    function Timer() {
        ///<summary>Simple timer object created around a timeout.</summary>
        var t = this;
        t.id = null;
        t.busy = false;
        t.start = function (code, milliseconds) {
            ///<summary>Starts the timer and waits the specified amount of <paramref name="milliseconds"/> before executing the supplied <paramref name="code"/>.</summary>
            ///<param name="code">The code to execute once the timer runs out.</param>
            ///<param name="milliseconds">The time in milliseconds to wait before executing the supplied <paramref name="code"/>.</param>

            if (t.busy) {
                return;
            }
            t.stop();
            t.id = setTimeout(function () {
                code();
                t.id = null;
                t.busy = false;
            }, milliseconds);
            t.busy = true;
        };
        t.stop = function () {
            ///<summary>Stops the timer if its runnning and resets it back to its starting state.</summary>

            if (t.id != null) {
                clearTimeout(t.id);
                t.id = null;
                t.busy = false;
            }
        };
    };

    function ToggleTable(table, option, id) {
        var hyper = this;
        hyper.id = id;
        hyper.table = table;
        hyper.options = option;
        hyper.breakpoints = [];
        hyper.breakpointNames = '';
        hyper.columns = {};

        var opt = hyper.options;
        var cls = hyper.classes;
        var indexOffset = 0;
        var arrrowspan = null;
        var arrcolspan = null;
        if ($(hyper.table).hasClass('table-vertical')) {
            arrrowspan = $(hyper.table).find('> tbody > tr > td[rowspan]').map(function () {
                return $(this).attr('rowspan');
            });
            arrcolspan = $(hyper.table).find('> tbody > tr > td[colspan]').map(function () {
                return $(this).attr('colspan');
            });
        }
        hyper.timers = {
            resize: new Timer(),
            register: function (name) {
                hyper.timers[name] = new Timer();
                return hyper.timers[name];
            }
        }

        hyper.init = function () {
            var $window = $(window);
            var $table = $(hyper.table);
            $table.find(opt.columnDataSelector).each(function () {
                var data = hyper.getColumnData(this);
                hyper.columns[data.index] = data;
                if (data.className != null) {
                    var selector = '', first = true;
                    $.each(data.matches, function (m, match) {
                        if (!first) {
                            selector += ', ';
                        }
                        selector += '> tbody > tr:not(.row-detail) > td:nth-child(' + (parseInt(match) + 1) + ')';
                        first = false;
                    });
                    $table.find(selector).not('cell-detail').addClass(data.className);
                }
            });
            for (var name in opt.breakpoints) {
                hyper.breakpoints.push({'name': name, 'width': opt.breakpoints[name]});
                hyper.breakpointNames += (name + ' ');
            }

            hyper.breakpoints.sort(function (a, b) {
                return a['width'] - b['width'];
            });

            //bind the toggle selector click events
            hyper.bindToggleSelectors();
            hyper.raise('initializing');
            $table.bind('initialized', function () {
                hyper.resize();
                $table.find('[data-init="hide"]').hide();
                $table.find('[data-init="show"]').show();

            });
            $table.bind('resize', function () {
                hyper.resize();
            });
            $window.bind('resize.toggleTable', function () {
                hyper.timers.resize.stop();
                hyper.timers.resize.start(function () {
                    hyper.resize();
                }, opt.delay);
            });
            hyper.raise('initialized');
            hyper.refreshTable($table);
        };

        //moved this out into it's own function so that it can be called from other add-ons
        hyper.bindToggleSelectors = function () {
            var $table = $(hyper.table);
            $table.find(opt.toggleSelector).unbind('click.toggleTable').bind('click.toggleTable', function (e) {
                if ($table.is('.breakpoint') && $(e.target).is('td')) {
                    var $row = $(this).is('tr') ? $(this) : $(this).parents('tr:first');
                    if ($table.hasClass('table-level')) {
                        if ($row.attr('level') == 2) {
                            hyper.toggleDetail($row.get(0), $table);
                        }
                    } else {
                        if (!$row.hasClass('colspan-row') && !$row.hasClass('empty-row')) {
                            hyper.toggleDetail($row.get(0), $table);
                        }
                    }

                }
            });
        };

        hyper.refreshTable = function (table) {
            var $table = $(table);
            if ($table.hasClass('breakpoint')) {
                if ($table.find('>tbody > tr > td.minus').length == 0) {
                    $table.find('>tbody > tr > td.first-column').removeClass('minus');
                    $table.find('>tbody > tr:not(.row-detail) > td.first-column').removeClass('plus').addClass('plus');
                    /**
                     * table-vertical : tr.colspan-row > td[colspan]
                     * */
                    if ($table.hasClass('table-vertical') && arrcolspan != null) {
                        var totalCol = $table.find('>thead > tr > th').length;
                        var visibleCol = $table.find('>thead > tr > th:visible').length;
                        var hideCol = parseInt(totalCol - visibleCol);

                        $table.find('> tbody > tr > td[colspan]').each(function (index) {
                            var i = parseInt(arrcolspan[index] - hideCol);
                            if (i > 0) {
                                $(this).attr('colspan', i);
                            }
                        });

                        var $emptyrows = $table.find('> tbody > tr.empty-row');
                        if ($emptyrows.length > 0) {
                            hyper.kpiTableVertical($emptyrows);
                        }
                        var $rowhascolspan = $table.find('> tbody > tr.colspan-row');
                        if ($rowhascolspan.length > 0) {
                            $rowhascolspan.each(function () {
                                var $row = $(this);
                                if ($row.hasClass('hidden-xs')) {
                                    hyper.columnhiddenxs($row, visibleCol);
                                } else {
                                    hyper.kpiTableVertical($row);
                                }
                            });
                        }

                    }
                    /**end*/
                }
            }
            else {
                $table.find('>tbody > tr > td.first-column').removeClass('plus');
                $table.find('>tbody > tr > td.first-column').removeClass('minus');
                $table.find('>tbody > tr > td.plus').removeClass('plus');
                $table.find('>tbody > tr > td.minus').removeClass('minus');
                $table.find('>tbody >tr.row-detail').remove();
                $table.find('>tbody >tr.detail-show').removeClass('detail-show');
                if ($table.hasClass('table-vertical')) {
                    var visibleCol = $table.find('>thead > tr > th:visible').length;
                    if (arrrowspan != null) {
                        var elements = $table.find('> tbody > tr > td[rowspan]');
                        elements.each(function (index) {
                            $(this).attr('rowspan', arrrowspan[index]);
                        });
                        if ($bean.isNotEmpty($table.attr('event-resize'))) {
                            JCommonUtil.executeFunctionByName(table.attr('event-resize'));
                        }
                    }
                    if (arrcolspan != null) {
                        $table.find('> tbody > tr > td[colspan]').each(function (index) {
                            var $row = $(this).parent();
                            var visibletd = $row.find('> td:not(.vertical-col):not([data-role="reserve-index"]):visible').length;
                            var colhide = visibleCol - visibletd;
                            if (($row.find('>td[data-role="reserve-index"]').length > 0) || $row.find('>td.vertical-col').length > 0) {
                                $(this).attr('colspan', colhide);
                            } else {
                                $(this).attr('colspan', colhide + 1);
                            }

                        });
                    }
                }
            }
        }

        hyper.kpiTableVertical = function (trows) {
            if (trows.length > 0) {
                trows.find('>td').each(function () {
                    $(this).removeClass('first-column');
                    $(this).removeClass('last-column');
                    $(this).removeClass('plus');
                    $(this).removeClass('minus');
                    if (($(this).attr('data-role') != "reserve-index") && !$(this).hasClass('vertical-col')) {
                        $(this).show();
                    }
                })
            }
        }

        hyper.columnhiddenxs = function (trow, visibleCol) {
            if (trow.length > 0) {
                var isxsbreakpoint = $(trow.parent()).parent().hasClass('xs');
                trow.find('>td').each(function () {
                    $(this).removeClass('first-column');
                    $(this).removeClass('last-column');
                    $(this).removeClass('plus');
                    $(this).removeClass('minus');
                    if (($(this).attr('data-role') != "reserve-index") && !$(this).hasClass('vertical-col')) {
                        if (!$(this).hasClass('hidden-xs')) {
                            $(this).show();
                        } else {
                            if (isxsbreakpoint) $(this).hide();
                            else $(this).show();
                        }
                    }
                });
                var visibletd = trow.find('> td:not(.vertical-col):not([data-role="reserve-index"]):visible').length;
                var hidecol = visibleCol - visibletd + 1;
                trow.find('>td[colspan]').each(function () {
                    if ($(this).attr('colspan') > 0) {
                        $(this).attr('colspan', hidecol);
                    }
                })
            }
        }

        hyper.toggleDetail = function (actualRow, table) {
            var $row = $(actualRow),
                created = hyper.createOrUpdateDetailRow($row.get(0)),
                $next = $row.next();
            var $expander = $row.find('> td.first-column');
            var rowspans = 0;
            if ($(table).hasClass('table-vertical')) {
                JTableModel.initLoadModel(table);
                var $cellSpan = $(JTableModel.TABLE_MODEL[$row.index()][0]);
                rowspans = $cellSpan.attr('rowspan');
            }
            if (!created && $next.is(':visible')) {
                $row.removeClass('detail-show');
                //only hide the next row if it's a detail row
                if ($next.hasClass('row-detail')) $next.remove();
                if (rowspans >= 1) {
                    $cellSpan.attr('rowspan', rowspans * 1 - 1);
                }
                $expander.removeClass('minus');
                $expander.removeClass('plus');
                $expander.addClass('plus');
            } else {
                $row.addClass('detail-show');
                $next.show();
                if (rowspans >= 1) {
                    $cellSpan.attr('rowspan', rowspans * 1 + 1);
                }
                $expander.removeClass('minus');
                $expander.removeClass('plus');
                $expander.addClass('minus');
            }
            if ($bean.isNotEmpty($(table).attr('event-resize'))) {
                JCommonUtil.executeFunctionByName(table.attr('event-resize'));
            }
        };

        hyper.createOrUpdateDetailRow = function (actualRow) {
            var $row = $(actualRow), $next = $row.next(), $detail, values = [];
            if ($row.is(':hidden')) return false; //if the row is hidden for some readon (perhaps filtered) then get out of here

            hyper.raise('row_detail_updated', {'row': $row, 'detail': $next});
            $row.find('> td:hidden').each(function () {
                var index = $(this).index();
                var column = hyper.getColumnFromTdIndex(index), name = column.name;
                if (column.ignore == true) return true;
                if (index in column.names) name = column.names[index];
                values.push({
                    'name': name,
                    'value': hyper.parse(this, column),
                    'display': $.trim($(this).html()),
                    'group': column.group,
                    'groupName': column.groupName
                });
                return true;
            });
            if (values.length == 0) return false; //return if we don't have any data to show
            var colspan = $row.find('> td:visible').length;
            var exists = $next.hasClass('row-detail');
            if (!exists) { // Create
                $next = $('<tr class="row-detail"><td class="cell-detail"><div class="' +
                'row-detail-inner"></div></td></tr>');
                $row.after($next);
            }
            if ($row.find('>td.vertical-col').length > 0) {
                $next.find('> td:first').attr('colspan', (colspan - 1));
            } else {
                $next.find('> td:first').attr('colspan', colspan);
            }
            $detail = $next.find('.row-detail-inner').empty();
            opt.createDetail($detail, values);
            if ($next.find('a[data-rel="prettyPopin"]').length > 0) {
                $next.find('a[data-rel="prettyPopin"]').each(function () {
                    $(this).removeClass('poped');
                    $(this).prettyPopin();
                });
            }
            if ($next.find('[id]').length > 0) {
                $next.find('[id]').removeAttr('id');
            }
            /**
             * table-vertical : tr.colspan-row > td[colspan]
             * */
            if ($($row.parent()).parent().hasClass('table-vertical')) {
                var $table = $($row.parent()).parent();
                var visibleCol = $table.find('>thead > tr > th:visible').length;
                var $rowhascolspan = $table.find('> tbody > tr.colspan-row');
                if ($rowhascolspan.length > 0) {
                    $rowhascolspan.each(function () {
                        var $row = $(this);
                        if ($row.hasClass('hidden-xs')) {
                            hyper.columnhiddenxs($row, visibleCol);
                        } else {
                            hyper.kpiTableVertical($row);
                        }
                    });
                }
            }
            /**end**/
            return !exists;
        };

        hyper.raise = function (eventName, args) {
            args = args || {};
            var def = {'hyper': hyper};
            $.extend(true, def, args);
            var e = $.Event(eventName, def);
            if (!e.hyper) {
                $.extend(true, e, def);
            } //pre jQuery 1.6 which did not allow data to be passed to event object constructor
            $(hyper.table).trigger(e);
            return e;
        };

        hyper.getColumnFromTdIndex = function (index) {
            var result = null;
            for (var column in hyper.columns) {
                if ($.inArray(index, hyper.columns[column].matches) >= 0) {
                    result = hyper.columns[column];
                    break;
                }
            }
            return result;
        };

        hyper.resize = function () {
            var $table = $(hyper.table);
            var info = {
                'width': $table.width(),                  //the table width
                'height': $table.height(),                //the table height
                'viewportWidth': hyper.getViewportWidth(),   //the width of the viewport
                'viewportHeight': hyper.getViewportHeight(), //the width of the viewport
                'orientation': null
            };
            info.orientation = info.viewportWidth > info.viewportHeight ? 'landscape' : 'portrait';

            info = hyper.calculateWidthAndHeight($table, info);

            var pinfo = $table.data('info');
            $table.data('info', info);
            hyper.raise('resizing', {'old': pinfo, 'info': info});
            var isAjaxload = $table.hasClass('ajax-load');

            // This (if) statement is here purely to make sure events aren't raised twice as mobile safari seems to do
            if ((!pinfo || ((pinfo && pinfo.width && pinfo.width != info.width) || (pinfo && pinfo.height && pinfo.height != info.height))) || isAjaxload) {
                var current = null, breakpoint;
                for (var i = 0; i < hyper.breakpoints.length; i++) {
                    breakpoint = hyper.breakpoints[i];
                    if (breakpoint && breakpoint.width && info.width <= breakpoint.width) {
                        current = breakpoint;
                        break;
                    }
                }

                var breakpointName = (current == null ? 'default' : current['name']);

                var hasBreakpointFired = hyper.hasBreakpointColumn(breakpointName);

                if (!$table.hasClass('breakpoint') && hasBreakpointFired && option.onStartResponsive != null) {
                    option.onStartResponsive();
                }

                var endResponsive = $table.hasClass('breakpoint') && !hasBreakpointFired && option.onEndResponsive != null;

                $table
                    .removeClass('default breakpoint').removeClass(hyper.breakpointNames)
                    .addClass(breakpointName + (hasBreakpointFired ? ' breakpoint' : ''))
                    .find('> thead > tr:last-child > th:not(.vertical-col)')
                    .each(function () {
                        var data = hyper.columns[$(this).index()], selector = '', first = true;
                        $.each(data.matches, function (m, match) {
                            if (!first) {
                                selector += ', ';
                            }
                            var count = match + 1;
                            selector += '> tbody > tr:not(.row-detail) > td:nth-child(' + count + ')';
                            selector += ', > tfoot > tr:not(.row-detail) > td:nth-child(' + count + ')';
                            selector += ', > colgroup > col:nth-child(' + count + ')';
                            first = false;
                        });

                        selector += ', > thead > tr[data-group-row="true"] > th[data-group="' + data.group + '"]';
                        var $column = $table.find(selector).add(this)

                        if (data.hide[breakpointName] == false) $column.show();
                        else $column.hide();

                        if ($table.find('> thead > tr.group-row').length == 1) {
                            var $groupcols = $table.find('> thead > tr:last-child > th[data-group="' + data.group + '"]:visible, > thead > tr:last-child > th[data-group="' + data.group + '"]:visible'),
                                $group = $table.find('> thead > tr.group-row > th[data-group="' + data.group + '"], > thead > tr.group-row > td[data-group="' + data.group + '"]'),
                                groupspan = 0;

                            $.each($groupcols, function () {
                                groupspan += parseInt($(this).attr('colspan') || 1);
                            });

                            if (groupspan > 0) $group.attr('colspan', groupspan).show();
                            else $group.hide();
                        }
                    })
                    .end()
                    .find('> tbody > tr.detail-show').each(function () {
                        hyper.createOrUpdateDetailRow(this);
                    });

                $table.find('> tbody > tr.detail-show:visible').each(function () {
                    $(this).find('> td.first-column')
                    var $next = $(this).next();
                    if ($next.hasClass('row-detail')) {
                        if (!hasBreakpointFired) {
                            $next.remove();
                        }
                        else {
                            $next.show();
                        }
                    }
                });

                // adding .first-column and .last-column to the first and last th and td of each row in order to allow
                // for styling if the first or last column is hidden (which won't work using :first-child or :last-child)
                $table.find('> thead > tr > th.last-column, > tbody > tr > td.last-column').removeClass('last-column');
                $table.find('> thead > tr > th.first-column, > tbody > tr > td.first-column').removeClass('first-column');
                if ($table.hasClass('table-level')) {
                    $table.find('> tbody > tr[level=2]').find('> td:first').addClass('first-column');
                } else {
                    $table.find('> thead > tr, > tbody > tr')
                        .find('> th:visible:last, > td:visible:last')
                        .addClass('last-column')
                        .end()
                        .find('> th:visible:not(.vertical-col):first, > td:visible:not(.vertical-col):first')
                        .addClass('first-column');
                }

                $table.each(function () {
                    hyper.refreshTable($table);
                });

                hyper.raise('breakpoint_' + breakpointName, {'info': info});
            }

            hyper.raise('resized', {'old': pinfo, 'info': info});

            if (endResponsive) {
                option.onEndResponsive();
            }
        };

        hyper.getViewportWidth = function () {
            return window.innerWidth || (document.body ? document.body.offsetWidth : 0);
            //return $('.box-content').width() || (document.body ? document.body.offsetWidth : 0);
        };

        hyper.getViewportHeight = function () {
            return window.innerHeight || (document.body ? document.body.offsetHeight : 0);
        };

        hyper.calculateWidthAndHeight = function ($table, info) {
            if (jQuery.isFunction(opt.calculateWidthAndHeightOverride)) {
                return opt.calculateWidthAndHeightOverride($table, info);
            }
            if (info.viewportWidth < info.width) info.width = info.viewportWidth;
            if (info.viewportHeight < info.height) info.height = info.viewportHeight;

            return info;
        };

        hyper.hasBreakpointColumn = function (breakpoint) {
            for (var c in hyper.columns) {
                if (hyper.columns[c].hide[breakpoint]) {
                    return true;
                }
            }
            return false;
        };

        hyper.getColumnData = function (th) {
            var $th = $(th), hide = $th.data('hide'), index = $th.index();
            hide = hide || '';
            hide = hide.split(',');
            var data = {
                'index': index,
                'hide': {},
                'type': $th.data('type') || 'alpha',
                'name': $.trim($th.data('name') || $th.text()),
                'ignore': $th.data('ignore') || false,
                'className': $th.data('class') || null,
                'matches': [],
                'names': {},
                'group': $th.data('group') || null,
                'groupName': null
            };

            if (data.group != null) {
                var $group = $(hyper.table).find('> thead > tr.group-row > th[data-group="' + data.group + '"], > thead > tr.group-row > td[data-group="' + data.group + '"]').first();
                data.groupName = hyper.parse($group, {'type': 'alpha'});
            }

            var pcolspan = parseInt($th.prev().attr('colspan') || 0);
            indexOffset += pcolspan > 1 ? pcolspan - 1 : 0;
            var colspan = parseInt($th.attr('colspan') || 0), curindex = data.index + indexOffset;
            if (colspan > 1) {
                var names = $th.data('names');
                names = names || '';
                names = names.split(',');
                for (var i = 0; i < colspan; i++) {
                    data.matches.push(i + curindex);
                    if (i < names.length) data.names[i + curindex] = names[i];
                }
            } else {
                data.matches.push(curindex);
            }

            data.hide['default'] = ($th.data('hide') === "all") || ($.inArray('default', hide) >= 0);

            for (var name in opt.breakpoints) {
                data.hide[name] = ($th.data('hide') === "all") || ($.inArray(name, hide) >= 0);
            }
            var e = hyper.raise('column_data', {'column': {'data': data, 'th': th}});
            return e.column.data;
        };

        hyper.parse = function (cell, column) {
            var parser = opt.parsers[column.type] || opt.parsers.alpha;
            return parser(cell);
        };

        hyper.init();
        return hyper;
    }
})(window, jQuery);

var JHyperTable = (function (window, $) {

    var ins = {};

    ins.responsiveTable = function (target) {
        var $tableToggle;
        if ($bean.isNotEmpty(target)) {
            $tableToggle = $(target).find('.table-toggle');
        } else {
            $tableToggle = $('.table-toggle');
        }
        $tableToggle.each(function () {
            $(this).toggleTable();
        });
    }

    ins.registerHyperTable = function ($container) {
        if ($bean.isEmpty($container)) {
            $container = $('body');
        }
        var $table = $container.find('table.table-toggle');
        if ($table.is(':visible')) {
            $table.toggleTable();
        } else {
            setTimeout(function () {
                $table.toggleTable();
            }, 300);
        }

    }

    ins.refreshTableLevel = function ($actualrow) {
        $actualrow.next('.row-detail').remove();

    }

    ins.reviewActions = function (sharing) {
        var $sharing_ = $(sharing);
        var sharingId = $sharing_.attr('id');
        if ($sharing_.parents().find('tr.row-detail').length > 0) {
            var $rowdetail = $sharing_.parents().find('tr.row-detail');
            // delete another hidden input which have the same id
            $rowdetail.each(function () {
                var $row = $(this);
                $row.find('input[type="hidden"]').each(function () {
                    $(this).remove();
                });
                var $checkbox = $row.find('input.check-action');
                var $rowdetailshow = $row.prev();
                if ($rowdetailshow.hasClass('detail-show')) {
                    var $checkboxhidding = $rowdetailshow.find('input.check-action');
                    $rowdetailshow.find('input[type="hidden"]').each(function (index) {
                        var value = $(this).attr('value');
                        var $checkboxinrowdetail = $($checkbox[index]);
                        var $checkboxinrowshowdetail = $($checkboxhidding[index]);
                        if (JCommonUtil.isEmpty(value.trim())) {
                            $checkboxinrowdetail.removeAttr('checked');
                            $checkboxinrowshowdetail.removeAttr('checked');
                        } else {
                            $checkboxinrowdetail.attr('checked', true);
                            $checkboxinrowshowdetail.attr('checked', true);
                        }
                    });
                }
            });
        }
    }

    ins.removeRow = function (row) {
        var $row = $(row);
        if ($row.hasClass('row-detail')) {
            var $detailshow = $row.prev();
            if ($detailshow.hasClass('detail-show')) $detailshow.remove();
        }
        if ($row.hasClass('detail-show')) {
            var $rowdetail = $row.next();
            if ($rowdetail.hasClass('row-detail')) $rowdetail.remove();
        }
        $row.remove();
    }

    return ins;

})(window, jQuery);

(function ($) {
    $.fn.hyperSorter = function (settings) {
        settings = jQuery.extend({
            formSorter: document.forms[0],
            actionSorter: 'list',
            callbackLoad: false,
            isAjax: false,
            idContainer: null
        }, settings);
        var $thisSorter = $(this);
        if ($thisSorter.presence()) {
            initSorter();
        }
        function initSorter() { // init
            if (settings.formSorter == null || settings.formSorter.ascent == null) {
                return;
            }
            var ascent = settings.formSorter.ascent.value;
            var sortField = settings.formSorter.sortField.value;
            if (!sortField) {
                return;
            }
            var headers = $thisSorter.find('.item-sorter');
            for (var i = 0; i < headers.length; i++) {
                if (sortField == $(headers[i]).attr('object-field')) {
                    $(headers[i]).removeClass('sort-asc');
                    $(headers[i]).removeClass('sort-desc');
                    if (ascent == "true") {
                        $(headers[i]).addClass('sort-asc');
                    } else {
                        $(headers[i]).addClass('sort-desc');
                    }
                }
            }
        };
        return this.each(function () {
            $thisSorter.find(".item-sorter").click(function () {
                var sortField = $(this).attr('object-field');
                var ascent;
                if (settings.formSorter.sortField.value != sortField) {
                    ascent = settings.formSorter.ascent.value;
                } else if ($(this).hasClass('sort-desc')) {
                    ascent = true;
                } else if ($(this).hasClass('sort-asc')) {
                    ascent = false;
                }

                settings.formSorter.sortField.value = sortField;
                settings.formSorter.ascent.value = ascent;
                settings.formSorter.m.value = settings.actionSorter;
                if (!settings.isAjax) {
                    if (!settings.callbackLoad) {
                        settings.formSorter.submit();
                    }
                } else {
                    $.ajax({
                        url: JCommonUtil.getUrlAjax(settings.formSorter.action),
                        data: $(settings.formSorter).serialize(),
                        success: function (data) {
                            if (data) {
                                if (data.indexOf('@error:') == 0) {
                                    $.quickMsg.setParams({
                                        error: data.substring("@error:".length)
                                    });
                                } else {
                                    $('#' + settings.idContainer).html(data);
                                }
                            }
                            $.quickMsg.show('msg-box');
                        },
                        complete: function () {
                            removeLyLoading('#' + settings.idContainer);
                        }
                    });
                }
            });
        });
    };
})(jQuery);
$(document).ready(function () {
    $('.table-sorter').hyperSorter();
});
var JTableSorter = (function (window, $) {
    var ins = {};
    ins.setupCustomSorter = function () {
        $('.table-sorter-ajax').each(function () {
            var $this = $(this);
            var isSetup = $this.attr('table-sorter-ajax-setup');
            if ($bean.isNotEmpty(isSetup)) {
                return;
            }
            var form = $this.parents('form')[0];
            var settings = {};
            settings.formSorter = form;
            settings.isAjax = true;
            var idContainer = $this.attr('ajax-container-id');
            if ($bean.isEmpty(idContainer)) {
                return;
            }
            settings.idContainer = idContainer;
            var actionSorter = $this.attr('ajax-action-sorter');
            if ($bean.isNotEmpty(actionSorter)) {
                settings.actionSorter = actionSorter;
            }
            $this.hyperSorter(settings);
            $this.attr('table-sorter-ajax-setup', 'setup');
        });
    }
    return ins;
})(window, jQuery);