package com.hyperlogy.employee.service.impl;

import com.hyperlogy.employee.bo.Employee;
import com.hyperlogy.employee.dao.EmployeeDao;
import com.hyperlogy.employee.service.EmployeeService;
import com.hyperlogy.framework.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl extends AbstractService<Integer, Employee, EmployeeDao> implements EmployeeService {

    @Autowired
    private EmployeeDao employeeDao;

    @Override
    public void doInsertEmployee(Employee bo) {
        employeeDao.save(bo);
    }

    @Override
    public void doUpdateEmployee(Employee bo) {
        employeeDao.update(bo);
    }

    @Override
    public void doDeleteEmployee(Employee bo) {
        employeeDao.delete(bo);
    }

    @Override
    public Employee doInsert(Employee bo) {
        return null;
    }

    @Override
    public List<Employee> findByCodeAndName(String code, String fullName) {
        return employeeDao.findByCodeAndName(code, fullName);
    }

    @Override
    public Employee doUpdate(Employee bo) {
        return null;
    }

    @Override
    public Employee doDelete(Employee bo) {
        return null;
    }
}
