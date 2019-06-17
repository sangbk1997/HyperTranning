/**
 * Created by nhandh_vdi on 9/14/2016.
 */
var $validationService = {
    /**
     * validationObjs role follow validation of server
     * bean is object need validate
     * updateFieldNames is fields need validate of object bean
     * @param validationObjs
     * @param bean
     * @param updateFieldNames
     * return is undefined if passed validate
     * retrun error message if not pass validate
     */
    validation: function (validationObjs, bean, updateFieldNames) {
        for (var i in updateFieldNames) {
            var field = updateFieldNames[i];
            var objsValidation = this.getObjsValidationByField(validationObjs, field);
            if (objsValidation.length > 0) {
                for (var j in objsValidation) {
                    var vali = objsValidation[j];
                    /**
                     * call function validation have been define from gen_validatorv31.modified.js
                     * function validateTestNotForm
                     * return undefined if validate passed
                     * else return error message if validate not passed
                     * @type {*}
                     */
                    var errorMsg = validateTestNotForm({value: bean[field]}, vali.command, vali.commandValue, vali.errMsg);
                    if ($bean.isNotNil(errorMsg)) {
                        return JCommonUtil.message(errorMsg, 'error');
                    }
                }
            }
        }
        return;
    },

    /**
     * function get array object of array validation by property
     * @param validationObjs
     * @param field
     * @returns {Array}
     */
    getObjsValidationByField: function (validationObjs, property) {
        var objs = [];
        if (!$bean.isArray(validationObjs) || $bean.isNil(property))
            return objs;
        else {
            for (var i in validationObjs) {
                if (validationObjs[i].property == property) {
                    objs.push(validationObjs[i]);
                }
            }
        }
        return objs;
    },

    validate_OneField: function (validationObjs, property, value, cmdValue) {
        var validations = this.getObjsValidationByField(validationObjs, property);
        if (validationObjs.length > 0) {
            for (var i in validations) {
                var vali = validations[i];
                var cmd = null;
                if (cmdValue) {
                    cmd = cmdValue;
                } else {
                    cmd = vali.commandValue;
                }
                var error = validateTestNotForm({value: value}, vali.command, cmd, vali.errMsg);
                if ($bean.isNotNil(error)) {
                    return error;
                }
            }
        }
    },
    /**
     * validate for goal kpi mark range
     * @param goal
     * @returns {*}
     */
    validateMarkRange: function (goal) {
        var kpiMarkRange = goal.kpiMarkRange;
        if ($bean.isNil(kpiMarkRange) || (kpiMarkRange.length) < 2) {
            throw JCommonUtil.message("error.ihcm.kpi.library.value.type.invalid");
        }
        var typeCategory = kpiConfigs.KPI_VALUE_TYPE_CATEGORY.id == goal.valueType;
        var messageMarkInvalid = JCommonUtil.message('error.ihcm.kpi.library.mark.invalid');
        if (goal.templateType == kpiConfigs.KPI_TEMPLATE_TYPE_1) {
            for (var i = 0; i < kpiMarkRange.length; i++) {
                var markRange = goal.kpiMarkRange[i];
                if ($bean.isEmpty(markRange.trend)) {
                    throw JCommonUtil.message("error.ihcm.kpi.library.trend.required");
                }
                if ($bean.isEmpty(markRange.mark)) {
                    throw JCommonUtil.message("error.ihcm.kpi.library.mark.required");
                }
                if (!JMath.isFloatLocale(markRange.mark)) {
                    throw JCommonUtil.message("error.goal.kpi.value.invalid");
                }
                if (typeCategory) {
                    if ($bean.isEmpty(markRange.name)) {
                        throw JCommonUtil.message("error.ihcm.kpi.library.name.required");
                    }
                    if (i > 0) {
                        if (JMath.parseFloatLocale(markRange.mark) <= JMath.parseFloatLocale(kpiMarkRange[i - 1].mark)) {
                            throw JCommonUtil.message("error.ihcm.kpi.library.mark.range.invalid");
                        }
                    }
                } else {
                    if (i > 0) {
                        if (!JMath.isFloatLocale(markRange.value)) {
                            throw JCommonUtil.message("error.goal.kpi.value.invalid");
                        }
                    }
                }
            }
        } else if (goal.templateType == kpiConfigs.KPI_TEMPLATE_TYPE_2) {
            for (var i = 0; i < kpiMarkRange.length; i++) {
                var markRange = goal.kpiMarkRange[i];
                if ($bean.isEmpty(markRange.trend)) {
                    throw JCommonUtil.message("error.ihcm.kpi.library.trend.required");
                }
                if (typeCategory) {
                    if ($bean.isEmpty(markRange.name)) {
                        throw JCommonUtil.message("error.ihcm.kpi.library.name.required");
                    }
                    if ($bean.isEmpty(markRange.value)) {
                        throw JCommonUtil.message("error.ihcm.kpi.library.mark.required");
                    }
                    if (!JMath.isFloatLocale(markRange.value)) {
                        throw JCommonUtil.message("error.ihcm.kpi.library.mark.invalid");
                    }
                    if (i > 0) {
                        if (JMath.parseFloatLocale(markRange.value) <= JMath.parseFloatLocale(kpiMarkRange[i - 1].value)) {
                            throw JCommonUtil.message("error.ihcm.kpi.library.mark.range.invalid");
                        }
                    }
                } else {
                    if (i > 0) {
                        if ($bean.isEmpty(markRange.value)) {
                            throw JCommonUtil.message("error.ihcm.kpi.library.mark.required");
                        }
                        if (!JMath.isFloatLocale(markRange.value)) {
                            throw JCommonUtil.message("error.goal.kpi.value.invalid");
                        }
                    }
                    if (i > 1) {
                        if (JMath.parseFloatLocale(markRange.value) <= JMath.parseFloatLocale(kpiMarkRange[i - 1].value)) {
                            throw JCommonUtil.message("error.ihcm.kpi.library.mark.range.value.invalid");
                        }
                    }
                }
            }
        }
    },
    validateNumberKpi: function (kpi) {
        var validTarget = validateTestNotForm({value: kpi.kpiTarget ? kpi.kpiTarget.toString() : ""}, DECIMAL, undefined, JCommonUtil.message('error.goal.kpi.value.invalid'));
        var validValue = validateTestNotForm({value: kpi.kpiValue ? kpi.kpiValue.toString() : ""}, DECIMAL, undefined, JCommonUtil.message('error.goal.kpi.value.invalid'));
        var validValueNormalizing = validateTestNotForm({value: kpi.valueNormalizing ? kpi.valueNormalizing.toString() : ""}, DECIMAL, undefined, JCommonUtil.message('error.ihcm.kpi.library.mark.invalid'));
        if (validTarget) {
            JCommonUtil.alertError({message: validTarget});
            return false;
        }
        if (validValue) {
            JCommonUtil.alertError({message: validValue});
            return false;
        }
        if (validValueNormalizing) {
            JCommonUtil.alertError({message: validValueNormalizing});
            return false;
        }
        return true;
    },
    validateNumber: function (number) {
        if(!JMath.isFloatLocale(number))
        {
            JCommonUtil.alertError({message:JCommonUtil.message('error.goal.kpi.value.invalid')});
            return false;
        }
        // var validate = validateTestNotForm({value: number ? number.toString() : ""}, DECIMAL, undefined, JCommonUtil.message('error.goal.kpi.value.invalid'));
        // if (validate) {
        //     JCommonUtil.alertError({message: validate});
        //     return false;
        // }
        return true;
    }

};