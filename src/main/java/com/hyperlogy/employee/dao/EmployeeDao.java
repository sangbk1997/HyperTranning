package com.hyperlogy.employee.dao;

import com.hyperlogy.employee.bo.Employee;
import com.hyperlogy.framework.HyperDao;

import java.util.List;

public interface EmployeeDao extends HyperDao<Integer, Employee> {

    public List<Employee> findByCodeAndName(String code, String fullName);

    public Employee findByCode(String propertyName,String content);
}
