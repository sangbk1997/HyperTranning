var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $fq;
(function ($fq) {
    var QueryObject = (function () {
        /*orders: any[] = [];
         paginated: any = {
         page: 1,
         pageSize: 4,
         maxRow: null,
         startRow: 0
         };*/
        function QueryObject(f, wrapper) {
            this.filter = f;
            if ($bean.isNotNil(wrapper)) {
                $bean.extend(this, wrapper);
            }
            this.filters = {};
            this.init(this.filters, f, 1);
        }
        QueryObject.prototype.init = function (_filters, f, index) {
            if (f instanceof CombineFilter) {
                var cf = f, ccf;
                _filters[f.id(index)] = {};
                var cfIndexMap = { 'and': 0, 'or': 0 };
                for (var i = 0; i < cf.filters.length; i++) {
                    var cfIndex = 0;
                    if (cf.filters[i] instanceof CombineFilter) {
                        ccf = cf.filters[i];
                        cfIndexMap[ccf.op]++;
                        cfIndex = cfIndexMap[ccf.op];
                    }
                    this.init(_filters[f.id(index)], cf.filters[i], cfIndex);
                }
            }
            else {
                _filters[f.id(index)] = f;
            }
        };
        QueryObject.prototype.build = function () {
            //return '{"filter": ' + this.filter.build() + ', "orders":' + JSON.stringify(this.orders) + ', "paginated": ' + JSON.stringify(this.paginated) + '}';
            return '{"filter": ' + this.filter.build() + '}';
        };
        QueryObject.prototype.toString = function () {
            return JSON.stringify({ filter: this.filter });
        };
        QueryObject.prototype.match = function (object) {
            return this.filter.match(object);
        };
        return QueryObject;
    }());
    $fq.QueryObject = QueryObject;
    var BaseFilter = (function () {
        function BaseFilter() {
        }
        BaseFilter.prototype.and = function (filter) {
            return new CombineFilter(this, filter, 'and');
        };
        BaseFilter.prototype.or = function (filter) {
            return new CombineFilter(this, filter, 'or');
        };
        BaseFilter.prototype.add = function (filter) {
            return null;
        };
        BaseFilter.prototype.build = function () {
            return null;
        };
        BaseFilter.prototype.match = function (object) {
            return false;
        };
        BaseFilter.prototype.id = function (index) {
            return null;
        };
        return BaseFilter;
    }());
    var CombineFilter = (function (_super) {
        __extends(CombineFilter, _super);
        function CombineFilter(f1, f2, op) {
            var _this = _super.call(this) || this;
            _this.filters = [];
            _this.add(f1);
            _this.add(f2);
            _this.op = op == 'and' ? op : 'or';
            return _this;
        }
        CombineFilter.prototype.add = function (f) {
            if ($bean.isNil(f)) {
                return this;
            }
            if (f instanceof CombineFilter && this.op == f.op) {
                for (var i = 0; i < f.filters.length; i++) {
                    this.filters.push(f.filters[i]);
                }
            }
            else {
                this.filters.push(f);
            }
            return this;
        };
        CombineFilter.prototype.build = function () {
            var sb = '';
            var sb1;
            for (var i = 0; i < this.filters.length; i++) {
                sb1 = this.filters[i].build();
                if (sb1 == '') {
                    continue;
                }
                if (sb.length > 0) {
                    sb += ', ';
                }
                sb += sb1;
            }
            if (sb != '') {
                sb = '{"op": "' + this.op + '", "filters": [' + sb + ']}';
            }
            return sb;
        };
        CombineFilter.prototype.toString = function () {
            return JSON.stringify(this);
        };
        CombineFilter.prototype.match = function (object) {
            return this.op == 'and' ? this._matchAnd(object) : this._matchOr(object);
        };
        CombineFilter.prototype._matchAnd = function (object) {
            var matchAnd = null;
            for (var i = 0; i < this.filters.length; i++) {
                var match = this.filters[i].match(object);
                if ($bean.isNotNil(match)) {
                    if (!match) {
                        return false;
                    }
                    else {
                        matchAnd = true;
                    }
                }
            }
            return matchAnd;
        };
        CombineFilter.prototype._matchOr = function (object) {
            var matchOr = null;
            for (var i = 0; i < this.filters.length; i++) {
                var match = this.filters[i].match(object);
                if ($bean.isNotNil(match)) {
                    if (match) {
                        return true;
                    }
                    else {
                        matchOr = false;
                    }
                }
            }
            return matchOr;
        };
        CombineFilter.prototype.id = function (index) {
            return this.op + "_" + index;
        };
        return CombineFilter;
    }(BaseFilter));
    $fq.CombineFilter = CombineFilter;
    var SimpleFilter = (function (_super) {
        __extends(SimpleFilter, _super);
        function SimpleFilter(name, op, value) {
            var _this = _super.call(this) || this;
            _this.name = name;
            _this.op = op;
            if ('nn' == op || 'nl' == op) {
                _this.apply = (value == true);
            }
            else {
                _this.value = value;
            }
            return _this;
        }
        SimpleFilter.prototype.build = function () {
            var str = '';
            if ($bean.isNotNil(this.value) || this.apply) {
                str += '{"name": "' + this.name + '", "op": "' + this.op + '", "value": ';
                if (Array.isArray(this.value)) {
                    var values = this.value;
                    str += '[';
                    for (var i = 0; i < values.length; i++) {
                        if (i > 0) {
                            str += ', ';
                        }
                        str += '"' + values[i] + '"';
                    }
                    str += ']';
                }
                else {
                    str += '"' + this.value + '"';
                }
                str += '}';
            }
            return str;
        };
        SimpleFilter.prototype.match = function (object) {
            if ($bean.isNotNil(this.value)) {
                var value = this.value;
                var refValue = object[this.name];
                if ($bean.valueIn(this.name, ['startDate', 'dueDate', 'completeDate'])) {
                    value = JDateUtil.parseExact(value, JDateUtil.FORMAT_DATE_TIME_JSON).getTime();
                    refValue = JDateUtil.parseExact(refValue, JDateUtil.FORMAT_DATE_TIME_JSON).getTime();
                }
                if (this.op == 'eq') {
                    return refValue == value;
                }
                else if (this.op == 'ne') {
                    return refValue != value;
                }
                else if (this.op == 'lt') {
                    return refValue < value;
                }
                else if (this.op == 'le') {
                    return refValue <= value;
                }
                else if (this.op == 'gt') {
                    return refValue > value;
                }
                else if (this.op == 'ge') {
                    return refValue >= value;
                }
                else if (this.op == 'in') {
                    if ($bean.isPlainObject(refValue)) {
                        return $bean.getObjFromCollection(value, refValue);
                    }
                    else {
                        return $bean.collectionContains(value, refValue);
                    }
                }
                else if (this.op == 'li') {
                    if ($bean.isPlainObject(value)) {
                        return $bean.getObjFromCollection(refValue, value);
                    }
                    else {
                        return $bean.collectionContains(refValue, value);
                    }
                }
            }
            if (this.apply) {
                if (this.op == 'nl') {
                    return $bean.isNil(object[this.name]);
                }
                else if (this.op == 'nn') {
                    return $bean.isNotNil(object[this.name]);
                }
            }
            return null;
        };
        SimpleFilter.prototype.id = function (index) {
            return this.name + '_' + this.op;
        };
        return SimpleFilter;
    }(BaseFilter));
    $fq.SimpleFilter = SimpleFilter;
    function and(filters) {
        var combineFilter = new CombineFilter(null, null, 'and');
        if ($bean.isNotNil(filters)) {
            for (var i = 0; i < filters.length; i++) {
                if ($bean.isNil(filters[i])) {
                    continue;
                }
                combineFilter.add(filters[i]);
            }
        }
        return combineFilter;
    }
    $fq.and = and;
    function or(filters) {
        var combineFilter = new CombineFilter(null, null, 'or');
        if ($bean.isNotNil(filters)) {
            for (var i = 0; i < filters.length; i++) {
                if ($bean.isNil(filters[i])) {
                    continue;
                }
                combineFilter.add(filters[i]);
            }
        }
        return combineFilter;
    }
    $fq.or = or;
    function eq(name) {
        return new SimpleFilter(name, 'eq', null);
    }
    $fq.eq = eq;
    function ne(name) {
        return new SimpleFilter(name, 'ne', null);
    }
    $fq.ne = ne;
    function lt(name) {
        return new SimpleFilter(name, 'lt', null);
    }
    $fq.lt = lt;
    function le(name) {
        return new SimpleFilter(name, 'le', null);
    }
    $fq.le = le;
    function gt(name) {
        return new SimpleFilter(name, 'gt', null);
    }
    $fq.gt = gt;
    function ge(name) {
        return new SimpleFilter(name, 'ge', null);
    }
    $fq.ge = ge;
    function nl(name) {
        return new SimpleFilter(name, 'nl', null);
    }
    $fq.nl = nl;
    function nn(name) {
        return new SimpleFilter(name, 'nn', null);
    }
    $fq.nn = nn;
    function ins(name) {
        return new SimpleFilter(name, 'in', null);
    }
    $fq.ins = ins;
    function li(name) {
        return new SimpleFilter(name, 'li', null);
    }
    $fq.li = li;
    function simple(name, op, value) {
        return new SimpleFilter(name, op, value);
    }
    $fq.simple = simple;
    function parse(queryObjectJson) {
        return new QueryObject(_parse(JSON.parse(queryObjectJson).filter), false);
    }
    $fq.parse = parse;
    function _parse(filter) {
        if (filter.op == 'and' || filter.op == 'or') {
            var combineFilter = new CombineFilter(null, null, filter.op);
            if ($bean.isNotNil(filter.filters)) {
                for (var i = 0; i < filter.filters.length; i++) {
                    if ($bean.isNil(filter.filters[i])) {
                        continue;
                    }
                    combineFilter.add(_parse(filter.filters[i]));
                }
            }
            return combineFilter;
        }
        else {
            var simpleFilter = new SimpleFilter(filter.name, filter.op, filter.value);
            $bean.copyProperties(filter, simpleFilter, null, ['name', 'op', 'value'], true);
            return simpleFilter;
        }
    }
})($fq || ($fq = {}));
//# sourceMappingURL=hyd-filter.js.map