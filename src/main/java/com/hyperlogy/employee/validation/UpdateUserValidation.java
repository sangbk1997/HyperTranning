package com.hyperlogy.employee.validation;

import com.hyperlogy.employee.bo.Employee;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import java.util.List;
import java.util.Objects;

@Component
public class UpdateUserValidation extends AbstractEmployeeValidation {
    @Override
    public boolean supports(Class<?> aClass) {
        return false;
    }

    @Override
    public void validate(Object object, Errors errors) {
        Employee employee = (Employee) object;

        this.employeeValidation(errors);

        Employee employeeByCode = this.employeeDao.findByCode("code", employee.getCode());

        if (!Objects.isNull(employeeByCode) &&
                employee.getCode().equals(employeeByCode.getCode()) &&
                !employee.getId().equals(employeeByCode.getId())) {
            errors.rejectValue("code", "employee.code_exist", new Object[]{}, null);
        }
    }
}
