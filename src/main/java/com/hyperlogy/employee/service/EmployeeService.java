package com.hyperlogy.employee.service;

import com.hyperlogy.employee.bo.Employee;
import com.hyperlogy.framework.HyperService;

import java.util.List;

public interface EmployeeService extends HyperService<Integer, Employee> {
    public void doInsertEmployee(Employee bo);

    public void doUpdateEmployee(Employee bo);

    public void doDeleteEmployee(Employee bo);

    public List<Employee> findByCodeAndName(String code, String fullName);
}
