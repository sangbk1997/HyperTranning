package com.hyperlogy.employee.validation;

import com.hyperlogy.employee.dao.EmployeeDao;
import com.hyperlogy.employee.utils.MsUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

public abstract class AbstractEmployeeValidation implements Validator {

    @Autowired
    protected EmployeeDao employeeDao;

    @Autowired
    private MsUtils msUtils;

    protected void employeeValidation(Errors errors) {
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "code", "employee.empty", new Object[]{msUtils.getMessage("employee.code")});
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "firstName", "employee.empty", new Object[]{msUtils.getMessage("employee.first_name")});
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "lastName", "employee.empty", new Object[]{msUtils.getMessage("employee.last_name")});
    }
}
