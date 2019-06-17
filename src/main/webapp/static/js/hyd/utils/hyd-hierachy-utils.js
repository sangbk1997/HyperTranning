var JHierachy = (function (window, $) {
    var ins = {};

    ins.TABLE_LEVEL_CLASS = 'table-level';
    ins.TABLE_LEVEL_ICON_EXPAND_CLASS = 'expand';
    ins.TABLE_LEVEL_ICON_COLLAPSE_CLASS = 'collapse';

    ins.LEVEL_ROOT = 0;
    ins.TABLE_ATTR_LEVEL = 'level';

    ins.TABLE_LEVEL_APB_FIELD_SORT = 'table-level-field-apb-sort';

    // TABLE LEVEL
    ins.registerTableLevel = function (tableId, callback) {
        var $table = $('#' + tableId);
        if ($bean.isNotEmpty($table)) {
            $table.addClass(ins.TABLE_LEVEL_CLASS);
            $table.find('tbody tr td:first-child i').unbind('click').click(function () {
                var show = false;
                if ($(this).hasClass(ins.TABLE_LEVEL_ICON_EXPAND_CLASS)) {
                    $(this).removeClass(ins.TABLE_LEVEL_ICON_EXPAND_CLASS).addClass(ins.TABLE_LEVEL_ICON_COLLAPSE_CLASS);
                    show = true;
                } else if ($(this).hasClass(ins.TABLE_LEVEL_ICON_COLLAPSE_CLASS)) {
                    $(this).removeClass(ins.TABLE_LEVEL_ICON_COLLAPSE_CLASS).addClass(ins.TABLE_LEVEL_ICON_EXPAND_CLASS);
                }
                var $currentRow = $(this).parent('td').parent('tr');
                var level = parseInt($currentRow.attr(ins.TABLE_ATTR_LEVEL));
                var $row = $currentRow.next();
                while ($bean.isNotEmpty($row)) {
                    if ($bean.isNotEmpty($row.attr(ins.TABLE_ATTR_LEVEL)) && (parseInt($row.attr(ins.TABLE_ATTR_LEVEL)) <= level)) {
                        break;
                    }
                    if ($bean.isNotEmpty($row.attr(ins.TABLE_ATTR_LEVEL))) {
                        if (show && (parseInt($row.attr(ins.TABLE_ATTR_LEVEL)) == level + 1)) {
                            $row.show();
                            if (($row.attr('level') == 2) && $table.hasClass('table-toggle') && $table.hasClass('breakpoint')) {
                                var $firstCol = $row.find('>td.first-column');
                                $firstCol.removeClass('minus');
                                $firstCol.removeClass('plus').addClass('plus');
                            }
                        }
                        if (!show) {
                            if ($bean.isNotEmpty($row.find('.' + ins.TABLE_LEVEL_ICON_COLLAPSE_CLASS))) {
                                $row.find('.' + ins.TABLE_LEVEL_ICON_COLLAPSE_CLASS).removeClass(ins.TABLE_LEVEL_ICON_COLLAPSE_CLASS).addClass(ins.TABLE_LEVEL_ICON_EXPAND_CLASS);
                            }
                            $row.hide();
                            if ($bean.isFunction(callback)) {
                                callback($row);
                            }
                        }
                    }
                    $row = $row.next();
                }
                JHomeUtil.updateTableIndex('#' + tableId);
            });
        }
    }

    ins.registerTableLevelRow = function (rowId) {
        var $row = $('#' + rowId);
        if ($bean.isNotEmpty($row)) {
            $row.find('td:first-child i').unbind('click').click(function () {
                var show = false;
                if ($(this).hasClass(ins.TABLE_LEVEL_ICON_EXPAND_CLASS)) {
                    $(this).removeClass(ins.TABLE_LEVEL_ICON_EXPAND_CLASS).addClass(ins.TABLE_LEVEL_ICON_COLLAPSE_CLASS);
                    show = true;
                } else if ($(this).hasClass(ins.TABLE_LEVEL_ICON_COLLAPSE_CLASS)) {
                    $(this).removeClass(ins.TABLE_LEVEL_ICON_COLLAPSE_CLASS).addClass(ins.TABLE_LEVEL_ICON_EXPAND_CLASS);
                }
                var $currentRow = $(this).parent('td').parent('tr');
                var level = parseInt($currentRow.attr(ins.TABLE_ATTR_LEVEL));
                var $row = $currentRow.next();
                while ($bean.isNotEmpty($row)) {
                    if ($bean.isNotEmpty($row.attr(ins.TABLE_ATTR_LEVEL)) && (parseInt($row.attr(ins.TABLE_ATTR_LEVEL)) <= level)) {
                        break;
                    }
                    if ($bean.isNotEmpty($row.attr(ins.TABLE_ATTR_LEVEL))) {
                        if (show && (parseInt($row.attr(ins.TABLE_ATTR_LEVEL)) == level + 1)) {
                            $row.show();
                        }
                        if (!show) {
                            if ($bean.isNotEmpty($row.find('.' + ins.TABLE_LEVEL_ICON_COLLAPSE_CLASS))) {
                                $row.find('.' + ins.TABLE_LEVEL_ICON_COLLAPSE_CLASS).removeClass(ins.TABLE_LEVEL_ICON_COLLAPSE_CLASS).addClass(ins.TABLE_LEVEL_ICON_EXPAND_CLASS);
                            }
                            $row.hide();
                        }
                    }
                    $row = $row.next();
                }
                JHomeUtil.updateTableIndex();
            });
        }
    }

    ins.openTableLevelRow = function (rowId) {
        var $row = $('#' + rowId);
        if ($bean.isNotEmpty($row)) {
            if ($row.find('td:first-child i').hasClass(ins.TABLE_LEVEL_ICON_EXPAND_CLASS)) {
                $row.find('td:first-child i').removeClass(ins.TABLE_LEVEL_ICON_EXPAND_CLASS).addClass(ins.TABLE_LEVEL_ICON_COLLAPSE_CLASS);
                var level = parseInt($row.attr(ins.TABLE_ATTR_LEVEL));
                $row = $row.next();
                while ($bean.isNotEmpty($row)) {
                    if ($bean.isNotEmpty($row.attr(ins.TABLE_ATTR_LEVEL)) && (parseInt($row.attr(ins.TABLE_ATTR_LEVEL)) <= level)) {
                        break;
                    }
                    if ($bean.isNotEmpty($row.attr(ins.TABLE_ATTR_LEVEL))) {
                        if (parseInt($row.attr(ins.TABLE_ATTR_LEVEL)) == level + 1) {
                            $row.show();
                        }
                    }
                    $row = $row.next();
                }
                JHomeUtil.updateTableIndex();
            }
        }
    }

    // cập nhật parent, di chuyển nhánh này sang nhánh khác
    ins.moveTableLevelRow = function (tableId, rowId, targetId) {
        if ($('#' + tableId + ' tbody tr').length == 1) {
            return false;
        }
        var $currentRow = $('#' + rowId);
        var $parentRow, insertPosition;
        if ($bean.isEmpty(targetId)) {
            $parentRow = $('#' + tableId + ' tbody');
            insertPosition = JCommonUtil.PREPEND;
        } else {
            $parentRow = $('#' + targetId);
            insertPosition = JCommonUtil.INSERT_AFTER;
        }
        if ($bean.isNotEmpty($currentRow) && $bean.isNotEmpty($parentRow)) {
            var level = parseInt($currentRow.attr(JHierachy.TABLE_ATTR_LEVEL));
            var $row = $currentRow.next();
            if (JCommonUtil.INSERT_AFTER == insertPosition) {
                $currentRow.detach().insertAfter($parentRow);
            } else if (JCommonUtil.PREPEND == insertPosition) {
                $currentRow.detach().prependTo($parentRow);
            }
            var nextLevel = $row.attr(JHierachy.TABLE_ATTR_LEVEL);
            if (parseInt(nextLevel) < level) {
                return false;
            }
            var nextTargetId = rowId;
            while ($bean.isNotEmpty($row)) {
                $currentRow = $row;
                $row = $currentRow.next();
                if (rowId == $currentRow.attr('id') || $bean.isEmpty($currentRow.attr(JHierachy.TABLE_ATTR_LEVEL))) {
                    continue;
                }
                if ($bean.isNotEmpty($currentRow.attr(JHierachy.TABLE_ATTR_LEVEL))) {
                    if (level >= parseInt($currentRow.attr(JHierachy.TABLE_ATTR_LEVEL))) {
                        break;
                    }
                    if (parseInt($currentRow.attr(JHierachy.TABLE_ATTR_LEVEL)) - parseInt($('#' + nextTargetId).attr(JHierachy.TABLE_ATTR_LEVEL)) == 1) {
                        ins.moveTableLevelRow(tableId, $currentRow.attr('id'), nextTargetId);
                    }
                }
            }
            JHomeUtil.updateTableIndex();
        }
    }

    // tìm row mà sẽ append sau nó 1 row khác, sao cho trư�?ng text sẽ được sắp xếp theo alphabet
    // rowId: row sẽ được append
    // firstRowId: row cùng cấp đầu tiên trong cây
    ins.getRowTargetInsertAfterByAlphabet = function (tableId, rowId, firstRowId) {
        if ($('#' + tableId + ' tbody tr').length == 1) {
            return null;
        }
        var $row = $('#' + rowId);
        var rowText = $row.find('.' + ins.TABLE_LEVEL_APB_FIELD_SORT).text().trim().toLowerCase();
        var level = parseInt($row.attr(ins.TABLE_ATTR_LEVEL));
        var $currentRow;
        var targetId;
        if ($bean.isEmpty(firstRowId)) {
            // b�? qua rowId
            $currentRow = $('#' + tableId + ' tbody tr:first');
        } else {
            $currentRow = $('#' + firstRowId);
            targetId = firstRowId;
        }
        var $itrRow = $currentRow;
        var currentLevel;
        var skipParent = true;
        while ($bean.isNotEmpty($itrRow)) {
            $currentRow = $itrRow;
            if (rowId == $currentRow.attr('id')) {
                $itrRow = $currentRow.next();
                continue;
            }
            currentLevel = parseInt($currentRow.attr(ins.TABLE_ATTR_LEVEL));
            if ($bean.isNotEmpty($currentRow.attr(ins.TABLE_ATTR_LEVEL))) {
                if (level == currentLevel) {
                    if (rowText < $currentRow.find('.' + ins.TABLE_LEVEL_APB_FIELD_SORT).text().trim().toLowerCase()) {
                        break;
                    } else {
                        targetId = $currentRow.attr('id');
                    }
                } else if (level < currentLevel) {
                    $itrRow = $currentRow.next();
                    targetId = $currentRow.attr('id');
                    continue;
                } else {
                    if (skipParent) {
                        skipParent = false;
                        $itrRow = $currentRow.next();
                        continue;
                    } else {
                        break;
                    }
                }
            }
            $itrRow = $currentRow.next();
        }
        if (rowId == targetId) {
            targetId = null;
        }
        return targetId;
    }

    ins.moveTableLevelRowAlphabet = function (tableId, rowId, parentRowId) {
        var targetId = ins.getRowTargetInsertAfterByAlphabet(tableId, rowId, parentRowId);
        ins.moveTableLevelRow(tableId, rowId, targetId);
    }

    ins.expandAllTableLevel = function (tableId) {
        var $table = $('#' + tableId);
        if ($bean.isNotEmpty($table)) {
            $table.find('tbody tr').each(function () {
                $(this).show();
                $(this).find('i').removeClass(ins.TABLE_LEVEL_ICON_EXPAND_CLASS).addClass(ins.TABLE_LEVEL_ICON_COLLAPSE_CLASS);
            });
            JHomeUtil.updateTableIndex();
        }
    }

    ins.collapseAllTableLevel = function (tableId) {
        var $table = $('#' + tableId);
        if ($bean.isNotEmpty($table)) {
            $table.find('tbody tr').each(function () {
                if (parseInt($(this).attr(ins.TABLE_ATTR_LEVEL)) != ins.LEVEL_ROOT) {
                    $(this).hide();
                }
                $(this).find('i').removeClass(ins.TABLE_LEVEL_ICON_COLLAPSE_CLASS).addClass(ins.TABLE_LEVEL_ICON_EXPAND_CLASS);
            });
            JHomeUtil.updateTableIndex();
        }
    }

    return ins;
})(window, jQuery);